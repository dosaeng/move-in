import React from 'react';
import { cva } from '@move-in/styled-system/css';

const buttonStyle = cva({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '12px',
    cursor: 'pointer',
    _disabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    _hover: {
      opacity: 0.8,
      _disabled: {
        opacity: 0.5,
      },
    },
  },
  variants: {
    rounded: {
      true: {
        borderRadius: '24px',
      },
    },
    size: {
      l: {
        width: '48px',
        height: '48px',
        minWidth: '48px',
      },
      m: {
        width: '40px',
        height: '40px',
        minWidth: '40px',
      },
      s: {
        width: '32px',
        height: '32px',
        minWidth: '32px',
      },
      xs: {
        width: '24px',
        height: '24px',
        minWidth: '24px',
        borderRadius: '8px',
      },
    },
    shape: {
      fill: {},
      outline: {},
      clear: {},
    },
    theme: {
      neutral: {},
      brand: {},
    },
  },
  compoundVariants: [
    {
      shape: 'fill',
      theme: 'neutral',
      css: {
        bg: 'fill.light.01',
        color: 'text.dark.02',
      },
    },
    {
      shape: 'fill',
      theme: 'brand',
      css: { bg: 'brand.purple.03', color: 'text.light.01' },
    },

    {
      shape: 'outline',
      theme: 'neutral',
      css: {
        bg: 'fill.light.01',
        color: 'text.dark.03',
        borderWidth: '1.4px',
        borderStyle: 'solid',
        borderColor: 'stroke.light.01',
      },
    },
    {
      shape: 'outline',
      theme: 'brand',
      css: {
        bg: 'fill.light.01',
        color: 'brand.purple.03',
        borderWidth: '1.4px',
        borderStyle: 'solid',
        borderColor: 'brand.purple.03',
      },
    },

    {
      shape: 'clear',
      theme: 'neutral',

      css: { bg: 'transparent', color: 'text.dark.03' },
    },
    {
      shape: 'clear',
      theme: 'brand',
      css: { bg: 'transparent', color: 'brand.purple.03' },
    },
  ],
});

interface ButtonProps {
  shape?: 'fill' | 'outline' | 'clear';
  theme?: 'neutral' | 'brand';
  size?: 'l' | 'm' | 's' | 'xs';
  rounded?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const IconButton = ({
  shape = 'fill',
  theme = 'brand',
  size = 'l',
  rounded,
  disabled,
  icon,
  ...props
}: ButtonProps) => {
  return (
    <button type="button" className={buttonStyle({ shape, size, theme, rounded })} disabled={disabled} {...props}>
      {icon}
    </button>
  );
};
