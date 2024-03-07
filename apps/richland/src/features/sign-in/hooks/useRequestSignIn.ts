import useAuthState from '@/common/hooks/useAuthState';
import { defineMock } from '@/common/utils/defineMock';
import { httpClient, HttpClientError } from '@/common/utils/httpClient';
import { SignUpType } from '@/features/sign-up/sign-up';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export interface SignInParams {
  type: SignUpType;
  kakao?: {
    accessToken: string;
    idToken: string;
  };
  apple?: {
    idToken: string;
  };
}

interface SignInResponse {
  accessToken: string;
  refreshToken: string;
}

const signInEndpoint = '/auth/sign-in';

// 로그인 요청
const useRequestSignIn = (
  options?: Omit<
    UseMutationOptions<SignInResponse, HttpClientError, SignInParams, unknown>,
    'mutationFn'
  >
) => {
  const { setAuthData } = useAuthState();

  return useMutation({
    ...options,
    mutationFn: async (params) => {
      const response = await httpClient.post<SignInParams, SignInResponse>(
        signInEndpoint,
        {
          body: params,
        }
      );

      setAuthData(response);

      return response;
    },
  });
};

export default useRequestSignIn;

defineMock((mock) => {
  mock.post(signInEndpoint, () => {
    return new Response(
      JSON.stringify({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      }),
      { status: 404 }
    );
  });
});
