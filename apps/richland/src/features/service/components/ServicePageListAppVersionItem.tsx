import { css } from '@move-in/styled-system/css';
import useAppVersion from '../hooks/useAppVersion';
import ServicePageListItem from './ServicePageListItem';

const ServicePageListAppVersionItem: React.FC = () => {
  const { data: version } = useAppVersion();

  return (
    <ServicePageListItem
      className={css({
        cursor: 'default',
      })}
      title="앱 버전"
      suffix={version}
    />
  );
};

export default ServicePageListAppVersionItem;
