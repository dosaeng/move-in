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

const ProductSuggestionFormStep5Page: React.FC<Props> = ({ filterId, onNext }) => {
  const { data: filterDetail } = useProductFilterDetail(filterId);

  return (
    <IonPage>
      <IonContent className="move-in-padding">
        <FormPageHeader
          className={css({
            marginBottom: '40px',
          })}
          title="라이프 스타일"
          step={5}
        />
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
          })}
        >
          <FormInputContainer prefix="05-A" label="해당 부문에 대한 적합도를 평가해주세요">
            <RatingInput size={48} />
          </FormInputContainer>
          <FormInputContainer prefix="05-B" label="해당 매물이 만족하는 교통권 사항을 골라주세요">
            <ChipButtonList options={filterDetail?.lifestylePreference.traffic} />
          </FormInputContainer>
          <FormInputContainer prefix="05-C" label="만족하는 희망 구성 옵션 사항을 골라주세요">
            <ChipButtonList options={filterDetail?.lifestylePreference.livingOption} />
          </FormInputContainer>
          <FormInputContainer prefix="05-D" label="해당 매물이 만족하는 공동 생활 사항을 골라주세요">
            <ChipButtonList options={filterDetail?.lifestylePreference.communityLife} />
          </FormInputContainer>
          <FormInputContainer prefix="05-E" label="해당 매물이 만족하는 생활권 사항을 골라주세요">
            <ChipButtonList options={filterDetail?.lifestylePreference.livingInfra} />
          </FormInputContainer>
          <FormInputContainer prefix="05-F" label="해당 매물이 만족하는 학군 사항을 골라주세요">
            <ChipButtonList options={filterDetail?.lifestylePreference.educationLife} />
          </FormInputContainer>
          <FormInputContainer prefix="05-G" label="해당 매물이 만족하는 배달권 사항을 골라주세요">
            <ChipButtonList options={filterDetail?.lifestylePreference.deliveryLife} />
          </FormInputContainer>
          <FormInputContainer prefix="05-H" label="해당 내용에 대한 커멘트를 작성해주세요">
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

export default ProductSuggestionFormStep5Page;
