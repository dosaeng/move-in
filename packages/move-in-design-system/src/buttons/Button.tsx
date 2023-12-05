import React from 'react';
import { cva } from '@move-in/styled-system/css';

const buttonStyle = cva({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '12px',
    paddingX: '26px',
    gap: '8px',
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
        width: '320px',
        height: '48px',
        minWidth: '154px',
        maxWidth: '320px',
      },
      m: {
        width: '320px',
        height: '40px',
        minWidth: '154px',
        maxWidth: '320px',
      },
      s: {
        width: '154px',
        height: '32px',
        minWidth: '71px',
        maxWidth: '154px',
        gap: '4px',
      },
      xs: {
        width: '154px',
        height: '24px',
        minWidth: '40px',
        maxWidth: '154px',
        borderRadius: '8px',
        gap: '4px',
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
      positive: {},
      negative: {},
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
      shape: 'fill',
      theme: 'positive',
      css: { bg: 'success.green.03', color: 'text.light.01' },
    },
    {
      shape: 'fill',
      theme: 'negative',
      css: { bg: 'error.red.03', color: 'text.light.01' },
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
      shape: 'outline',
      theme: 'positive',
      css: {
        bg: 'fill.light.01',
        color: 'success.green.03',
        borderWidth: '1.4px',
        borderStyle: 'solid',
        borderColor: 'success.green.03',
      },
    },
    {
      shape: 'outline',
      theme: 'negative',
      css: {
        bg: 'fill.light.01',
        color: 'error.red.03',
        borderWidth: '1.4px',
        borderStyle: 'solid',
        borderColor: 'error.red.03',
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
    {
      shape: 'clear',
      theme: 'positive',
      css: { bg: 'transparent', color: 'success.green.03' },
    },
    {
      shape: 'clear',
      theme: 'negative',
      css: { bg: 'transparent', color: 'error.red.03' },
    },
  ],
});

interface ButtonProps {
  shape?: 'fill' | 'outline' | 'clear';
  theme?: 'neutral' | 'brand' | 'positive' | 'negative';
  size?: 'l' | 'm' | 's' | 'xs';
  rounded?: boolean;
  disabled?: boolean;
  label: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  shape = 'fill',
  theme = 'brand',
  size = 'l',
  rounded,
  disabled,
  label,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) => {
  return (
    <button type="button" className={buttonStyle({ shape, size, theme, rounded })} disabled={disabled} {...props}>
      {leftIcon && <span>{leftIcon}</span>}
      {label}
      {rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};
