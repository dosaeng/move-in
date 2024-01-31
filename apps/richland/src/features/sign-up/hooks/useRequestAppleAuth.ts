import useSignInState from '@/features/sign-in/hooks/useSignInState';
import { UseMutationOptions, useMutation } from 'react-query';

// 애플 로그인 시작
const useRequestAppleAuth = (
  options?: Omit<
    UseMutationOptions<{ idToken: string }, unknown, void, unknown>,
    'mutationFn'
  >
) => {
  const { setAppleToken } = useSignInState();

  return useMutation(async () => {
    // TODO. 애플 로그인 처리 추가

    const response = {
      idToken: 'idToken',
    };

    setAppleToken(response);

    return response;
  }, options);
};

export default useRequestAppleAuth;
