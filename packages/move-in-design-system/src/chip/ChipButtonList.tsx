import { cx, css } from '@move-in/styled-system/css';
import { ChipButton } from './ChipButton';
import { Key, useState } from 'react';

export interface ChipButtonListOption<K, V> {
  key: K;
  value: V;
}

export interface ChipButtonListProps<K, V> {
  className?: string;
  value?: ChipButtonListOption<K, V>[];
  defaultValue?: ChipButtonListOption<K, V>[];
  options?: ChipButtonListOption<K, V>[];
  readOnly?: boolean;
  disabled?: boolean;
  onChange?: (value: ChipButtonListOption<K, V>[]) => void;
}

export const ChipButtonList = <K extends Key, V>({
  className,
  value,
  defaultValue,
  options,
  readOnly = false,
  disabled = false,
  onChange,
}: ChipButtonListProps<K, V>) => {
  const [internalValue, setInternalValue] = useState<ChipButtonListOption<K, V>[]>(defaultValue ?? []);
  const currentValue = value != null ? value : internalValue;
  const enableAction = readOnly !== true && disabled !== true;

  return (
    <div
      className={cx(
        css({
          display: 'flex',
          flexWrap: 'wrap',
          width: '100%',
          rowGap: '6px',
          columnGap: '4px',
        }),
        className
      )}
    >
      {options?.map((item) => (
        <ChipButton
          key={item.key}
          selected={currentValue.find((value) => item.key === value.key) != null}
          onClick={
            enableAction
              ? () => {
                  const hasValue = currentValue.find((value) => item.key === value.key);
                  let newValue: ChipButtonListOption<K, V>[];

                  if (hasValue) {
                    newValue = currentValue.filter((value) => item.key !== value.key);
                  } else {
                    newValue = [...currentValue, item];
                  }

                  setInternalValue(newValue);
                  onChange && onChange(newValue);
                }
              : undefined
          }
        >
          {item.value?.toString()}
        </ChipButton>
      ))}
    </div>
  );
};
