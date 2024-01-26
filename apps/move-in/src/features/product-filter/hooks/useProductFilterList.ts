import { defineMock } from '@/common/utils/defineMock';
import { httpClient } from '@/common/utils/httpClient';
import { koreanCurrencyFormat } from '@move-in/core';
import { addDays, isAfter, subDays } from 'date-fns';
import { useMemo } from 'react';
import { useQuery } from 'react-query';

export enum ProductFilterState {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  REQUESTED = 'REQUESTED',
  EXPIRED = 'EXPIRED',
}

interface ProductFilterListItemDTO {
  id: number;
  name: string;
  // 제안 가능 여부
  status?: 'DEFAULT_CREATED' | 'OPEN' | 'CLOSE';
  // 제안 만료 날짜
  recommendation_due_date?: string;
  family_type: string;
  maximum_deposit: number;
  maximum_monthly_cost: number;
  minimum_monthly_cost: number;
  cost_preference_type: string;
  preferred_region: string;
  preferred_village: string;
  item_house_type: string[];
  recommendation_count: number,
}

export interface ProductFilterListItemModel {
  id: number;
  name: string;
  dueDate?: Date;
  filterList: { key: number, value: string }[];
  state: ProductFilterState;
  suggestionCount?: number;
  hasNewSuggestion?: boolean;
}

export const getProductFilterList = "/app-user-api/filter-card";

const useProductFilterList = ({ state }: { state?: ProductFilterState[] } = {}) => {
  const result = useQuery<ProductFilterListItemModel[]>([getProductFilterList], async () => {
    const response = await httpClient.get<ProductFilterListItemDTO[]>(getProductFilterList)

    return response.map((item) => {
      const suggestionDueDate = item.recommendation_due_date != null ? new Date(item.recommendation_due_date) : undefined;
      let state;

      if (suggestionDueDate != null) {
        const isLive = isAfter(suggestionDueDate, new Date()) && item.status === 'OPEN';
        state = isLive ? ProductFilterState.REQUESTED : ProductFilterState.EXPIRED;
      } else {
        state = ProductFilterState.PUBLISHED;
      }

      return {
        id: item.id,
        name: item.name,
        dueDate: suggestionDueDate,
        filterList: [
          item.preferred_region,
          item.preferred_village,
          item.family_type,
          item.item_house_type,
          `${koreanCurrencyFormat(item.maximum_deposit)} · 월 ${item.maximum_monthly_cost / 10000}-${item.minimum_monthly_cost / 10000}`
        ].flat().map((filterItem, index) => {
          return {
            key: index,
            value: filterItem,
          };
        }),
        state,
        suggestionCount: item.recommendation_count,
        hasNewSuggestion: false,
      };
    });
  });

  return {
    ...result, data: useMemo(() => {
      if (state == null) return result.data;

      return result.data?.filter((item) => state.includes(item.state));
    }, [result.data, state]),
  }
};

export default useProductFilterList;

defineMock((mock) => {
  mock.get(new RegExp(`^${getProductFilterList}$`), async (_, request) => {
    console.debug("Mocked get filter request", request);

    await new Promise((resolve) => setTimeout(resolve, 300));

    return new Response(JSON.stringify([{
      id: 1,
      name: '강남 신혼집',
      // 제안 가능 여부
      status: 'CLOSE',
      // 제안 만료 날짜
      recommendation_due_date: subDays(new Date(), 3),
      family_type: '싱글 라이프',
      maximum_deposit: 100000000,
      maximum_monthly_cost: 1000000,
      minimum_monthly_cost: 900000,
      cost_preference_type: '낮은 보증, 높은 월 고정 비용이 좋아요',
      preferred_region: '서울 / 경기 / 인천',
      preferred_village: '서울특별시 강남구 역삼동',
      item_house_type: ['오피스텔'],
      recommendation_count: 30,
    }, {
      id: 2,
      name: '강남 가성비 신혼집',
      // 제안 가능 여부
      status: 'OPEN',
      // 제안 만료 날짜
      recommendation_due_date: addDays(new Date(), 3),
      family_type: '싱글 라이프',
      maximum_deposit: 100000000,
      maximum_monthly_cost: 1000000,
      minimum_monthly_cost: 900000,
      cost_preference_type: '낮은 보증, 높은 월 고정 비용이 좋아요',
      preferred_region: '서울 / 경기 / 인천',
      preferred_village: '서울특별시 강남구 역삼동',
      item_house_type: ['오피스텔'],
      recommendation_count: 10,
    }, {
      id: 3,
      name: '강남 가성비 신혼집 2',
      // 제안 가능 여부
      status: 'DEFAULT_CREATED',
      family_type: '싱글 라이프',
      maximum_deposit: 100000000,
      maximum_monthly_cost: 1000000,
      minimum_monthly_cost: 900000,
      cost_preference_type: '낮은 보증, 높은 월 고정 비용이 좋아요',
      preferred_region: '서울 / 경기 / 인천',
      preferred_village: '서울특별시 강남구 역삼동',
      item_house_type: ['오피스텔'],
      recommendation_count: 0,
    }] as ProductFilterListItemDTO[]), {
      status: 200,
    })
  })
})
