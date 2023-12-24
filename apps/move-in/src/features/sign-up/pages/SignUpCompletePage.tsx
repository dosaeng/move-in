import useSignIn from '@/features/sign-in/hooks/useSignIn';
import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonToolbar,
} from '@ionic/react';
import {
  Button,
  CTAButtonBlock,
  IconCircleCheckFilled,
  useToast,
} from '@move-in/design-system';
import { css } from '@move-in/styled-system/css';
import { useEffect } from 'react';
import { useSignUpFormState } from '../hooks/useSignUpFormState';

const SignUpCompletePage: React.FC = () => {
  const { present } = useToast();
  const { data } = useSignUpFormState();
  const { mutate: requestSignIn, isError } = useSignIn({
    onSuccess: () => {
      window.location.href = '/product-filters';
    },
    onError: () => {
      present('로그인에 실패했습니다.', 300);
    },
  });

  useEffect(() => {
    requestSignIn({
      email: data?.email,
      password: data?.password,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar></IonToolbar>
      </IonHeader>
      <IonContent className={'move-in-padding'} scrollY={false}>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            height: '80vh',
            alignItems: 'center',
            justifyContent: 'center',
            textStyle: 'header-24-sb',
            textAlign: 'center',
          })}
        >
          <IconCircleCheckFilled
            className={css({
              color: 'brand.purple.03',
            })}
            size={64}
          />
          <h2>
            무브인 회원가입을
            <br />
            성공적으로 완료했어요
          </h2>
        </div>
      </IonContent>
      <IonFooter className="ion-no-border">
        <CTAButtonBlock>
          {isError && (
            <Button
              className={css({ maxWidth: '100%' })}
              label="로그인"
              onClick={() => {
                requestSignIn({
                  email: data?.email,
                  password: data?.password,
                });
              }}
            />
          )}
        </CTAButtonBlock>
      </IonFooter>
    </IonPage>
  );
};

export default SignUpCompletePage;
