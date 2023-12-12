import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import { Button, CTAButtonBlock, PageHeader } from '@move-in/move-in-design-system';
import { PageHeaderBackButton, PageHeaderCloseButton } from '@move-in/move-in-design-system/src/header/PageHeader';
import { css } from '@move-in/styled-system/css';
import { useHistory } from 'react-router-dom';
import StepIndicator from '../../components/create/base/StepIndicator';
import CostPreferenceTypeSelectBox from '../../components/create/form/CostPreferenceTypeSelectBox';
import DepositCurrencyInput from '../../components/create/form/DepositCurrencyInput';
import MonthlyRentCurrencyInput from '../../components/create/form/MonthlyRentCurrencyInput';
import ProductFilterCreateFormHeader from '../../components/create/ProductFilterCreateFormHeader';

const ProductFilterCreateFormStep3Page = () => {
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
          title="나의 관심 설정 3단계"
        />
      </IonHeader>
      <IonContent className="move-in-padding">
        <StepIndicator className={css({ marginBottom: '12px' })} step={3} maxStep={5} />
        <ProductFilterCreateFormHeader
          title="주거 비용 예산"
          subtitle="개략적인 시기를 알려주시면 더 좋은 추천을 해드려요"
        />
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          })}
        >
          <DepositCurrencyInput />
          <MonthlyRentCurrencyInput />
          <CostPreferenceTypeSelectBox />
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
              history.push('/product-filters-create/step4');
            }}
            label={'다음'}
          />
        </CTAButtonBlock>
      </IonFooter>
    </IonPage>
  );
};

export default ProductFilterCreateFormStep3Page;
