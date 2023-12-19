import { defineMock } from "@/common/utils/defineMock";
import { UseMutationOptions, useMutation, useQueryClient } from "react-query";
import { getProductFilterList } from "./useProductFilterList";
import { getProductFilterDetail } from "./useProductFilterDetail";

// TODO. API 주소 업데이트 하기
const requestStopProductConsultingEndpoint = '/app-user-api/filter-card/consulting';

const useRequestStopProductConsulting = (options?: Omit<UseMutationOptions<void, unknown, string | number, unknown>, "mutationFn">) => {
  const queryClient = useQueryClient();

  return useMutation(async (filterId: string | number) => {
    const response = await fetch(
      `${requestStopProductConsultingEndpoint}?filterId=${filterId}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error("Failed to request stop product consulting");
    }

    queryClient.refetchQueries([getProductFilterList]);
    queryClient.refetchQueries([getProductFilterDetail(filterId)]);
  }, options);
}

export default useRequestStopProductConsulting;


defineMock((mock) => {
  mock.delete((url) => url.includes(requestStopProductConsultingEndpoint) && url.includes("?filterId="), async (_, request) => {
    console.debug("Mocked product consulting stop request", request);

    await new Promise((resolve) => setTimeout(resolve, 300));

    return new Response(JSON.stringify({}), {
      status: 200,
    })
  })
})
