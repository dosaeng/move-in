import { IonModal } from '@ionic/react';
import { css, cva } from '@move-in/styled-system/css';
import React from 'react';
import { Button, ButtonProps } from '../buttons/Button';

const titleStyle = cva({
  base: {
    textStyle: 'body-16-m',
    color: 'text.dark.04',
  },
  variants: {
    textAlign: {
      left: {
        textAlign: 'left',
      },
      center: {
        textAlign: 'center',
      },
    },
  },
});

const descriptionStyle = cva({
  base: {
    textStyle: 'body-12-r',
    color: 'text.dark.02',
    paddingTop: '12px',
  },
  variants: {
    textAlign: {
      left: {
        textAlign: 'left',
      },
      center: {
        textAlign: 'center',
      },
    },
  },
});

const actionStyle = cva({
  base: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    paddingTop: '24px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  variants: {
    flow: {
      row: {
        flexDirection: 'row',
      },
      column: {
        flexDirection: 'column',
      },
    },
  },
});

interface PopupViewProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions: React.ReactNode;
  textAlign?: 'left' | 'center';
  actionsFlow?: 'row' | 'column';
}

export const PopupView: React.FC<PopupViewProps> = ({
  title,
  description,
  actions,
  textAlign = 'center',
  actionsFlow = 'row',
}) => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px',
        borderRadius: '24px',
        backgroundColor: 'fill.light.01',
        maxWidth: '320px',
        width: '100%',
      })}
    >
      <div className={titleStyle({ textAlign })}>{title}</div>
      {description && <div className={descriptionStyle({ textAlign })}>{description}</div>}
      <div className={actionStyle({ flow: actionsFlow })}>{actions}</div>
    </div>
  );
};

export const PopupViewButton: React.FC<ButtonProps> = ({ ...props }: ButtonProps) => {
  return (
    <Button
      {...props}
      className={css({
        minWidth: '40px',
      })}
    />
  );
};

export interface PopupProps extends PopupViewProps {
  id?: string;
  isOpen?: boolean;
  onDidDismiss?: () => void;
  trigger?: string;
  ref?: React.RefObject<HTMLIonModalElement>;
}

export const Popup: React.FC<PopupProps> = ({ id, trigger, ref, isOpen, onDidDismiss, ...props }) => {
  return (
    <IonModal
      id={id}
      ref={ref}
      isOpen={isOpen}
      onDidDismiss={onDidDismiss}
      trigger={trigger}
      style={{
        '--width': 'fit-content',
        '--min-width': '280px',
        '--height': 'fit-content',
        '--border-radius': '24px',
        '--box-shadow': '0 28px 48px rgba(0, 0, 0, 0.4)',
      }}
    >
      <PopupView {...props} />
    </IonModal>
  );
};
