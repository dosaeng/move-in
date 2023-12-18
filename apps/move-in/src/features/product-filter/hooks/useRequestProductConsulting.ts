import { defineMock } from "@/common/utils/defineMock";
import { UseMutationOptions, useMutation } from "react-query";

// TODO. API 주소 업데이트 하기
const requestProductConsultingEndpoint = '/app-user-api/filter-card/consulting';

const useRequestProductConsulting = (options?: Omit<UseMutationOptions<void, unknown, number, unknown>, "mutationFn">) => {
  return useMutation(async (filterId: number) => {
    const response = await fetch(requestProductConsultingEndpoint, {
      method: 'POST',
      body: JSON.stringify({ filterId })
    })

    if (!response.ok) {
      throw new Error("Failed to request product consulting");
    }
  }, options);
}

export default useRequestProductConsulting;


defineMock((mock) => {
  mock.post(requestProductConsultingEndpoint, async (_, request) => {
    console.debug("Mocked product consulting request", request);

    await new Promise((resolve) => setTimeout(resolve, 300));

    return new Response(JSON.stringify({}), {
      status: 200,
    })
  })
})
