import { useQuery } from 'react-query';

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
    approvalDate: string;
    // 매물 등록일
    registeredDate: string;
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
    minimumMoveInDate: string;
    // 입주 가능 최대 일자
    maximumMoveInDate: string;
  };
  productSuggestion: {
    // 가족 조건
    familyPreference: {
      score: number;
      selected: string[];
      comment: string;
    };
    // 입주 조건
    moveInPreference: {
      score: number;
      selected: string[];
      comment: string;
    };
    // 주거 비용 예산
    costPreference: {
      score: number;
      selected: string[];
      comment: string;
    };
    // 원하는 집의 조건
    productPreference: {
      score: number;
      selected: string[];
      comment: string;
    };
    // 라이프 스타일
    lifestylePreference: {
      score: number;
      selected: string[];
      comment: string;
    };
  };
  agent: {
    name: string;
    type: string;
    profileImage: string;
    reviewScore: number;
    reviewCount: number;
  };
}

const useProductSuggestionDetail = (id: string | number) => {
  return useQuery(['product-suggestion', id], () => {
    return {
      id: Number(id),
      filterId: 1,
      product: {
        name: '힐스테이트 레이크 마운틴',
        address: '서울시 강동구 암사동493-14, 205동',
        type: '오피스텔',
        images: [
          'https://placehold.co/300x300?text=1',
          'https://placehold.co/300x300?text=2',
          'https://placehold.co/300x300?text=3',
          'https://placehold.co/300x300?text=4',
          'https://placehold.co/300x300?text=5',
        ],
        // 전용 면적
        dedicatedArea: 84.9,
        // 공급 면적
        supplyArea: 84.9,
        // 방 개수
        roomCount: 3,
        // 화장실 개수
        bathroomCount: 2,
        // 층수
        floor: 5,
        // 매물 건물 총 층수
        totalFloor: 20,
        // 매물 방향
        direction: '남향',
        // 매물 사용 승인일
        approvalDate: '2021-01-01',
        // 매물 등록일
        registeredDate: '2021-01-01',
        // 매물 보증금
        deposit: 10000,
        // 매물 월세
        monthlyRent: 100,
        // 매물 관리비
        maintenanceFee: 100,
        // 매물 월 고정비
        monthlyFixedCost: 100,
        // 비용 조정 가능 여부
        isCostAdjustable: true,
        // 입주 가능 최소 일자
        minimumMoveInDate: '2021-01-01',
        // 입주 가능 최대 일자
        maximumMoveInDate: '2021-01-01',
      },
      productSuggestion: {
        // 가족 조건
        familyPreference: {
          score: 1,
          selected: ['싱글 라이프', '반려동물과 함께 살 거에요', '25평 이상 (82.6㎡)', '방 2개 이상 필요해요'],
          comment: `저희는 파트너(병원)의 더 나은 성과를 위해 치열하게 논의하며 많은 대화를 주고받는데요. 가끔 성장기준 그리고 성장 솔루션과 관련된 질문에서는 명쾌하게 답하지 못하는 우리의 모습을 발견하며, 더 근본적인 원인을 고민하게 되었습니다. 
          "논현역에 있는 ㅁㅁ성형외과 이번 달에 신규 상담 신청 수가 300건, 평가 수는 100건이네요! ... 잘한 것 맞죠?"
          저희는 파트너(병원)의 더 나은 성과를 위해.`,
        },
        // 입주 조건
        moveInPreference: {
          score: 4.5,
          selected: ['2023년 2월 14일 이후', '2023년 12월 14일까지'],
          comment: `저희는 파트너(병원)의 더 나은 성과를 위해 치열하게 논의하며 많은 대화를 주고받는데요. 가끔 성장기준 그리고 성장 솔루션과 관련된 질문에서는 명쾌하게 답하지 못하는 우리의 모습을 발견하며, 더 근본적인 원인을 고민하게 되었습니다. 
          "논현역에 있는 ㅁㅁ성형외과 이번 달에 신규 상담 신청 수가 300건, 평가 수는 100건이네요! ... 잘한 것 맞죠?"
          저희는 파트너(병원)의 더 나은 성과를 위해.`,
        },
        // 주거 비용 예산
        costPreference: {
          score: 5,
          selected: ['보증 1억 4000만 원 이하', '월 고정 100 - 120만 원', '높은 보증, 낮은 월 고정 비용이 좋아요'],
          comment: `저희는 파트너(병원)의 더 나은 성과를 위해 치열하게 논의하며 많은 대화를 주고받는데요. 가끔 성장기준 그리고 성장 솔루션과 관련된 질문에서는 명쾌하게 답하지 못하는 우리의 모습을 발견하며, 더 근본적인 원인을 고민하게 되었습니다. 
          "논현역에 있는 ㅁㅁ성형외과 이번 달에 신규 상담 신청 수가 300건, 평가 수는 100건이네요! ... 잘한 것 맞죠?"
          저희는 파트너(병원)의 더 나은 성과를 위해.`,
        },
        // 원하는 집의 조건
        productPreference: {
          score: 3,
          selected: [
            '경기도 신봉동',
            '자주 가는 곳 3곳',
            '오피스텔 · 아파트',
            '신축 첫 입주  ·  신축 3년 이내 · 리모델링 첫 입주 · 인테리어 공사',
            '기타 7건',
          ],
          comment: `저희는 파트너(병원)의 더 나은 성과를 위해 치열하게 논의하며 많은 대화를 주고받는데요. 가끔 성장기준 그리고 성장 솔루션과 관련된 질문에서는 명쾌하게 답하지 못하는 우리의 모습을 발견하며, 더 근본적인 원인을 고민하게 되었습니다. 
          "논현역에 있는 ㅁㅁ성형외과 이번 달에 신규 상담 신청 수가 300건, 평가 수는 100건이네요! ... 잘한 것 맞죠?"
          저희는 파트너(병원)의 더 나은 성과를 위해.`,
        },
        // 라이프 스타일
        lifestylePreference: {
          score: 4.5,
          selected: [
            '버스 정류장까지 도보 10분',
            '지하철역까지 버스 5분',
            '주차 공간 2대 이상',
            '옵션 12건',
            '공동 생활 4건',
            '생활권 4건',
            '학군 4건',
            '배달권 4건',
          ],
          comment: `저희는 파트너(병원)의 더 나은 성과를 위해 치열하게 논의하며 많은 대화를 주고받는데요. 가끔 성장기준 그리고 성장 솔루션과 관련된 질문에서는 명쾌하게 답하지 못하는 우리의 모습을 발견하며, 더 근본적인 원인을 고민하게 되었습니다. 
          "논현역에 있는 ㅁㅁ성형외과 이번 달에 신규 상담 신청 수가 300건, 평가 수는 100건이네요! ... 잘한 것 맞죠?"
          저희는 파트너(병원)의 더 나은 성과를 위해.`,
        },
      },
      agent: {
        name: '김영희',
        type: '베테랑 중개인',
        profileImage: 'https://placehold.co/300x300?text=profile',
        reviewScore: 4.5,
        reviewCount: 100,
      },
    };
  });
};

export default useProductSuggestionDetail;
