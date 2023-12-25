import {
  IonContent,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  ScrollDetail,
} from '@ionic/react';
import ProductListView from '../components/ProductListView';
import useProductList from '../hooks/useProductList';

interface Props {
  onIonScroll?: (e: CustomEvent<ScrollDetail>) => void;
}

const ProductListPage: React.FC<Props> = ({ onIonScroll }) => {
  const { refetch } = useProductList();

  return (
    <IonPage>
      <IonContent
        className="move-in-padding"
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
        <ProductListView />
      </IonContent>
    </IonPage>
  );
};

export default ProductListPage;
