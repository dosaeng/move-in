import { defineMock } from "@/common/utils/defineMock";
import { httpClient } from "@/common/utils/httpClient";
import { koreanCurrencyFormat } from "@move-in/core";
import { addDays, subDays } from "date-fns";
import { useQuery } from "react-query";

export enum ProductSuggestionState {
  NONE = 'NONE',
  // 제안 요청함
  REQUESTED = 'REQUESTED',
  // 상담 요청 있음
  CONSULTING_REQUESTED = 'CONSULTING_REQUESTED',
}

interface ProductFilterListItemDTO {
  id: number;
  name: string;
  status: 'DEFAULT_CREATED' | 'OPEN' | 'CLOSE';
  maximum_deposit: number;
  preferred_region: string;
  item_house_type?: string[];
  minimum_monthly_cost: number;
  cost_preference_type: string;
  maximum_monthly_cost: number;
  // 제안 만료 날짜
  recommendation_due_date?: string;
  family_type: string;
  pet_presence: boolean;
  preferred_village: string;
  recommendation_count: number;
  did_suggest_already: boolean,
  is_consultation_requested: boolean
}

export interface ProductFilterListItemModel {
  id: number;
  name: string;
  dueDate?: Date;
  filterList: { key: number, value: string }[];
  suggestionState: ProductSuggestionState;
}

const getProductFilterList = "/agent-api/filter-card";

const useProductFilterList = () => {
  return useQuery<ProductFilterListItemModel[]>(getProductFilterList, async () => {
    const data = await httpClient.get<ProductFilterListItemDTO[]>(getProductFilterList)

    return data.map((item) => {
      let suggestionState;

      if (item.is_consultation_requested) {
        suggestionState = ProductSuggestionState.CONSULTING_REQUESTED;
      } else if (item.did_suggest_already) {
        suggestionState = ProductSuggestionState.REQUESTED;
      } else {
        suggestionState = ProductSuggestionState.NONE;
      }

      return {
        id: item.id,
        name: item.name,
        dueDate: item.recommendation_due_date != null ? new Date(item.recommendation_due_date) : undefined,
        filterList: [
          item.preferred_region,
          item.preferred_village,
          item.family_type,
          item.item_house_type,
          `${koreanCurrencyFormat(item.maximum_deposit)} · 월 ${item.maximum_monthly_cost / 10000}-${item.minimum_monthly_cost / 10000}`
        ].flat().filter((filterItem) => filterItem != null).map((filterItem, index) => {
          return {
            key: index,
            value: filterItem,
          };
        }) as { key: number, value: string }[],
        suggestionState: suggestionState,
      }
    });
  });
}

export default useProductFilterList;

defineMock((mock) => {
  mock.get(getProductFilterList, async (_, request) => {
    console.debug('Mocked product filter list request', request);

    await new Promise((resolve) => setTimeout(resolve, 300));

    return new Response(JSON.stringify([{
      id: 1,
      name: '신사 영끌 신혼집 1',
      // 제안 만료 날짜
      recommendation_due_date: subDays(new Date(), 3).toISOString(),
      family_type: '싱글 라이프',
      maximum_deposit: 100000000,
      maximum_monthly_cost: 1000000,
      minimum_monthly_cost: 900000,
      cost_preference_type: '낮은 보증, 높은 월 고정 비용이 좋아요',
      preferred_region: '서울 / 경기 / 인천',
      preferred_village: '서울특별시 강남구 역삼동',
      item_house_type: ['오피스텔'],
      recommendation_count: 1,
      did_suggest_already: false,
      is_consultation_requested: false,
    }, {
      id: 2,
      name: '신사 영끌 신혼집 2',
      // 제안 만료 날짜
      recommendation_due_date: addDays(new Date(), 3).toISOString(),
      family_type: '싱글 라이프',
      maximum_deposit: 100000000,
      maximum_monthly_cost: 1000000,
      minimum_monthly_cost: 900000,
      cost_preference_type: '낮은 보증, 높은 월 고정 비용이 좋아요',
      preferred_region: '서울 / 경기 / 인천',
      preferred_village: '서울특별시 강남구 역삼동',
      item_house_type: ['오피스텔'],
      recommendation_count: 1,
      recommendation_status: 'CONSULTING_REQUESTED',
      did_suggest_already: true,
      is_consultation_requested: true,
    }, {
      id: 3,
      name: '신사 영끌 신혼집 3',
      family_type: '싱글 라이프',
      // 제안 만료 날짜
      recommendation_due_date: addDays(new Date(), 3).toISOString(),
      maximum_deposit: 100000000,
      maximum_monthly_cost: 1000000,
      minimum_monthly_cost: 900000,
      cost_preference_type: '낮은 보증, 높은 월 고정 비용이 좋아요',
      preferred_region: '서울 / 경기 / 인천',
      preferred_village: '서울특별시 강남구 역삼동',
      item_house_type: ['오피스텔'],
      recommendation_count: 1,
      did_suggest_already: true,
      is_consultation_requested: false,
    }] as ProductFilterListItemDTO[]), {
      status: 200,
    })
  });
});
