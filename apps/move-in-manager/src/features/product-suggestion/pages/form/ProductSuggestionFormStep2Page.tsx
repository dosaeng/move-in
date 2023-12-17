import { IonContent, IonFooter, IonPage } from '@ionic/react';
import { Button, CTAButtonBlock, ChipButtonList, ProductMoveInView, RatingInput } from '@move-in/design-system';
import { css } from '@move-in/styled-system/css';
import useProductFilterDetail from '../../../product-filter/hooks/useProductFilterDetail';
import useProductDetail from '../../../product/hooks/useProductDetail';
import FormInputContainer from '../../components/FormInputContainer';
import FormPageHeader from '../../components/FormPageHeader';

interface Props {
  filterId: string | number;
  productId: string | number;
  onNext?: () => void;
}

const ProductSuggestionFormStep2Page: React.FC<Props> = ({ filterId, productId, onNext }) => {
  const { data: filterDetail } = useProductFilterDetail(filterId);
  const { data: productDetail } = useProductDetail(productId);

  return (
    <IonPage>
      <IonContent
        className={css({
          '--padding-top': '24px',
          '--padding-bottom': '40px',
        })}
      >
        <FormPageHeader
          className={css({
            marginBottom: '12px',
            paddingX: '16px',
          })}
          title="희망 입주 시기"
          step={2}
        />
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          })}
        >
          <ChipButtonList
            className={css({
              paddingX: '16px',
            })}
            options={filterDetail?.moveInPreference}
            readOnly
          />
          <ProductMoveInView minimumMoveInDate={productDetail?.minimumMoveInDate} />
          <FormInputContainer
            className={css({
              paddingX: '16px',
            })}
            prefix="02-A"
            label="해당 부문에 대한 적합도를 평가해주세요"
          >
            <RatingInput size={48} />
          </FormInputContainer>
        </div>
      </IonContent>
      <IonFooter className="ion-no-border">
        <CTAButtonBlock>
          <Button
            className={css({
              maxWidth: '100%',
            })}
            onClick={onNext}
            label="다음"
          />
        </CTAButtonBlock>
      </IonFooter>
    </IonPage>
  );
};

export default ProductSuggestionFormStep2Page;
