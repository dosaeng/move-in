import logger from '@/common/utils/logger';
import useRequestSignIn from '@/features/sign-in/hooks/useRequestSignIn';
import { useToast } from '@move-in/design-system';
import { css } from '@move-in/styled-system/css';
import useRequestKakaoAuth from '../hooks/useRequestKakaoAuth';
import { SignUpType } from '../sign-up';
import useRequestSignUp from '../hooks/useRequestSignUp';
import { useState } from 'react';

const KakaoLoginButton: React.FC<{ onSuccess?: () => void }> = ({
  onSuccess,
}) => {
  const [trySignUp, setTrySignUp] = useState(true);
  const toast = useToast();

  const { isLoading: isLoadingSignUp, mutate: requestSignUp } =
    useRequestSignUp({
      onSuccess: (_, params) => {
        requestSignIn({
          type: params.type,
          kakao: params.kakao,
        });
      },
      onError: (error) => {
        logger.error(error);
        toast.present('회원가입에 실패했습니다.', 1000);
      },
    });

  const { isLoading: isLoadingSignIn, mutate: requestSignIn } = useRequestSignIn({
    onSuccess: () => {
      onSuccess && onSuccess();
    },
    onError: (error, params) => {
      logger.error(error);

      // 회원 가입 프로세스가 필요한 경우
      if (error.response.status === 404 && trySignUp) {
        setTrySignUp(false);
        requestSignUp({
          type: params.type,
          kakao: params.kakao,
        });
        return;
      }

      toast.present('로그인에 실패했습니다.', 1000);
    },
  });

  const { isLoading: isLoadingKakaoAuth, mutate: requestKakaoAuth } =
    useRequestKakaoAuth({
      onSuccess: (response) => {
        requestSignIn({
          type: SignUpType.kakao,
          kakao: {
            accessToken: response.accessToken,
            idToken: response.idToken,
          },
        });
      },
      onError: (error) => {
        logger.error(error);
        toast.present('카카오 로그인에 실패했습니다.', 1000);
      },
    });

  const isLoading = isLoadingSignUp || isLoadingSignIn || isLoadingKakaoAuth;

  return (
    <img
      className={css({
        width: '320px',
        height: '48px',
      })}
      src="/images/kakao-login-button.png"
      onClick={
        !isLoading
          ? () => {
              requestKakaoAuth();
            }
          : undefined
      }
    />
  );
};

export default KakaoLoginButton;
