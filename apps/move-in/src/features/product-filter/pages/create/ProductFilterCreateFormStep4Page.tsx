import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import { Button, CTAButtonBlock, PageHeader } from '@move-in/design-system';
import { PageHeaderBackButton, PageHeaderCloseButton } from '@move-in/design-system/src/header/PageHeader';
import { css } from '@move-in/styled-system/css';
import ProductFilterCreateFormHeader from '../../components/create/ProductFilterCreateFormHeader';
import StepIndicator from '../../components/create/base/StepIndicator';
import ItemHouseConditionSelectBox from '../../components/create/form/ItemHouseConditionSelectBox';
import ItemHouseTypeSelectBox from '../../components/create/form/ItemHouseTypeSelectBox';
import ItemWishListSelectBox from '../../components/create/form/ItemWishListSelectBox';
import PreferredRegionSelectBox from '../../components/create/form/PreferredRegionSelectBox';

const ProductFilterCreateFormStep4Page: React.FC<{
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
          title="나의 관심 설정 4단계"
        />
      </IonHeader>
      <IonContent className="move-in-padding">
        <StepIndicator className={css({ marginBottom: '12px' })} step={4} maxStep={5} />
        <ProductFilterCreateFormHeader
          title="원하는 집의 조건"
          subtitle="원하는 조건을 알려주시면 딱 맞는 집을 추천해 드려요"
        />
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          })}
        >
          <PreferredRegionSelectBox />
          <ItemHouseTypeSelectBox />
          <ItemHouseConditionSelectBox />
          <ItemWishListSelectBox />
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

export default ProductFilterCreateFormStep4Page;
