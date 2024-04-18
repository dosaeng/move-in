import { IconCheck } from '@move-in/design-system';
import { cx, sva } from '@move-in/styled-system/css';
import { ReactNode } from 'react';

const selectorStyle = sva({
  slots: ['container', 'icon', 'title', 'suffix'],
  base: {
    container: {
      display: 'flex',
      flexDirection: 'row',
      gap: '12px',
      padding: '16px 20px',
      cursor: 'pointer',
    },
    icon: {
      color: 'text.light.03',
    },
    title: {
      display: 'inline-block',
      flex: 1,
      textStyle: 'body-14-m',
      color: 'text.dark.03',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    suffix: {
      display: 'inline-block',
      textStyle: 'body-14-m',
      color: 'text.light.04',
    },
  },
  variants: {
    isChecked: {
      true: {
        container: {
          bg: '#F9F3FF',
        },
        icon: {
          color: 'brand.purple.03',
        },
      },
    },
    isDisabled: {
      true: {
        container: {
          bg: 'fill.light.02',
          cursor: 'default',
        },
        title: {
          color: 'text.light.04',
        },
      },
    },
  },
});

interface Props {
  className?: string;
  title: ReactNode;
  suffix?: ReactNode;
  isChecked?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

const SelectorListUnit: React.FC<Props> = ({
  className,
  title,
  suffix,
  isChecked = false,
  isDisabled = false,
  onClick,
}) => {
  const styles = selectorStyle({
    isChecked,
    isDisabled,
  });

  return (
    <div
      className={cx(className, styles.container)}
      onClick={(e) => {
        e.preventDefault();
       
        if (isDisabled) {
          return;
        }

        onClick?.();
      }}
    >
      <IconCheck className={styles.icon} size={20} />
      <span className={styles.title}>{title}</span>
      <span className={styles.suffix}>{suffix}</span>
    </div>
  );
};

export default SelectorListUnit;
