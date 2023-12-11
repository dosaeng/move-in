import ProductSuggestionListView from '@/features/product-suggestion/components/ProductSuggestionListView';
import { IonContent, IonHeader, IonPage } from '@ionic/react';
import { IconButton, IconDotsVertical, PageHeader } from '@move-in/move-in-design-system';
import { PageHeaderBackButton } from '@move-in/move-in-design-system/src/header/PageHeader';
import { css } from '@move-in/styled-system/css';
import { useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import ProductFilterDetailActionModal from '../components/ProductFilterDetailActionModal';
import ProductFilterTagList from '../components/ProductFilterTagList';
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
          <ProductFilterTagList
            className={css({
              minHeight: '33px',
            })}
            tags={detail?.filterList ?? []}
          />
        </div>
        <ProductSuggestionListView
          className={css({
            paddingX: '16px',
          })}
          filterId={filterId}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onClick={(_item) => {
            // TODO: 상세 페이지로 이동
          }}
        />
      </IonContent>
      {!isLoading && (
        <ProductFilterDetailActionModal
          data={detail!}
          isOpen={isOpenActionModal}
          onDidDismiss={() => {
            setIsOpenActionModal(false);
          }}
        />
      )}
    </IonPage>
  );
};

export default ProductFilterDetailPage;
