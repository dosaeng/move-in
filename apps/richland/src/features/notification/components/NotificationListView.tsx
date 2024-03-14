import { cx, css } from '@move-in/styled-system/css';
import useNotificationList from '../hooks/useNotificationList';
import { IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/react';
import NotificationListItem from './NotificationListItem';

interface Props {
  className?: string;
}

const NotificationListView: React.FC<Props> = ({ className }) => {
  const { data, fetchNextPage } = useNotificationList();

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
      {data?.pages.map((page) => {
        return (
          <>
            {page.map((data) => {
              return <NotificationListItem data={data} />;
            })}
          </>
        );
      })}
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
