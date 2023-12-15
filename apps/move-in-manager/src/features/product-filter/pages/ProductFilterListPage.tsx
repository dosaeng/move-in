import { IonContent, IonPage } from '@ionic/react';
import ProductFilterListView from '../components/ProductFilterListView';
import { css } from '@move-in/styled-system/css';
import { useHistory } from 'react-router-dom';

const ProductFilterListPage: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent
        className={css({
          '--padding-top': '24px',
          '--padding-bottom': '40px',
        })}
      >
        <ProductFilterListView
          onClick={(data) => {
            history.push(`/product-filters/${data.id}`);
          }}
        />
      </IonContent>
    </IonPage>
  );
};

export default ProductFilterListPage;
