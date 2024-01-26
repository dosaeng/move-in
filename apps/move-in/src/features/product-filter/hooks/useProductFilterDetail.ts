import { defineMock } from '@/common/utils/defineMock';
import { httpClient } from '@/common/utils/httpClient';
import { koreanCurrencyFormat, useCodeList } from '@move-in/core';
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

  familyTypeId?: number;
  petPresenceId?: number;
  productMinimumSizeId?: number;
  minimumRoomCountId?: number;
  minimumMoveInDate?: Date;
  maximumMoveInDate?: Date;
  deposit?: number;
  minimumMonthlyCost?: number;
  maximumMonthlyCost?: number;
  costPreferenceId?: number;
  preferredRegion?: {
    region?: number;
    address?: string;
    place?: string[];
  },
  houseTypeId?: number[];
  houseConditionId?: number[];
  wishListId?: number[];
  trafficOptions?: {
    busStop?: number;
    trainStation?: number;
    terminal?: number;
    parking?: number;
  },
  extraOptions?: {
    livingOption?: number[];
    communityLife?: number[];
    livingInfra?: number[];
    educationLife?: number[];
    deliveryLife?: number[];
  }
}

export const getProductFilterDetail = (id: string | number) => `/app-user-api/filter-card/${id}`;

const useProductFilterDetail = (id: string | number) => {
  const requestPath = getProductFilterDetail(id);
  const { data: codeList } = useCodeList();

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
      familyTypeId: codeList?.familyType.find((item) => item.value == data.family_type)?.key,
      petPresenceId: data.pet_presence ? 1 : 2,
      productMinimumSizeId: codeList?.productMinimumSize.find((item) => item.value == data.minimum_size)?.key,
      minimumRoomCountId: data.minimum_room_count,
      minimumMoveInDate: new Date(data.minimum_move_in_date),
      maximumMoveInDate: new Date(data.maximum_move_in_date),
      deposit: data.maximum_deposit,
      minimumMonthlyCost: data.minimum_monthly_cost,
      maximumMonthlyCost: data.maximum_monthly_cost,
      costPreferenceId: codeList?.costPreference.find((item) => item.value == data.cost_preference_type)?.key,
      preferredRegion: {
        region: codeList?.preferredRegion.find((item) => item.value == data.preferred_region)?.key,
        address: data.preferred_village,
        place: data.favorite_place1,
      },
      houseTypeId: data.item_house_type?.map((item) => codeList?.itemHouseType.find((houseType) => houseType.value == item)?.key).filter((item) => item != null) as number[],
      houseConditionId: data.item_house_condition?.map((item) => codeList?.itemHouseCondition.find((houseCondition) => houseCondition.value == item)?.key).filter((item) => item != null) as number[],
      wishListId: data.item_wish_list?.map((item) => codeList?.itemWithList.find((wishList) => wishList.value == item)?.key).filter((item) => item != null) as number[],
      trafficOptions: {
        busStop: codeList?.trafficLife.busStop.find((item) => item.value == data.to_bus_stop_minutes)?.key,
        trainStation: codeList?.trafficLife.trainStation.find((item) => item.value == data.to_train_station_minutes)?.key,
        terminal: codeList?.trafficLife.terminal.find((item) => item.value == data.to_terminal_minutes)?.key,
        parking: codeList?.trafficLife.parking.find((item) => item.value == data.parking)?.key,
      },
      extraOptions: {
        livingOption: codeList?.extraOptions.livingOption.filter((item) => data.living_options?.includes(item.value))?.map((item) => item.key),
        communityLife: codeList?.extraOptions.communityLife.filter((item) => data.community_life?.includes(item.value))?.map((item) => item.key),
        livingInfra: codeList?.extraOptions.livingInfra.filter((item) => data.living_infra?.includes(item.value))?.map((item) => item.key),
        educationLife: codeList?.extraOptions.educationLife.filter((item) => data.education_life?.includes(item.value))?.map((item) => item.key),
        deliveryLife: codeList?.extraOptions.deliveryLife.filter((item) => data.delivery_life?.includes(item.value))?.map((item) => item.key),
      }
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
      name: `강남 가성비 신혼집`,
      family_type: '신혼 부부',
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
