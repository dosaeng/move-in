import useSignInState from '@/features/sign-in/hooks/useSignInState';
import { SignInWithApple } from '@capacitor-community/apple-sign-in';
import { UseMutationOptions, useMutation } from 'react-query';

export interface AppleLoginTokenData {
  idToken: string;
}

// 애플 로그인 시작
const useRequestAppleAuth = (
  options?: Omit<
    UseMutationOptions<AppleLoginTokenData, unknown, void, unknown>,
    'mutationFn'
  >
) => {
  const { setAppleToken } = useSignInState();

  return useMutation(async () => {
    // TODO. 애플 로그인 정보 추가하기
    const result = await SignInWithApple.authorize({
      clientId: 'com.kreit.richland',
      redirectURI: 'localhost:5173',
      scopes: 'email name',
    });

    const response = {
      idToken: result.response.identityToken,
    };

    setAppleToken(response);

    return response;
  }, options);
};

export default useRequestAppleAuth;
