import { IonToast } from '@ionic/react';
import { css } from '@move-in/styled-system/css';
import { token } from '@move-in/styled-system/tokens';
import React from 'react';

interface ToastProps {
  isOpen?: boolean;
  trigger?: string;
  message: string;
  duration?: number;
}

export const toastStyle = css({
  '--background': token('colors.fill.dark.01'),
  '--border-radius': '24px',
  '--box-shadow': '3px 3px 10px 0 rgba(0, 0, 0, 0.2)',
  '--color': token('colors.text.light.01'),
  '&::part(message)': {
    textStyle: 'body-14-m',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const Toast: React.FC<React.PropsWithChildren<ToastProps>> = ({ trigger, isOpen, message, duration }) => {
  return <IonToast className={toastStyle} trigger={trigger} isOpen={isOpen} message={message} duration={duration} />;
};
