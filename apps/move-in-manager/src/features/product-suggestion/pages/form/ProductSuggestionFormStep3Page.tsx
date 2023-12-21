import { IonContent, IonFooter, IonPage } from '@ionic/react';
import {
  Button,
  CTAButtonBlock,
  ChipButtonList,
  ProductCostView,
  RatingInput,
  TextArea,
} from '@move-in/design-system';
import { css } from '@move-in/styled-system/css';
import useProductFilterDetail from '../../../product-filter/hooks/useProductFilterDetail';
import useProductDetail from '../../../product/hooks/useProductDetail';
import FormInputContainer from '../../components/FormInputContainer';
import FormPageHeader from '../../components/FormPageHeader';
import { useProductSuggestionFormContext } from '../../hooks/useProductSuggestionFormState';

interface Props {
  filterId: string | number;
  productId: string | number;
  onNext?: () => void;
}

const ProductSuggestionFormStep3Page: React.FC<Props> = ({
  filterId,
  productId,
  onNext,
}) => {
  const { data: filterDetail } = useProductFilterDetail(filterId);
  const { data: productDetail } = useProductDetail(productId);
  const { data: formData, setData: setFormData } =
    useProductSuggestionFormContext();
  const isValid =
    !!formData?.productSuggestion?.costPreference?.score &&
    !!formData?.productSuggestion?.costPreference?.comment?.length;

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
          title="주거 비용 예산"
          step={3}
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
            options={filterDetail?.costPreference}
            readOnly
          />
          <ProductCostView {...productDetail} />
          <FormInputContainer
            className={css({
              paddingX: '16px',
            })}
            prefix="03-A"
            label="해당 부문에 대한 적합도를 평가해주세요"
          >
            <RatingInput
              size={48}
              defaultValue={formData?.productSuggestion?.costPreference?.score}
              onChange={(value) => {
                setFormData({
                  ...formData,
                  productSuggestion: {
                    ...formData?.productSuggestion,
                    costPreference: {
                      ...formData?.productSuggestion?.costPreference,
                      score: value,
                    },
                  },
                });
              }}
            />
          </FormInputContainer>
          <FormInputContainer
            className={css({
              paddingX: '16px',
            })}
            prefix="03-B"
            label="해당 내용에 대한 커멘트를 작성해주세요"
          >
            <TextArea
              placeholder="여기에 내용을 입력해주세요"
              maxLength={2000}
              defaultValue={
                formData?.productSuggestion?.costPreference?.comment
              }
              onChange={(event) => {
                setFormData({
                  ...formData,
                  productSuggestion: {
                    ...formData?.productSuggestion,
                    costPreference: {
                      ...formData?.productSuggestion?.costPreference,
                      comment: event.target.value,
                    },
                  },
                });
              }}
            />
          </FormInputContainer>
        </div>
      </IonContent>
      <IonFooter className="ion-no-border">
        <CTAButtonBlock>
          <Button
            className={css({
              maxWidth: '100%',
            })}
            disabled={!isValid}
            onClick={onNext}
            label="다음"
          />
        </CTAButtonBlock>
      </IonFooter>
    </IonPage>
  );
};

export default ProductSuggestionFormStep3Page;
