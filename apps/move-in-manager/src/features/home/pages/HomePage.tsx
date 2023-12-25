import ProductListPage from '@/features/product/pages/ProductListPage';
import {
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonRouterOutlet,
} from '@ionic/react';
import { IconButton, IconMenu2, PageHeader } from '@move-in/design-system';
import { css } from '@move-in/styled-system/css';
import { Redirect, Route } from 'react-router-dom';
import ProductFilterListPage from '../../product-filter/pages/ProductFilterListPage';
import ProfileSection from '../../profile/components/ProfileSection';
import TabButton from '../components/TabButton';

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <PageHeader
          right={
            <IconButton
              shape="clear"
              size="s"
              theme="neutral"
              icon={<IconMenu2 />}
            />
          }
        />
        <ProfileSection />
        <div
          className={css({
            display: 'flex',
          })}
        >
          <TabButton href="/tabs/product-filters">
            <IonLabel>고객 탐색</IonLabel>
          </TabButton>
          <TabButton href="/tabs/products">
            <IonLabel>매물 관리</IonLabel>
          </TabButton>
          <TabButton href="/tabs/consultants" disabled>
            <IonLabel>상담 관리</IonLabel>
          </TabButton>
        </div>
      </IonHeader>
      <IonContent>
        <IonRouterOutlet>
          <Redirect exact path="/tabs" to="/tabs/product-filters" />
          <Route exact path="/tabs/product-filters">
            <ProductFilterListPage />
          </Route>
          <Route exact path="/tabs/products">
            <ProductListPage />
          </Route>
          <Redirect exact path="/tabs/consultants" to="/tabs/product-filters" />
        </IonRouterOutlet>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
