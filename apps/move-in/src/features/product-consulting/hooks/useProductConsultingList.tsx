import { useQuery } from 'react-query';

export enum ProductConsultingState {
  WAITING = 'WAITING',
  DONE = 'DONE',
}

export interface ProductConsultingListItemModel {
  id: number;
  state: ProductConsultingState;
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

const useProductConsultingList = () => {
  return useQuery<ProductConsultingListItemModel[]>('productConsultingList', async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return [
      {
        id: 1,
        state: ProductConsultingState.WAITING,
        productId: 1,
        name: '테스트 상품 1',
        thumbnail: 'https://picsum.photos/200',
        deposit: 590000000,
        monthlyRent: 100000,
        address: '서울시 강남구 테헤란로 427',
        minimumMoveInDate: new Date(),
        consultingRequestDate: new Date(),
        agentId: 1,
        agentName: '홍길동',
        agentRating: 4.5,
      },
      {
        id: 2,
        state: ProductConsultingState.WAITING,
        productId: 2,
        name: '테스트 상품 2',
        thumbnail: 'https://picsum.photos/200',
        deposit: 590000000,
        monthlyRent: 100000,
        address: '서울시 강남구 테헤란로 427',
        minimumMoveInDate: new Date(),
        consultingRequestDate: new Date(),
        agentId: 1,
        agentName: '홍길동',
        agentRating: 4.5,
      },
      {
        id: 3,
        state: ProductConsultingState.DONE,
        productId: 3,
        name: '테스트 상품 3',
        thumbnail: 'https://picsum.photos/200',
        deposit: 590000000,
        monthlyRent: 100000,
        address: '서울시 강남구 테헤란로 427',
        minimumMoveInDate: new Date(),
        consultingRequestDate: new Date(),
        agentId: 2,
        agentName: '홍길동',
        agentRating: 4.5,
      },
    ];
  });
};

export default useProductConsultingList;
