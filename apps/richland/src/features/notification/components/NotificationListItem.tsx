import { cx, css } from '@move-in/styled-system/css';
import { NotificationListItemModel } from '../hooks/useNotificationList';

interface Props {
  className?: string;
  data: NotificationListItemModel;
}

const NotificationListItem: React.FC<Props> = ({
  className,
  data
}) => {
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
      {data.title}
    </div>
  );
};

export default NotificationListItem;
