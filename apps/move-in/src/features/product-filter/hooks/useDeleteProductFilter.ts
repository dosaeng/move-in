import { defineMock } from "@/common/utils/defineMock";
import { UseMutationOptions, useMutation, useQueryClient } from "react-query";
import { getProductFilterList } from "./useProductFilterList";

// TODO. API 주소 업데이트 하기
const deleteProductFilterEndpoint = '/app-user-api/filter-card';

const useDeleteProductFilter = (options?: Omit<UseMutationOptions<void, unknown, string | number, unknown>, "mutationFn">) => {
  const queryClient = useQueryClient();

  return useMutation(async (filterId: string | number) => {
    const response = await fetch(
      `${deleteProductFilterEndpoint}?filterId=${filterId}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error("Failed to request product filter delete");
    }

    queryClient.refetchQueries([getProductFilterList]);
  }, options);
}

export default useDeleteProductFilter;


defineMock((mock) => {
  mock.delete((url) => url.includes(deleteProductFilterEndpoint), async (_, request) => {
    console.debug("Mocked product filter delete request", request);

    await new Promise((resolve) => setTimeout(resolve, 300));

    return new Response(JSON.stringify({}), {
      status: 200,
    })
  })
})
