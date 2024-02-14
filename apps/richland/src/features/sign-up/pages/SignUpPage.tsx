import { IonContent, IonPage } from '@ionic/react';
import { css } from '@move-in/styled-system/css';
import { useNavigate } from 'react-router-dom';
import AppleLoginButton from '../components/AppleLoginButton';
import FindIdButton from '../components/FindIdButton';
import KakaoLoginButton from '../components/KakaoLoginButton';

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
            minHeight: '100%',
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
            <KakaoLoginButton
              onSuccessSignIn={() => {
                navigate('/');
              }}
              onSuccessSignUp={() => {
                navigate('/sign-up/complete');
              }}
            />
            <AppleLoginButton
              onSuccessSignIn={() => {
                navigate('/');
              }}
              onRequireSignUp={() => {
                navigate('/sign-up/terms');
              }}
            />
          </div>
          <FindIdButton />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignUpPage;
