import { useQuery } from 'react-query';
import { defineMock } from '../../../common/utils/defineMock';
import { httpClient } from '../../../common/utils/httpClient';

export interface ProductListItemDTO {
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
  cost_adjustability: true;
  minimum_move_in_date: string;
  maximum_move_in_date: string;
  created_at: string;
}

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

export const getProductListEndpoint = '/agent-api/item';

export const useProductListDTO = () => {
  const result = useQuery<ProductListItemDTO[]>(
    getProductListEndpoint,
    async () => {
      return await httpClient.get<ProductListItemDTO[]>(getProductListEndpoint);
    }
  );

  return {
    ...result,
    data: result.data instanceof Array ? result.data : undefined,
  };
};

const useProductList = () => {
  const { data, ...result } = useProductListDTO();

  return {
    data: data?.map((item) => {
      return {
        id: item.id,
        thumbnail: item.photo_in_base64,
        name: item.name,
        address: item.address,
        dedicatedArea: item.dedicated_area,
        supplyArea: item.supply_area,
        roomCount: item.room_count,
        bathroomCount: item.toilet_count,
        floor: item.floor,
        deposit: item.deposit,
        monthlyRent: item.monthly_rent,
        minimumMoveInDate: new Date(item.minimum_move_in_date),
      };
    }),
    ...result,
  };
};

export default useProductList;

defineMock((mock) => {
  mock.get(getProductListEndpoint, async (_, request) => {
    console.debug('Mocked product list request', request);

    await new Promise((resolve) => setTimeout(resolve, 300));

    return new Response(
      JSON.stringify([
        {
          id: 1,
          photo_in_base64: 'https://picsum.photos/200/300',
          name: '상품 이름 1',
          region: '지역 1',
          address: '상품 주소 1',
          dedicated_area: 10,
          supply_area: 20,
          room_count: 1,
          toilet_count: 1,
          floor: 1,
          building_floor: 12,
          main_space_direction: '동향',
          approval_date: '2021-01-01',
          registration_date: '2021-01-12',
          deposit: 10000000,
          monthly_rent: 1000000,
          maintenance_cost: 100000,
          monthly_cost: 100000,
          cost_adjustability: true,
          minimum_move_in_date: '2023-01-01',
          maximum_move_in_date: '2023-05-01',
          created_at: '2022-12-01',
        },
        {
          id: 2,
          photo_in_base64: 'https://picsum.photos/200/300',
          name: '힐스테이트 레이크 마운틴 아파트 2',
          region: '지역 2',
          address: '경기 동탄시',
          dedicated_area: 10,
          supply_area: 20,
          room_count: 3,
          toilet_count: 1,
          floor: 12,
          building_floor: 12,
          main_space_direction: '동향',
          approval_date: '2021-01-01',
          registration_date: '2021-01-12',
          deposit: 55800000,
          monthly_rent: 1200000,
          maintenance_cost: 100000,
          monthly_cost: 100000,
          cost_adjustability: false,
          minimum_move_in_date: '2023-01-03',
          maximum_move_in_date: '2023-05-04',
          created_at: '2022-12-01',
        },
        {
          id: 3,
          photo_in_base64: 'https://picsum.photos/200/300',
          name: '힐스테이트 레이크 마운틴 아파트 3',
          region: '지역 3',
          address: '경기 동탄시',
          dedicated_area: 10,
          supply_area: 20,
          room_count: 3,
          toilet_count: 1,
          floor: 12,
          building_floor: 12,
          main_space_direction: '동향',
          approval_date: '2021-01-01',
          registration_date: '2021-01-12',
          deposit: 55800000,
          monthly_rent: 1200000,
          maintenance_cost: 100000,
          monthly_cost: 100000,
          cost_adjustability: true,
          minimum_move_in_date: '2023-01-01',
          maximum_move_in_date: '2023-05-01',
          created_at: '2022-12-01',
        },
        {
          id: 4,
          photo_in_base64: 'https://picsum.photos/200/300',
          name: '힐스테이트 레이크 마운틴 아파트 4',
          region: '지역 4',
          address: '경기 동탄시',
          dedicated_area: 50,
          supply_area: 80,
          room_count: 5,
          toilet_count: 4,
          floor: 30,
          building_floor: 12,
          main_space_direction: '동향',
          approval_date: '2021-01-01',
          registration_date: '2021-01-12',
          deposit: 105800000,
          monthly_rent: 3200000,
          maintenance_cost: 100000,
          monthly_cost: 100000,
          cost_adjustability: true,
          minimum_move_in_date: '2023-01-01',
          maximum_move_in_date: '2023-05-01',
          created_at: '2022-12-01',
        },
      ] as ProductListItemDTO[]),
      {
        status: 200,
      }
    );
  });
});
