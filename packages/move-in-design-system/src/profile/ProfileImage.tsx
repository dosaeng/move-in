import { cx, css } from '@move-in/styled-system/css';
import React from 'react';

interface Props {
  className?: string;
  src?: string;
  alt?: string;
}

export const ProfileImage: React.FC<Props> = ({ className, src, alt }) => {
  if (src == null) {
    return (
      <div
        className={cx(
          css({
            borderRadius: '24px',
            objectFit: 'cover',
            width: '64px',
            height: '64px',
            marginBottom: '20px',
            backgroundColor: 'fill.light.03',
          }),
          className
        )}
      ></div>
    );
  }

  return (
    <img
      className={cx(
        css({
          borderRadius: '24px',
          objectFit: 'cover',
          width: '64px',
          height: '64px',
          marginBottom: '20px',
        }),
        className
      )}
      src={src}
      alt={alt}
    />
  );
};
