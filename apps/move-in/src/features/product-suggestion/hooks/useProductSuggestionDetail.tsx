import { defineMock } from '@/common/utils/defineMock';
import { httpClient } from '@/common/utils/httpClient';
import { ProductSuggestionRatingModel } from '@move-in/design-system';
import { useQuery } from 'react-query';

interface ProductSuggestionDetailDTO {
  id?: number;
  filter_card_id?: number;
  recommendation_reason?: string;
  item_diagnosis_summary?: string;
  item_notes?: string;
  filter1_score?: string;
  filter1_comment?: string;
  filter1_qualified_issue?: string[];
  filter2_score?: string;
  filter2_comment?: string;
  filter2_qualified_issue?: string[];
  filter3_score?: string;
  filter3_comment?: string;
  filter3_qualified_issue?: string[];
  filter4_score?: string;
  filter4_comment?: string;
  filter4_qualified_issue?: string[];
  filter5_score?: string;
  filter5_comment?: string;
  filter5_qualified_issue?: string[];
  item?: {
    id?: number;
    house_type?: string;
    name?: string;
    region?: string;
    address?: string;
    photo_in_base64?: string;
    dedicated_area?: number;
    supply_area?: number;
    room_count?: number;
    toilet_count?: number;
    floor?: number;
    building_floor?: number;
    main_space_direction?: string;
    approval_date?: string;
    registration_date?: string;
    deposit?: number;
    monthly_rent?: number;
    maintenance_cost?: number;
    monthly_cost?: number;
    cost_adjustability?: boolean;
    minimum_move_in_date?: string;
    maximum_move_in_date?: string;
    created_at?: string;
  };
  agent?: {
    id?: number;
    name?: string;
    title?: string;
    profile_image_in_base64?: string;
    main_trade_region?: string;
    introduction?: string;
    review_score?: number;
    review_count?: number;
  };
}

export interface ProductSuggestionDetailModel {
  id: number;
  filterId: number;
  product: {
    name: string;
    address: string;
    type: string;
    images: string[];
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
    // 매물 건물 총 층수
    totalFloor: number;
    // 매물 방향
    direction: string;
    // 매물 사용 승인일
    approvalDate: Date;
    // 매물 등록일
    registeredDate: Date;
    // 매물 보증금
    deposit: number;
    // 매물 월세
    monthlyRent: number;
    // 매물 관리비
    maintenanceFee: number;
    // 매물 월 고정비
    monthlyFixedCost: number;
    // 비용 조정 가능 여부
    isCostAdjustable: boolean;
    // 입주 가능 최소 일자
    minimumMoveInDate: Date;
    // 입주 가능 최대 일자
    maximumMoveInDate: Date;
  };
  productSuggestion: {
    // 가족 조건
    familyPreference: ProductSuggestionRatingModel;
    // 입주 조건
    moveInPreference: ProductSuggestionRatingModel;
    // 주거 비용 예산
    costPreference: ProductSuggestionRatingModel;
    // 원하는 집의 조건
    productPreference: ProductSuggestionRatingModel;
    // 라이프 스타일
    lifestylePreference: ProductSuggestionRatingModel;
  };
  agent: {
    name: string;
    type: string;
    profileImage: string;
    reviewScore: number;
    reviewCount: number;
  };
}

const getProductSuggestionDetailEndpoint = (
  filterId: string | number,
  suggestionId: string | number
) => `/app-user-api/filter-card/${filterId}/recommendation/${suggestionId}`;

const useProductSuggestionDetail = (
  filterId: string | number,
  suggestionId: string | number
) => {
  return useQuery(
    getProductSuggestionDetailEndpoint(filterId, suggestionId),
    async () => {
      const response = await httpClient.get<ProductSuggestionDetailDTO>(
        getProductSuggestionDetailEndpoint(filterId, suggestionId)
      );

      return {
        id: response.id,
        filterId: response.filter_card_id,
        productSuggestion: {
          familyPreference: {
            score: Number(response.filter1_score),
            selected: response.filter1_qualified_issue?.map((item, index) => {
              return {
                key: index,
                value: item,
              };
            }),
            comment: response.filter1_comment,
          },
          moveInPreference: {
            score: Number(response.filter2_score),
            selected: response.filter2_qualified_issue?.map((item, index) => {
              return {
                key: index,
                value: item,
              };
            }),
            comment: response.filter2_comment,
          },
          costPreference: {
            score: Number(response.filter3_score),
            selected: response.filter3_qualified_issue?.map((item, index) => {
              return {
                key: index,
                value: item,
              };
            }),
            comment: response.filter3_comment,
          },
          productPreference: {
            score: Number(response.filter4_score),
            selected: response.filter4_qualified_issue?.map((item, index) => {
              return {
                key: index,
                value: item,
              };
            }),
            comment: response.filter4_comment,
          },
          lifestylePreference: {
            score: Number(response.filter5_score),
            selected: response.filter5_qualified_issue?.map((item, index) => {
              return {
                key: index,
                value: item,
              };
            }),
            comment: response.filter5_comment,
          },
        },
        product: {
          name: response.item?.name ?? '',
          address: response.item?.address ?? '',
          type: response.item?.house_type ?? '',
          images: [response.item?.photo_in_base64 ?? ''],
          dedicatedArea: response.item?.dedicated_area ?? 0,
          supplyArea: response.item?.supply_area ?? 0,
          roomCount: response.item?.room_count ?? 0,
          bathroomCount: response.item?.toilet_count ?? 0,
          floor: response.item?.floor ?? 0,
          totalFloor: response.item?.building_floor ?? 0,
          direction: response.item?.main_space_direction ?? '',
          approvalDate: new Date(response.item?.approval_date ?? ''),
          registeredDate: new Date(response.item?.registration_date ?? ''),
          deposit: response.item?.deposit ?? 0,
          monthlyRent: response.item?.monthly_rent ?? 0,
          maintenanceFee: response.item?.maintenance_cost ?? 0,
          monthlyFixedCost: response.item?.monthly_cost ?? 0,
          isCostAdjustable: response.item?.cost_adjustability ?? false,
          minimumMoveInDate: new Date(response.item?.created_at ?? ''),
          maximumMoveInDate: new Date(response.item?.created_at ?? ''),
        },
        agent: {
          name: response.agent?.name ?? '',
          type: response.agent?.title ?? '',
          profileImage: response.agent?.profile_image_in_base64 ?? '',
          reviewScore: response.agent?.review_score ?? 0,
          reviewCount: response.agent?.review_count ?? 0,
        },
      } as ProductSuggestionDetailModel;
    }
  );
};

export default useProductSuggestionDetail;

defineMock((mock) => {
  return mock.get(
    new RegExp(getProductSuggestionDetailEndpoint('[0-9]+', '[0-9]+')),
    async (path, request) => {
      console.debug('Mocked consulting detail request', path, request);

      await new Promise((resolve) => setTimeout(resolve, 300));

      return new Response(
        JSON.stringify({
          id: 1,
          filter_card_id: 1,
          recommendation_reason: '이유',
          item_diagnosis_summary: '요약',
          item_notes: '노트',
          filter1_score: '1',
          filter1_qualified_issue: [
            '싱글 라이프',
            '반려동물과 함께 살 거에요',
            '25평 이상 (82.6㎡)',
            '방 2개 이상 필요해요',
          ],
          filter1_comment: `저희는 파트너(병원)의 더 나은 성과를 위해 치열하게 논의하며 많은 대화를 주고받는데요. 가끔 성장기준 그리고 성장 솔루션과 관련된 질문에서는 명쾌하게 답하지 못하는 우리의 모습을 발견하며, 더 근본적인 원인을 고민하게 되었습니다. 
        "논현역에 있는 ㅁㅁ성형외과 이번 달에 신규 상담 신청 수가 300건, 평가 수는 100건이네요! ... 잘한 것 맞죠?"
        저희는 파트너(병원)의 더 나은 성과를 위해.`,
          filter2_score: '4.5',
          filter2_qualified_issue: [
            '2023년 2월 14일 이후',
            '2023년 12월 14일까지',
          ],
          filter2_comment: `저희는 파트너(병원)의 더 나은 성과를 위해 치열하게 논의하며 많은 대화를 주고받는데요. 가끔 성장기준 그리고 성장 솔루션과 관련된 질문에서는 명쾌하게 답하지 못하는 우리의 모습을 발견하며, 더 근본적인 원인을 고민하게 되었습니다. 
  "논현역에 있는 ㅁㅁ성형외과 이번 달에 신규 상담 신청 수가 300건, 평가 수는 100건이네요! ... 잘한 것 맞죠?"
  저희는 파트너(병원)의 더 나은 성과를 위해.`,
          filter3_score: '5',
          filter3_qualified_issue: [
            '보증 1억 4000만 원 이하',
            '월 고정 100 - 120만 원',
            '높은 보증, 낮은 월 고정 비용이 좋아요',
          ],
          filter3_comment: `저희는 파트너(병원)의 더 나은 성과를 위해 치열하게 논의하며 많은 대화를 주고받는데요. 가끔 성장기준 그리고 성장 솔루션과 관련된 질문에서는 명쾌하게 답하지 못하는 우리의 모습을 발견하며, 더 근본적인 원인을 고민하게 되었습니다. 
"논현역에 있는 ㅁㅁ성형외과 이번 달에 신규 상담 신청 수가 300건, 평가 수는 100건이네요! ... 잘한 것 맞죠?"
저희는 파트너(병원)의 더 나은 성과를 위해.`,
          filter4_score: '3',
          filter4_qualified_issue: [
            '경기도 신봉동',
            '자주 가는 곳 3곳',
            '오피스텔 · 아파트',
            '신축 첫 입주  ·  신축 3년 이내 · 리모델링 첫 입주 · 인테리어 공사',
            '기타 7건',
          ],
          filter4_comment: `저희는 파트너(병원)의 더 나은 성과를 위해 치열하게 논의하며 많은 대화를 주고받는데요. 가끔 성장기준 그리고 성장 솔루션과 관련된 질문에서는 명쾌하게 답하지 못하는 우리의 모습을 발견하며, 더 근본적인 원인을 고민하게 되었습니다. 
        "논현역에 있는 ㅁㅁ성형외과 이번 달에 신규 상담 신청 수가 300건, 평가 수는 100건이네요! ... 잘한 것 맞죠?"
        저희는 파트너(병원)의 더 나은 성과를 위해.`,
          filter5_score: '4.5',
          filter5_qualified_issue: [
            '버스 정류장까지 도보 10분',
            '지하철역까지 버스 5분',
            '주차 공간 2대 이상',
            '옵션 12건',
            '공동 생활 4건',
            '생활권 4건',
            '학군 4건',
            '배달권 4건',
          ],
          filter5_comment: `저희는 파트너(병원)의 더 나은 성과를 위해 치열하게 논의하며 많은 대화를 주고받는데요. 가끔 성장기준 그리고 성장 솔루션과 관련된 질문에서는 명쾌하게 답하지 못하는 우리의 모습을 발견하며, 더 근본적인 원인을 고민하게 되었습니다. 
  "논현역에 있는 ㅁㅁ성형외과 이번 달에 신규 상담 신청 수가 300건, 평가 수는 100건이네요! ... 잘한 것 맞죠?"
  저희는 파트너(병원)의 더 나은 성과를 위해.`,
          item: {
            id: 1,
            name: '힐스테이트 레이크 마운틴',
            region: '서울 / 경기',
            address: '서울시 강동구 암사동493-14, 205동',
            house_type: '오피스텔',
            photo_in_base64: 'https://placehold.co/300x300?text=1',
            // 전용 면적
            dedicated_area: 84.9,
            // 공급 면적
            supply_area: 84.9,
            // 방 개수
            room_count: 3,
            // 화장실 개수
            toilet_count: 2,
            // 층수
            floor: 5,
            // 매물 건물 총 층수
            building_floor: 20,
            // 매물 방향
            main_space_direction: '남향',
            // 매물 사용 승인일
            approval_date: '2021-01-01',
            // 매물 등록일
            registration_date: '2021-01-01',
            // 매물 보증금
            deposit: 10000000,
            // 매물 월세
            monthly_rent: 1000000,
            // 매물 관리비
            maintenance_cost: 100,
            // 매물 월 고정비
            monthly_cost: 100,
            // 비용 조정 가능 여부
            cost_adjustability: true,
            // 입주 가능 최소 일자
            minimum_move_in_date: '2021-01-01',
            // 입주 가능 최대 일자
            maximum_move_in_date: '2021-01-01',
            created_at: '2021-01-01T15:00:00',
          },
          agent: {
            id: 1,
            name: '김영희',
            title: '베테랑 중개인',
            profile_image_in_base64:
              'https://placehold.co/300x300?text=profile',
            main_trade_region: '',
            introduction: '',
            review_score: 4.5,
            review_count: 100,
          },
        } as ProductSuggestionDetailDTO),
        { status: 200 }
      );
    }
  );
});
