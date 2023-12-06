import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@move-in/move-in-design-system';
import { css } from '@move-in/styled-system/css';

const SignUp: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class={css({
            textStyle: 'header-24-sb',
            paddingX: '16px',
          })}>Ionic Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        The world is your oyster.
        <p>
          If you get lost, the{' '}
          <a target="_blank" rel="noopener" href="https://ionicframework.com/docs/">
            docs
          </a>{' '}
          will be your guide.
        </p>
      </IonContent>
    </IonPage>
  );
};

export default SignUp;
