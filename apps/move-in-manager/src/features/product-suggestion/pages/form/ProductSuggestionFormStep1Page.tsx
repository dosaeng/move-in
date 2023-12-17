import { IonContent, IonFooter, IonPage } from '@ionic/react';
import { Button, CTAButtonBlock, ChipButtonList, RatingInput, TextArea } from '@move-in/design-system';
import { css } from '@move-in/styled-system/css';
import useProductFilterDetail from '../../../product-filter/hooks/useProductFilterDetail';
import FormInputContainer from '../../components/FormInputContainer';
import FormPageHeader from '../../components/FormPageHeader';

interface Props {
  filterId: string | number;
  onNext?: () => void;
}

const ProductSuggestionFormStep1Page: React.FC<Props> = ({ filterId, onNext }) => {
  const { data } = useProductFilterDetail(filterId);

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
          <FormInputContainer prefix="01-A" label="해당 부문에 대한 적합도를 평가해주세요">
            <RatingInput size={48} />
          </FormInputContainer>
          <FormInputContainer prefix="01-B" label="해당 매물이 만족하는 사항을 골라주세요">
            <ChipButtonList options={data?.familyPreference} />
          </FormInputContainer>
          <FormInputContainer prefix="01-C" label="해당 내용에 대한 커멘트를 작성해주세요">
            <TextArea placeholder="여기에 내용을 입력해주세요" maxLength={2000} />
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

export default ProductSuggestionFormStep1Page;
