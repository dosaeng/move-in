import { IonContent, IonHeader, IonPage, IonSpinner } from '@ionic/react';
import { PageHeader } from '@move-in/design-system';
import { PageHeaderBackButton } from '@move-in/design-system/src/header/PageHeader';
import { css } from '@move-in/styled-system/css';
import { useNavigate } from 'react-router-dom';
import { Browser } from '@capacitor/browser';

import TermsListItem from '../components/TermsListItem';
import useTerms from '../hooks/useTerms';

const TermsListPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useTerms();

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
        />
      </IonHeader>
      <IonContent className="ion-padding">
        <div
          className={css({
            textStyle: 'header-26-b',
            marginBottom: '40px',
          })}
        >
          리치랜드 이용 약관
        </div>
        {isLoading ? (
          <div
            className={css({
              width: '100%',
              height: '50vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            })}
          >
            <IonSpinner name="crescent" />
          </div>
        ) : (
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            })}
          >
            {data?.map((item) => {
              return (
                <TermsListItem
                  onClick={() => {
                    Browser.open({ url: item.url });
                  }}
                >
                  {item.title}
                </TermsListItem>
              );
            })}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default TermsListPage;
