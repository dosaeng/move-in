import { addDays, format, isAfter, subDays } from 'date-fns';
import { useQuery } from 'react-query';
import { ProductFilterState } from './useProductFilterList';
import { defineMock } from '@/common/utils/defineMock';
import { koreanCurrencyFormat } from '@move-in/core';


export interface ProductFilterDetailDTO {
  id: number;
  name: string;
  // 제안 가능 여부
  canSuggestion?: boolean;
  // 제안 만료 날짜
  suggestionDueDate?: string;
  familyType: string;
  petPresence: boolean;
  minimumSize: string;
  minimumRoomCount: number;
  minimumMoveInDate: string;
  maximumMoveInDate: string;
  maximumDeposit: number;
  maximumMonthlyCost: number;
  minimumMonthlyCost: number;
  costPreferenceType: string;
  preferredRegion: string;
  preferredVillage: string;
  favoritePlace1?: string;
  favoritePlace2?: string;
  favoritePlace3?: string;
  itemHouseType?: string;
  itemHouseCondition?: string;
  itemWishList?: string;
}

export interface ProductFilterDetailModel {
  id: number;
  name: string;
  filterList: { key: number, value: string }[];
  state: ProductFilterState;
}

export const getProductFilterDetail = (id: string | number) => `/app-user-api/filter-card/${id}`;

const useProductFilterDetail = (id: string | number) => {
  const requestPath = getProductFilterDetail(id);

  return useQuery<ProductFilterDetailModel>([requestPath], async () => {
    const response = await fetch(requestPath, {
      method: 'GET',
    })

    const data: ProductFilterDetailDTO = await response.json();

    const suggestionDueDate = data.suggestionDueDate != null ? new Date(data.suggestionDueDate) : undefined;
    let state;

    if (suggestionDueDate != null) {
      const isLive = isAfter(suggestionDueDate, new Date()) && data.canSuggestion === true;
      state = isLive ? ProductFilterState.REQUESTED : ProductFilterState.EXPIRED;
    } else {
      state = ProductFilterState.PUBLISHED;
    }

    return {
      id: data.id,
      name: data.name,
      filterList: [
        data.familyType,
        data.itemHouseType,
        data.itemHouseCondition,
        data.minimumSize,
        `방 ${data.minimumRoomCount}개 이상 필요해요`,
        `${format(new Date(data.minimumMoveInDate), 'yy년 MM월 dd일')} 이후 ${format(new Date(data.maximumMoveInDate), 'yy년 MM월 dd일')}까지`,
        `${koreanCurrencyFormat(data.maximumDeposit)} · 월 ${data.maximumMonthlyCost / 10000}-${data.minimumMonthlyCost / 10000}`,
        data.costPreferenceType,
        data.preferredRegion,
        data.preferredVillage,
        data.favoritePlace1,
        data.favoritePlace2,
        data.favoritePlace3,
        data.itemWishList
      ].filter((item) => (item ?? '').length > 0).map((filterItem, index) => {
        return {
          key: index,
          value: filterItem!,
        };
      }),
      state,
    };
  });
};

export default useProductFilterDetail;


defineMock((mock) => {
  mock.get(new RegExp(getProductFilterDetail('[0-9]+')), async (path, request) => {
    console.debug("Mocked get filter request", request);

    const id = parseInt(path.split('/').pop() ?? '1');

    await new Promise((resolve) => setTimeout(resolve, 300));

    let baseData: ProductFilterDetailDTO = {
      id: id,
      name: `신사 영끌 신혼집 ${id}`,
      familyType: '싱글라이프',
      petPresence: true,
      minimumSize: '40평 이상 (132.2㎡)',
      minimumRoomCount: 3,
      minimumMoveInDate: addDays(new Date(), 3).toISOString(),
      maximumMoveInDate: addDays(new Date(), 12).toISOString(),
      maximumDeposit: 100000000,
      maximumMonthlyCost: 1000000,
      minimumMonthlyCost: 900000,
      costPreferenceType: '낮은 보증, 높은 월 고정 비용이 좋아요',
      preferredRegion: '서울 / 경기 / 인천',
      preferredVillage: '서울특별시 강남구 역삼동',
      favoritePlace1: '서울대학교',
      itemHouseType: '오피스텔',
      itemHouseCondition: '신축 첫 입주',
      itemWishList: '베란다가 있으면 좋겠어요',
    };

    if (id === 1) {
      baseData = {
        ...baseData,
        // 제안 가능 여부
        canSuggestion: false,
        // 제안 만료 날짜
        suggestionDueDate: subDays(new Date(), 3).toISOString(),
      }
    } else if (id === 2) {
      baseData = {
        ...baseData,
        // 제안 가능 여부
        canSuggestion: true,
        // 제안 만료 날짜
        suggestionDueDate: addDays(new Date(), 3).toISOString(),
      }
    }

    return new Response(JSON.stringify(baseData), {
      status: 200,
    });
  });
});
