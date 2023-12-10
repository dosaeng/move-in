import { css, cx } from '@move-in/styled-system/css';

interface Props {
  className?: string;
  prefix: string;
  label: string;
}

const FilterSelectBoxLabel: React.FC<Props> = ({ className, prefix, label }) => {
  return (
    <div
      className={cx(
        css({
          display: 'flex',
          gap: '8px',
        }),
        className
      )}
    >
      <span
        className={css({
          textStyle: 'body-14-sb',
          color: 'brand.purple.03',
        })}
      >
        {prefix}
      </span>
      <span
        className={css({
          textStyle: 'body-14-m',
          color: 'text.dark.03',
        })}
      >
        {label}
      </span>
    </div>
  );
};

export default FilterSelectBoxLabel;
