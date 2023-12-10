import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import { Button, CTAButtonBlock, PageHeader } from '@move-in/move-in-design-system';
import { PageHeaderBackButton, PageHeaderCloseButton } from '@move-in/move-in-design-system/src/header/PageHeader';
import { css } from '@move-in/styled-system/css';
import { useHistory } from 'react-router-dom';
import StepIndicator from '../../components/create/base/StepIndicator';
import CostPreferenceTypeSelectBox from '../../components/create/form/CostPreferenceTypeSelectBox';
import DepositCurrencyInput from '../../components/create/form/DepositCurrencyInput';
import MonthlyRentCurrencyInput from '../../components/create/form/MonthlyRentCurrencyInput';

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
      <IonContent
        className={css({
          '--padding-top': '24px',
          '--padding-bottom': '40px',
          '--padding-start': '16px',
          '--padding-end': '16px',
        })}
      >
        <StepIndicator className={css({ marginBottom: '12px' })} step={3} maxStep={5} />
        <h2 className={css({ textStyle: 'header-24-sb', color: 'text.dark.04', marginBottom: '40px' })}>
          주거 비용 예산
        </h2>
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
