import { addDays, subDays } from "date-fns";
import { useQuery } from "react-query";

export enum ProductSuggestionState {
  NONE = 'NONE',
  // 제안 요청함
  REQUESTED = 'REQUESTED',
  // 상담 요청 있음
  CONSULTING_REQUESTED = 'CONSULTING_REQUESTED',
}

export interface ProductFilterListItemModel {
  id: number;
  name: string;
  dueDate?: Date;
  filterList: { key: number, value: string }[];
  suggestionState: ProductSuggestionState;
}

const useProductFilterList = () => {
  return useQuery<ProductFilterListItemModel[]>(['product-filter-list'], async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return [
      {
        id: 1,
        name: '신사 영끌 신혼집 1',
        dueDate: subDays(new Date(), 1),
        filterList: ['경기도 고양시 마두동', '오피스텔 · 아파트', '싱글라이프', '1억 4천 · 월 90-120'],
        suggestionState: ProductSuggestionState.NONE,
      },
      {
        id: 2,
        name: '신사 영끌 신혼집 2',
        dueDate: addDays(new Date(), 3),
        filterList: ['경기도 고양시 마두동', '오피스텔 · 아파트', '싱글라이프', '1억 4천 · 월 90-120'],
        suggestionState: ProductSuggestionState.REQUESTED,
      },
      {
        id: 3,
        name: '신사 영끌 신혼집 3',
        dueDate: addDays(new Date(), 10),
        filterList: ['경기도 고양시 마두동', '오피스텔 · 아파트', '싱글라이프', '1억 4천 · 월 90-120'],
        suggestionState: ProductSuggestionState.CONSULTING_REQUESTED,
      },
      {
        id: 4,
        name: '신사 영끌 신혼집 4',
        dueDate: addDays(new Date(), 10),
        filterList: ['경기도 고양시 마두동', '오피스텔 · 아파트', '싱글라이프', '1억 4천 · 월 90-120'],
        suggestionState: ProductSuggestionState.NONE,
      },
    ].map((item) => {
      return {
        ...item,
        filterList: item.filterList.map((filterItem, index) => {
          return {
            key: index,
            value: filterItem,
          };
        })
      }
    });
  });
}

export default useProductFilterList;
