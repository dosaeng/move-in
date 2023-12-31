import { IonContent, IonHeader, IonPage, IonRouterOutlet } from '@ionic/react';
import { useSearchParams } from '@move-in/core';
import { PageHeader, useToast } from '@move-in/design-system';
import {
  PageHeaderBackButton,
  PageHeaderCloseButton,
} from '@move-in/design-system/src/header/PageHeader';
import { Redirect, Route, useHistory } from 'react-router-dom';
import {
  ProductSuggestionFormContextProvider,
  useProductSuggestionFormContext,
} from '../hooks/useProductSuggestionFormState';
import useProductSuggestionPageState from '../hooks/useProductSuggestionPageState';
import useRequestProductSuggestion from '../hooks/useRequestProductSuggestion';
import ProductSuggestionFormConfirmPage from './form/ProductSuggestionFormConfirmPage';
import ProductSuggestionFormStep1Page from './form/ProductSuggestionFormStep1Page';
import ProductSuggestionFormStep2Page from './form/ProductSuggestionFormStep2Page';
import ProductSuggestionFormStep3Page from './form/ProductSuggestionFormStep3Page';
import ProductSuggestionFormStep4Page from './form/ProductSuggestionFormStep4Page';
import ProductSuggestionFormStep5Page from './form/ProductSuggestionFormStep5Page';

const InnerOutlet: React.FC<{
  filterId: string | number;
  productId: string | number;
}> = ({ filterId, productId }) => {
  const history = useHistory();
  const { present } = useToast();
  const { data: formData } = useProductSuggestionFormContext();
  const { mutate: requestSuggestion, isLoading } = useRequestProductSuggestion({
    onSuccess: async () => {
      await present('성공적으로 제안을 완료했습니다.', 300);
      window.location.href = '/tabs/product-filters';
    },
    onError: () => {
      present('제안 요청에 실패했습니다.', 300);
    },
  });

  return (
    <IonRouterOutlet>
      <Redirect
        exact
        path="/product-suggestions/form"
        to={`/product-suggestions/form/step1?filterId=${filterId}&productId=${productId}`}
      />
      <Route exact path="/product-suggestions/form/step1">
        <ProductSuggestionFormStep1Page
          filterId={filterId}
          onNext={() => {
            history.push(
              `/product-suggestions/form/step2?filterId=${filterId}&productId=${productId}`
            );
          }}
        />
      </Route>
      <Route exact path="/product-suggestions/form/step2">
        <ProductSuggestionFormStep2Page
          filterId={filterId}
          productId={productId}
          onNext={() => {
            history.push(
              `/product-suggestions/form/step3?filterId=${filterId}&productId=${productId}`
            );
          }}
        />
      </Route>
      <Route exact path="/product-suggestions/form/step3">
        <ProductSuggestionFormStep3Page
          filterId={filterId}
          productId={productId}
          onNext={() => {
            history.push(
              `/product-suggestions/form/step4?filterId=${filterId}&productId=${productId}`
            );
          }}
        />
      </Route>
      <Route exact path="/product-suggestions/form/step4">
        <ProductSuggestionFormStep4Page
          filterId={filterId}
          onNext={() => {
            history.push(
              `/product-suggestions/form/step5?filterId=${filterId}&productId=${productId}`
            );
          }}
        />
      </Route>
      <Route exact path="/product-suggestions/form/step5">
        <ProductSuggestionFormStep5Page
          filterId={filterId}
          onNext={() => {
            history.push(
              `/product-suggestions/form/confirm?filterId=${filterId}&productId=${productId}`
            );
          }}
        />
      </Route>
      <Route exact path="/product-suggestions/form/confirm">
        <ProductSuggestionFormConfirmPage
          filterId={filterId}
          productId={productId}
          onNext={
            !isLoading
              ? async () => {
                  requestSuggestion(formData!);
                }
              : undefined
          }
        />
      </Route>
    </IonRouterOutlet>
  );
};

const ProductSuggestionFormPage: React.FC = () => {
  const searchParams = useSearchParams();
  const history = useHistory();
  const filterId = searchParams.get('filterId')!;
  const productId = searchParams.get('productId')!;
  const { filterName } = useProductSuggestionPageState(filterId);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <PageHeader
          title={filterName}
          left={
            <PageHeaderBackButton
              onClick={() => {
                history.goBack();
              }}
            />
          }
          right={
            <PageHeaderCloseButton
              onClick={() => {
                window.location.href = `/product-suggestions/products?filterId=${filterId}`;
              }}
            />
          }
        />
      </IonHeader>
      <IonContent className="move-in-padding">
        <ProductSuggestionFormContextProvider
          initialValue={{
            filterId: Number(filterId),
            productId: Number(productId),
          }}
        >
          <InnerOutlet filterId={filterId} productId={productId} />
        </ProductSuggestionFormContextProvider>
      </IonContent>
    </IonPage>
  );
};

export default ProductSuggestionFormPage;
