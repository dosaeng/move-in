import { defineMock } from '@/common/utils/defineMock';
import { httpClient } from '@/common/utils/httpClient';
import { convertImageUrl } from '@move-in/core';
import { addDays, subDays } from 'date-fns';
import { useQuery } from 'react-query';

interface ProductSuggestionListItemDTO {

  id: number;
  // 상품 아이디
  item_id: number;
  // 상품 이름
  name: string;
  // 상품 썸네일 주소
  photo_in_base64_string: string;
  // 보증금
  deposit: number;
  // 월세
  monthly_rent: number;
  // 주소
  address: string;
  // 최소 입주 가능일
  minimum_move_in_date: string;
  // 제안일
  suggestion_date: string;
  // 제안자 아이디
  agent_id: number;
  // 제안자 이름
  agent_name: string;
  // 제안자 평점
  agent_rating: number;
}

export interface ProductSuggestionListItemModel {
  id: number;
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
  // 제안일
  suggestionDate: Date;
  // 제안자 아이디
  agentId: number;
  // 제안자 이름
  agentName: string;
  // 제안자 평점
  agentRating: number;
}

const getProductSuggestionListEndpoint = (filterId: string | number) => `/app-user-api/filter-card/${filterId}/recommendation`;

const useProductSuggestionList = (filterId: string | number) => {
  return useQuery<ProductSuggestionListItemModel[]>([getProductSuggestionListEndpoint, filterId], async () => {
    const response = await httpClient.get<ProductSuggestionListItemDTO[]>(getProductSuggestionListEndpoint(filterId));

    return response.map((item) => {
      return {
        id: item.id,
        productId: item.item_id,
        name: item.name,
        thumbnail: convertImageUrl(item.photo_in_base64_string),
        deposit: item.deposit,
        monthlyRent: item.monthly_rent,
        address: item.address,
        minimumMoveInDate: new Date(item.minimum_move_in_date),
        suggestionDate: new Date(item.suggestion_date),
        agentId: item.agent_id,
        agentName: item.agent_name,
        agentRating: item.agent_rating,
      }
    });
  });
};

export default useProductSuggestionList;

defineMock((mock) => {
  mock.get(new RegExp(`^${getProductSuggestionListEndpoint('[0-9]+')}$`), async (_, request) => {
    console.debug('Mocked suggestion list request', request);

    await new Promise((resolve) => setTimeout(resolve, 300));

    return new Response(
      JSON.stringify([
        {
          id: 1,
          item_id: 1,
          name: '힐스테이트 레이크 마운틴 아파트',
          photo_in_base64_string: 'https://img.maisonkorea.com/2019/02/msk_5c61036ec39f2.jpg',
          deposit: 590000000,
          monthly_rent: 100000,
          address: '서울특별시 강남구 역삼동',
          minimum_move_in_date: subDays(new Date(), 1).toISOString(),
          suggestion_date: subDays(new Date(), 1).toISOString(),
          agent_id: 1,
          agent_name: '김영희',
          agent_rating: 4.5,
        },
        {
          id: 2,
          item_id: 2,
          name: '힐스테이트 레이크 마운틴 아파트',
          photo_in_base64_string: 'https://img.maisonkorea.com/2019/02/msk_5c61035eb090a.jpg',
          deposit: 610000000,
          monthly_rent: 100000,
          address: '서울특별시 강남구 역삼동',
          minimum_move_in_date: subDays(new Date(), 1).toISOString(),
          suggestion_date: addDays(new Date(), 1).toISOString(),
          agent_id: 1,
          agent_name: '김영희',
          agent_rating: 4.5,
        },
        {
          id: 3,
          item_id: 3,
          name: '힐스테이트 레이크 마운틴 아파트',
          photo_in_base64_string: 'https://cdn.ggumim.co.kr/cache/star/1000/20180111112345fnszkGJABC.jpg',
          deposit: 500000000,
          monthly_rent: 300000,
          address: '서울특별시 강남구 역삼동',
          minimum_move_in_date: subDays(new Date(), 1).toISOString(),
          suggestion_date: addDays(new Date(), 10).toISOString(),
          agent_id: 1,
          agent_name: '김영희',
          agent_rating: 4.5,
        },
      ] as ProductSuggestionListItemDTO[]),
      {
        status: 200,
      }
    );
  });
});
