import { defineMock } from '@/common/utils/defineMock';
import { addDays, subDays } from 'date-fns';
import { useQuery } from 'react-query';


interface ProductSuggestionListItemDTO {
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
  minimumMoveInDate: string;
  // 제안일
  suggestionDate: string;
  // 제안자 아이디
  agentId: number;
  // 제안자 이름
  agentName: string;
  // 제안자 평점
  agentRating: number;
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

// TODO. API 주소 업데이트 하기
const getProductSuggestionListEndpoint = '/app-user-api/suggestions';

const useProductSuggestionList = (filterId: string | number) => {
  return useQuery<ProductSuggestionListItemModel[]>([getProductSuggestionListEndpoint, filterId], async () => {
    const response = await fetch(
      `${getProductSuggestionListEndpoint}?filterId=${filterId}`, {
      method: 'GET',
    })

    const data: ProductSuggestionListItemDTO[] = await response.json();

    return data.map((item) => {
      return {
        ...item,
        minimumMoveInDate: new Date(item.minimumMoveInDate),
        suggestionDate: new Date(item.suggestionDate),
      }
    });
  });
};

export default useProductSuggestionList;

defineMock((mock) => {
  mock.get((url) => url.includes(getProductSuggestionListEndpoint) && url.includes("?filterId="), async (_, request) => {
    console.debug('Mocked consulting list request', request);

    await new Promise((resolve) => setTimeout(resolve, 300));

    return new Response(
      JSON.stringify([
        {
          id: 1,
          productId: 1,
          name: '신사 영끌 신혼집 1',
          thumbnail: 'https://placehold.co/300x300',
          deposit: 590000000,
          monthlyRent: 100000,
          address: '경기도 고양시 마두동',
          minimumMoveInDate: subDays(new Date(), 1).toISOString(),
          suggestionDate: subDays(new Date(), 1).toISOString(),
          agentId: 1,
          agentName: '김영끌',
          agentRating: 4.5,
        },
        {
          id: 2,
          productId: 2,
          name: '신사 영끌 신혼집 2',
          thumbnail: 'https://placehold.co/300x300',
          deposit: 1000000,
          monthlyRent: 500000,
          address: '경기도 고양시 마두동',
          minimumMoveInDate: addDays(new Date(), 3).toISOString(),
          suggestionDate: addDays(new Date(), 3).toISOString(),
          agentId: 1,
          agentName: '김영끌',
          agentRating: 4.5,
        },
        {
          id: 3,
          productId: 3,
          name: '신사 영끌 신혼집 3',
          thumbnail: 'https://placehold.co/300x300',
          deposit: 100000,
          monthlyRent: 10000000,
          address: '경기도 고양시 마두동',
          minimumMoveInDate: addDays(new Date(), 10).toISOString(),
          suggestionDate: addDays(new Date(), 10).toISOString(),
          agentId: 1,
          agentName: '김영끌',
          agentRating: 4.5,
        },
      ] as ProductSuggestionListItemDTO[]),
      {
        status: 200,
      }
    );
  });
});
