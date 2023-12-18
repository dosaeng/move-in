import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import { Button, CTAButtonBlock, PageHeader, StepIndicator } from '@move-in/design-system';
import { PageHeaderBackButton, PageHeaderCloseButton } from '@move-in/design-system/src/header/PageHeader';
import { css } from '@move-in/styled-system/css';
import ProductFilterCreateFormHeader from '../../components/create/ProductFilterCreateFormHeader';
import CostPreferenceTypeSelectBox from '../../components/create/form/CostPreferenceTypeSelectBox';
import DepositCurrencyInput from '../../components/create/form/DepositCurrencyInput';
import MonthlyRentCurrencyInput from '../../components/create/form/MonthlyRentCurrencyInput';
import { useProductFilterCreateFormState } from '../../hooks/useProductFilterCreateFormState';

const ProductFilterCreateFormStep3Page: React.FC<{
  onBack: () => void;
  onClose: () => void;
  onNext: () => void;
}> = ({ onBack, onClose, onNext }) => {
  const { data, setData } = useProductFilterCreateFormState();
  const isValid =
    data?.deposit != null &&
    data?.minimumMonthlyCost != null &&
    data?.maximumMonthlyCost != null &&
    data?.costPreferenceId != null;

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <PageHeader
          left={<PageHeaderBackButton onClick={onBack} />}
          right={<PageHeaderCloseButton onClick={onClose} />}
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
          <DepositCurrencyInput
            defaultValue={data?.deposit}
            onChange={(value) => {
              setData({
                ...data,
                deposit: value,
              });
            }}
          />
          <MonthlyRentCurrencyInput
            defaultValue={{
              minimum: data?.minimumMonthlyCost,
              maximum: data?.maximumMonthlyCost,
            }}
            onChange={(value) => {
              setData({
                ...data,
                minimumMonthlyCost: value?.minimum,
                maximumMonthlyCost: value?.maximum,
              });
            }}
          />
          <CostPreferenceTypeSelectBox
            defaultValue={data?.costPreferenceId}
            onChange={(value) => {
              setData({
                ...data,
                costPreferenceId: value,
              });
            }}
          />
        </div>
      </IonContent>
      <IonFooter className="ion-no-border">
        <CTAButtonBlock>
          <Button
            className={css({
              width: '100%',
              maxWidth: '100%',
            })}
            disabled={!isValid}
            onClick={onNext}
            label={'다음'}
          />
        </CTAButtonBlock>
      </IonFooter>
    </IonPage>
  );
};

export default ProductFilterCreateFormStep3Page;
