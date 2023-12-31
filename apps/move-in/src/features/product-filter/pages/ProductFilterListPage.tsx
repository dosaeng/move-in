import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/react';
import {
  Button,
  CTAButtonBlock,
  Divider,
  IconButton,
  IconCalendarClock,
  PageHeader,
} from '@move-in/design-system';
import { css } from '@move-in/styled-system/css';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ProductFilterListView from '../components/ProductFilterListView';
import ProductFilterCreateNudgePopup from '../components/create/ProductFilterCreateNudgePopup';
import useProductFilterCreateNudgeState from '../hooks/useProductFilterCreateNudgeState';
import { ProductFilterState } from '../hooks/useProductFilterList';
import useProductFilterPageState from '../hooks/useProductFilterPageState';
import EmptyView from '@/common/component/EmptyView';

const ProductFilterListPage: React.FC = () => {
  const history = useHistory();
  const { isEmpty, hasExpiredList, draftCount, refetch } =
    useProductFilterPageState();
  const [isOpenNudgePopup, setIsOpenNudgePopup] = useState(false);
  const { state: visibleCreateNudge, mutate: hideCreateNudge } =
    useProductFilterCreateNudgeState();

  useEffect(() => {
    // 최초 진입시에만 노출
    if (!visibleCreateNudge) return;

    setTimeout(() => {
      setIsOpenNudgePopup(true);
    }, 1000);
  }, [visibleCreateNudge]);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <PageHeader
          right={
            <IconButton
              shape="clear"
              theme="neutral"
              icon={<IconCalendarClock />}
              onClick={() => [history.push('/product-consultants')]}
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
        <IonRefresher
          slot="fixed"
          onIonRefresh={async (event) => {
            refetch().finally(() => {
              event.detail.complete();
            });
          }}
        >
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <h2
          className={css({
            display: 'flex',
            justifyContent: 'space-between',
            textStyle: 'header-26-b',
            marginBottom: '40px',
            paddingX: '16px',
          })}
        >
          <span
            className={css({
              flex: 1,
            })}
          >
            나의 희망 조건
          </span>
          <Button
            className={css({
              width: 'initial !important',
              minWidth: '80px',
              paddingX: '10px',
              paddingY: '8px',
            })}
            shape="outline"
            theme="neutral"
            size="s"
            label={`임시저장(${draftCount})`}
            onClick={() => {
              history.push('/product-filters-draft');
            }}
          />
        </h2>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
          })}
        >
          {isEmpty ? (
            <EmptyView>
              아직 희망 조건을
              <br />생성하지 않았어요
            </EmptyView>
          ) : (
            <>
              <ProductFilterListView
                state={[
                  ProductFilterState.PUBLISHED,
                  ProductFilterState.REQUESTED,
                ]}
                onClick={(item) => {
                  history.push(`/product-filters/${item.id}`);
                }}
              />
              {hasExpiredList && (
                <>
                  <Divider size="m" />
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
                      제안이 마감 되었어요
                    </div>
                    <ProductFilterListView
                      state={[ProductFilterState.EXPIRED]}
                      onClick={(item) => {
                        history.push(`/product-filters/${item.id}`);
                      }}
                    />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </IonContent>
      <IonFooter className="ion-no-border">
        <CTAButtonBlock>
          <Button
            className={css({ maxW: 'initial' })}
            label="새로운 희망 조건 작성하기"
            onClick={() => {
              history.push('/product-filters-create');
            }}
          />
        </CTAButtonBlock>
      </IonFooter>
      <ProductFilterCreateNudgePopup
        isOpen={isOpenNudgePopup}
        onDidDismiss={(isAgree) => {
          hideCreateNudge();
          setIsOpenNudgePopup(false);

          if (!isAgree) return;

          history.push('/product-filters-create');
        }}
      />
    </IonPage>
  );
};

export default ProductFilterListPage;
