import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import { Button, CTAButtonBlock, PageHeader } from '@move-in/design-system';
import { PageHeaderBackButton } from '@move-in/design-system/src/header/PageHeader';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import ProductFilterDetailView from '../components/ProductFilterDetailView';
import { css } from '@move-in/styled-system/css';

const ProductFilterDetailPage: React.FC<RouteComponentProps<{ id: string }>> = ({ match }) => {
  const history = useHistory();
  const { id } = match.params;

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <PageHeader
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
            onClick={() => {}}
            label="다른 매물도 제안하기"
          />
        </CTAButtonBlock>
      </IonFooter>
    </IonPage>
  );
};

export default ProductFilterDetailPage;
