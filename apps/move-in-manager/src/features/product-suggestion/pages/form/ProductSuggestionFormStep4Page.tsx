import { IonContent, IonFooter, IonPage } from '@ionic/react';
import {
  Button,
  CTAButtonBlock,
  ChipButtonList,
  RatingInput,
  TextArea,
} from '@move-in/design-system';
import { css } from '@move-in/styled-system/css';
import useProductFilterDetail from '../../../product-filter/hooks/useProductFilterDetail';
import FormInputContainer from '../../components/FormInputContainer';
import FormPageHeader from '../../components/FormPageHeader';
import { useProductSuggestionFormContext } from '../../hooks/useProductSuggestionFormState';

interface Props {
  filterId: string | number;
  onNext?: () => void;
}

const ProductSuggestionFormStep4Page: React.FC<Props> = ({
  filterId,
  onNext,
}) => {
  const { data: filterDetail } = useProductFilterDetail(filterId);
  const { data: formData, setData: setFormData } =
    useProductSuggestionFormContext();
  const isValid =
    !!formData?.productSuggestion?.productPreference?.score &&
    !!formData?.productSuggestion?.productPreference?.comment?.length;

  return (
    <IonPage>
      <IonContent className="move-in-padding">
        <FormPageHeader
          className={css({
            marginBottom: '12px',
          })}
          title="원하는 집의 조건"
          step={4}
        />
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          })}
        >
          <ChipButtonList
            options={filterDetail?.productPreference.position}
            readOnly
          />
          <FormInputContainer
            prefix="04-A"
            label="해당 부문에 대한 적합도를 평가해주세요"
          >
            <RatingInput
              size={48}
              defaultValue={
                formData?.productSuggestion?.productPreference?.score
              }
              onChange={(value) => {
                setFormData({
                  ...formData,
                  productSuggestion: {
                    ...formData?.productSuggestion,
                    productPreference: {
                      ...formData?.productSuggestion?.productPreference,
                      score: value,
                    },
                  },
                });
              }}
            />
          </FormInputContainer>
          <FormInputContainer
            prefix="04-B"
            label="해당 매물이 만족하는 사항을 골라주세요"
          >
            <ChipButtonList
              options={filterDetail?.productPreference.type}
              defaultValue={
                formData?.productSuggestion?.productPreference?.selected
              }
              onChange={(value) => {
                setFormData({
                  ...formData,
                  productSuggestion: {
                    ...formData?.productSuggestion,
                    productPreference: {
                      ...formData?.productSuggestion?.productPreference,
                      selected: value,
                    },
                  },
                });
              }}
            />
          </FormInputContainer>
          <FormInputContainer
            prefix="04-C"
            label="해당 내용에 대한 커멘트를 작성해주세요"
          >
            <TextArea
              placeholder="여기에 내용을 입력해주세요"
              maxLength={2000}
              defaultValue={
                formData?.productSuggestion?.productPreference?.comment
              }
              onChange={(event) => {
                setFormData({
                  ...formData,
                  productSuggestion: {
                    ...formData?.productSuggestion,
                    productPreference: {
                      ...formData?.productSuggestion?.productPreference,
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

export default ProductSuggestionFormStep4Page;
