import { defineMock } from "@/common/utils/defineMock";
import { UseMutationOptions, useMutation, useQueryClient } from "react-query";
import { getProductFilterList } from "./useProductFilterList";
import { getProductFilterDetail } from "./useProductFilterDetail";
import { httpClient } from "@/common/utils/httpClient";

const requestStopProductSuggestionEndpoint = (filterId: string | number) => `/app-user-api/filter-card/${filterId}/close`;

const useRequestStopProductSuggestion = (options?: Omit<UseMutationOptions<void, unknown, string | number, unknown>, "mutationFn">) => {
  const queryClient = useQueryClient();

  return useMutation(async (filterId: string | number) => {
    await httpClient.patch(requestStopProductSuggestionEndpoint(filterId));

    queryClient.refetchQueries([getProductFilterList]);
    queryClient.refetchQueries([getProductFilterDetail(filterId)]);
  }, options);
}

export default useRequestStopProductSuggestion;


defineMock((mock) => {
  mock.patch(new RegExp(requestStopProductSuggestionEndpoint('[0-9]+')), async (_, request) => {
    console.debug("Mocked product suggestion stop request", request);

    await new Promise((resolve) => setTimeout(resolve, 300));

    return new Response(JSON.stringify({}), {
      status: 200,
    })
  })
})
