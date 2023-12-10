import { IonPage, IonRouterOutlet } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import ProductFilterCreateFormStep1Page from './create/ProductFilterCreateFormStep1Page';
import ProductFilterCreateFormStep2Page from './create/ProductFilterCreateFormStep2Page';
import ProductFilterCreateFormStep3Page from './create/ProductFilterCreateFormStep3Page';
import ProductFilterCreateFormStep4Page from './create/ProductFilterCreateFormStep4Page';
import ProductFilterCreateFormStep5Page from './create/ProductFilterCreateFormStep5Page';
import ProductFilterCreateFormStep6Page from './create/ProductFilterCreateFormStep6Page';

const ProductFilterCreatePage: React.FC = () => {
  return (
    <IonPage>
      <IonRouterOutlet>
        <Redirect exact path="/product-filters-create" to="/product-filters-create/step1" />
        <Route exact path="/product-filters-create/step1">
          <ProductFilterCreateFormStep1Page />
        </Route>
        <Route exact path="/product-filters-create/step2">
          <ProductFilterCreateFormStep2Page />
        </Route>
        <Route exact path="/product-filters-create/step3">
          <ProductFilterCreateFormStep3Page />
        </Route>
        <Route exact path="/product-filters-create/step4">
          <ProductFilterCreateFormStep4Page />
        </Route>
        <Route exact path="/product-filters-create/step5">
          <ProductFilterCreateFormStep5Page />
        </Route>
        <Route exact path="/product-filters-create/step6">
          <ProductFilterCreateFormStep6Page />
        </Route>
      </IonRouterOutlet>
    </IonPage>
  );
};

export default ProductFilterCreatePage;
