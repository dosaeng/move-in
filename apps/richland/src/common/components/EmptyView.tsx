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
          textStyle: 'body-14-r',
          color: 'text.dark.01',
          textAlign: 'center',
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default EmptyView;
