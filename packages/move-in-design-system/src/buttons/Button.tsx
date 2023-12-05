import React from 'react';
import { css, cva, cx } from '@move-in/styled-system/css';

const buttonStyle = cva({
  base: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '12px',
    paddingX: '26px',
    gap: '8px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    cursor: 'pointer',
    textStyle: 'body-14-m',
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
        height: '48px',
        minWidth: '154px',
        maxWidth: '320px',
      },
      m: {
        height: '40px',
        minWidth: '154px',
        maxWidth: '320px',
      },
      s: {
        height: '32px',
        minWidth: '71px',
        maxWidth: '154px',
        gap: '4px',
      },
      xs: {
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

export interface ButtonProps {
  className?: string;
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

export const Button = ({
  className,
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
    <button
      type="button"
      className={cx(buttonStyle({ shape, size, theme, rounded }), className)}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span>{leftIcon}</span>}
      <span className={css({ overflow: 'hidden', textOverflow: 'clip' })}>{label}</span>
      {rightIcon && <span>{rightIcon}</span>}
    </button>
  );
};
