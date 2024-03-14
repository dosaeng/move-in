import { IonContent, IonHeader, IonPage } from '@ionic/react';
import { PageHeader } from '@move-in/design-system';
import { PageHeaderBackButton } from '@move-in/design-system/src/header/PageHeader';
import { css } from '@move-in/styled-system/css';
import { useNavigate } from 'react-router-dom';
import NotificationListView from '../components/NotificationListView';

const NotificationPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <PageHeader
          left={
            <PageHeaderBackButton
              onClick={() => {
                navigate('/');
              }}
            />
          }
        />
      </IonHeader>
      <IonContent className="ion-padding">
        <div
          className={css({
            marginBottom: '40px',
          })}
        >
          <h2
            className={css({
              textStyle: 'header-26-b',
            })}
          >
            알림
          </h2>
        </div>
        <NotificationListView />
      </IonContent>
    </IonPage>
  );
};

export default NotificationPage;
