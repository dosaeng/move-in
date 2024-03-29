import { HttpResponse, defineMock } from '@/common/utils/defineMock';
import { httpClient } from '@/common/utils/httpClient';
import { QueryOptions, useQuery } from '@tanstack/react-query';

export interface TermsAgreementStateModel {
  isAgreed: boolean;
}

interface TermsAgreementStateDTO {
  is_agreed: boolean;
}

// TODO. API 연결하기
export const getTermsAgreementState = (termsId: number | string) =>
  `/terms/${termsId}/agreement-state`;

const useTermsAgreementState = (
  termsId: number,
  options?: Omit<QueryOptions<TermsAgreementStateModel>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<TermsAgreementStateModel>({
    ...options,
    queryKey: [getTermsAgreementState(termsId)],
    queryFn: async () => {
      const response = await httpClient.get<TermsAgreementStateDTO>(
        getTermsAgreementState(termsId)
      );

      return {
        isAgreed: response.is_agreed,
      };
    },
  });
};

export default useTermsAgreementState;

defineMock((mock) => {
  return [
    mock.get(getTermsAgreementState(':id'), () => {
      return HttpResponse.json({
        is_agreed: true,
      });
    }),
  ];
});
