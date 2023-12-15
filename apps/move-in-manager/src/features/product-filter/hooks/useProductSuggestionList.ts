import { useQuery } from "react-query";

export interface ProductSuggestionListItemModel {
  id: number;
  productId: number;
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
}

// 해당 필터에 대해 내가 제안한 상품 리스트를 가져온다.
const useProductSuggestionList = (filterId: string | number) => {
  return useQuery<ProductSuggestionListItemModel[]>(['product-suggestion-list', filterId], async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return [
      {
        id: 1,
        productId: 1,
        name: '신사 영끌 신혼집 1',
        address: '경기도 고양시 마두동',
        dedicatedArea: 84,
        supplyArea: 84,
        roomCount: 3,
        bathroomCount: 1,
        floor: 2,
        deposit: 10000000,
        monthlyRent: 1000000,
        minimumMoveInDate: new Date(),
      },
      {
        id: 2,
        productId: 2,
        name: '신사 영끌 신혼집 2',
        address: '경기도 고양시 마두동',
        dedicatedArea: 84,
        supplyArea: 84,
        roomCount: 3,
        bathroomCount: 1,
        floor: 2,
        deposit: 10000000,
        monthlyRent: 3000000,
        minimumMoveInDate: new Date(),
      },
      {
        id: 3,
        productId: 3,
        name: '신사 영끌 신혼집 3',
        address: '경기도 고양시 마두동',
        dedicatedArea: 84,
        supplyArea: 84,
        roomCount: 3,
        bathroomCount: 1,
        floor: 2,
        deposit: 5000000,
        monthlyRent: 3000000,
        minimumMoveInDate: new Date(),
      },
      {
        id: 4,
        productId: 4,
        name: '신사 영끌 신혼집 4',
        address: '경기도 고양시 마두동',
        dedicatedArea: 84,
        supplyArea: 84,
        roomCount: 3,
        bathroomCount: 1,
        floor: 2,
        deposit: 10000000,
        monthlyRent: 1000000,
        minimumMoveInDate: new Date(),
      },
    ]
  });
}


export default useProductSuggestionList;
