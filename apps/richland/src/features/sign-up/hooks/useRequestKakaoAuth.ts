import KakaoLogin, {
  KakaoLoginTokenData,
} from '@/common/plugins/KakaoLoginPlugin';
import logger from '@/common/utils/logger';
import useSignInState from '@/features/sign-in/hooks/useSignInState';
import { UseMutationOptions, useMutation } from 'react-query';

// 카카오 로그인 시작
const useRequestKakaoAuth = (
  options?: Omit<
    UseMutationOptions<KakaoLoginTokenData, Error, void, unknown>,
    'mutationFn'
  >
) => {
  const { setKakaoToken } = useSignInState();

  return useMutation(async () => {
    const result = await KakaoLogin.loginWithKakaoTalk();

    logger.debug(result);

    setKakaoToken(result);

    return result;
  }, options);
};

export default useRequestKakaoAuth;
