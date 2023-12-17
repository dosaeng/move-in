import { useQuery } from 'react-query';

export interface ProductDetailModel {
  id: number;
  // 상품 대표 이미지
  thumbnail: string;
  // 상품 이름
  name: string;
  // 상품 주소
  address: string;
  // 전용 면적
  dedicatedArea: number;
  // 공급 면적
  supplyArea: number;
  // 방 개수
  roomCount: number;
  // 화장실 개수
  bathroomCount: number;
  // 층수
  floor: number;
  // 매물 보증금
  deposit: number;
  // 매물 월세
  monthlyRent: number;
  // 입주 가능 최소 일자
  minimumMoveInDate: Date;
  // 매물 월 고정비
  monthlyFixedCost: number;
  // 비용 조정 가능 여부
  isCostAdjustable: boolean;
}

const useProductDetail = (productId: string | number) => {
  return useQuery<ProductDetailModel>(['productDetail', productId], async () => {
    return {
      id: 1,
      thumbnail: 'https://picsum.photos/200/300',
      name: '상품 이름 1',
      address: '상품 주소 1',
      dedicatedArea: 10,
      supplyArea: 20,
      roomCount: 1,
      bathroomCount: 1,
      floor: 1,
      deposit: 10000000,
      monthlyRent: 1000000,
      monthlyFixedCost: 200000,
      minimumMoveInDate: new Date(),
      isCostAdjustable: true,
    };
  });
};

export default useProductDetail;
