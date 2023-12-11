import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import { Button, CTAButtonBlock, PageHeader } from '@move-in/move-in-design-system';
import { PageHeaderBackButton, PageHeaderCloseButton } from '@move-in/move-in-design-system/src/header/PageHeader';
import { useHistory } from 'react-router-dom';
import { css } from '@move-in/styled-system/css';

const ProductFilterCreateFormStep5Page = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <PageHeader
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
                history.replace('/product-filters');
              }}
            />
          }
          title="나의 관심 설정"
        />
      </IonHeader>
      <IonContent></IonContent>
      <IonFooter className="ion-no-border">
        <CTAButtonBlock>
          <Button
            className={css({
              width: '100%',
              maxWidth: '100%',
            })}
            onClick={() => {
              history.push('/product-filters');
            }}
            label={'넘어갈게요'}
          />
        </CTAButtonBlock>
      </IonFooter>
    </IonPage>
  );
};

export default ProductFilterCreateFormStep5Page;