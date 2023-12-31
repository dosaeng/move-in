import { IonApp } from '@ionic/react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import AuthRoute from './common/component/AuthRoute';
import ProductConsultingListPage from './features/product-consulting/pages/ProductConsultingListPage';
import ProductFilterCreatePage from './features/product-filter/pages/ProductFilterCreatePage';
import ProductFilterDetailPage from './features/product-filter/pages/ProductFilterDetailPage';
import ProductFilterDraftListPage from './features/product-filter/pages/ProductFilterDraftListPage';
import ProductFilterListPage from './features/product-filter/pages/ProductFilterListPage';
import ProductFilterUpdatePage from './features/product-filter/pages/ProductFilterUpdatePage';
import ProductSuggestionDetailPage from './features/product-suggestion/pages/ProductSuggestionDetailPage';
import SignUpPage from './features/sign-up/pages/SignUpPage';
import SignInPage from './features/sign-in/pages/SignInPage';
import SignOutPage from './features/sign-in/pages/SignOutPage';
import useSetupBackButton from './common/hooks/useSetupBackButton';

function App() {
  return (
    <IonApp>
      <BrowserRouter>
        <SetUp />
        <Route path="/sign-up" component={SignUpPage} />
        <Route path="/sign-in" component={SignInPage} />
        <Route path="/sign-out" component={SignOutPage} />
        <AuthRoute
          exact
          path="/product-filters"
          component={ProductFilterListPage}
        />
        <AuthRoute
          exact
          path="/product-filters-draft"
          component={ProductFilterDraftListPage}
        />
        <AuthRoute
          path="/product-filters-create"
          component={ProductFilterCreatePage}
        />
        <AuthRoute
          exact
          path="/product-filters/:id"
          component={ProductFilterDetailPage}
        />
        <AuthRoute
          path="/product-filters/:id/update"
          component={ProductFilterUpdatePage}
        />
        <AuthRoute
          exact
          path="/product-filters/:filterId/product-suggestions/:id"
          component={ProductSuggestionDetailPage}
        />
        <AuthRoute
          exact
          path="/product-consultants"
          component={ProductConsultingListPage}
        />
        <AuthRoute
          exact
          path="/"
          render={() => {
            return <Redirect to="/sign-up" />;
          }}
        />
      </BrowserRouter>
    </IonApp>
  );
}

export default App;

const SetUp = () => {
  useSetupBackButton();

  return <></>;
};
