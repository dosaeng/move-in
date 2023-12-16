import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import HomePage from './features/home/pages/HomePage';
import ProductFilterDetailPage from './features/product-filter/pages/ProductFilterDetailPage';
import ProductSuggestionFormPage from './features/product-suggestion/pages/ProductSuggestionFormPage';
import ProductSuggestionPage from './features/product-suggestion/pages/ProductSuggestionPage';

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/tabs" component={HomePage} />
          <Route exact path="/product-filters/:id" component={ProductFilterDetailPage} />
          <Route exact path="/product-suggestions/products" component={ProductSuggestionPage} />
          <Route exact path="/product-suggestions/form" component={ProductSuggestionFormPage} />
          <Route exact path="/" render={() => <Redirect to="/tabs" />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
