import { css, cx } from '@move-in/styled-system/css';
import { FormInputLabel, MultipleSelectBox, MultipleSelectBoxProps } from '@move-in/design-system';
import { Key } from 'react';

interface Props<K, V> extends MultipleSelectBoxProps<K, V> {
  className?: string;
  labelPrefix: string;
  label: string;
}

const FilterMultipleSelectBox = <K extends Key, V>({ className, labelPrefix, label, ...props }: Props<K, V>) => {
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
      <FormInputLabel prefix={labelPrefix} label={label} />
      <MultipleSelectBox {...props} />
    </div>
  );
};

export default FilterMultipleSelectBox;
