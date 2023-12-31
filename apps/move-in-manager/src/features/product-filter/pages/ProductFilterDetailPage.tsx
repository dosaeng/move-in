import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import { Button, CTAButtonBlock, PageHeader } from '@move-in/design-system';
import { PageHeaderBackButton } from '@move-in/design-system/src/header/PageHeader';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import ProductFilterDetailView from '../components/ProductFilterDetailView';
import { css } from '@move-in/styled-system/css';
import useProductFilterDetailViewState from '../hooks/useProductFilterDetailViewState';

const ProductFilterDetailPage: React.FC<
  RouteComponentProps<{ id: string }>
> = ({ match }) => {
  const history = useHistory();
  const { id } = match.params;
  const { hasSuggestionList } = useProductFilterDetailViewState(id);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <PageHeader
          left={
            <PageHeaderBackButton
              onClick={() => {
                history.push(`/tabs/product-filters`);
              }}
            />
          }
        />
      </IonHeader>
      <IonContent
        className={css({
          '--padding-top': '24px',
          '--padding-bottom': '40px',
        })}
      >
        <ProductFilterDetailView filterId={id} />
      </IonContent>
      <IonFooter className="ion-no-border">
        <CTAButtonBlock>
          <Button
            className={css({
              width: '100%',
              maxWidth: '100%',
            })}
            onClick={() => {
              history.push(`/product-suggestions/products?filterId=${id}`);
            }}
            label={hasSuggestionList ? '다른 매물도 제안하기' : '매물 제안하기'}
          />
        </CTAButtonBlock>
      </IonFooter>
    </IonPage>
  );
};

export default ProductFilterDetailPage;
