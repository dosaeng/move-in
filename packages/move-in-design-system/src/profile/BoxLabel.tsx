import { cx, css } from '@move-in/styled-system/css';
import React from 'react';

export const BoxLabel: React.FC<
  React.PropsWithChildren<{
    className?: string;
  }>
> = ({ className, children }) => {
  return (
    <div
      className={cx(
        css({
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'brand.purple.03',
          color: 'brand.purple.03',
          paddingX: '8px',
          paddingY: '4px',
          textStyle: 'body-12-m',
        }),
        className
      )}
    >
      {children}
    </div>
  );
};
