import { defineMock } from "@/common/utils/defineMock";
import { UseMutationOptions, useMutation, useQueryClient } from "react-query";
import { getProductFilterList } from "./useProductFilterList";
import { getProductFilterDetail } from "./useProductFilterDetail";

// TODO. 요청 본문 DTO 생성하기

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

const useUpdateProductFilter = (options?: Omit<UseMutationOptions<{ id: number }, unknown, ProductFilterUpdateRequestModel, unknown>, "mutationFn">) => {
  const queryClient = useQueryClient();

  return useMutation(async (request: ProductFilterUpdateRequestModel) => {
    const response = await fetch(updateProductFilterEndpoint(request.id), {
      method: 'PUT',
      body: JSON.stringify({ ...request, name: request.defaultName })
    })

    if (!response.ok) {
      throw new Error("Failed to update product filter");
    }

    queryClient.refetchQueries([getProductFilterList]);
    queryClient.refetchQueries([getProductFilterDetail(request.id)]);

    return response.json();
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
