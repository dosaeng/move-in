import { IonContent, IonHeader, IonPage } from '@ionic/react';
import { PageHeader } from '@move-in/move-in-design-system';
import { css } from '@move-in/styled-system/css';
import { useHistory } from 'react-router-dom';
import ProductFilterListView from '../components/ProductFilterListView';
import useProductFilterListItem, { ProductFilterState } from '../hooks/useProductFilterList';
import { PageHeaderBackButton } from '@move-in/move-in-design-system/src/header/PageHeader';

const ProductFilterDraftListPage: React.FC = () => {
  const history = useHistory();
  const { data, isSuccess } = useProductFilterListItem();
  const isEmpty = isSuccess && data?.length === 0;

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
            marginBottom: '40px',
            paddingX: '16px',
          })}
        >
          임시저장
        </h2>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
          })}
        >
          {isEmpty ? (
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textStyle: 'body-14-r',
                color: 'text.dark.01',
                height: '500px',
              })}
            >
              아직 작성한 내역이 없어요
            </div>
          ) : (
            <ProductFilterListView
              state={[ProductFilterState.DRAFT]}
              onClick={(item) => {
                history.push(`/product-filters/${item.id}`);
              }}
            />
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProductFilterDraftListPage;
