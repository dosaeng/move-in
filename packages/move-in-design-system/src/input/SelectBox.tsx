import React, { Key, PropsWithChildren } from 'react';
import { css, cva, cx } from '@move-in/styled-system/css';
import { Modal } from '../popup/Modal';
import { IconChevronRight } from '../icons/icons';

export type SelectBoxOption<K, V> = { key: K; value: V };

export interface SelectBoxProps<K, V> {
  className?: string;
  modalClassName?: string;
  value?: SelectBoxOption<K, V>;
  defaultValue?: SelectBoxOption<K, V>;
  options: SelectBoxOption<K, V>[];
  disabled?: boolean;
  placeholder?: string;
  modalTitle?: React.ReactNode;
  modalColumnsCount?: number;
  renderValue?: (value: SelectBoxOption<K, V> | undefined) => React.ReactNode;
  onChange?: (value: SelectBoxOption<K, V>) => void;
}

export const SelectBox = <K extends Key, V>({
  className,
  modalClassName,
  value,
  defaultValue,
  options,
  disabled = false,
  placeholder,
  modalTitle,
  modalColumnsCount,
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
    <div className={className}>
      <SelectBoxTrigger
        hasValue={currentOption != null}
        disabled={disabled}
        placeholder={placeholder}
        onClick={() => setIsOpen(true)}
      >
        {(renderValue && renderValue(currentOption)) ?? (currentOption?.value ?? '').toString()}
      </SelectBoxTrigger>
      <Modal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
        <SelectBoxModalContent className={modalClassName} title={modalTitle}>
          <div
            className={cx(
              css({
                display: 'grid',
                flexDirection: 'column',
                gap: '12px',
              }),
              'modal-content-grid'
            )}
            style={{
              gridTemplateColumns: `repeat(${modalColumnsCount ?? 1}, 1fr)`,
            }}
          >
            {options.map((option) => {
              return (
                <SelectBoxOptionRow
                  key={option.key}
                  selected={option.key === currentOption?.key}
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
        </SelectBoxModalContent>
      </Modal>
    </div>
  );
};

export const SelectBoxTrigger: React.FC<
  React.PropsWithChildren<{
    className?: string;
    hasValue?: boolean;
    disabled?: boolean;
    placeholder?: string;
    onClick?: () => void;
  }>
> = ({ className, hasValue, disabled, placeholder, onClick, children }) => {
  return (
    <div
      className={cx(
        cva({
          base: {
            borderWidth: '1px',
            borderStyle: 'solid',
            borderRadius: '12px',
            borderColor: 'stroke.light.02',
            paddingX: '16px',
            paddingY: '14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            textStyle: 'body-16-m',
            cursor: 'pointer',
          },
          variants: {
            disabled: {
              true: {
                cursor: 'initial',
              },
            },
          },
        })({ disabled }),
        className
      )}
      onClick={!disabled ? onClick : undefined}
    >
      <span
        className={cva({
          base: {
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            color: 'text.dark.04',
            flex: 1,
          },
          variants: {
            hasValue: {
              false: {
                color: 'text.light.04',
              },
            },
          },
        })({ hasValue })}
      >
        {hasValue ? children : placeholder}
      </span>
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

export const SelectBoxModalContent: React.FC<
  PropsWithChildren<{
    className?: string;
    title?: React.ReactNode;
  }>
> = ({ className, title, children }) => {
  return (
    <div
      className={cx(
        css({
          paddingX: '24px',
          paddingBottom: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          flex: 1,
        }),
        className
      )}
    >
      <div
        className={css({
          textStyle: 'header-18-sb',
          color: 'text.dark.04',
        })}
      >
        {title}
      </div>
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
    <div
      className={cx(
        cva({
          base: {
            borderWidth: '1px',
            borderStyle: 'solid',
            borderRadius: '12px',
            borderColor: 'stroke.light.02',
            paddingX: '16px',
            paddingY: '14px',
            display: 'flex',
            alignItems: 'center',
            textStyle: 'body-14-m',
            color: 'text.dark.03',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            _hover: {
              opacity: 0.8,
            },
          },
          variants: {
            selected: {
              true: {
                borderWidth: '1.4px',
                borderStyle: 'solid',
                borderColor: 'brand.purple.03',
                color: 'brand.purple.03',
              },
            },
          },
        })({ selected }),
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
