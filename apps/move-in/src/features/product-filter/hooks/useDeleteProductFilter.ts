import { defineMock } from "@/common/utils/defineMock";
import { UseMutationOptions, useMutation, useQueryClient } from "react-query";
import { getProductFilterList } from "./useProductFilterList";
import { httpClient } from "@/common/utils/httpClient";

const deleteProductFilterEndpoint = (filterId: string | number) => `/app-user-api/filter-card/${filterId}`;

const useDeleteProductFilter = (options?: Omit<UseMutationOptions<void, unknown, string | number, unknown>, "mutationFn">) => {
  const queryClient = useQueryClient();

  return useMutation(async (filterId: string | number) => {
    await httpClient.delete(deleteProductFilterEndpoint(filterId));

    queryClient.refetchQueries([getProductFilterList]);
  }, options);
}

export default useDeleteProductFilter;


defineMock((mock) => {
  mock.delete(new RegExp(deleteProductFilterEndpoint('[0-9]+')), async (_, request) => {
    console.debug("Mocked product filter delete request", request);

    await new Promise((resolve) => setTimeout(resolve, 300));

    return new Response(JSON.stringify({}), {
      status: 200,
    })
  })
})
