import { IonContent, IonHeader, IonPage } from '@ionic/react';
import { Divider, PageHeader } from '@move-in/move-in-design-system';
import { css } from '@move-in/styled-system/css';
import ProductConsultingListView from '../components/ProductConsultingListView';
import { ProductConsultingState } from '../hooks/useProductConsultingList';
import useProductConsultingPageState from '../hooks/useProductConsultingPageState';
import { PageHeaderBackButton } from '@move-in/move-in-design-system/src/header/PageHeader';
import { useHistory } from 'react-router-dom';

const ProductConsultingListPage: React.FC = () => {
  const history = useHistory();
  const { isEmpty, hasDoneConsulting, hasWaitingConsulting } = useProductConsultingPageState();

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
          {hasWaitingConsulting ? '곧 상담이 진행될 예정이에요' : '상담 내역'}
        </h2>
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
            아직 상담 요청 내역이 없어요
          </div>
        ) : (
          <>
            <ProductConsultingListView
              state={[ProductConsultingState.WAITING]}
              onClick={(item) => {
                history.push(`/product-suggestions/${item.suggestionId}`);
              }}
            />
            {hasDoneConsulting && (
              <>
                <Divider className={css({ marginY: '40px' })} />
                <div
                  className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                  })}
                >
                  <div
                    className={css({
                      textStyle: 'body-18-m',
                      color: 'text.dark.04',
                      paddingX: '16px',
                    })}
                  >
                    완료된 상담 내역
                  </div>
                  <ProductConsultingListView state={[ProductConsultingState.DONE]} />
                </div>
              </>
            )}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ProductConsultingListPage;
