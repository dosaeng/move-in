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
  canSuggestion?: boolean;
  // 제안 만료 날짜
  suggestionDueDate?: string;
  familyType: string;
  maximumDeposit: number;
  maximumMonthlyCost: number;
  minimumMonthlyCost: number;
  costPreferenceType: string;
  preferredRegion: string;
  preferredVillage: string;
  itemHouseType: string[];
  recommendationCount: number,
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
      const suggestionDueDate = item.suggestionDueDate != null ? new Date(item.suggestionDueDate) : undefined;
      let state;

      if (suggestionDueDate != null) {
        const isLive = isAfter(suggestionDueDate, new Date()) && item.canSuggestion === true;
        state = isLive ? ProductFilterState.REQUESTED : ProductFilterState.EXPIRED;
      } else {
        state = ProductFilterState.PUBLISHED;
      }

      return {
        id: item.id,
        name: item.name,
        dueDate: item.suggestionDueDate != null ? new Date(item.suggestionDueDate) : undefined,
        filterList: [
          item.familyType,
          item.itemHouseType,
          `${koreanCurrencyFormat(item.maximumDeposit)} · 월 ${item.maximumMonthlyCost / 10000}-${item.minimumMonthlyCost / 10000}`
        ].flat().map((filterItem, index) => {
          return {
            key: index,
            value: filterItem,
          };
        }),
        state,
        suggestionCount: item.recommendationCount,
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
  mock.get(getProductFilterList, async (_, request) => {
    console.debug("Mocked get filter request", request);

    await new Promise((resolve) => setTimeout(resolve, 300));

    return new Response(JSON.stringify([{
      id: 1,
      name: '신사 영끌 신혼집 1',
      // 제안 가능 여부
      canSuggestion: false,
      // 제안 만료 날짜
      suggestionDueDate: subDays(new Date(), 3),
      familyType: '싱글 라이프',
      maximumDeposit: 100000000,
      maximumMonthlyCost: 1000000,
      minimumMonthlyCost: 900000,
      costPreferenceType: '낮은 보증, 높은 월 고정 비용이 좋아요',
      preferredRegion: '서울 / 경기 / 인천',
      preferredVillage: '서울특별시 강남구 역삼동',
      itemHouseType: ['오피스텔'],
      recommendationCount: 30,
    }, {
      id: 2,
      name: '신사 영끌 신혼집 2',
      // 제안 가능 여부
      canSuggestion: true,
      // 제안 만료 날짜
      suggestionDueDate: addDays(new Date(), 3),
      familyType: '싱글 라이프',
      maximumDeposit: 100000000,
      maximumMonthlyCost: 1000000,
      minimumMonthlyCost: 900000,
      costPreferenceType: '낮은 보증, 높은 월 고정 비용이 좋아요',
      preferredRegion: '서울 / 경기 / 인천',
      preferredVillage: '서울특별시 강남구 역삼동',
      itemHouseType: ['오피스텔'],
      recommendationCount: 10,
    }, {
      id: 3,
      name: '신사 영끌 신혼집 3',
      // 제안 가능 여부
      canSuggestion: false,
      familyType: '싱글 라이프',
      maximumDeposit: 100000000,
      maximumMonthlyCost: 1000000,
      minimumMonthlyCost: 900000,
      costPreferenceType: '낮은 보증, 높은 월 고정 비용이 좋아요',
      preferredRegion: '서울 / 경기 / 인천',
      preferredVillage: '서울특별시 강남구 역삼동',
      itemHouseType: ['오피스텔'],
      recommendationCount: 0,
    }] as ProductFilterListItemDTO[]), {
      status: 200,
    })
  })
})
