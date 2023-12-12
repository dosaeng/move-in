import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import { Button, CTAButtonBlock, PageHeader } from '@move-in/move-in-design-system';
import { PageHeaderBackButton, PageHeaderCloseButton } from '@move-in/move-in-design-system/src/header/PageHeader';
import { css } from '@move-in/styled-system/css';
import { useHistory } from 'react-router-dom';
import StepIndicator from '../../components/create/base/StepIndicator';
import FamilyTypeSelectBox from '../../components/create/form/FamilyTypeSelectBox';
import MinimumRoomCountSelectBox from '../../components/create/form/MinimumRoomCountSelectBox';
import PetPresenceSelectBox from '../../components/create/form/PetPresenceSelectBox';
import ProductMinimumSizeSelectBox from '../../components/create/form/ProductMinimumSizeSelectBox';
import ProductFilterCreateFormHeader from '../../components/create/ProductFilterCreateFormHeader';

const ProductFilterCreateFormStep1Page = () => {
  const history = useHistory();

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
          right={
            <PageHeaderCloseButton
              onClick={() => {
                history.replace('/product-filters');
              }}
            />
          }
          title="나의 관심 설정 1단계"
        />
      </IonHeader>
      <IonContent className="move-in-padding">
        <StepIndicator className={css({ marginBottom: '12px' })} step={1} maxStep={5} />
        <ProductFilterCreateFormHeader title="함께 하는 가족" />
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          })}
        >
          <FamilyTypeSelectBox />
          <PetPresenceSelectBox />
          <ProductMinimumSizeSelectBox />
          <MinimumRoomCountSelectBox />
        </div>
      </IonContent>
      <IonFooter className="ion-no-border">
        <CTAButtonBlock>
          <Button
            className={css({
              width: '100%',
              maxWidth: '100%',
            })}
            onClick={() => {
              history.push('/product-filters-create/step2');
            }}
            label={'다음'}
          />
        </CTAButtonBlock>
      </IonFooter>
    </IonPage>
  );
};

export default ProductFilterCreateFormStep1Page;
