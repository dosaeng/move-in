import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import { Button, CTAButtonBlock, PageHeader, StepIndicator } from '@move-in/design-system';
import { PageHeaderBackButton, PageHeaderCloseButton } from '@move-in/design-system/src/header/PageHeader';
import { css } from '@move-in/styled-system/css';
import ProductFilterCreateFormHeader from '../../components/create/ProductFilterCreateFormHeader';
import DateInputField from '../../components/create/base/DateInputField';

const ProductFilterCreateFormStep2Page: React.FC<{
  onBack: () => void;
  onClose: () => void;
  onNext: () => void;
}> = ({ onBack, onClose, onNext }) => {
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <PageHeader
          left={<PageHeaderBackButton onClick={onBack} />}
          right={<PageHeaderCloseButton onClick={onClose} />}
          title="나의 관심 설정 2단계"
        />
      </IonHeader>
      <IonContent className="move-in-padding">
        <StepIndicator className={css({ marginBottom: '12px' })} step={2} maxStep={5} />
        <ProductFilterCreateFormHeader
          title="희망 입주 시기"
          subtitle="개략적인 시기를 알려주시면 더 좋은 추천을 해드려요"
        />
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          })}
        >
          <DateInputField id="start-date" suffix="이후" />
          <DateInputField id="end-date" suffix="까지" />
        </div>
      </IonContent>
      <IonFooter className="ion-no-border">
        <CTAButtonBlock>
          <Button
            className={css({
              width: '100%',
              maxWidth: '100%',
            })}
            onClick={onNext}
            label={'다음'}
          />
        </CTAButtonBlock>
      </IonFooter>
    </IonPage>
  );
};

export default ProductFilterCreateFormStep2Page;
