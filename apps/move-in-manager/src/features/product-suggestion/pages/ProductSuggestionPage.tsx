import { IonContent, IonHeader, IonPage } from '@ionic/react';
import { useSearchParams } from '@move-in/core';
import { PageHeader } from '@move-in/design-system';
import { PageHeaderBackButton } from '@move-in/design-system/src/header/PageHeader';
import { css } from '@move-in/styled-system/css';
import { useHistory } from 'react-router-dom';
import useProductSuggestionPageState from '../hooks/useProductSuggestionPageState';
import ProductListView from '../../product/components/ProductListView';

const ProductSuggestionPage: React.FC = () => {
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
        <h2
          className={css({
            textStyle: 'header-24-sb',
            color: 'text.dark.04',
            marginBottom: '40px',
          })}
        >
          어떤 매물을 제안하시나요?
        </h2>
        <ProductListView
          onClick={(item) => {
            history.push(`/product-suggestions/form?filterId=${item.id}`);
          }}
        />
      </IonContent>
    </IonPage>
  );
};

export default ProductSuggestionPage;
