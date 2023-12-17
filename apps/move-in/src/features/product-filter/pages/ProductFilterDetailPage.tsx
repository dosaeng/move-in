import ProductSuggestionListView from '@/features/product-suggestion/components/ProductSuggestionListView';
import { IonContent, IonHeader, IonPage } from '@ionic/react';
import { IconButton, IconDotsVertical, PageHeader, ChipButtonList, useToast } from '@move-in/design-system';
import { PageHeaderBackButton } from '@move-in/design-system/src/header/PageHeader';
import { css } from '@move-in/styled-system/css';
import { useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import ProductFilterDetailActionModal from '../components/ProductFilterDetailActionModal';

import ProductSuggestionStopRequestPopup from '@/features/product-suggestion/components/ProductSuggestionStopRequestPopup';
import ProductFilterDeleteRequestPopup from '../components/ProductFilterDeleteRequestPopup';
import useProductFilterDetail from '../hooks/useProductFilterDetail';

const ProductFilterDetailPage: React.FC<
  RouteComponentProps<{
    id: string;
  }>
> = ({ match }) => {
  const history = useHistory();
  const filterId = match.params.id;
  const { data: detail, isLoading: isLoading } = useProductFilterDetail(filterId);
  const [isOpenActionModal, setIsOpenActionModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenStopRequestModal, setIsOpenStopRequestModal] = useState(false);
  const { present } = useToast();

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
        fullscreen
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
          <span>강남 영끌 신혼집 {match.params.id}</span>
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

          // TODO. 삭제 요청 API 호출
          present(`‘${detail?.name}’가 삭제되었습니다.`);
          history.goBack();
        }}
      />
      <ProductSuggestionStopRequestPopup
        filterName={detail?.name}
        isOpen={isOpenStopRequestModal}
        onDidDismiss={(isAgree) => {
          setIsOpenStopRequestModal(false);

          if (!isAgree) return;

          present(`‘${detail?.name}’에 대한 제안이 중지되었습니다.`);
          // TODO. 제안 중지 요청 API 호출
        }}
      />
    </IonPage>
  );
};

export default ProductFilterDetailPage;
