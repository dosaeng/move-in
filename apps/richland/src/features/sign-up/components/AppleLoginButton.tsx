import { css } from '@move-in/styled-system/css';
import useRequestAppleAuth from '../hooks/useRequestAppleAuth';
import logger from '@/common/utils/logger';
import useSignIn from '@/features/sign-in/hooks/useRequestSignIn';
import { useToast } from '@move-in/design-system';
import { SignUpType } from '../sign-up';

const AppleLoginButton: React.FC<{
  onSuccessSignIn?: () => void;
  onRequireSignUp?: () => void;
}> = ({ onSuccessSignIn, onRequireSignUp }) => {
  const toast = useToast();
  const { isLoading: isLoadingSignIn, mutate: requestSignIn } = useSignIn({
    onSuccess: () => onSuccessSignIn && onSuccessSignIn(),
    onError: (error) => {
      logger.error(error);

      // 회원 가입 프로세스가 필요한 경우
      if (error.response.status === 404) {
        onRequireSignUp && onRequireSignUp();
        return;
      }

      toast.present('로그인에 실패했습니다.', 1000);
    },
  });
  const { isLoading: isLoadingAppleAuth, mutate: requestAppAuth } =
    useRequestAppleAuth({
      onSuccess: (response) => {
        requestSignIn({
          type: SignUpType.apple,
          apple: {
            idToken: response.idToken,
          },
        });
      },
      onError: () => {
        toast.present('애플 로그인에 실패했습니다.', 1000);
      },
    });

  const isLoading = isLoadingSignIn || isLoadingAppleAuth;

  return (
    <img
      className={css({
        width: '320px',
        height: '48px',
      })}
      src="/images/apple-login-button.png"
      onClick={
        !isLoading
          ? () => {
              requestAppAuth();
            }
          : undefined
      }
    ></img>
  );
};

export default AppleLoginButton;
