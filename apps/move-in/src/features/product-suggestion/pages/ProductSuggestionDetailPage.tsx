import ProductConsultingRequestModal from '@/features/product-consulting/components/ProductConsultingRequestModal';
import ProductConsultingRequestNudgePopup from '@/features/product-consulting/components/ProductConsultingRequestNudgePopup';
import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import {
  Button,
  CTAButtonBlock,
  Divider,
  PageHeader,
  useToast,
} from '@move-in/design-system';
import { PageHeaderBackButton } from '@move-in/design-system/src/header/PageHeader';
import { css } from '@move-in/styled-system/css';
import { useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import ProductAgentSection from '../components/detail/ProductAgentSection';
import ProductDetailSection from '../components/detail/ProductDetailSection';
import ProductSuggestionSection from '../components/detail/ProductSuggestionSection';

const ProductSuggestionDetailPage: React.FC<
  RouteComponentProps<{
    id: string;
    filterId: string;
  }>
> = ({ match }) => {
  const history = useHistory();
  const detailId = match.params.id;
  const filterId = match.params.filterId;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNudgeOpen, setIsNudgeOpen] = useState(false);
  const { present } = useToast();

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <PageHeader
          title={`${detailId} 제안 상세`}
          left={
            <PageHeaderBackButton
              onClick={() => {
                history.goBack();
              }}
            />
          }
        />
      </IonHeader>
      <IonContent
        className={css({
          '--padding-top': '20px',
          '--padding-bottom': '40px',
        })}
      >
        <ProductDetailSection id={detailId} filterId={filterId} />
        <Divider
          className={css({
            marginY: '48px',
          })}
          size="m"
        />
        <ProductSuggestionSection id={detailId} filterId={filterId} />
        <ProductAgentSection id={detailId} filterId={filterId} />
      </IonContent>
      <IonFooter className="ion-no-border">
        <CTAButtonBlock>
          <Button
            className={css({
              maxWidth: '100%',
            })}
            onClick={() => setIsModalOpen(true)}
            label="상담 요청하기"
          />
        </CTAButtonBlock>
      </IonFooter>
      <ProductConsultingRequestModal
        isOpen={isModalOpen}
        onDidDismiss={(isAgree) => {
          setIsModalOpen(false);

          if (!isAgree) {
            setIsNudgeOpen(true);
            return;
          }

          // TODO. 상담 요청 API 호출

          present(`3영업일 이내로 중개사에게 연락이 갈거에요.`, 500);
          history.goBack();
        }}
      />
      <ProductConsultingRequestNudgePopup
        isOpen={isNudgeOpen}
        onDidDismiss={(isAgree) => {
          setIsNudgeOpen(false);

          if (!isAgree) return;

          // TODO. 상담 요청 API 호출
          present(`3영업일 이내로 중개사에게 연락이 갈거에요.`, 500);
          history.goBack();
        }}
      />
    </IonPage>
  );
};

export default ProductSuggestionDetailPage;
