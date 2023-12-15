import { addDays } from "date-fns";
import { useQuery } from "react-query";

interface ProductFilterDetail {
  id: number;
  name: string;
  dueDate?: Date;
  familyPreference: string[];
  costPreference: string[],
  lifestylePreference: {
    traffic: string[];
    livingOption: string[];
    communityLife: string[];
    livingInfra: string[];
    educationLife: string[];
    deliveryLife: string[];
  },
  productPreference: {
    position: string[];
    type: string[];
  },
  moveInPreference: string[],
}

const useProductFilterDetail = (filterId: string | number) => {
  return useQuery<ProductFilterDetail>(['product-filter-detail', filterId], async () => {
    return {
      id: 1,
      name: '신사 영끌 신혼집 1',
      dueDate: addDays(new Date(), 3),
      familyPreference: ['싱글 라이프', '반려동물과 함께 살 거에요', '25평 이상 (82.6㎡)', '방 2개 이상 필요해요'],
      costPreference: ['보증 1억 4000만 원 이하', '월 고정 100 - 120만 원', '높은 보증, 낮은 월 고정 비용이 좋아요'],
      lifestylePreference: {
        traffic: ['버스 정류장까지 도보 10분', '지하철역까지 버스 5분', '주차 공간 2대 이상'],
        livingOption: ['냉장고', '전자레인지', '에어컨'],
        communityLife: ['공동 현관 보안', '대형 세대 단지', '무인 택배함'],
        livingInfra: ['편의점', '마트', '병원'],
        educationLife: ['유치원', '초등학교', '중학교'],
        deliveryLife: ['일반 택배 배송 가능', '쿠팡 / SSG 등 당일 배송 가능', '배달의 민족 등 음식 배달 가능'],
      },
      productPreference: {
        position: ['경기도 신봉동 선호', '장소01 (서울대학교 총장실)', '장소02 (더현대 스타벅스 주차장)', '장소03 (강남역)'],
        type: ['오피스텔 · 아파트', '신축 첫 입주', '베란다', '복층', '엘레베이터'],
      },
      moveInPreference: ['2023년 2월 14일 이후', '2023년 12월 14일까지'],
    }
  });
}

export default useProductFilterDetail;
