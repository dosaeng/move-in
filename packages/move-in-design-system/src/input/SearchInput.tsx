import { css, cva, cx } from '@move-in/styled-system/css';
import React from 'react';
import { IconSearch } from '../icons/icons';

export interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  defaultValue?: string;
  theme?: 'neutral' | 'brand';
}

export const SearchInput: React.FC<SearchInputProps> = ({
  theme = 'neutral',
  ...props
}) => {
  return (
    <div
      className={css({
        position: 'relative',
      })}
    >
      <input
        {...props}
        className={cx(
          props.className,
          'peer',
          cva({
            base: {
              width: '100%',
              borderRadius: '12px',
              borderWidth: '1.4px',
              borderStyle: 'solid',
              borderColor: 'brand.purple.03',
              paddingLeft: '16px',
              paddingRight: '40px',
              paddingY: '14px',
              outline: 'none',
              textStyle: 'body-14-sb',
              color: 'text.dark.04',
              _placeholder: {
                textStyle: 'body-14-r',
                color: 'text.light.04',
              },
              _disabled: {
                borderColor: 'brand.purple.01',
                color: 'text.light.04',
              },
            },
            variants: {
              theme: {
                brand: {
                  borderColor: 'brand.purple.03',
                  _placeholder: {
                    color: 'text.light.04',
                  },
                  _disabled: {
                    borderColor: 'brand.purple.01',
                    color: 'text.light.04',
                  },
                },
                neutral: {
                  borderColor: 'stroke.light.03',
                  _placeholder: {
                    color: 'text.light.04',
                  },
                  _disabled: {
                    borderColor: 'stroke.light.04',
                    color: 'text.light.04',
                  },
                },
              },
            },
          })({
            theme,
          })
        )}
        type="text"
      />
      <IconSearch
        className={cva({
          base: {
            position: 'absolute',
            right: '16px',
            top: '14px',
            color: 'brand.purple.03',
            _peerDisabled: { color: 'brand.purple.01' },
          },
          variants: {
            theme: {
              brand: {
                color: 'brand.purple.03',
                _peerDisabled: { color: 'brand.purple.01' },
              },
              neutral: {
                color: 'text.light.04',
                _peerDisabled: { color: 'text.light.04' },
              },
            },
          },
        })({
          theme,
        })}
        size={20}
      />
    </div>
  );
};
