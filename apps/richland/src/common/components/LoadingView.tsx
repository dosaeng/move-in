import { IonSpinner } from '@ionic/react';
import { css, cx } from '@move-in/styled-system/css';

const LoadingView: React.FC<{ className?: string }> = ({ className }) => {
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
      <IonSpinner color="medium" />
    </div>
  );
};

export default LoadingView;
