import { defineMock } from '@/common/utils/defineMock';
import { httpClient } from '@/common/utils/httpClient';
import { useQuery } from 'react-query';

export enum ProductConsultingState {
  WAITING = 'WAITING',
  DONE = 'DONE',
}

// TODO. API에 맞게 모델 업데이트
interface ProductConsultingListItemDTO {
  id: number;
  state: string;
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
  minimumMoveInDate: string;
  // 상담 신청일
  consultingRequestDate: string;
  // 제안자 아이디
  agentId: number;
  // 제안자 이름
  agentName: string;
  // 제안자 평점
  agentRating: number;
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

// TODO. API 주소 업데이트
export const getProductConsultingList = '/product-consulting-list';

const useProductConsultingList = () => {
  return useQuery<ProductConsultingListItemModel[]>(
    [getProductConsultingList],
    async () => {
      const data = await httpClient.get<ProductConsultingListItemDTO[]>(
        getProductConsultingList
      );

      return data.map((item) => {
        return {
          ...item,
          state: item.state as ProductConsultingState,
          minimumMoveInDate: new Date(item.minimumMoveInDate),
          consultingRequestDate: new Date(item.consultingRequestDate),
        };
      });
    }
  );
};

export default useProductConsultingList;

defineMock((mock) => {
  mock.get(getProductConsultingList, async (_, request) => {
    console.debug('Mocked consulting list request', request);

    await new Promise((resolve) => setTimeout(resolve, 300));

    return new Response(
      JSON.stringify([
        {
          id: 1,
          state: 'WAITING',
          filterId: 1,
          suggestionId: 1,
          productId: 1,
          name: '테스트 상품 1',
          thumbnail: 'https://picsum.photos/200',
          deposit: 590000000,
          monthlyRent: 100000,
          address: '서울시 강남구 테헤란로 427',
          minimumMoveInDate: new Date().toISOString(),
          consultingRequestDate: new Date().toISOString(),
          agentId: 1,
          agentName: '홍길동',
          agentRating: 4.5,
        },
        {
          id: 2,
          state: 'WAITING',
          filterId: 1,
          suggestionId: 2,
          productId: 2,
          name: '테스트 상품 2',
          thumbnail: 'https://picsum.photos/200',
          deposit: 590000000,
          monthlyRent: 100000,
          address: '서울시 강남구 테헤란로 427',
          minimumMoveInDate: new Date().toISOString(),
          consultingRequestDate: new Date().toISOString(),
          agentId: 1,
          agentName: '홍길동',
          agentRating: 4.5,
        },
        {
          id: 3,
          state: 'DONE',
          filterId: 1,
          suggestionId: 3,
          productId: 3,
          name: '테스트 상품 3',
          thumbnail: 'https://picsum.photos/200',
          deposit: 590000000,
          monthlyRent: 100000,
          address: '서울시 강남구 테헤란로 427',
          minimumMoveInDate: new Date().toISOString(),
          consultingRequestDate: new Date().toISOString(),
          agentId: 2,
          agentName: '홍길동',
          agentRating: 4.5,
        },
      ] as ProductConsultingListItemDTO[]),
      {
        status: 200,
      }
    );
  });
});
