import { IonContent, IonPage } from '@ionic/react';
import { css } from '@move-in/styled-system/css';
import { useNavigate } from 'react-router-dom';

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <IonPage>
      <IonContent className="content-padding">
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100%',
          })}
        >
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
            })}
          >
            <h3
              className={css({
                marginBottom: '60px',
                textStyle: 'header-28-b',
                color: 'text.dark.04',
                textAlign: 'center',
              })}
            >
              돈 벌 준비가 된 자<br />
              리치랜드로 오라
            </h3>
            <div
              className={css({
                width: '240px',
                height: '276px',
                backgroundColor: '#FFD2D2',
                marginBottom: '40px',
              })}
            ></div>
          </div>
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              marginBottom: '20px',
            })}
          >
            <img
              className={css({
                width: '320px',
                height: '48px',
              })}
              src="/public/images/kakao-login-button.png"
              onClick={() => {
                // TODO. 카카오 인증 페이지로 이동
              }}
            ></img>
            <img
              className={css({
                width: '320px',
                height: '48px',
              })}
              src="/public/images/apple-login-button.png"
              onClick={() => {
                // TODO. 애플 인증 이후 본인 인증 페이지로 이동
                navigate('/sign-up/identity-verification');
              }}
            ></img>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignUpPage;
