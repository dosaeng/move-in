import { IonPage, IonRouterOutlet } from '@ionic/react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  useHistory,
} from 'react-router-dom';
import {
  ProductFilterCreateFormContextProvider
} from '../hooks/useProductFilterCreateFormState';
import ProductFilterCreateFormStep1Page from './create/ProductFilterCreateFormStep1Page';
import ProductFilterCreateFormStep2Page from './create/ProductFilterCreateFormStep2Page';
import ProductFilterCreateFormStep3Page from './create/ProductFilterCreateFormStep3Page';
import ProductFilterCreateFormStep4Page from './create/ProductFilterCreateFormStep4Page';
import ProductFilterCreateFormStep5Page from './create/ProductFilterCreateFormStep5Page';
import ProductFilterCreateFormStep6Page from './create/ProductFilterCreateFormStep6Page';

const InnerOutlet: React.FC<{ id: string | number }> = ({ id }) => {
  const history = useHistory();

  const onBack = () => {
    history.goBack();
  };

  const onClose = () => {
    history.push(`/product-filters/${id}`);
  };

  return (
    <IonRouterOutlet>
      <Redirect
        exact
        path="/product-filters/:id/update"
        to={`/product-filters/${id}/update/step1`}
      />
      <Route exact path="/product-filters/:id/update/step1">
        <ProductFilterCreateFormStep1Page
          onBack={onBack}
          onClose={onClose}
          onNext={() => {
            history.push(`/product-filters/${id}/update/step2`);
          }}
        />
      </Route>
      <Route exact path="/product-filters/:id/update/step2">
        <ProductFilterCreateFormStep2Page
          onBack={onBack}
          onClose={onClose}
          onNext={() => {
            history.push(`/product-filters/${id}/update/step3`);
          }}
        />
      </Route>
      <Route exact path="/product-filters/:id/update/step3">
        <ProductFilterCreateFormStep3Page
          onBack={onBack}
          onClose={onClose}
          onNext={() => {
            history.push(`/product-filters/${id}/update/step4`);
          }}
        />
      </Route>
      <Route exact path="/product-filters/:id/update/step4">
        <ProductFilterCreateFormStep4Page
          onBack={onBack}
          onClose={onClose}
          onNext={() => {
            history.push(`/product-filters/${id}/update/step5`);
          }}
        />
      </Route>
      <Route exact path="/product-filters/:id/update/step5">
        <ProductFilterCreateFormStep5Page
          onBack={onBack}
          onClose={onClose}
          onNext={() => {
            history.push(`/product-filters/${id}/update/step6`);
          }}
        />
      </Route>
      <Route exact path="/product-filters/:id/update/step6">
        <ProductFilterCreateFormStep6Page
          onBack={onBack}
          onClose={onClose}
          onNext={() => {
            history.push(`/product-filters/${id}`);
          }}
        />
      </Route>
    </IonRouterOutlet>
  );
};

const ProductFilterUpdatePage: React.FC<
  RouteComponentProps<{
    id: string;
  }>
> = ({ match }) => {
  const { id } = match.params;

  return (
    <ProductFilterCreateFormContextProvider>
      <IonPage>
        <InnerOutlet id={id} />
      </IonPage>
    </ProductFilterCreateFormContextProvider>
  );
};

export default ProductFilterUpdatePage;
