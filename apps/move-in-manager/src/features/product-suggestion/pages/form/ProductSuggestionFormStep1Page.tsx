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

const ProductSuggestionFormStep1Page: React.FC<Props> = ({
  filterId,
  onNext,
}) => {
  const { data } = useProductFilterDetail(filterId);
  const { data: formData, setData: setFormData } =
    useProductSuggestionFormContext();
  const isValid =
    !!formData?.productSuggestion?.familyPreference?.score &&
    !!formData?.productSuggestion?.familyPreference?.comment?.length;

  return (
    <IonPage>
      <IonContent className="move-in-padding">
        <FormPageHeader
          className={css({
            marginBottom: '40px',
          })}
          title="함께 하는 가족"
          step={1}
        />
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          })}
        >
          <FormInputContainer
            prefix="01-A"
            label="해당 부문에 대한 적합도를 평가해주세요"
          >
            <RatingInput
              size={48}
              defaultValue={
                formData?.productSuggestion?.familyPreference?.score
              }
              onChange={(value) => {
                setFormData({
                  ...formData,
                  productSuggestion: {
                    ...formData?.productSuggestion,
                    familyPreference: {
                      ...formData?.productSuggestion?.familyPreference,
                      score: value,
                    },
                  },
                });
              }}
            />
          </FormInputContainer>
          <FormInputContainer
            prefix="01-B"
            label="해당 매물이 만족하는 사항을 골라주세요"
          >
            <ChipButtonList
              options={data?.familyPreference}
              defaultValue={
                formData?.productSuggestion?.familyPreference?.selected
              }
              onChange={(value) => {
                setFormData({
                  ...formData,
                  productSuggestion: {
                    ...formData?.productSuggestion,
                    familyPreference: {
                      ...formData?.productSuggestion?.familyPreference,
                      selected: value,
                    },
                  },
                });
              }}
            />
          </FormInputContainer>
          <FormInputContainer
            prefix="01-C"
            label="해당 내용에 대한 커멘트를 작성해주세요"
          >
            <TextArea
              placeholder="여기에 내용을 입력해주세요"
              maxLength={2000}
              defaultValue={
                formData?.productSuggestion?.familyPreference?.comment
              }
              onChange={(event) => {
                setFormData({
                  ...formData,
                  productSuggestion: {
                    ...formData?.productSuggestion,
                    familyPreference: {
                      ...formData?.productSuggestion?.familyPreference,
                      comment: event?.target.value,
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

export default ProductSuggestionFormStep1Page;
