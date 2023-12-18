import { IonPage, IonRouterOutlet } from '@ionic/react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { ProductFilterCreateFormContextProvider } from '../hooks/useProductFilterCreateFormState';
import ProductFilterCreateFormStep1Page from './create/ProductFilterCreateFormStep1Page';
import ProductFilterCreateFormStep2Page from './create/ProductFilterCreateFormStep2Page';
import ProductFilterCreateFormStep3Page from './create/ProductFilterCreateFormStep3Page';
import ProductFilterCreateFormStep4Page from './create/ProductFilterCreateFormStep4Page';
import ProductFilterCreateFormStep5Page from './create/ProductFilterCreateFormStep5Page';
import ProductFilterCreateFormStep6Page from './create/ProductFilterCreateFormStep6Page';

const ProductFilterCreatePage: React.FC = () => {
  const history = useHistory();

  const onBack = () => {
    history.goBack();
  };
  const onClose = () => {
    history.push(`/product-filters`);
  };

  return (
    <ProductFilterCreateFormContextProvider>
      <IonPage>
        <IonRouterOutlet>
          <Redirect exact path="/product-filters-create" to="/product-filters-create/step1" />
          <Route exact path="/product-filters-create/step1">
            <ProductFilterCreateFormStep1Page
              onBack={onBack}
              onClose={onClose}
              onNext={() => {
                history.push(`/product-filters-create/step2`);
              }}
            />
          </Route>
          <Route exact path="/product-filters-create/step2">
            <ProductFilterCreateFormStep2Page
              onBack={onBack}
              onClose={onClose}
              onNext={() => {
                history.push(`/product-filters-create/step3`);
              }}
            />
          </Route>
          <Route exact path="/product-filters-create/step3">
            <ProductFilterCreateFormStep3Page
              onBack={onBack}
              onClose={onClose}
              onNext={() => {
                history.push(`/product-filters-create/step4`);
              }}
            />
          </Route>
          <Route exact path="/product-filters-create/step4">
            <ProductFilterCreateFormStep4Page
              onBack={onBack}
              onClose={onClose}
              onNext={() => {
                history.push(`/product-filters-create/step5`);
              }}
            />
          </Route>
          <Route exact path="/product-filters-create/step5">
            <ProductFilterCreateFormStep5Page
              onBack={onBack}
              onClose={onClose}
              onNext={() => {
                history.push(`/product-filters-create/step6`);
              }}
            />
          </Route>
          <Route exact path="/product-filters-create/step6">
            <ProductFilterCreateFormStep6Page
              onBack={onBack}
              onClose={onClose}
              onNext={() => {
                history.push(`/product-filters`);
              }}
            />
          </Route>
        </IonRouterOutlet>
      </IonPage>
    </ProductFilterCreateFormContextProvider>
  );
};

export default ProductFilterCreatePage;
