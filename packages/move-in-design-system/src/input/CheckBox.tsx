import { sva } from '@move-in/styled-system/css';
import React, { forwardRef } from 'react';
import { IconCheck } from '../icons/icons';

const inputStyle = sva({
  slots: ['root', 'input', 'label', 'checkIcon'],
  base: {
    root: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      userSelect: 'none',
    },
    input: {
      display: 'none',
    },
    label: {
      display: 'flex',
      alignItems: 'center',
      textStyle: 'body-14-r',
      color: 'text.dark.03',
      gap: '12px',
    },
    checkIcon: {
      width: '20px',
      height: '20px',
      color: 'text.light.02',
      transition: 'color .2s ease-out',
    },
  },
  variants: {
    hasValue: {
      true: {
        checkIcon: {
          color: 'brand.purple.03',
        },
      },
    },
  },
});

type CheckBoxInputAttributes = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'defaultValue' | 'onChange'
>;

interface CheckBoxProps extends CheckBoxInputAttributes {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const CheckBox: React.FC<CheckBoxProps> = forwardRef<
  HTMLInputElement,
  CheckBoxProps
>(({ label, onChange, id, ...props }, ref) => {
  const [value, setValue] = React.useState<boolean | undefined>(
    props.checked ?? props.defaultChecked
  );
  const classes = inputStyle({ hasValue: !!value });

  return (
    <div className={classes.root}>
      <input
        {...props}
        id={id}
        className={classes.input}
        ref={ref}
        type="checkbox"
        onChange={(e) => {
          setValue(e.target.checked);

          onChange && onChange(e.target.checked);
        }}
      />
      <label htmlFor={id} className={classes.label}>
        <IconCheck className={classes.checkIcon} />
        {label}
      </label>
    </div>
  );
});
