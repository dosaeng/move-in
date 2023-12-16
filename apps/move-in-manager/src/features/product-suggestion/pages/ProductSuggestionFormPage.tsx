import { IonContent, IonHeader, IonPage } from '@ionic/react';
import { useSearchParams } from '@move-in/core';
import { PageHeader } from '@move-in/design-system';
import { PageHeaderBackButton } from '@move-in/design-system/src/header/PageHeader';
import { useHistory } from 'react-router-dom';
import useProductSuggestionPageState from '../hooks/useProductSuggestionPageState';

const ProductSuggestionFormPage: React.FC = () => {
  const searchParams = useSearchParams();
  const history = useHistory();
  const filterId = searchParams.get('filterId')!;
  const { filterName } = useProductSuggestionPageState(filterId);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <PageHeader
          title={filterName}
          left={
            <PageHeaderBackButton
              onClick={() => {
                history.goBack();
              }}
            />
          }
        />
      </IonHeader>
      <IonContent className="move-in-padding">
        <h2>함께 하는 가족</h2>
      </IonContent>
    </IonPage>
  );
};

export default ProductSuggestionFormPage;
