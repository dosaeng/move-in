import { css } from '@move-in/styled-system/css';
import ServicePageListItem from './ServicePageListItem';
import useAuthState from '@/common/hooks/useAuthState';

const ServicePageListLogoutItem: React.FC = () => {
  const { unsetAuthData } = useAuthState();

  return (
    <ServicePageListItem
      className={css({
        '& > div:first-child': {
          color: 'error.red.03',
        },
      })}
      title="로그아웃"
      onClick={() => {
        unsetAuthData();
      }}
    />
  );
};

export default ServicePageListLogoutItem;
