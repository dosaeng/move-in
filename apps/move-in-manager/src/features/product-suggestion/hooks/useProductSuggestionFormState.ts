import { ProductSuggestionRatingModel } from "@move-in/design-system";

interface ProductSuggestionFormModel {
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
}

const useProductSuggestionFormState = () => {
  const productSuggestionFormState: ProductSuggestionFormModel = {
    productSuggestion: {
      // 가족 조건
      familyPreference: {
        score: 1,
        selected: ['싱글 라이프', '반려동물과 함께 살 거에요', '25평 이상 (82.6㎡)', '방 2개 이상 필요해요'].map(
          (item, index) => {
            return {
              key: index,
              value: item,
            };
          }
        ),
        comment: `저희는 파트너(병원)의 더 나은 성과를 위해 치열하게 논의하며 많은 대화를 주고받는데요. 가끔 성장기준 그리고 성장 솔루션과 관련된 질문에서는 명쾌하게 답하지 못하는 우리의 모습을 발견하며, 더 근본적인 원인을 고민하게 되었습니다. 
        "논현역에 있는 ㅁㅁ성형외과 이번 달에 신규 상담 신청 수가 300건, 평가 수는 100건이네요! ... 잘한 것 맞죠?"
        저희는 파트너(병원)의 더 나은 성과를 위해.`,
      },
      // 입주 조건
      moveInPreference: {
        score: 4.5,
        selected: ['2023년 2월 14일 이후', '2023년 12월 14일까지'].map((item, index) => {
          return {
            key: index,
            value: item,
          };
        }),
        comment: `저희는 파트너(병원)의 더 나은 성과를 위해 치열하게 논의하며 많은 대화를 주고받는데요. 가끔 성장기준 그리고 성장 솔루션과 관련된 질문에서는 명쾌하게 답하지 못하는 우리의 모습을 발견하며, 더 근본적인 원인을 고민하게 되었습니다. 
        "논현역에 있는 ㅁㅁ성형외과 이번 달에 신규 상담 신청 수가 300건, 평가 수는 100건이네요! ... 잘한 것 맞죠?"
        저희는 파트너(병원)의 더 나은 성과를 위해.`,
      },
      // 주거 비용 예산
      costPreference: {
        score: 5,
        selected: ['보증 1억 4000만 원 이하', '월 고정 100 - 120만 원', '높은 보증, 낮은 월 고정 비용이 좋아요'].map(
          (item, index) => {
            return {
              key: index,
              value: item,
            };
          }
        ),
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
        ].map((item, index) => {
          return {
            key: index,
            value: item,
          };
        }),
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
        ].map((item, index) => {
          return {
            key: index,
            value: item,
          };
        }),
        comment: `저희는 파트너(병원)의 더 나은 성과를 위해 치열하게 논의하며 많은 대화를 주고받는데요. 가끔 성장기준 그리고 성장 솔루션과 관련된 질문에서는 명쾌하게 답하지 못하는 우리의 모습을 발견하며, 더 근본적인 원인을 고민하게 되었습니다. 
        "논현역에 있는 ㅁㅁ성형외과 이번 달에 신규 상담 신청 수가 300건, 평가 수는 100건이네요! ... 잘한 것 맞죠?"
        저희는 파트너(병원)의 더 나은 성과를 위해.`,
      },
    },
  };

  return productSuggestionFormState;
}

export default useProductSuggestionFormState;
