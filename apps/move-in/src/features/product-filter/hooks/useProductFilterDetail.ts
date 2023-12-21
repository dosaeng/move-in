import { defineMock } from '@/common/utils/defineMock';
import { httpClient } from '@/common/utils/httpClient';
import { koreanCurrencyFormat } from '@move-in/core';
import { addDays, format, isAfter, subDays } from 'date-fns';
import { useQuery } from 'react-query';
import { ProductFilterState } from './useProductFilterList';


interface ProductFilterDetailDTO {
  id: number;
  name: string;
  family_type: string;
  pet_presence: boolean;
  minimum_size: string;
  minimum_room_count: number;
  minimum_move_in_date: string;
  maximum_move_in_date: string;
  maximum_deposit: number;
  maximum_monthly_cost: number;
  minimum_monthly_cost: number;
  cost_preference_type: string;
  preferred_region: string;
  preferred_village: string;
  favorite_place1?: string[];
  item_house_type?: string[];
  item_house_condition?: string[];
  item_wish_list?: string[];
  // 제안 상태
  status?: 'DEFAULT-CREATED' | 'OPEN' | 'CLOSE',
  // 제안 만료 날짜
  recommendation_due_date?: string;
  to_bus_stop_minutes?: string;
  to_train_station_minutes?: string;
  to_terminal_minutes?: string;
  parking?: string;
  living_options?: string[];
  community_life?: string[];
  living_infra?: string[];
  education_life?: string[];
  delivery_life?: string[];
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
    const data = await httpClient.get<ProductFilterDetailDTO>(requestPath)

    const suggestionDueDate = data.recommendation_due_date != null ? new Date(data.recommendation_due_date) : undefined;
    let state;

    if (suggestionDueDate != null) {
      const isLive = isAfter(suggestionDueDate, new Date()) && data.status === 'OPEN';
      state = isLive ? ProductFilterState.REQUESTED : ProductFilterState.EXPIRED;
    } else {
      state = ProductFilterState.PUBLISHED;
    }

    return {
      id: data.id,
      name: data.name,
      filterList: [
        data.family_type,
        data.item_house_type,
        data.item_house_condition,
        data.minimum_size,
        `방 ${data.minimum_room_count}개 이상 필요해요`,
        `${format(new Date(data.minimum_move_in_date), 'yy년 MM월 dd일')} 이후 ${format(new Date(data.maximum_move_in_date), 'yy년 MM월 dd일')}까지`,
        `${koreanCurrencyFormat(data.maximum_deposit)} · 월 ${data.maximum_monthly_cost / 10000}-${data.minimum_monthly_cost / 10000}`,
        data.cost_preference_type,
        data.preferred_region,
        data.preferred_village,
        data.favorite_place1,
        data.item_wish_list
      ].flat().filter((item) => (item ?? '').length > 0).map((filterItem, index) => {
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
  mock.get(new RegExp(`^${getProductFilterDetail('[0-9]+')}$`), async (path, request) => {
    console.debug("Mocked get filter request", request);

    const id = parseInt(path.split('/').pop() ?? '1');

    await new Promise((resolve) => setTimeout(resolve, 300));

    let baseData: ProductFilterDetailDTO = {
      id: id,
      name: `신사 영끌 신혼집 ${id}`,
      family_type: '싱글라이프',
      pet_presence: true,
      minimum_size: '40평 이상 (132.2㎡)',
      minimum_room_count: 3,
      minimum_move_in_date: addDays(new Date(), 3).toISOString(),
      maximum_move_in_date: addDays(new Date(), 12).toISOString(),
      maximum_deposit: 100000000,
      maximum_monthly_cost: 1000000,
      minimum_monthly_cost: 900000,
      cost_preference_type: '낮은 보증, 높은 월 고정 비용이 좋아요',
      preferred_region: '서울 / 경기 / 인천',
      preferred_village: '서울특별시 강남구 역삼동',
      favorite_place1: ['서울대학교'],
      item_house_type: ['오피스텔'],
      item_house_condition: ['신축 첫 입주'],
      item_wish_list: ['베란다가 있으면 좋겠어요'],
      recommendation_due_date: addDays(new Date(), 7).toISOString(),
      to_bus_stop_minutes: '도보 5분',
      to_train_station_minutes: '도보 10분',
      to_terminal_minutes: '15분 이내',
      parking: '필요 없음',
      living_options: ['냉장고', '가스레인지'],
      community_life: ['공동 현관 보안', '경비원 및 시설 관리자'],
      living_infra: ['동네 대형마트', '5분 내 편의점'],
      education_life: ['유아 놀이방', '학원가'],
      delivery_life: ['쿠팡 / SSG 등 당일 배송 서비스 가능']
    };

    if (id === 1) {
      baseData = {
        ...baseData,
        status: 'CLOSE',
        // 제안 만료 날짜
        recommendation_due_date: subDays(new Date(), 3).toISOString(),
      }
    } else if (id === 2) {
      baseData = {
        ...baseData,
        status: 'OPEN',
        // 제안 만료 날짜
        recommendation_due_date: addDays(new Date(), 3).toISOString(),
      }
    }

    return new Response(JSON.stringify(baseData), {
      status: 200,
    });
  });
});
