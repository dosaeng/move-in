import useCodeList from "@/common/hooks/useCodeList";
import { defineMock } from "@/common/utils/defineMock";
import { httpClient } from "@/common/utils/httpClient";
import { format } from "date-fns";
import { UseMutationOptions, useMutation, useQueryClient } from "react-query";
import { getProductFilterDetail } from "./useProductFilterDetail";
import { getProductFilterList } from "./useProductFilterList";

export interface ProductFilterUpdateRequestDTO {
  name?: string;
  family_type?: string;
  pet_presence?: boolean;
  minimum_size?: string;
  minimum_room_count?: number;
  minimum_move_in_date?: string; // YYYY-MM-DD
  maximum_move_in_date?: string; // YYYY-MM-DD
  maximum_deposit?: number;
  maximum_monthly_cost?: number;
  minimum_monthly_cost?: number;
  cost_preference_type?: string;
  preferred_region?: string;
  preferred_village?: string;
  favorite_place1?: string[];
  item_house_type?: string[];
  item_house_condition?: string[];
  item_wish_list?: string[];
}
export interface ProductFilterUpdateRequestModel {
  id: number;
  name?: string;
  defaultName?: string;
  familyTypeId?: number;
  petPresenceId?: number;
  productMinimumSizeId?: number;
  minimumRoomCountId?: number;
  minimumMoveInDate?: Date;
  maximumMoveInDate?: Date;
  deposit?: number;
  minimumMonthlyCost?: number;
  maximumMonthlyCost?: number;
  costPreferenceId?: number;
  preferredRegion?: {
    region?: number;
    address?: string;
    place?: string[];
  },
  houseTypeId?: number[];
  houseConditionId?: number[];
  wishListId?: number[];
  trafficOptions?: {
    busStop?: number;
    trainStation?: number;
    terminal?: number;
    parking?: number;
  },
  extraOptions?: {
    livingOption?: number[];
    communityLife?: number[];
    livingInfra?: number[];
    educationLife?: number[];
    deliveryLife?: number[];
  }
}

const updateProductFilterEndpoint = (id: string | number) => `/app-user-api/filter-card/${id}`

const useUpdateProductFilter = (options?: Omit<UseMutationOptions<void, unknown, ProductFilterUpdateRequestModel, unknown>, "mutationFn">) => {
  const queryClient = useQueryClient();
  const { data: codeTable } = useCodeList();

  return useMutation(async (request: ProductFilterUpdateRequestModel) => {
    await httpClient.put<ProductFilterUpdateRequestDTO>(updateProductFilterEndpoint(request.id), {
      body: {
        name: request.name,
        family_type: codeTable?.familyType.find((item) => item.key == request.familyTypeId)?.value,
        pet_presence: request.petPresenceId == 1,
        minimum_size: codeTable?.productMinimumSize.find((item) => item.key == request.productMinimumSizeId)?.value,
        minimum_room_count: request.minimumRoomCountId,
        minimum_move_in_date: request.minimumMoveInDate != null ? format(request.minimumMoveInDate, 'yyyy-MM-dd') : undefined,
        maximum_move_in_date: request.maximumMoveInDate != null ? format(request.maximumMoveInDate, 'yyyy-MM-dd') : undefined,
        maximum_deposit: request.deposit,
        maximum_monthly_cost: request.maximumMonthlyCost,
        minimum_monthly_cost: request.minimumMonthlyCost,
        cost_preference_type: codeTable?.costPreference.find((item) => item.key == request.costPreferenceId)?.value,
        preferred_region: codeTable?.preferredRegion.find((item) => item.key == request.preferredRegion?.region)?.value,
        preferred_village: request.preferredRegion?.address,
        favorite_place1: request.preferredRegion?.place,
        item_house_type: request.houseTypeId?.map((item) => codeTable?.itemHouseType.find((houseType) => houseType.key == item)?.value).filter((item) => item != null) as string[],
        item_house_condition: request.houseConditionId?.map((item) => codeTable?.itemHouseCondition.find((houseCondition) => houseCondition.key == item)?.value).filter((item) => item != null) as string[],
        item_wish_list: request.wishListId?.map((item) => codeTable?.itemWithList.find((wishList) => wishList.key == item)?.value).filter((item) => item != null) as string[],
      }
    })

    queryClient.refetchQueries([getProductFilterList]);
    queryClient.refetchQueries([getProductFilterDetail(request.id)]);
  }, options);
}

export default useUpdateProductFilter;

defineMock((mock) => {
  mock.put(new RegExp(updateProductFilterEndpoint('[0-9]+')), async (_, request) => {
    console.debug("Mocked update filter request", request);

    await new Promise((resolve) => setTimeout(resolve, 300));

    return new Response(JSON.stringify({}), {
      status: 200,
    })
  })
})
