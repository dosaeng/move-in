import { PropsWithChildren } from 'react';
import { cx, css } from '@move-in/styled-system/css';

const EmptyView: React.FC<PropsWithChildren<{ className?: string }>> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cx(
        css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '300px',
        }),
        className
      )}
    >
      <div
        className={css({
          width: '200px',
          height: '200px',
          position: 'relative',
        })}
      >
        <img
          className={css({
            width: '100%',
            height: '100%',
          })}
          src="/images/empty-inbox.svg"
          alt="empty"
        />
        <div
          className={css({
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 32,
            textStyle: 'body-14-r',
            color: 'text.dark.01',
            textAlign: 'center',
          })}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default EmptyView;
