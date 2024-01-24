import { IonContent, IonHeader, IonPage } from '@ionic/react';
import { PageHeader } from '@move-in/design-system';
import { PageHeaderBackButton } from '@move-in/design-system/src/header/PageHeader';
import { useNavigate } from 'react-router-dom';

const SearchPage: React.FC = () => {
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
          title="상품 종합 검색"
        />
      </IonHeader>
      <IonContent></IonContent>
    </IonPage>
  );
};

export default SearchPage;
