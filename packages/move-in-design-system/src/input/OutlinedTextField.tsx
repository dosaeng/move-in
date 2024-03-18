import { cx, sva } from '@move-in/styled-system/css';
import React, { useState } from 'react';
import { IconCircleXFilled } from '../icons/icons';

const inputStyle = sva({
  slots: ['root', 'input', 'clearButton', 'suffixIcon'],
  base: {
    root: {
      position: 'relative',
    },
    input: {
      color: 'text.dark.04',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'stroke.light.03',
      borderRadius: '12px',
      width: '100%',
      paddingX: '12px',
      paddingY: '14px',
      boxSizing: 'border-box',
      textStyle: 'body-16-m',
      backgroundColor: 'fill.light.01',
      outline: 'none',
      _placeholder: {
        color: 'text.light.04',
      },
      _autofill: {
        backgroundColor: 'transparent',
      },
      _disabled: {
        backgroundColor: 'fill.light.02',
        color: 'text.light.04',
      },
      _focusVisible: {
        borderWidth: '2px',
        borderColor: 'brand.purple.03',
        paddingRight: '42px',
      },
    },
    clearButton: {
      display: 'none',
      width: '24px',
      height: '24px',
      cursor: 'pointer',
      color: 'text.light.04',
      position: 'absolute',
      top: '14px',
      right: '12px',
    },
    suffixIcon: {
      position: 'absolute',
      top: '14px',
      right: '12px',
      width: '24px',
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  variants: {
    hasError: {
      true: {
        input: {
          color: 'error.red.03',
          _focusVisible: {
            borderColor: 'error.red.03',
          },
        },
      },
    },
    hasSuffixIcon: {
      true: {
        input: {
          paddingRight: '42px',
        },
      },
    },
    hasValue: {
      true: {
        clearButton: {
          _peerFocusVisible: {
            display: 'block',
          },
        },
        suffixIcon: {
          _peerFocusVisible: {
            display: 'none',
          },
        },
      },
    },
    readOnly: {
      true: {
        input: {
          borderWidth: '1px!important',
          borderStyle: 'solid!important',
          borderColor: 'stroke.light.03!important',
        },
        clearButton: {
          display: 'none!important',
        },
      },
    },
  },
});

export interface OutlinedTextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  defaultValue?: string;
  hasError?: boolean;
  suffixIcon?: React.ReactNode;
}

export const OutlinedTextField = React.forwardRef<
  HTMLInputElement,
  OutlinedTextFieldProps
>(({ id, hasError, onChange, className, suffixIcon, ...props }, ref) => {
  const inputRef = React.useRef<HTMLInputElement | null | undefined>();
  const [internalValue, setInternalValue] = useState(
    props.defaultValue ?? props.value
  );
  const classes = inputStyle({
    hasError,
    readOnly: props.readOnly,
    hasSuffixIcon: suffixIcon != null,
    hasValue: internalValue != null && internalValue.length > 0,
  });

  return (
    <div className={cx(classes.root, className)}>
      <input
        {...props}
        id={id}
        ref={(element) => {
          if (typeof ref === 'function') {
            ref(element);
          } else if (ref != null) {
            ref.current = element;
          }

          inputRef.current = element;
        }}
        placeholder={props.placeholder ?? ' '}
        className={cx('peer', classes.input)}
        onChange={(event) => {
          setInternalValue(event.target.value);
          onChange && onChange(event);
        }}
      />
      <div
        className={classes.clearButton}
        onClick={() => {
          if (inputRef.current == null) {
            return;
          }

          const valueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype!,
            'value'
          )!.set;
          valueSetter?.call(inputRef.current, '');

          inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
        }}
        // input blur 이벤트를 막기 위함
        onMouseDown={(e) => e.preventDefault()}
      >
        <IconCircleXFilled size={24} />
      </div>
      <div className={classes.suffixIcon}>{suffixIcon}</div>
    </div>
  );
});
