import { IonApp } from '@ionic/react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import HomePage from './features/home/pages/HomePage';
import ProductFilterDetailPage from './features/product-filter/pages/ProductFilterDetailPage';
import ProductSuggestionFormPage from './features/product-suggestion/pages/ProductSuggestionFormPage';
import ProductSuggestionPage from './features/product-suggestion/pages/ProductSuggestionPage';

function App() {
  return (
    <IonApp>
      <BrowserRouter>
        <Route path="/tabs" component={HomePage} />
        <Route
          exact
          path="/product-filters/:id"
          component={ProductFilterDetailPage}
        />
        <Route
          exact
          path="/product-suggestions/products"
          component={ProductSuggestionPage}
        />
        <Route
          path="/product-suggestions/form"
          component={ProductSuggestionFormPage}
        />
        <Route exact path="/" render={() => <Redirect to="/tabs" />} />
      </BrowserRouter>
    </IonApp>
  );
}

export default App;
