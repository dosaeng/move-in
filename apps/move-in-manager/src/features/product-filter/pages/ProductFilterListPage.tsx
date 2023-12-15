import { IonContent, IonPage, ScrollDetail } from '@ionic/react';
import ProductFilterListView from '../components/ProductFilterListView';
import { css } from '@move-in/styled-system/css';
import { useHistory } from 'react-router-dom';

interface Props {
  onIonScroll?: (e: CustomEvent<ScrollDetail>) => void;
}

const ProductFilterListPage: React.FC<Props> = ({ onIonScroll }) => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent
        className={css({
          '--padding-top': '24px',
          '--padding-bottom': '40px',
        })}
        onIonScroll={onIonScroll}
        scrollEvents
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
