import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import ProductFilterCreatePage from './features/product-filter/pages/ProductFilterCreatePage';
import ProductFilterDetailPage from './features/product-filter/pages/ProductFilterDetailPage';
import ProductFilterDraftListPage from './features/product-filter/pages/ProductFilterDraftListPage';
import ProductFilterListPage from './features/product-filter/pages/ProductFilterListPage';
import SignUpPage from './features/sign-up/pages/SignUpPage';

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/sign-up" component={SignUpPage} />
          <Route exact path="/product-filters" component={ProductFilterListPage} />
          <Route exact path="/product-filters-draft" component={ProductFilterDraftListPage} />
          <Route path="/product-filters-create" component={ProductFilterCreatePage} />
          <Route exact path="/product-filters/:id" component={ProductFilterDetailPage} />
          <Route exact path="/" render={() => <Redirect to="/sign-up" />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
