import { css, cx } from '@move-in/styled-system/css';
import React from 'react';

interface Props {
  className?: string;
  prefix: string;
  label: string;
}

export const FormInputLabel: React.FC<Props> = ({ className, prefix, label }) => {
  return (
    <div
      className={cx(
        css({
          display: 'flex',
          gap: '8px',
        }),
        className
      )}
    >
      <span
        className={css({
          textStyle: 'body-14-sb',
          color: 'brand.purple.03',
          whiteSpace: "nowrap"
        })}
      >
        {prefix}
      </span>
      <span
        className={css({
          textStyle: 'body-14-m',
          color: 'text.dark.03',
        })}
      >
        {label}
      </span>
    </div>
  );
};
