import React, { Key, PropsWithChildren } from 'react';
import { css, cva, cx } from '@move-in/styled-system/css';
import { Modal } from '../popup/Modal';
import { IconChevronRight } from '../icons/icons';

const selectBoxOptionRowStyle = cva({
  base: {
    border: '1px solid',
    borderRadius: '12px',
    borderColor: 'stroke.light.02',
    paddingX: '16px',
    paddingY: '14px',
    display: 'flex',
    alignItems: 'center',
    textStyle: 'body-14-m',
    color: 'text.dark.03',
    _hover: {
      opacity: 0.8,
    },
  },
  variants: {
    selected: {
      true: {
        border: '1.4px solid',
        borderColor: 'brand.purple.03',
        color: 'brand.purple.03',
      },
    },
  },
});

const selectBoxText = cva({
  base: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    color: 'text.dark.04',
  },
  variants: {
    hasValue: {
      false: {
        color: 'text.light.04',
      },
    },
  },
});

export type SelectBoxOption<K, V> = { key: K; value: V };

export interface SelectBoxProps<K, V> {
  value?: SelectBoxOption<K, V>;
  defaultValue?: SelectBoxOption<K, V>;
  options: SelectBoxOption<K, V>[];
  disabled?: boolean;
  placeholder?: string;
  modalTitle?: React.ReactNode;
  renderValue?: (value: SelectBoxOption<K, V> | undefined) => React.ReactNode;
  onChange?: (value: SelectBoxOption<K, V>) => void;
}

export const SelectBox = <K extends Key, V>({
  value,
  defaultValue,
  options,
  disabled = false,
  placeholder,
  modalTitle,
  renderValue,
  onChange,
}: SelectBoxProps<K, V>) => {
  const [selectedValue, setSelectedValue] = React.useState<SelectBoxOption<K, V> | undefined>(value ?? defaultValue);
  const [isOpen, setIsOpen] = React.useState(false);
  const currentOption = options.find((option) => {
    const key = value != null ? value.key : selectedValue?.key;

    return option.key === key;
  });

  return (
    <>
      <SelectBoxTrigger hasValue={currentOption != null} disabled={disabled} onClick={() => setIsOpen(true)}>
        {(renderValue && renderValue(currentOption)) ?? (currentOption?.value ?? placeholder ?? '').toString()}
      </SelectBoxTrigger>
      <Modal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
        <div
          className={css({
            paddingX: '24px',
            paddingBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          })}
        >
          <SelectBoxModalTitle>{modalTitle}</SelectBoxModalTitle>
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            })}
          >
            {options.map((option) => {
              return (
                <SelectBoxOptionRow
                  key={option.key}
                  selected={option.key === selectedValue?.key}
                  onClick={() => {
                    setSelectedValue(option);
                    onChange && onChange(option);
                    setIsOpen(false);
                  }}
                >
                  {(renderValue && renderValue(option)) ?? (option.value ?? '').toString()}
                </SelectBoxOptionRow>
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
};

export const SelectBoxTrigger: React.FC<
  React.PropsWithChildren<{
    className?: string;
    hasValue?: boolean;
    disabled?: boolean;
    onClick?: () => void;
  }>
> = ({ className, hasValue, disabled, onClick, children }) => {
  return (
    <div
      className={cx(
        css({
          border: '1px solid',
          borderRadius: '12px',
          borderColor: 'stroke.light.02',
          paddingX: '16px',
          paddingY: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          textStyle: 'body-16-m',
        }),
        className
      )}
      onClick={!disabled ? onClick : undefined}
    >
      <span className={selectBoxText({ hasValue })}>{children}</span>
      {!disabled && (
        <IconChevronRight
          className={css({
            color: 'text.light.04',
          })}
          size={16}
        />
      )}
    </div>
  );
};

export const SelectBoxModalTitle: React.FC<
  PropsWithChildren<{
    className?: string;
  }>
> = ({ className, children }) => {
  return (
    <div
      className={cx(
        css({
          textStyle: 'header-18-sb',
          color: 'text.dark.04',
        }),
        className
      )}
    >
      {children}
    </div>
  );
};

export const SelectBoxOptionRow: React.FC<
  React.PropsWithChildren<{
    className?: string;
    selected?: boolean;
    onClick?: () => void;
  }>
> = ({ className, selected, onClick, children }) => {
  return (
    <div className={cx(selectBoxOptionRowStyle({ selected }), className)} onClick={onClick}>
      {children}
    </div>
  );
};