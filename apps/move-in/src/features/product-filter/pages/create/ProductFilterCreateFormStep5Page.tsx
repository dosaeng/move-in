import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import { Button, CTAButtonBlock, PageHeader, StepIndicator } from '@move-in/design-system';
import { PageHeaderBackButton, PageHeaderCloseButton } from '@move-in/design-system/src/header/PageHeader';
import { css } from '@move-in/styled-system/css';
import ProductFilterCreateFormHeader from '../../components/create/ProductFilterCreateFormHeader';
import ExtraOptionSelectBox from '../../components/create/form/ExtraOptionSelectBox';
import TrafficLifeSelectBox from '../../components/create/form/TrafficLifeSelectBox';

const ProductFilterCreateFormStep5Page: React.FC<{
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
          title="나의 관심 설정 5단계"
        />
      </IonHeader>
      <IonContent className="move-in-padding">
        <StepIndicator className={css({ marginBottom: '12px' })} step={5} maxStep={5} />
        <ProductFilterCreateFormHeader title="라이프 스타일" subtitle="원하는 라이프 스타일을 설명해주세요" />
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          })}
        >
          <TrafficLifeSelectBox />
          <ExtraOptionSelectBox />
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
            label={'입력을 모두 마쳤어요'}
          />
        </CTAButtonBlock>
      </IonFooter>
    </IonPage>
  );
};

export default ProductFilterCreateFormStep5Page;
