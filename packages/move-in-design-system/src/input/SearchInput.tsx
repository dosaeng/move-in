import { css, cx } from '@move-in/styled-system/css';
import React from 'react';
import { IconSearch } from '../icons/icons';

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  defaultValue?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ ...props }) => {
  return (
    <div
      className={css({
        position: 'relative',
      })}
    >
      <input
        {...props}
        className={cx(
          'peer',
          css({
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
            _disabled: { borderColor: 'brand.purple.01', color: 'text.light.04' },
          })
        )}
        type="text"
      />
      <IconSearch
        className={css({
          position: 'absolute',
          right: '16px',
          top: '14px',
          color: 'brand.purple.03',
          _peerDisabled: { color: 'brand.purple.01' },
        })}
        size={20}
      />
    </div>
  );
};
