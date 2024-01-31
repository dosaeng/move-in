import { IonToolbar } from '@ionic/react';
import { IconButton, IconDotsVertical } from '@move-in/design-system';
import { css } from '@move-in/styled-system/css';

interface Props {
  onClickMenu?: () => void;
}

const HomePageHeader: React.FC<Props> = ({ onClickMenu }) => {
  return (
    <IonToolbar
      className={css({
        '--min-height': '48px',
        '--height': '60px',
      })}
    >
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 8px 10px 20px',
        })}
      >
        <img
          className={css({ height: '40px' })}
          src="/images/logo.png"
        />
        <IconButton
          shape="clear"
          theme="neutral"
          size="m"
          onClick={onClickMenu}
          icon={<IconDotsVertical width={20} />}
        />
      </div>
    </IonToolbar>
  );
};

export default HomePageHeader;
