import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  ScrollDetail,
} from '@ionic/react';
import { css } from '@move-in/styled-system/css';
import { useHistory } from 'react-router-dom';
import ProductFilterListView from '../components/ProductFilterListView';
import useProductFilterList from '../hooks/useProductFilterList';

interface Props {
  onIonScroll?: (e: CustomEvent<ScrollDetail>) => void;
}

const ProductFilterListPage: React.FC<Props> = ({ onIonScroll }) => {
  const history = useHistory();
  const { refetch } = useProductFilterList();

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
        <IonRefresher
          slot="fixed"
          onIonRefresh={(event) => {
            refetch().then(() => {
              event.target.complete();
            });
          }}
        >
          <IonRefresherContent />
        </IonRefresher>
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
