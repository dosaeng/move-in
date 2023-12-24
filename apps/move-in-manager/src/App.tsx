import { IonApp } from '@ionic/react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import HomePage from './features/home/pages/HomePage';
import ProductFilterDetailPage from './features/product-filter/pages/ProductFilterDetailPage';
import ProductSuggestionFormPage from './features/product-suggestion/pages/ProductSuggestionFormPage';
import ProductSuggestionPage from './features/product-suggestion/pages/ProductSuggestionPage';
import SignInPage from './features/sign-in/pages/SignInPage';
import AuthRoute from './common/components/AuthRoute';
import SignOutPage from './features/sign-in/pages/SignOutPage';

function App() {
  return (
    <IonApp>
      <BrowserRouter>
        <Route path="/sign-in" component={SignInPage} />
        <Route path="/sign-out" component={SignOutPage} />
        <AuthRoute path="/tabs" component={HomePage} />
        <AuthRoute
          exact
          path="/product-filters/:id"
          component={ProductFilterDetailPage}
        />
        <AuthRoute
          exact
          path="/product-suggestions/products"
          component={ProductSuggestionPage}
        />
        <AuthRoute
          path="/product-suggestions/form"
          component={ProductSuggestionFormPage}
        />
        <AuthRoute exact path="/" render={() => <Redirect to="/tabs" />} />
      </BrowserRouter>
    </IonApp>
  );
}

export default App;
