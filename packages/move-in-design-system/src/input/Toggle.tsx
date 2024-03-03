import { IonToggle } from '@ionic/react';
import { css, cx } from '@move-in/styled-system/css';
import React from 'react';

interface ToggleProps
  extends Omit<
    React.ComponentProps<typeof IonToggle>,
    'onChange' | 'onIonChange' | 'className' | 'style' | 'mode'
  > {
  className?: string;
  onChange?: (checked: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = ({
  className,
  onChange,
  ...props
}) => {
  return (
    <IonToggle
      {...props}
      className={cx(
        className,
        css({
          '--track-background-checked': '#874AC5',
          '--handle-height': '22px',
          '--handle-width': '22px',
          '&::part(track)': {
            width: '48px',
            height: '26px',
          },
        })
      )}
      mode="ios"
      onIonChange={(e) => {
        onChange && onChange(e.detail.checked);
      }}
    />
  );
};
