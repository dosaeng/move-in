import { IonSpinner } from '@ionic/react';
import { css } from '@move-in/styled-system/css';

const LoadingPage = () => {
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#222428',
        opacity: '0.3',
      })}
    >
      <IonSpinner color="light" />
    </div>
  );
};

export default LoadingPage;
