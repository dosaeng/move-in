import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import { Button, CTAButtonBlock, PageHeader, StepIndicator } from '@move-in/design-system';
import { PageHeaderBackButton, PageHeaderCloseButton } from '@move-in/design-system/src/header/PageHeader';
import { css } from '@move-in/styled-system/css';
import ProductFilterCreateFormHeader from '../../components/create/ProductFilterCreateFormHeader';
import FamilyTypeSelectBox from '../../components/create/form/FamilyTypeSelectBox';
import MinimumRoomCountSelectBox from '../../components/create/form/MinimumRoomCountSelectBox';
import PetPresenceSelectBox from '../../components/create/form/PetPresenceSelectBox';
import ProductMinimumSizeSelectBox from '../../components/create/form/ProductMinimumSizeSelectBox';
import { useProductFilterCreateFormState } from '../../hooks/useProductFilterCreateFormState';

const ProductFilterCreateFormStep1Page: React.FC<{
  onBack: () => void;
  onClose: () => void;
  onNext: () => void;
}> = ({ onBack, onClose, onNext }) => {
  const { data, setData } = useProductFilterCreateFormState();
  const isValid =
    data?.familyTypeId != null &&
    data?.petPresenceId != null &&
    data?.productMinimumSizeId != null &&
    data?.minimumRoomCountId != null;

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <PageHeader
          left={<PageHeaderBackButton onClick={onBack} />}
          right={<PageHeaderCloseButton onClick={onClose} />}
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
          <FamilyTypeSelectBox
            defaultValue={data?.familyTypeId}
            onChange={(value) => {
              setData({
                ...data,
                familyTypeId: value,
              });
            }}
          />
          <PetPresenceSelectBox
            defaultValue={data?.petPresenceId}
            onChange={(value) => {
              setData({
                ...data,
                petPresenceId: value,
              });
            }}
          />
          <ProductMinimumSizeSelectBox
            defaultValue={data?.productMinimumSizeId}
            onChange={(value) => {
              setData({
                ...data,
                productMinimumSizeId: value,
              });
            }}
          />
          <MinimumRoomCountSelectBox
            defaultValue={data?.minimumRoomCountId}
            onChange={(value) => {
              setData({
                ...data,
                minimumRoomCountId: value,
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

export default ProductFilterCreateFormStep1Page;
