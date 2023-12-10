import { css, sva } from '@move-in/styled-system/css';
import { format as formatDate, isValid, parse as parseDate } from 'date-fns';
import React from 'react';

const inputStyle = sva({
  slots: ['root', 'input', 'label'],
  base: {
    root: {
      display: 'flex',
    },
    input: {
      width: '1px',
      outline: 'none',
    },
    label: {
      textStyle: 'header-28-b',
      color: 'text.dark.04',
    },
  },
});

interface DateInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'value' | 'defaultValue' | 'checked' | 'defaultChecked' | 'onChange' | 'type'
  > {
  value?: Date;
  defaultValue?: Date;
  onChange?: (value?: Date) => void;
}

export const DateInput: React.FC<DateInputProps> = ({ id, onChange, ...props }) => {
  const classes = inputStyle();
  const formattedValue = props.value != null ? formatDate(props.value, 'yyyyMMdd') : undefined;
  const formattedDefaultValue = props.defaultValue != null ? formatDate(props.defaultValue, 'yyyyMMdd') : undefined;
  const [value, setValue] = React.useState<string | undefined>(formattedDefaultValue);
  const [date, setDate] = React.useState<Date | undefined>(props.defaultValue);
  const paddedValue = (value ?? '').padEnd(8, '-');

  const updateDate = (newDate?: Date) => {
    if(date == newDate) {
      return;
    }

    onChange && onChange(newDate);
    setDate(newDate);
  };

  return (
    <div className={classes.root}>
      <input
        {...props}
        className={classes.input}
        id={id}
        type="number"
        value={formattedValue}
        defaultValue={formattedDefaultValue}
        onChange={(event) => {
          const value = event.target.value;

          if (value.length > 8) {
            event.target.value = value.slice(0, 8);
          }

          setValue(event.target.value);

          if (value.length !== 8) {
            updateDate(undefined);
            return;
          }

          try {
            const date = parseDate(event.target.value, 'yyyyMMdd', new Date());

            if (!isValid(date)) {
              throw new Error('Invalid date');
            }

            updateDate(date);
          } catch (error) {
            updateDate(undefined);
            return;
          }
        }}
      />
      <label htmlFor={id} className={classes.label}>
        {paddedValue.split('').map((char, index) => {
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

          if (dateSuffix[index] != null) {
            return (
              <span
                key={index}
                style={{
                  marginRight: '4px',
                }}
              >
                {numberText}
                {dateSuffix[index]}
              </span>
            );
          }

          return <span key={index}>{numberText}</span>;
        })}
      </label>
    </div>
  );
};

const dateSuffix = { 3: '년', 5: '월', 7: '일' };
