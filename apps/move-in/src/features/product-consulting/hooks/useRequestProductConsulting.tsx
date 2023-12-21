import { defineMock } from '@/common/utils/defineMock';
import { httpClient } from '@/common/utils/httpClient';
import { UseMutationOptions, useMutation, useQueryClient } from 'react-query';
import { getProductConsultingListEndpoint } from './useProductConsultingList';

interface ProductConsultingRequestModel {
  filterId: string | number;
  suggestionId: string | number;
}

const requestProductConsultingEndpoint = (
  filterId: string | number,
  suggestionId: string | number
) =>
  `/app-user-api/filter-card/${filterId}/recommendation/${suggestionId}/consultation`;

const useRequestProductConsulting = (
  options?: Omit<
    UseMutationOptions<void, unknown, ProductConsultingRequestModel, unknown>,
    'mutationFn'
  >
) => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ filterId, suggestionId }: ProductConsultingRequestModel) => {
      await httpClient.post(
        requestProductConsultingEndpoint(filterId, suggestionId)
      );

      queryClient.refetchQueries([getProductConsultingListEndpoint]);
    },
    options
  );
};

export default useRequestProductConsulting;

defineMock((mock) => {
  mock.post(
    new RegExp(`^${requestProductConsultingEndpoint('[0-9]+', '[0-9]+')}$`),
    () => {
      return new Response(JSON.stringify({}), { status: 200 });
    }
  );
});
