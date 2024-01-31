import { UseMutationOptions, useMutation } from 'react-query';
import { SignUpType } from '../sign-up';
import { HttpClientError, httpClient } from '@/common/utils/httpClient';
import { defineMock } from '@/common/utils/defineMock';

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
  return useMutation(async (params) => {
    await httpClient.post<SignUpParams>(signUpEndpoint, {
      body: params,
    });
  }, options);
};

export default useRequestSignUp;

defineMock((mock) => {
  mock.post(signUpEndpoint, () => {
    return new Response(JSON.stringify({}), { status: 200 });
  });
});
