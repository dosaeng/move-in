import React from 'react';
import { cva } from '@move-in/move-in-design-system/css';

const buttonStyle = cva({
  base: {
    fontWeight: 700,
    border: 0,
    borderRadius: '3em',
    cursor: 'pointer',
    display: 'inline-block',
    lineHeight: 1,
  },
  variants: {
    size: {
      small: {
        fontSize: '12px',
        padding: '10px 16px',
      },
      medium: {
        fontSize: '14px',
        padding: '11px 20px',
      },
      large: {
        fontSize: '16px',
        padding: '12px 24px',
      },
    },
    mode: {
      primary: { color: 'white', backgroundColor: '#1ea7fd' },
      secondary: {
        color: '#333',
        backgroundColor: 'transparent',
        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset',
      },
    },
  },
});

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({ primary = false, size = 'medium', backgroundColor, label, ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      className={buttonStyle({ size, mode: primary ? 'primary' : 'secondary' })}
      style={{ backgroundColor }}
      {...props}
    >
      {label}
    </button>
  );
};
