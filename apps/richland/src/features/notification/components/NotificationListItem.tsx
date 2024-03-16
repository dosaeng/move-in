import { cx, css } from '@move-in/styled-system/css';
import { NotificationListItemModel } from '../hooks/useNotificationList';

interface Props {
  className?: string;
  data: NotificationListItemModel;
  onClick?: () => void;
}

const NotificationListItem: React.FC<Props> = ({
  className,
  data,
  onClick,
}) => {
  return (
    <div
      className={cx(
        className,
        css({
          display: 'flex',
          gap: '16px',
          width: '100%',
          alignItems: 'center',
        })
      )}
      onClick={onClick}
    >
      <div
        className={css({
          display: 'flex',
          flexFlow: 'column',
          gap: '6px',
          flex: 1,
          overflow: 'hidden',
        })}
      >
        <div
          className={css({
            textStyle: 'body-16-m',
            color: 'text.dark.04',
            wordBreak: 'break-all',
            lineClamp: 2,
          })}
        >
          {data.title}
        </div>
        <div
          className={css({
            textStyle: 'body-12-r',
            color: 'text.dark.02',
            lineClamp: 1,
          })}
        >
          {data.content}
        </div>
      </div>
      <div
        className={css({
          flex: '0 0 108px',
        })}
      >
        <img
          src={data.thumbnailUrl}
          alt={data.title}
          className={css({
            width: '108px',
            height: '72px',
            objectFit: 'cover',
            borderRadius: '12px',
          })}
        />
      </div>
    </div>
  );
};

export default NotificationListItem;
