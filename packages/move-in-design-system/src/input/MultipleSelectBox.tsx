import { css } from '@move-in/styled-system/css';
import React, { Key } from 'react';
import { Button } from '../buttons/Button';
import { Modal } from '../popup/Modal';
import { SelectBoxModalContent, SelectBoxOption, SelectBoxOptionRow, SelectBoxTrigger } from './SelectBox';

export interface MultipleSelectBoxProps<K, V> {
  value?: SelectBoxOption<K, V>[];
  defaultValue?: SelectBoxOption<K, V>[];
  options: SelectBoxOption<K, V>[];
  disabled?: boolean;
  placeholder?: string;
  modalTitle?: React.ReactNode;
  modalColumnsCount?: number;
  renderValue?: (value: SelectBoxOption<K, V>[]) => React.ReactNode;
  onChange?: (value: SelectBoxOption<K, V>[]) => void;
}

export const MultipleSelectBox = <K extends Key, V>({
  value,
  defaultValue,
  options,
  disabled = false,
  placeholder,
  modalTitle,
  modalColumnsCount,
  renderValue,
  onChange,
}: MultipleSelectBoxProps<K, V>) => {
  const [selectedValue, setSelectedValue] = React.useState<SelectBoxOption<K, V>[]>(defaultValue ?? []);
  const [isOpen, setIsOpen] = React.useState(false);
  const currentOptions = value != null ? value : selectedValue;
  const currentOptionsKeys = currentOptions.map((option) => option.key);
  const hasValue = currentOptions.length > 0;

  return (
    <>
      <SelectBoxTrigger
        hasValue={currentOptions.length > 0}
        disabled={disabled}
        placeholder={placeholder}
        onClick={() => setIsOpen(true)}
      >
        {(renderValue && renderValue(currentOptions)) ??
          currentOptions.map((item) => (item.value ?? '').toString()).join(', ')}
      </SelectBoxTrigger>
      <Modal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
        <SelectBoxModalContent title={modalTitle}>
          <div
            className={css({
              display: 'grid',
              flexDirection: 'column',
              gap: '12px',
            })}
            style={{
              gridTemplateColumns: `repeat(${modalColumnsCount ?? 1}, 1fr)`,
            }}
          >
            {options.map((option) => {
              return (
                <SelectBoxOptionRow
                  key={option.key}
                  selected={currentOptionsKeys.includes(option.key)}
                  onClick={() => {
                    setSelectedValue((prevOptions) => {
                      const targetIndex = prevOptions.findIndex((item) => item.key === option.key);

                      if (targetIndex === -1) {
                        return [...prevOptions, option];
                      } else {
                        return [...prevOptions.slice(0, targetIndex), ...prevOptions.slice(targetIndex + 1)];
                      }
                    });
                  }}
                >
                  {(renderValue && renderValue([option])) ?? (option.value ?? '').toString()}
                </SelectBoxOptionRow>
              );
            })}
          </div>
          <Button
            label="모두 골랐어요"
            theme="brand"
            disabled={!hasValue}
            onClick={() => {
              onChange && onChange(selectedValue);
              setIsOpen(false);
            }}
          />
        </SelectBoxModalContent>
      </Modal>
    </>
  );
};
