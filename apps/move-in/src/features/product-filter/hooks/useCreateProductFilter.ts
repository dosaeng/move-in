import { defineMock } from "@/common/utils/defineMock";
import { UseMutationOptions, useMutation, useQueryClient } from "react-query";
import { getProductFilterList } from "./useProductFilterList";

export interface ProductFilterCreateRequestModel {
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

const createProductFilterEndpoint = '/app-user-api/filter-card'

const useCreateProductFilter = (options?: Omit<UseMutationOptions<{ id: number }, unknown, ProductFilterCreateRequestModel, unknown>, "mutationFn">) => {
  const queryClient = useQueryClient();

  return useMutation(async (request: ProductFilterCreateRequestModel) => {
    const response = await fetch(createProductFilterEndpoint, {
      method: 'POST',
      body: JSON.stringify({ ...request, name: request.defaultName })
    })

    if (!response.ok) {
      throw new Error("Failed to create product filter");
    }

    queryClient.refetchQueries([getProductFilterList]);

    return response.json();
  }, options);
}

export default useCreateProductFilter;

defineMock((mock) => {
  mock.post(createProductFilterEndpoint, async (_, request) => {
    console.debug("Mocked create filter request", request);

    await new Promise((resolve) => setTimeout(resolve, 300));

    return new Response(JSON.stringify({
      id: 1
    }), {
      status: 200,
    })
  })
})
