import { defineMock } from '@/common/utils/defineMock';
import { UseMutationOptions, useMutation } from 'react-query';
import { httpClient } from '@/common/utils/httpClient';
import useAuthState from '@/common/hooks/useAuthState';

export interface SignInRequestDTO {
  login_id?: string;
  password?: string;
}

export interface SignInRequestModel {
  id?: string;
  password?: string;
}

const signInEndpoint = '/login/agent';

const useSignIn = (
  options?: Omit<
    UseMutationOptions<void, unknown, SignInRequestModel, unknown>,
    'mutationFn'
  >
) => {
  const { setSignInState } = useAuthState();

  return useMutation(async (request: SignInRequestModel) => {
    await httpClient.post<SignInRequestDTO, string>(signInEndpoint, {
      body: {
        login_id: request.id,
        password: request.password,
      },
      responseType: 'text',
    });

    setSignInState();
  }, options);
};

export default useSignIn;

defineMock((mock) => {
  mock.post(signInEndpoint, async (_, request) => {
    console.debug('Mocked login request', request);

    await new Promise((resolve) => setTimeout(resolve, 300));

    return new Response('mocked-access-token', {
      status: 200,
    });
  });
});
