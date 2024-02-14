import { Toggle } from '@move-in/design-system';
import ServicePageListItem from './ServicePageListItem';

const ServicePageListNotificationItem: React.FC = () => {
  return <ServicePageListItem title="알림 설정" suffix={<Toggle />} />;
};

export default ServicePageListNotificationItem;
