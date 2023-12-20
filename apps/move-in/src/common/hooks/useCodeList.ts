import { useQuery } from "react-query";

const useCodeList = () => {
  return useQuery("codeList", async () => {
    return {
      // 누구와 함께 할 집을 구하나요?
      familyType: [
        { key: 1, value: '싱글 라이프' },
        { key: 2, value: '신혼 부부' },
        { key: 3, value: '아기가 있는 집' },
        { key: 4, value: '취학 자녀가 있는 집' },
        { key: 5, value: '부모님과 함께 사는 집' },
        { key: 6, value: '기타' },
      ],
      // 주거 비용 구성
      costPreference: [
        { key: 1, value: '낮은 보증, 높은 월 고정 비용이 좋아요' },
        { key: 2, value: '높은 보증, 낮은 월 고정 비용이 좋아요' },
      ],
      // 희망하시는 집의 상태를 모두 골라주세요.
      itemHouseCondition: [
        { key: 1, value: '신축 첫 입주' },
        { key: 2, value: '신축 3년 이내' },
        { key: 3, value: '리모델링 첫 입주' },
        { key: 4, value: '리모델링 3년 이내' },
        { key: 5, value: '도배・장판 새로 해드려요' },
        { key: 6, value: '인테리어 공사 하고 싶어요' }
      ],
      // 어떤 주거 형태를 선호하시나요?
      itemHouseType: [
        { key: 1, value: '아파트' },
        { key: 2, value: '오피스텔' },
        { key: 3, value: '다세대 빌라' },
        { key: 4, value: '원룸 ・투룸' },
        { key: 5, value: '단독 주택' },
        { key: 6, value: '기타' },
      ],
      // 기타 희망사항을 모두 골라주세요.
      itemWithList: [
        { key: 1, value: '베란다가 있으면 좋겠어요' },
        { key: 2, value: '복층이었으면 좋겠어요' },
        { key: 3, value: '낭만있는 옥탑이 있으면 좋겠어요' },
        { key: 4, value: '전용 마당이 있었으면 좋겠어요' },
        { key: 5, value: '반지하나 1층은 피하고 싶어요' },
        { key: 6, value: '엘레베이터가 있으면 좋겠어요' },
      ],
      // 방은 최소 몇 개는 있어야 하나요?
      minimumRoomCount: [
        { key: 1, value: '방 구분은 따로 없어도 돼요' },
        { key: 2, value: '방 1개 이상 필요해요' },
        { key: 3, value: '방 2개 이상 필요해요' },
        { key: 4, value: '방 3개 이상 필요해요' },
        { key: 5, value: '방 4개 이상 필요해요' },
        { key: 6, value: '방 5개 이상 필요해요' },
      ],
      // 반려동물과 함께 하시나요?
      petPresence: [
        { key: 1, value: '반려동물과 함께 살 거에요' },
        { key: 2, value: '반려동물과 함께 하지 않아요' },
      ],
      // 어느 지역을 선호하시나요?
      preferredRegion: [
        { key: 1, value: '서울 / 경기 / 인천' },
        { key: 2, value: '충청 / 대전 / 세종' },
        { key: 3, value: '경상 / 부산 / 대구' },
        { key: 4, value: '전라 / 광주' },
        { key: 5, value: '강원' },
        { key: 6, value: '제주' },
      ],
      // 집이 얼마나 컸으면 하나요?
      productMinimumSize: [
        { key: 1, value: '5평 이상 (16.5㎡)' },
        { key: 2, value: '10평 이상 (33.1㎡)' },
        { key: 3, value: '15평 이상 (49.6㎡)' },
        { key: 4, value: '20평 이상 (66.1㎡)' },
        { key: 5, value: '25평 이상 (82.6㎡)' },
        { key: 6, value: '30평 이상 (99.2㎡)' },
        { key: 7, value: '35평 이상 (115.7㎡)' },
        { key: 8, value: '40평 이상 (132.2㎡)' },
        { key: 9, value: '45평 이상 (148.8㎡)' },
        { key: 10, value: '50평 이상 (165.3㎡)' },
        { key: 11, value: '75평 이상 (247.9㎡)' },
        { key: 12, value: '100평 이상 (330.6㎡)' },
      ],
      // 교통권이 어땠으면 하시나요?
      trafficLife: {
        // 버스 정류장까지
        busStop: [
          {
            key: 1,
            value: '도보 5분',
          },
          {
            key: 2,
            value: '도보 10분',
          },
          {
            key: 3,
            value: '상관없음',
          },
        ],
        // 지하철역까지
        trainStation: [
          { key: 1, value: '도보 5분' },
          { key: 2, value: '도보 10분' },
          { key: 3, value: '도보 15분' },
          { key: 4, value: '버스 5분' },
          { key: 5, value: '버스 10분' },
          { key: 6, value: '버스 15분' },
        ],
        // 버스 터미널 및 기차역까지 대중교통으로
        terminal: [
          { key: 1, value: '편의점' },
          { key: 2, value: '마트' },
          { key: 3, value: '식당' },
          { key: 4, value: '카페' },
          { key: 5, value: '병원' },
          { key: 6, value: '은행' },
        ],
        // 차량 주차 공간이 필요해요
        parking: [
          { key: 1, value: '1대' },
          { key: 2, value: '2대 이상' },
          { key: 3, value: '필요 없음' },
        ],
      },
      // 내게 중요한 희망 사항을 골라주세요.
      extraOptions: {
        livingOption: [
          { key: 1, value: '냉장고' },
          { key: 2, value: '김치 냉장고' },
          { key: 3, value: '가스레인지' },
          { key: 4, value: '인덕션 / 하이라이트' },
          { key: 5, value: '에어컨' },
          { key: 6, value: '침대' },
          { key: 7, value: '옷장' },
          { key: 8, value: '스타일러' },
          { key: 9, value: '신발장' },
          { key: 10, value: 'TV' },
          { key: 11, value: '식탁 세트' },
          { key: 12, value: '책상' },
          { key: 13, value: '소파' },
        ],
        communityLife: [
          { key: 1, value: '공동 현관 보안' },
          { key: 2, value: '경비원 및 시설 관리자' },
          { key: 3, value: '대형 세대 단지' },
          { key: 4, value: '무인 택배함' },
          { key: 5, value: '분리수거 및 쓰레기 처리 시설' },
          { key: 6, value: '커뮤니티 시설 (헬스장)' },
        ],
        livingInfra: [
          { key: 1, value: '동네 대형마트' },
          { key: 2, value: '5분 내 편의점' },
          { key: 3, value: '백화점' },
          { key: 4, value: '영화관 / 극장' },
          { key: 5, value: '헬스장 등 체육 시설' },
          { key: 6, value: '근린 공원' },
          { key: 7, value: '은행 및 ATM' },
          { key: 8, value: '행정 복지 센터' },
        ],
        educationLife: [
          { key: 1, value: '유아 놀이방' },
          { key: 2, value: '유치원' },
          { key: 3, value: '초등학교' },
          { key: 4, value: '중학교' },
          { key: 5, value: '고등학교' },
          { key: 6, value: '대학교 / 대학원' },
          { key: 7, value: '학원가' },
        ],
        deliveryLife: [
          { key: 1, value: '일반 택배 배송 가능' },
          { key: 2, value: '쿠팡 / SSG 등 당일 배송 서비스 가능' },
          { key: 3, value: '배달의 민족 등 음식 배달 가능' },
        ],
      }
    }
  });
}

export default useCodeList;
