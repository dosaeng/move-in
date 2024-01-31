import { IonContent, IonHeader, IonPage } from '@ionic/react';
import { Button, CTAButtonBlock, PageHeader } from '@move-in/design-system';
import { PageHeaderBackButton } from '@move-in/design-system/src/header/PageHeader';
import { useNavigate } from 'react-router-dom';
import { css } from '@move-in/styled-system/css';

const SignUpTermsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <PageHeader
          left={
            <PageHeaderBackButton
              onClick={() => {
                navigate(-1);
              }}
            />
          }
        ></PageHeader>
      </IonHeader>
      <IonContent
        className={css({
          '--padding-top': '24px',
          '--padding-start': '16px',
          '--padding-end': '16px',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            })}
          >
            <h3
              className={css({
                textStyle: 'header-24-sb',
                color: 'text.dark.04',
              })}
            >
              회원 가입을 위해
              <br />
              본인 인증이 필요해요
            </h3>
            <p
              className={css({
                textStyle: 'body-16-m',
                color: 'text.dark.01',
              })}
            >
              리치랜드는 회원님의 정보를
              <br />
              철저히 보안처리하고 있어요
            </p>
          </div>
          <div className={css({ flex: 1 })}></div>
          <CTAButtonBlock className={css({ width: '100%' })}>
            <Button
              className={css({ maxWidth: '100%' })}
              label="약관 동의하고 본인 인증하기"
              onClick={() => {
                navigate('/identity-verification?redirect=/sign-up/complete');
              }}
            />
          </CTAButtonBlock>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignUpTermsPage;
