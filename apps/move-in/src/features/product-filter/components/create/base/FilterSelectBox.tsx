import { css, cx } from '@move-in/styled-system/css';
import FilterSelectBoxLabel from './FilterSelectBoxLabel';
import { SelectBox, SelectBoxProps } from '@move-in/move-in-design-system';
import { Key } from 'react';

interface Props<K, V> extends SelectBoxProps<K, V> {
  className?: string;
  labelPrefix: string;
  label: string;
}

const FilterSelectBox = <K extends Key, V>({ className, labelPrefix, label, ...props }: Props<K, V>) => {
  return (
    <div
      className={cx(
        css({
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }),
        className
      )}
    >
      <FilterSelectBoxLabel prefix={labelPrefix} label={label} />
      <SelectBox {...props} />
    </div>
  );
};

export default FilterSelectBox;
