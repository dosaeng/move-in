import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import ProductFilterDetailPage from './features/product-filter/pages/ProductFilterDetailPage';
import ProductFilterDraftListPage from './features/product-filter/pages/ProductFilterDraftListPage';
import ProductFilterListPage from './features/product-filter/pages/ProductFilterListPage';
import SignUpCompletePage from './features/sign-up/pages/SignUpCompletePage';
import SignUpPage from './features/sign-up/pages/SignUpPage';
import UserInfoFormPage from './features/sign-up/pages/UserInfoFormPage';

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/sign-up" component={SignUpPage} />
          <Route exact path="/sign-up/user-info" component={UserInfoFormPage} />
          <Route exact path="/sign-up/complete" component={SignUpCompletePage} />
          <Route exact path="/product-filters" component={ProductFilterListPage} />
          <Route exact path="/product-filters-draft" component={ProductFilterDraftListPage} />
          <Route exact path="/product-filters/:id" component={ProductFilterDetailPage} />
          <Route exact path="/" render={() => <Redirect to="/sign-up" />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
