import {
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { PageHeader } from '@move-in/move-in-design-system';
import { PageHeaderBackButton } from '@move-in/move-in-design-system/src/header/PageHeader';
import { css, cx } from '@move-in/styled-system/css';
import { Redirect, Route } from 'react-router-dom';
import ProductFilterListPage from '../../product-filter/pages/ProductFilterListPage';
import ProfileSection from '../../profile/components/ProfileSection';

const tabStyle = cx(
  css({
    textStyle: 'body-14-sb',
    '--color': 'text.dark.04',
    '--color-selected': 'text.dark.04',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'stroke.light.02',
    '&.tab-selected': {
      borderBottomWidth: '2px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'stroke.dark.01',
    },
  }),
  'move-in-style'
);

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <PageHeader left={<PageHeaderBackButton />} />
        <ProfileSection />
      </IonHeader>
      <IonContent>
        <IonTabs>
          <IonTabBar
            slot="top"
            className={css({
              height: '40px',
            })}
          >
            <IonTabButton className={tabStyle} tab="product-filters" href="/product-filters">
              <IonLabel>고객 탐색</IonLabel>
            </IonTabButton>
            <IonTabButton className={tabStyle} tab="products" href="/products">
              <IonLabel>매물 관리</IonLabel>
            </IonTabButton>
            <IonTabButton className={tabStyle} tab="consultants" href="/consultants">
              <IonLabel>상담 관리</IonLabel>
            </IonTabButton>
          </IonTabBar>
          <IonRouterOutlet>
            <Route exact path="/product-filters">
              <ProductFilterListPage />
            </Route>
            <Route exact path="/products">
              <ProductFilterListPage />
            </Route>
            <Route exact path="/consultants">
              <ProductFilterListPage />
            </Route>
            <Redirect to="/product-filters" />
          </IonRouterOutlet>
        </IonTabs>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
