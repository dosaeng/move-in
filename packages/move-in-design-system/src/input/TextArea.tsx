import { css } from '@move-in/styled-system/css';
import React from 'react';

interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  value?: string;
  defaultValue?: string;
}

export const TextArea: React.FC<TextAreaProps> = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ id, onChange, onBlur, onFocus, ...props }, ref) => {
    const [value, setValue] = React.useState<string | undefined>(props.value ?? props.defaultValue);

    return (
      <div
        className={css({
          width: '100%',
          position: 'relative',
          backgroundColor: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        })}
      >
        <textarea
          {...props}
          id={id}
          ref={ref}
          className={css({
            width: '100%',
            minHeight: '130px',
            color: 'text.dark.04',
            backgroundColor: 'transparent',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'stroke.light.02',
            outline: 'none',
            borderRadius: '16px',
            padding: '16px',
            resize: 'none',
            textStyle: 'body-14-r',
            _placeholder: {
              color: 'text.light.03',
            },
            _autofill: {
              backgroundColor: 'transparent',
            },
          })}
          onChange={(e) => {
            setValue(e.target.value);

            onChange && onChange(e);
          }}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {props.maxLength != null && (
          <div
            className={css({
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              textStyle: 'body-14-r',
              color: 'text.dark.02',
            })}
          >
            <span>
              <span
                className={css({
                  textStyle: 'body-14-m',
                  color: 'brand.purple.03',
                })}
              >
                {value?.length ?? 0}자
              </span>
              <span>{`/ `}</span>
              <span>{props.maxLength}자</span>
            </span>
          </div>
        )}
      </div>
    );
  }
);
