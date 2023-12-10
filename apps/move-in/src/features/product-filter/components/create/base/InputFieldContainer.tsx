import { IconCheck } from '@move-in/move-in-design-system';
import { css } from '@move-in/styled-system/css';
import { PropsWithChildren } from 'react';

interface Props {
  title?: string;
  subtitle?: string;
  suffix?: string;
  helperText?: string;
}

const InputFieldContainer: React.FC<PropsWithChildren<Props>> = ({ suffix, helperText, children }) => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      })}
    >
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        })}
      >
        {children}
        <span
          className={css({
            textStyle: 'body-16-m',
            color: 'text.dark.02',
          })}
        >
          {suffix}
        </span>
      </div>
      {helperText && (
        <div
          className={css({
            display: 'flex',
            gap: '12px',
            color: 'text.light.04',
            alignItems: 'center',
          })}
        >
          <IconCheck size={24} />
          <span
            className={css({
              textStyle: 'body-14-m',
              color: 'text.light.04',
            })}
          >
            {helperText}
          </span>
        </div>
      )}
    </div>
  );
};

export default InputFieldContainer;
