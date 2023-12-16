import { addDays } from 'date-fns';
import { useQuery } from 'react-query';

export interface ProductListItemModel {
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
}

const useProductList = () => {
  return useQuery<ProductListItemModel[]>('productList', async () => {
    return [
      {
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
        minimumMoveInDate: new Date(),
      },
      {
        id: 2,
        thumbnail: 'https://picsum.photos/200/300',
        name: '힐스테이트 레이크 마운틴 아파트 2',
        address: '경기 동탄시',
        dedicatedArea: 10,
        supplyArea: 20,
        roomCount: 3,
        bathroomCount: 1,
        floor: 12,
        deposit: 55800000,
        monthlyRent: 1200000,
        minimumMoveInDate: addDays(new Date(), 2),
      },
      {
        id: 3,
        thumbnail: 'https://picsum.photos/200/300',
        name: '힐스테이트 레이크 마운틴 아파트 3',
        address: '경기 동탄시',
        dedicatedArea: 10,
        supplyArea: 20,
        roomCount: 3,
        bathroomCount: 1,
        floor: 12,
        deposit: 55800000,
        monthlyRent: 1200000,
        minimumMoveInDate: addDays(new Date(), 5),
      },
      {
        id: 4,
        thumbnail: 'https://picsum.photos/200/300',
        name: '힐스테이트 레이크 마운틴 아파트 4',
        address: '경기 동탄시',
        dedicatedArea: 50,
        supplyArea: 80,
        roomCount: 5,
        bathroomCount: 4,
        floor: 30,
        deposit: 105800000,
        monthlyRent: 3200000,
        minimumMoveInDate: addDays(new Date(), 10),
      },
    ];
  });
};

export default useProductList;
