import ProductSuggestionListView from '@/features/product-suggestion/components/ProductSuggestionListView';
import { IonContent, IonHeader, IonPage, IonSkeletonText } from '@ionic/react';
import {
  ChipButtonList,
  IconButton,
  IconDotsVertical,
  PageHeader,
  useToast,
} from '@move-in/design-system';
import { PageHeaderBackButton } from '@move-in/design-system/src/header/PageHeader';
import { css } from '@move-in/styled-system/css';
import { RouteComponentProps, useHistory } from 'react-router-dom';

import useProductFilterDetail from '../hooks/useProductFilterDetail';
import { useState } from 'react';
import ProductFilterDetailActionModal from '../components/ProductFilterDetailActionModal';
import ProductFilterDeleteRequestPopup from '../components/ProductFilterDeleteRequestPopup';
import ProductSuggestionStopRequestPopup from '@/features/product-suggestion/components/ProductSuggestionStopRequestPopup';
import useRequestStopProductConsulting from '../hooks/useRequestStopProductConsulting';
import useDeleteProductFilter from '../hooks/useDeleteProductFilter';

const ProductFilterDetailPage: React.FC<
  RouteComponentProps<{
    id: string;
  }>
> = ({ match }) => {
  const history = useHistory();
  const filterId = match.params.id;
  const { data: detail, isLoading: isLoadingDetail } =
    useProductFilterDetail(filterId);
  const { mutate: requestStopConsulting, isLoading: isLoadingStop } =
    useRequestStopProductConsulting({
      onSuccess: () => {
        present(`‘${detail?.name}’에 대한 제안이 중지되었습니다.`, 500);
      },
      onError: () => {
        present(`제안 중지 요청에 실패하였습니다.`, 500);
      },
    });
  const { mutate: deleteFilter, isLoading: isLoadingDelete } =
    useDeleteProductFilter({
      onSuccess: () => {
        present(`‘${detail?.name}’가 삭제되었습니다.`, 500);
        history.goBack();
      },
      onError: () => {
        present(`삭제 요청에 실패하였습니다.`, 500);
      },
    });
  const [isOpenActionModal, setIsOpenActionModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenStopRequestModal, setIsOpenStopRequestModal] = useState(false);
  const { present } = useToast();
  const isLoading = isLoadingDetail || isLoadingStop || isLoadingDelete;

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <PageHeader
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
          '--padding-top': '24px',
          '--padding-bottom': '40px',
        })}
      >
        <h2
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
            textStyle: 'header-26-b',
            paddingX: '16px',
            marginBottom: '24px',
          })}
        >
          {isLoading ? (
            <IonSkeletonText
              style={{
                width: '50%',
                maxWidth: '150px',
                height: '26px',
                borderRadius: '4px',
              }}
              animated
            />
          ) : (
            <span>{detail?.name}</span>
          )}
          <IconButton
            shape="clear"
            theme="neutral"
            size="s"
            icon={<IconDotsVertical />}
            onClick={
              !isLoading
                ? () => {
                    setIsOpenActionModal(true);
                  }
                : undefined
            }
          />
        </h2>
        <div
          className={css({
            borderY: '1px solid',
            borderColor: 'stroke.light.02',
            backgroundColor: 'fill.light.02',
            padding: '20px',
            marginBottom: '32px',
          })}
        >
          <ChipButtonList
            className={css({
              minHeight: '33px',
            })}
            options={detail?.filterList}
            readOnly
          />
        </div>
        <ProductSuggestionListView
          className={css({
            paddingX: '16px',
          })}
          filterId={filterId}
          onClick={(item) => {
            history.push(`/product-suggestions/${item.id}`);
          }}
        />
      </IonContent>
      {!isLoading && (
        <ProductFilterDetailActionModal
          data={detail!}
          isOpen={isOpenActionModal}
          onDidDismiss={(action) => {
            setIsOpenActionModal(false);

            switch (action) {
              case 'EDIT':
                history.push(`/product-filters/${filterId}/update`);
                break;
              case 'STOP_REQUEST':
                setIsOpenStopRequestModal(true);
                break;
              case 'DELETE':
                setIsOpenDeleteModal(true);
                break;
            }
          }}
        />
      )}
      <ProductFilterDeleteRequestPopup
        filterName={detail?.name}
        isOpen={isOpenDeleteModal}
        onDidDismiss={(isAgree) => {
          setIsOpenDeleteModal(false);

          if (!isAgree) return;

          deleteFilter(filterId);
        }}
      />
      <ProductSuggestionStopRequestPopup
        filterName={detail?.name}
        isOpen={isOpenStopRequestModal}
        onDidDismiss={(isAgree) => {
          setIsOpenStopRequestModal(false);

          if (!isAgree) return;

          requestStopConsulting(filterId);
        }}
      />
    </IonPage>
  );
};

export default ProductFilterDetailPage;
