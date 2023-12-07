import { sva } from '@move-in/styled-system/css';
import React from 'react';

const inputStyle = sva({
  slots: ['root', 'input', 'label', 'labelText', 'helperText'],
  base: {
    root: {
      position: 'relative',
      backgroundColor: 'transparent',
      paddingTop: '12px',
    },
    input: {
      color: 'text.dark.04',
      backgroundColor: 'transparent',
      border: 'none',
      borderBottomWidth: '2px',
      borderBottomStyle: 'solid',
      borderBottomColor: 'stroke.light.01',
      outline: 'none',
      borderRadius: '0px',
      width: '100%',
      height: '50px',
      _placeholder: {
        color: 'transparent',
      },
      _autofill: {
        backgroundColor: 'transparent',
      },
    },
    label: {
      pointerEvents: 'none',
      position: 'absolute',
      top: '24px',
      left: '0px',
      color: 'text.light.04',
      transition: 'transform .2s ease-out, color .2s ease-out',
      transform: 'none',
      transformOrigin: '0% 100%',
      textStyle: 'body-18-m',
    },
    labelText: {
      display: 'inline',
      opacity: '1',
      transition: 'opacity .2s ease-out',
    },
    helperText: {
      display: 'none',
      opacity: '0',
      transition: 'opacity .2s ease-out',
    },
  },
  variants: {
    hasFocus: {
      true: {
        input: {
          borderBottom: '2px solid',
          borderBottomColor: 'brand.purple.03',
        },
        label: {
          transform: 'translateY(-22px) scale(0.7)',
          transformOrigin: '0% 0%',
        },
        labelText: {
          display: 'none',
          opacity: '0',
        },
        helperText: {
          display: 'inline',
          opacity: '1',
        },
      },
    },
    hasValue: {
      true: {
        label: {
          transform: 'translateY(-22px) scale(0.7)',
          transformOrigin: '0% 0%',
        },
        labelText: {
          display: 'none',
          opacity: '0',
        },
        helperText: {
          display: 'inline',
          opacity: '1',
        },
      },
    },
  },
});

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  defaultValue?: string;
  label?: string;
  helperText?: string;
}

export const TextField: React.FC<TextFieldProps> = React.forwardRef<HTMLInputElement, TextFieldProps>(
  ({ id, label, helperText, onChange, onBlur, onFocus, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [value, setValue] = React.useState<string | undefined>(props.value ?? props.defaultValue);
    const classes = inputStyle({ hasFocus: isFocused, hasValue: !!value });

    return (
      <div className={classes.root}>
        <input
          {...props}
          id={id}
          ref={ref}
          placeholder={label}
          className={classes.input}
          onChange={(e) => {
            setValue(e.target.value);

            onChange && onChange(e);
          }}
          onFocus={(e) => {
            setIsFocused(true);
            onFocus && onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur && onBlur(e);
          }}
        />
        <label htmlFor={id} className={classes.label}>
          <span className={classes.labelText}>{label}</span>
          <span className={classes.helperText}>{helperText ?? label}</span>
        </label>
      </div>
    );
  }
);
