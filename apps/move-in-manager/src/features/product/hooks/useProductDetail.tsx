import { useMemo } from 'react';
import { useProductListDTO } from './useProductList';
import { convertImageUrl } from '@move-in/core';

export interface ProductDetailModel {
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
  // 매물 월 고정비
  monthlyFixedCost: number;
  // 비용 조정 가능 여부
  isCostAdjustable: boolean;
}

const useProductDetail = (productId: string | number) => {
  const { data, ...result } = useProductListDTO();
  const item = data?.find((item) => item.id === Number(productId));

  return {
    data: useMemo(() => {
      if (item === undefined) return undefined;

      return {
        id: item.id,
        thumbnail: convertImageUrl(item.photo_in_base64),
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
        monthlyFixedCost: item.monthly_cost,
        isCostAdjustable: item.cost_adjustability,
      } as ProductDetailModel;
    }, [item]),
    ...result,
  };
};

export default useProductDetail;
