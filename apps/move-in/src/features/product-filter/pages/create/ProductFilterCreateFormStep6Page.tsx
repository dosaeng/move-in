import ProductSuggestionRequestModal from '@/features/product-suggestion/components/ProductSuggestionRequestModal';
import ProductSuggestionRequestNudgePopup from '@/features/product-suggestion/components/ProductSuggestionRequestNudgePopup';
import { IonContent, IonFooter, IonHeader, IonPage } from '@ionic/react';
import { Button, CTAButtonBlock, PageHeader, TextField, useToast } from '@move-in/design-system';
import { PageHeaderBackButton, PageHeaderCloseButton } from '@move-in/design-system/src/header/PageHeader';
import { css } from '@move-in/styled-system/css';
import { useState } from 'react';
import ProductFilterCreateFormHeader from '../../components/create/ProductFilterCreateFormHeader';
import { useProductFilterCreateFormState } from '../../hooks/useProductFilterCreateFormState';
import useCreateProductFilter from '../../hooks/useCreateProductFilter';
import useRequestProductConsulting from '../../hooks/useRequestProductConsulting';

const ProductFilterCreateFormStep5Page: React.FC<{
  onBack: () => void;
  onClose: () => void;
  onNext: () => void;
}> = ({ onBack, onClose, onNext }) => {
  const { data, setData } = useProductFilterCreateFormState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNudgeOpen, setIsNudgeOpen] = useState(false);
  const [filterId, setFilterId] = useState<number | undefined>();
  const { present } = useToast();
  const { mutate: createFilter, isLoading: isLoadingCreateFilter } = useCreateProductFilter({
    onSuccess: ({ id }) => {
      setFilterId(id);

      if (id == null) return;

      setIsModalOpen(true);
    },
    onError: () => {
      present('필터 생성에 실패했습니다.', 500);
    },
  });
  const { mutate: requestConsulting, isLoading: isLoadingRequestConsulting } = useRequestProductConsulting({
    onSuccess: () => {
      present(`‘${visibleFilterName}’로 제안 요청을 했어요.`, 500);
      onNext && onNext();
    },
    onError: () => {
      present('제안 요청에 실패했습니다.', 500);
    },
  });
  const filterName = data?.name ?? '';
  const defaultFilterName = data?.defaultName ?? '';
  const hasFilterName = filterName.length > 0;
  const visibleFilterName = hasFilterName ? filterName : defaultFilterName;

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <PageHeader
          left={<PageHeaderBackButton onClick={onBack} />}
          right={<PageHeaderCloseButton onClick={onClose} />}
          title="나의 관심 설정"
        />
      </IonHeader>
      <IonContent className="move-in-padding">
        <ProductFilterCreateFormHeader
          title={
            <>
              작성하신 필터에
              <br />
              별명을 붙여주세요
            </>
          }
        />
        <TextField
          id="filter-name"
          type="text"
          defaultValue={filterName}
          label="기억하기 쉽게 지어주세요"
          helperText="기억하기 쉽게 지어주세요 (ex - 강남 신혼집 가성비 구성)"
          placeholder="기억하기 쉽게 지어주세요 (ex - 강남 신혼집 가성비 구성)"
          onChange={(e) => {
            setData({
              ...data,
              name: e.target.value,
            });
          }}
        />
      </IonContent>
      <IonFooter className="ion-no-border">
        <CTAButtonBlock>
          <Button
            className={css({
              width: '100%',
              maxWidth: '100%',
            })}
            disabled={isLoadingCreateFilter || isLoadingRequestConsulting}
            label={hasFilterName ? '완료했어요' : '넘어갈께요'}
            onClick={() => {
              createFilter(data!);
            }}
          />
        </CTAButtonBlock>
      </IonFooter>
      <ProductSuggestionRequestModal
        filterName={visibleFilterName}
        isOpen={isModalOpen}
        onDidDismiss={(isAgree) => {
          setIsModalOpen(false);

          if (isAgree) {
            requestConsulting(filterId!);

            return;
          }

          setIsNudgeOpen(true);
        }}
      />
      <ProductSuggestionRequestNudgePopup
        isOpen={isNudgeOpen}
        onDidDismiss={(isAgree) => {
          setIsNudgeOpen(false);

          if (isAgree) {
            requestConsulting(filterId!);
            return;
          }

          present(`‘${visibleFilterName}’가 생성되었습니다.`, 500);
          onNext && onNext();
        }}
      />
    </IonPage>
  );
};

export default ProductFilterCreateFormStep5Page;
