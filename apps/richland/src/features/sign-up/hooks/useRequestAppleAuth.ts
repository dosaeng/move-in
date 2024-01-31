import { UseMutationOptions, useMutation } from 'react-query';

// 애플 로그인 시작
const useRequestAppleAuth = (
  options?: Omit<
    UseMutationOptions<{ idToken: string }, unknown, void, unknown>,
    'mutationFn'
  >
) => {
  return useMutation(async () => {
    // TODO. 애플 로그인 처리 추가

    return {
      idToken: 'idToken',
    };
  }, options);
};

export default useRequestAppleAuth;
