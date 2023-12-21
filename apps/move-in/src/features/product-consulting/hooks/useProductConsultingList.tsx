import { defineMock } from '@/common/utils/defineMock';
import { httpClient } from '@/common/utils/httpClient';
import { useQuery } from 'react-query';

export enum ProductConsultingState {
  WAITING = 'WAITING',
  DONE = 'DONE',
}

interface ProductConsultingListItemDTO {
  id: number;
  status: string;
  recommendation_id: number;
  item: {
    id: number;
    house_type: string;
    name: string;
    region: string;
    address: string;
    photo_in_base64: string;
    dedicated_area: number;
    supply_area: number;
    room_count: number;
    toilet_count: number;
    floor: number;
    building_floor: number;
    main_space_direction: string;
    approval_date: string;
    registration_date: string;
    deposit: number;
    monthly_rent: number;
    maintenance_cost: number;
    monthly_cost: number;
    cost_adjustability: boolean;
    minimum_move_in_date: string;
    maximum_move_in_date: string;
    created_at: string;
  };
  agent: {
    id: number;
    name: string;
    title: string;
    profile_image_in_base64: string;
    main_trade_region: string;
    introduction: string;
    review_score: number;
    review_count: number;
  };
  appointment_date: string;
  filter_card_id: number;
}

export interface ProductConsultingListItemModel {
  id: number;
  state: ProductConsultingState;
  filterId?: number;
  suggestionId?: number;
  // 상품 아이디
  productId: number;
  // 상품 이름
  name: string;
  // 상품 썸네일 주소
  thumbnail: string;
  // 보증금
  deposit: number;
  // 월세
  monthlyRent: number;
  // 주소
  address: string;
  // 최소 입주 가능일
  minimumMoveInDate: Date;
  // 상담 신청일
  consultingRequestDate: Date;
  // 제안자 아이디
  agentId: number;
  // 제안자 이름
  agentName: string;
  // 제안자 평점
  agentRating: number;
}

export const getProductConsultingListEndpoint = '/app-user-api/consultation';

const useProductConsultingList = () => {
  return useQuery<ProductConsultingListItemModel[]>(
    getProductConsultingListEndpoint,
    async () => {
      const data = await httpClient.get<ProductConsultingListItemDTO[]>(
        getProductConsultingListEndpoint
      );

      return data.map((item) => {
        return {
          id: item.id,
          state: item.status as ProductConsultingState,
          filterId: item.filter_card_id,
          suggestionId: item.recommendation_id,
          productId: item.item.id,
          name: item.item.name,
          thumbnail: item.item.photo_in_base64,
          deposit: item.item.deposit,
          monthlyRent: item.item.monthly_rent,
          address: item.item.address,
          minimumMoveInDate: new Date(item.item.minimum_move_in_date),
          consultingRequestDate: new Date(item.appointment_date),
          agentId: item.agent.id,
          agentName: item.agent.name,
          agentRating: item.agent.review_score,
        };
      });
    }
  );
};

export default useProductConsultingList;

defineMock((mock) => {
  mock.get(getProductConsultingListEndpoint, async (_, request) => {
    console.debug('Mocked consulting list request', request);

    await new Promise((resolve) => setTimeout(resolve, 300));

    return new Response(
      JSON.stringify([
        {
          id: 1,
          status: 'WAITING',
          recommendation_id: 1,
          item: {
            id: 1,
            house_type: '아파트',
            name: '신사 영끌 신혼집 1',
            region: '서울시 강남구',
            address: '서울시 강남구 신사동 123-1',
            photo_in_base64: 'https://picsum.photos/200',
            dedicated_area: 84.3,
            supply_area: 84.3,
            room_count: 3,
            toilet_count: 2,
            floor: 3,
            building_floor: 5,
            main_space_direction: '남향',
            approval_date: '2021-01-01',
            registration_date: '2021-01-01',
            deposit: 100000000,
            monthly_rent: 1000000,
            maintenance_cost: 100000,
            monthly_cost: 100000,
            cost_adjustability: true,
            minimum_move_in_date: '2021-01-01',
            maximum_move_in_date: '2021-01-01',
            created_at: '2021-01-01',
          },
          agent: {
            id: 1,
            name: '홍길동',
            title: '부동산 전문가',
            profile_image_in_base64: 'https://picsum.photos/200',
            main_trade_region: '서울시 강남구',
            introduction: '부동산 전문가입니다.',
            review_score: 4.5,
            review_count: 100,
          },
          appointment_date: '2021-01-01',
          filter_card_id: 1,
        },
        {
          id: 2,
          status: 'DONE',
          recommendation_id: 2,
          item: {
            id: 2,
            house_type: '아파트',
            name: '신사 영끌 신혼집 2',
            region: '서울시 강남구',
            address: '서울시 강남구 신사동 123-1',
            photo_in_base64: 'https://picsum.photos/200',
            dedicated_area: 84.3,
            supply_area: 84.3,
            room_count: 3,
            toilet_count: 2,
            floor: 3,
            building_floor: 5,
            main_space_direction: '남향',
            approval_date: '2021-01-01',
            registration_date: '2021-01-01',
            deposit: 100000000,
            monthly_rent: 1000000,
            maintenance_cost: 100000,
            monthly_cost: 100000,
            cost_adjustability: true,
            minimum_move_in_date: '2021-01-01',
            maximum_move_in_date: '2021-01-01',
            created_at: '2021-01-01',
          },
          agent: {
            id: 2,
            name: '홍길동',
            title: '부동산 전문가',
            profile_image_in_base64: 'https://picsum.photos/200',
            main_trade_region: '서울시 강남구',
            introduction: '부동산 전문가입니다.',
            review_score: 4.5,
            review_count: 100,
          },
          appointment_date: '2021-01-01',
          filter_card_id: 2,
        },
      ] as ProductConsultingListItemDTO[]),
      { status: 200 }
    );
  });
});
