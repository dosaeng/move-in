import { IonContent, IonFooter, IonPage } from '@ionic/react';
import {
  Button,
  CTAButtonBlock,
  Divider,
  ProductCostView,
  ProductMoveInView,
  ProductSuggestionRatingGraph,
  ProductSuggestionRatingView,
} from '@move-in/design-system';
import { css } from '@move-in/styled-system/css';
import { useMemo } from 'react';
import ProductListItem from '../../../product/components/ProductListItem';
import useProductDetail from '../../../product/hooks/useProductDetail';
import { useProductSuggestionFormContext } from '../../hooks/useProductSuggestionFormState';

interface Props {
  filterId: string | number;
  productId: string | number;
  onNext?: () => void;
}

const ProductSuggestionFormConfirmPage: React.FC<Props> = ({
  productId,
  onNext,
}) => {
  const { data: productDetail } = useProductDetail(productId);
  const { data: formData } = useProductSuggestionFormContext();
  const lifestylePreference = formData?.productSuggestion?.lifestylePreference;
  const lifestylePreferenceData = useMemo(() => {
    return {
      score: lifestylePreference?.score,
      comment: lifestylePreference?.comment,
      selected: [
        lifestylePreference?.traffic,
        lifestylePreference?.livingOption,
        lifestylePreference?.communityLife,
        lifestylePreference?.livingInfra,
        lifestylePreference?.educationLife,
      ]
        .filter((item) => item != null)
        .flat() as {
        key: number;
        value: string;
      }[],
    };
  }, [lifestylePreference]);

  return (
    <IonPage>
      <IonContent
        className={css({
          '--padding-top': '24px',
          '--padding-bottom': '40px',
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            paddingX: '16px',
            gap: '40px',
          })}
        >
          <h2
            className={css({
              textStyle: 'header-24-sb',
              color: 'text.dark.04',
            })}
          >
            아래을 제안을 보내시겠습니까?
          </h2>
          {productDetail && (
            <ProductListItem
              className={css({
                border: '1px solid #E4E4E4',
                borderRadius: '16px',
                padding: '16px',
                cursor: 'default',
              })}
              data={productDetail}
            />
          )}
        </div>
        <Divider
          className={css({
            marginY: '20px',
          })}
          size="s"
        />
        <div
          className={css({
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          })}
        >
          <ProductSuggestionRatingGraph
            className={css({
              maxWidth: '360px',
            })}
            ratings={{
              familyPreference:
                formData?.productSuggestion?.familyPreference?.score,
              costPreference:
                formData?.productSuggestion?.costPreference?.score,
              lifestylePreference:
                formData?.productSuggestion?.lifestylePreference?.score,
              productPreference:
                formData?.productSuggestion?.productPreference?.score,
              moveInPreference:
                formData?.productSuggestion?.moveInPreference?.score,
            }}
          />
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '48px',
            width: '100%',
            overflowX: 'hidden',
          })}
        >
          <ProductSuggestionRatingView
            title="함께 하는 가족"
            data={formData?.productSuggestion?.familyPreference}
          />
          <ProductSuggestionRatingView
            title="희망 입주 시기"
            data={formData?.productSuggestion?.moveInPreference}
            additionalContent={
              <ProductMoveInView
                minimumMoveInDate={productDetail?.minimumMoveInDate}
              />
            }
            hideComment
          />
          <ProductSuggestionRatingView
            title="주거 비용 예산"
            data={formData?.productSuggestion?.costPreference}
            additionalContent={<ProductCostView {...productDetail} />}
          />
          <ProductSuggestionRatingView
            title="원하는 집의 조건"
            data={formData?.productSuggestion?.productPreference}
          />
          <ProductSuggestionRatingView
            title="라이프 스타일"
            data={lifestylePreferenceData}
          />
        </div>
      </IonContent>
      <IonFooter className="ion-no-border">
        <CTAButtonBlock>
          <Button
            className={css({
              maxWidth: '100%',
            })}
            onClick={onNext}
            label="해당 매물 제안하기"
          />
        </CTAButtonBlock>
      </IonFooter>
    </IonPage>
  );
};

export default ProductSuggestionFormConfirmPage;
