import { addDays } from 'date-fns';
import { useQuery } from 'react-query';
import { ProductFilterState } from './useProductFilterList';

export interface ProductFilterDetailModel {
  id: number;
  name: string;
  dueDate?: Date;
  filterList: { key: number, value: string }[];
  state: ProductFilterState;
  suggestionCount?: number;
  hasNewSuggestion?: boolean;
}

const useProductFilterDetail = (id: string | number) => {
  return useQuery<ProductFilterDetailModel>(['product-filter-detail'], async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      id: parseInt(id.toString()),
      name: `신사 영끌 신혼집 ${id}`,
      dueDate: addDays(new Date(), 10),
      filterList: ['경기도 고양시 마두동', '오피스텔 · 아파트', '싱글라이프', '1억 4천 · 월 90-120'].map((item, index) => {
        return {
          key: index,
          value: item,
        };
      }),
      state: ProductFilterState.PUBLISHED,
      suggestionCount: 1,
      hasNewSuggestion: true,
    };
  });
};

export default useProductFilterDetail;
