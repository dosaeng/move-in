import React from 'react';
import { css } from '@move-in/styled-system/css';
import { IonModal } from '@ionic/react';

export const ModalView: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div
      className={css({
        display: 'flex',
        minWidth: '320px',
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
          minHeight: '120px',
        })}
      >
        {children}
      </div>
    </div>
  );
};

interface ModalProps {
  id?: string;
  trigger?: string;
  ref?: React.RefObject<HTMLIonModalElement>;
}

export const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({ id, trigger, ref, children }) => {
  return (
    <IonModal
      id={id}
      ref={ref}
      trigger={trigger}
      initialBreakpoint={1}
      breakpoints={[0, 1]}
      handle={false}
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
