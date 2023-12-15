import { IonContent, IonHeader, IonLabel, IonPage, IonRouterOutlet, IonTabBar, IonTabButton } from '@ionic/react';
import { IconButton, IconMenu2, PageHeader } from '@move-in/move-in-design-system';
import { css, cx } from '@move-in/styled-system/css';
import { Redirect, Route } from 'react-router-dom';
import ProductFilterListPage from '../../product-filter/pages/ProductFilterListPage';
import ProfileSection from '../../profile/components/ProfileSection';
import { useState } from 'react';

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
  const [scrollY, setScrollY] = useState(0);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <PageHeader right={<IconButton shape="clear" size="s" theme="neutral" icon={<IconMenu2 />} />} />
        <div
          className={cx(
            css({
              overflow: 'hidden',
            })
          )}
          style={{ height: `${Math.max(0, 160 - scrollY)}px` }}
        >
          <ProfileSection />
        </div>
        <IonTabBar>
          <IonTabButton className={tabStyle} tab="product-filters" href="/tabs/product-filters">
            <IonLabel>고객 탐색</IonLabel>
          </IonTabButton>
          <IonTabButton className={tabStyle} tab="products" href="/tabs/products">
            <IonLabel>매물 관리</IonLabel>
          </IonTabButton>
          <IonTabButton className={tabStyle} tab="consultants" href="/tabs/consultants">
            <IonLabel>상담 관리</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonHeader>
      <IonContent>
        <IonRouterOutlet>
          <Redirect exact path="/tabs" to="/tabs/product-filters" />
          <Route exact path="/tabs/product-filters">
            <ProductFilterListPage
              onIonScroll={(e) => {
                setScrollY(e.detail.currentY);
              }}
            />
          </Route>
          <Route exact path="/tabs/products">
            <ProductFilterListPage
              onIonScroll={(e) => {
                setScrollY(e.detail.currentY);
              }}
            />
          </Route>
          <Route exact path="/tabs/consultants">
            <ProductFilterListPage
              onIonScroll={(e) => {
                setScrollY(e.detail.currentY);
              }}
            />
          </Route>
        </IonRouterOutlet>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;