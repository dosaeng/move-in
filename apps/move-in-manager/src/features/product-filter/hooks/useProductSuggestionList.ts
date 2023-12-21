import { defineMock } from "@/common/utils/defineMock";
import { httpClient } from "@/common/utils/httpClient";
import { useQuery } from "react-query";

interface ProductSuggestionListItemDTO {
  id: number;
  item_id: number;
  name: string;
  address: string;
  dedicated_area: number;
  supply_area: number;
  room_count: number;
  toilet_count: number;
  floor: number;
  deposit: number;
  monthly_rent: number;
  minimum_move_in_date: string;
}

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

const getProductSuggestionList = (filterId: string | number) => `/agent-api/filter-card/${filterId}/recommendation`;

// 해당 필터에 대해 내가 제안한 상품 리스트를 가져온다.
const useProductSuggestionList = (filterId: string | number) => {
  return useQuery<ProductSuggestionListItemModel[]>(getProductSuggestionList(filterId), async () => {
    const data = await httpClient.get<ProductSuggestionListItemDTO[]>(getProductSuggestionList(filterId))

    return data.map((item) => {
      return {
        id: item.id,
        productId: item.item_id,
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
      }
    });
  });
}


export default useProductSuggestionList;

defineMock((mock) => {
  mock.get(new RegExp(`^${getProductSuggestionList('[0-9]+')}$`), async (_, request) => {
    console.debug('Mocked product filter suggestion list request', request);

    await new Promise((resolve) => setTimeout(resolve, 300));

    return new Response(JSON.stringify([
      {
        id: 1,
        item_id: 1,
        name: '신사 영끌 신혼집 1',
        address: '경기도 고양시 마두동',
        dedicated_area: 84,
        supply_area: 84,
        room_count: 3,
        toilet_count: 1,
        floor: 2,
        deposit: 10000000,
        monthly_rent: 1000000,
        minimum_move_in_date: '2023-11-12',
      },
      {
        id: 2,
        item_id: 2,
        name: '신사 영끌 신혼집 2',
        address: '경기도 고양시 마두동',
        dedicated_area: 84,
        supply_area: 84,
        room_count: 3,
        toilet_count: 1,
        floor: 2,
        deposit: 10000000,
        monthly_rent: 3000000,
        minimum_move_in_date: '2023-11-12',
      },
      {
        id: 3,
        item_id: 3,
        name: '신사 영끌 신혼집 3',
        address: '경기도 고양시 마두동',
        dedicated_area: 84,
        supply_area: 84,
        room_count: 3,
        toilet_count: 1,
        floor: 2,
        deposit: 5000000,
        monthly_rent: 3000000,
        minimum_move_in_date: '2023-11-12',
      },
      {
        id: 4,
        item_id: 4,
        name: '신사 영끌 신혼집 4',
        address: '경기도 고양시 마두동',
        dedicated_area: 84,
        supply_area: 84,
        room_count: 3,
        toilet_count: 1,
        floor: 2,
        deposit: 10000000,
        monthly_rent: 1000000,
        minimum_move_in_date: '2023-11-12',
      },
    ] as ProductSuggestionListItemDTO[]), { status: 200 })
  });
});
