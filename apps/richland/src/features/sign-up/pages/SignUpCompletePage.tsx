import logger from '@/common/utils/logger';
import useRequestSignIn from '@/features/sign-in/hooks/useRequestSignIn';
import useSignInState from '@/features/sign-in/hooks/useSignInState';
import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import {
  Button,
  CTAButtonBlock,
  PageHeader,
  useToast,
} from '@move-in/design-system';
import { css } from '@move-in/styled-system/css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpType } from '../sign-up';

const SignUpCompletePage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [visibleSignInButton, setVisibleSignInButton] = useState(false);
  const { type, appleToken, kakaoToken } = useSignInState();
  const { mutate: requestSignIn } = useRequestSignIn({
    onSuccess: () => {
      navigate('/');
    },
    onError: (error) => {
      logger.error(error);
      setVisibleSignInButton(true);
      toast.present('로그인에 실패했습니다.', 1000);
    },
  });

  const requestLogin = () => {
    if (type === SignUpType.apple) {
      requestSignIn({
        type,
        apple: appleToken!,
      });
    } else if (type === SignUpType.kakao) {
      requestSignIn({
        type,
        kakao: kakaoToken!,
      });
    } else {
      toast.present('인증 정보가 없습니다.', 1000);
      navigate('/sign-up');
    }
  };

  useEffect(() => {
    requestLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <PageHeader></PageHeader>
      </IonHeader>
      <IonContent
        className={css({
          '--padding-top': '24px',
          '--padding-start': '16px',
          '--padding-end': '16px',
          '--padding-bottom': '24px',
        })}
      >
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '24px',
            height: '100%',
          })}
        >
          <img
            className={css({
              width: '64px',
              height: '64px',
            })}
            src="/images/check-icon.png"
          />
          <div
            className={css({
              textAlign: 'center',
              textStyle: 'header-28-b',
            })}
          >
            리치랜드 회원가입을
            <br />
            성공적으로 완료했어요
          </div>
        </div>
      </IonContent>
      {visibleSignInButton && (
        <IonFooter className="ion-no-border">
          <CTAButtonBlock>
            <Button
              className={css({
                maxWidth: '100%',
              })}
              label="로그인"
              onClick={requestLogin}
            />
          </CTAButtonBlock>
        </IonFooter>
      )}
    </IonPage>
  );
};

export default SignUpCompletePage;
