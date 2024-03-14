import {
  IconEdit,
  IconHeart,
  IconMailOpened,
  IconSearch,
} from '@move-in/design-system';
import { cx, css } from '@move-in/styled-system/css';
import { useNavigate } from 'react-router';

interface ItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

interface Props {
  className?: string;
}

const ServicePageNavigationBarItem: React.FC<ItemProps> = ({
  icon,
  label,
  onClick,
}) => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        color: 'text.dark.04',
        cursor: 'pointer',
      })}
      onClick={onClick}
    >
      <div
        className={css({
          width: '64px',
          height: '64px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        })}
      >
        {icon}
      </div>
      <div
        className={css({
          textStyle: 'body-14-m',
        })}
      >
        {label}
      </div>
    </div>
  );
};

const iconSize = 32;

const ServicePageNavigationBar: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();

  return (
    <div
      className={cx(
        className,
        css({
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          maxWidth: '480px',
          gap: '8px',
          width: '100%',
        })
      )}
    >
      <ServicePageNavigationBarItem
        icon={<IconHeart size={iconSize} />}
        label="관심 목록"
      />
      <ServicePageNavigationBarItem
        icon={<IconSearch size={iconSize} />}
        label="최근 조회"
      />
      <ServicePageNavigationBarItem
        icon={<IconMailOpened size={iconSize} />}
        label="최근 알림"
        onClick={() => {
          navigate('/service/notification');
        }}
      />
      <ServicePageNavigationBarItem
        icon={<IconEdit size={iconSize} />}
        label="오류 제보"
      />
    </div>
  );
};

export default ServicePageNavigationBar;
