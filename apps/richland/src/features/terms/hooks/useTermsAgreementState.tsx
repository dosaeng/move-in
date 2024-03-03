import { defineMock } from '@/common/utils/defineMock';
import { httpClient } from '@/common/utils/httpClient';
import { QueryOptions, useQuery } from 'react-query';

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
  return useQuery<TermsAgreementStateModel>(
    getTermsAgreementState(termsId),
    async () => {
      const response = await httpClient.get<TermsAgreementStateDTO>(
        getTermsAgreementState(termsId)
      );

      return {
        isAgreed: response.is_agreed,
      };
    },
    options
  );
};

export default useTermsAgreementState;

defineMock((mock) => {
  mock.get(new RegExp(getTermsAgreementState('[0-9]+')), () => {
    return new Response(
      JSON.stringify({
        is_agreed: true,
      }),
      {
        status: 200,
      }
    );
  });
});
