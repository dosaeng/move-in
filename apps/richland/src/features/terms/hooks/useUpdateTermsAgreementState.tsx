import { httpClient } from '@/common/utils/httpClient';
import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { getTermsAgreementState } from './useTermsAgreementState';
import { defineMock } from '@/common/utils/defineMock';

export interface UpdateTermsAgreementStateModel {
  id: number;
  isAgreed: boolean;
}

interface UpdateTermsAgreementStateDTO {
  is_agreed: boolean;
}

// TODO. API 연결하기
export const updateTermsAgreementState = (termsId: number | string) =>
  `/terms/${termsId}/agreement-state`;

const useUpdateTermsAgreementState = (
  options?: Omit<
    MutationOptions<boolean, unknown, UpdateTermsAgreementStateModel>,
    'queryKey' | 'queryFn'
  >
) => {
  const queryClient = useQueryClient();

  return useMutation<boolean, unknown, UpdateTermsAgreementStateModel>({
    ...options,
    mutationFn: async (data) => {
      await httpClient.patch<UpdateTermsAgreementStateDTO>(
        updateTermsAgreementState(data.id),
        {
          body: {
            is_agreed: data.isAgreed,
          },
        }
      );

      queryClient.invalidateQueries({
        queryKey: [getTermsAgreementState(data.id)],
      });

      return data.isAgreed;
    },
  });
};

export default useUpdateTermsAgreementState;

defineMock((mock) => {
  mock.patch(new RegExp(updateTermsAgreementState('[0-9]+')), () => {
    return new Response('', {
      status: 200,
    });
  });
});
