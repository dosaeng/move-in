import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import { IconCircleCheckFilled } from '@move-in/move-in-design-system';
import { css, cx } from '@move-in/styled-system/css';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const SignUpCompletePage: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.replace('/desired-conditions');
    }, 1000);
  }, []);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar></IonToolbar>
      </IonHeader>
      <IonContent
        className={cx(
          'ion-padding',
          css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          })
        )}
      >
        <h1
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
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
          <div>
            무브인 회원가입을
            <br />
            성공적으로 완료했어요
          </div>
        </h1>
      </IonContent>
    </IonPage>
  );
};

export default SignUpCompletePage;
