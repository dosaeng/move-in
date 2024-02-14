import { IconArrowRight } from '@move-in/design-system';
import { cx, css } from '@move-in/styled-system/css';

interface Props {
  className?: string;
  title: string;
  suffix?: React.ReactNode;
  onClick?: () => void;
}

const ServicePageListItem: React.FC<Props> = ({
  className,
  title,
  suffix,
  onClick,
}) => {
  return (
    <div
      className={cx(
        css({
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
          color: 'text.dark.03',
          cursor: 'pointer',
        }),
        className
      )}
      onClick={onClick}
    >
      <div
        className={css({
          flex: 1,
          textStyle: 'paragraph-16-r',
        })}
      >
        {title}
      </div>
      {suffix ?? <IconArrowRight size={20} />}
    </div>
  );
};

export default ServicePageListItem;
