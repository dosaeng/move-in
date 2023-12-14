import { IonContent, IonHeader, IonPage } from '@ionic/react';
import { Divider, PageHeader } from '@move-in/move-in-design-system';
import { PageHeaderBackButton } from '@move-in/move-in-design-system/src/header/PageHeader';
import { css } from '@move-in/styled-system/css';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import ProductDetailSection from '../components/detail/ProductDetailSection';

const ProductSuggestionDetailPage: React.FC<
  RouteComponentProps<{
    id: string;
  }>
> = ({ match }) => {
  const history = useHistory();
  const detailId = match.params.id;

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <PageHeader
          title={`${detailId} 제안 상세`}
          left={
            <PageHeaderBackButton
              onClick={() => {
                history.goBack();
              }}
            />
          }
        />
      </IonHeader>
      <IonContent
        className={css({
          '--padding-top': '20px',
          '--padding-bottom': '40px',
        })}
      >
        <ProductDetailSection id={detailId} />
        <Divider
          className={css({
            marginY: '48px',
          })}
          size="m"
        />
      </IonContent>
    </IonPage>
  );
};

export default ProductSuggestionDetailPage;
