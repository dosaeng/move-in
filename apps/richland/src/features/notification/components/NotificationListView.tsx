import { cx, css } from '@move-in/styled-system/css';
import useNotificationList, {
  NotificationListItemModel,
} from '../hooks/useNotificationList';
import { IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/react';
import NotificationListItem from './NotificationListItem';
import EmptyView from '@/common/components/EmptyView';

interface Props {
  className?: string;
  onClick?: (data: NotificationListItemModel) => void;
}

const NotificationListView: React.FC<Props> = ({ className, onClick }) => {
  const { data, isSuccess, fetchNextPage } = useNotificationList();
  const isEmpty = isSuccess && data?.pages?.at(0)?.length == 0;

  return (
    <div
      className={cx(
        className,
        css({
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        })
      )}
    >
      {isEmpty ? (
        <EmptyView>알림 내역이 없습니다.</EmptyView>
      ) : (
        data?.pages.map((page) => {
          return (
            <>
              {page.map((data) => {
                return (
                  <NotificationListItem
                    key={data.id}
                    data={data}
                    onClick={() => onClick && onClick(data)}
                  />
                );
              })}
            </>
          );
        })
      )}
      <IonInfiniteScroll
        onIonInfinite={(event) => {
          fetchNextPage().finally(() => {
            event.target.complete();
          });
        }}
      >
        <IonInfiniteScrollContent />
      </IonInfiniteScroll>
    </div>
  );
};

export default NotificationListView;
