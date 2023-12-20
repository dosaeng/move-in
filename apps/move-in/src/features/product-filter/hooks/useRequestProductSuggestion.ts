import { defineMock } from "@/common/utils/defineMock";
import { httpClient } from "@/common/utils/httpClient";
import { UseMutationOptions, useMutation, useQueryClient } from "react-query";
import { getProductFilterDetail } from "./useProductFilterDetail";
import { getProductFilterList } from "./useProductFilterList";

const requestProductSuggestionEndpoint = (filterId: string | number) => `/app-user-api/filter-card/${filterId}/open`;

const useRequestProductSuggestion = (options?: Omit<UseMutationOptions<void, unknown, number, unknown>, "mutationFn">) => {
  const queryClient = useQueryClient();

  return useMutation(async (filterId: string | number) => {
    await httpClient.patch(requestProductSuggestionEndpoint(filterId));

    queryClient.refetchQueries([getProductFilterList]);
    queryClient.refetchQueries([getProductFilterDetail(filterId)]);
  }, options);
}
export default useRequestProductSuggestion;


defineMock((mock) => {
  mock.patch(new RegExp(requestProductSuggestionEndpoint('[0-9]+')), async (_, request) => {
    console.debug("Mocked product suggestion request", request);

    await new Promise((resolve) => setTimeout(resolve, 300));

    return new Response(JSON.stringify({}), {
      status: 200,
    })
  })
})
