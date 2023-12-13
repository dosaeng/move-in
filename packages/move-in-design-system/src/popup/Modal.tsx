import React from 'react';
import { css } from '@move-in/styled-system/css';
import { IonModal } from '@ionic/react';

export const ModalView: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={css({
        display: 'flex',
        minWidth: '320px',
        minHeight: '156px',
        maxHeight: 'calc(100vh - 80px)',
        flexDirection: 'column',
        borderRadius: '24px',
        backgroundColor: 'fill.light.01',
      })}
    >
      <div
        className={css({
          height: '36px',
          padding: '6px 0px 26px 0px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        })}
      >
        <div
          className={css({
            width: '60px',
            height: '4px',
            borderRadius: '2px',
            backgroundColor: 'fill.light.03',
          })}
        ></div>
      </div>
      <div
        className={css({
          display: 'flex',
          flex: 1,
          minHeight: '120px',
          height: 'fit-content',
        })}
      >
        {children}
      </div>
    </div>
  );
};

export interface ModalProps {
  id?: string;
  trigger?: string;
  isOpen?: boolean;
  ref?: React.RefObject<HTMLIonModalElement>;
  onDidDismiss?: () => void;
}

export const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({
  id,
  trigger,
  isOpen,
  ref,
  children,
  onDidDismiss,
}) => {
  return (
    <IonModal
      id={id}
      ref={ref}
      isOpen={isOpen}
      trigger={trigger}
      initialBreakpoint={1}
      breakpoints={[0, 1]}
      handle={false}
      onDidDismiss={onDidDismiss}
      style={{
        '--width': 'fit-content',
        '--min-width': '320px',
        '--height': 'fit-content',
        '--border-radius': '24px',
        '--background': 'transparent',
        '--box-shadow': 'none',
      }}
    >
      <div style={{ paddingBottom: '20px' }}>
        <ModalView>{children}</ModalView>
      </div>
    </IonModal>
  );
};
