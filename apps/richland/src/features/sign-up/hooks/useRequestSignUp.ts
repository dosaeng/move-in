import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { SignUpType } from '../sign-up';
import { HttpClientError, httpClient } from '@/common/utils/httpClient';
import { HttpResponse, defineMock } from '@/common/utils/defineMock';

export interface SignUpParams {
  type: SignUpType;
  kakao?: {
    accessToken: string;
    idToken: string;
  };
  apple?: {
    idToken: string;
    termIds: number[];
    identityVerificationReceiptId: string;
  };
}

const signUpEndpoint = '/auth/sign-up';

const useRequestSignUp = (
  options?: Omit<
    UseMutationOptions<void, HttpClientError, SignUpParams, unknown>,
    'mutationFn'
  >
) => {
  return useMutation({
    ...options,
    mutationFn: async (params) => {
      await httpClient.post<SignUpParams>(signUpEndpoint, {
        body: params,
      });
    },
  });
};

export default useRequestSignUp;

defineMock((mock) => {
  return [
    mock.post(signUpEndpoint, () => {
      return HttpResponse.json({});
    }),
  ];
});
