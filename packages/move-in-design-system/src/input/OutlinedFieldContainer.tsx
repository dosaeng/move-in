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

export interface OutlinedFieldContainerProps {
  className?: string;
  id?: string;
  label?: string;
  errorText?: string;
}

export const OutlinedFieldContainer: React.FC<
  React.PropsWithChildren<OutlinedFieldContainerProps>
> = ({ className, id, label, errorText, children }) => {
  const hasLabel = !!label || !!errorText;

  return (
    <div
      className={cx(
        css({
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }),
        className
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
