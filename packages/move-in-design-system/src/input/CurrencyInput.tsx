import React, { forwardRef } from 'react';
import { css, sva } from '@move-in/styled-system/css';

const inputStyle = sva({
  slots: ['root', 'input', 'label'],
  base: {
    root: {
      display: 'flex',
    },
    input: {
      width: '1px',
      outline: 'none',
      caretColor: 'transparent',
      color: 'transparent',
    },
    label: {
      textStyle: 'header-28-b',
      color: 'text.dark.04',
    },
  },
});

export interface CurrencyInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    | 'value'
    | 'defaultValue'
    | 'checked'
    | 'defaultChecked'
    | 'onChange'
    | 'type'
  > {
  value?: number;
  defaultValue?: number;
  onChange?: (value?: number) => void;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = forwardRef<
  HTMLInputElement,
  CurrencyInputProps
>(({ id, onChange, minLength = 4, maxLength = 8, ...props }, ref) => {
  const classes = inputStyle();
  const transformValue = (value?: number) =>
    value == null ? value : Math.floor(value / 10000);
  const [value, setValue] = React.useState<string | undefined>(
    transformValue(props.defaultValue)?.toFixed()
  );
  const currentValue =
    props.value != null ? transformValue(props.value)?.toFixed() : value;
  const paddedValue = (value ?? '').padStart(minLength, '-');

  return (
    <div className={classes.root}>
      <input
        {...props}
        ref={ref}
        className={classes.input}
        id={id}
        value={currentValue}
        defaultValue={value}
        type="number"
        onChange={(event) => {
          const value = event.target.value;

          if (maxLength && value.length > maxLength) {
            event.target.value = value.slice(0, maxLength);
            return;
          }

          setValue(event.target.value);

          onChange && onChange(Number(event.target.value) * 10000);
        }}
      />
      <label htmlFor={id} className={classes.label}>
        {paddedValue.split('').reduce((result, char, index) => {
          const suffixIndex = paddedValue.length - index;
          let numberText;

          if (char === '-') {
            numberText = (
              <span
                className={css({
                  color: 'text.light.02',
                })}
              >
                0
              </span>
            );
          } else {
            numberText = char;
          }

          result.push(<span key={index}>{numberText}</span>);

          if (suffix[suffixIndex]) {
            result.push(
              <span
                key={suffix[suffixIndex]}
                style={{
                  marginRight: '4px',
                }}
              >
                {suffix[suffixIndex]}
              </span>
            );
          }

          return result;
        }, [] as React.ReactNode[])}
        <span>만 원</span>
      </label>
    </div>
  );
});

const suffix: { [key: number]: string } = {
  5: '억',
  9: '조',
  13: '경',
};
