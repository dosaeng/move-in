import { cx, css, cva } from '@move-in/styled-system/css';
import React from 'react';

const labelStyle = cva({
  base: {
    pointerEvents: 'none',
    color: 'text.dark.02',
    textStyle: 'body-14-r',
  },
  variants: {
    hasError: {
      true: {
        color: 'error.red.03',
      },
    },
  },
});

interface Props {
  className?: string;
  id?: string;
  label?: string;
  errorText?: string;
}

const OutlinedFieldContainer: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  id,
  label,
  errorText,
  children,
}) => {
  const hasLabel = !!label || !!errorText;

  return (
    <div
      className={cx(
        className,
        css({
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        })
      )}
    >
      {hasLabel && (
        <label
          htmlFor={id}
          className={labelStyle({
            hasError: !!errorText,
          })}
        >
          {errorText ?? label}
        </label>
      )}
      {children}
    </div>
  );
};

export default OutlinedFieldContainer;
