import { useCodeList } from '@move-in/core';
import {
  Button,
  FormInputLabel,
  Modal,
  SelectBoxModalContent,
  SelectBoxOption,
  SelectBoxOptionRow,
  SelectBoxTrigger,
} from '@move-in/design-system';
import { css } from '@move-in/styled-system/css';
import { PropsWithChildren, useState } from 'react';

interface TrafficLifeSelectBoxValue {
  busStop?: number;
  trainStation?: number;
  terminal?: number;
  parking?: number;
}

interface Props {
  value?: TrafficLifeSelectBoxValue;
  defaultValue?: TrafficLifeSelectBoxValue;
  onChange?: (value?: TrafficLifeSelectBoxValue) => void;
}

const TrafficLifeSelectBox: React.FC<Props> = ({
  value,
  defaultValue,
  onChange,
}) => {
  const { data: codeTable, isLoading } = useCodeList();
  const options = codeTable?.trafficLife;
  const [internalValue, setInternalValue] = useState<
    TrafficLifeSelectBoxValue | undefined
  >(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const currentValue = value != null ? value : internalValue;
  const isValid =
    currentValue?.busStop != null &&
    currentValue?.trainStation != null &&
    currentValue?.terminal != null &&
    currentValue?.parking != null;

  return (
    <div
      key={isLoading ? 'loading' : 'loaded'}
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      })}
    >
      <FormInputLabel prefix="05-A" label="교통권이 어땠으면 하시나요?" />
      <SelectBoxTrigger
        hasValue={currentValue != null}
        placeholder="눌러서 선택해주세요"
        onClick={() => setIsOpen(true)}
      >
        {Object.keys(currentValue ?? {})
          .map((key) => {
            const currentOptionValue =
              currentValue?.[key as keyof typeof currentValue];
            const option = options?.[key as keyof typeof options]?.find(
              (option) => option.key === currentOptionValue
            );
            return option?.value;
          })
          .filter((value) => value != null)
          .join(', ')}
      </SelectBoxTrigger>
      <Modal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
        <SelectBoxModalContent
          className={css({
            overflow: 'hidden',
          })}
          title="교통권이 어땠으면 하시나요?"
        >
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'hidden',
            })}
          >
            <div
              className={css({
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
                overflowY: 'auto',
                paddingBottom: '16px',
              })}
            >
              <TrafficLifeSelectOptionView
                title="버스 정류장까지"
                options={options?.busStop}
                selectedKey={internalValue?.busStop}
                onChange={(value) => {
                  setInternalValue((prevValue) => {
                    return {
                      ...prevValue,
                      busStop: value.key,
                    };
                  });
                }}
              />
              <TrafficLifeSelectOptionView
                title="지하철역까지"
                options={options?.trainStation}
                selectedKey={internalValue?.trainStation}
                onChange={(value) => {
                  setInternalValue((prevValue) => {
                    return {
                      ...prevValue,
                      trainStation: value.key,
                    };
                  });
                }}
              />
              <TrafficLifeSelectOptionView
                title="버스 터미널 및 기차역까지 대중교통으로"
                options={options?.terminal}
                selectedKey={internalValue?.terminal}
                onChange={(value) => {
                  setInternalValue((prevValue) => {
                    return {
                      ...prevValue,
                      terminal: value.key,
                    };
                  });
                }}
              />
              <TrafficLifeSelectOptionView
                title="차량 주차 공간이 필요해요"
                options={options?.parking}
                selectedKey={internalValue?.parking}
                onChange={(value) => {
                  setInternalValue((prevValue) => {
                    return {
                      ...prevValue,
                      parking: value.key,
                    };
                  });
                }}
              />
            </div>
            <Button
              label="완료"
              disabled={!isValid}
              onClick={() => {
                setIsOpen(false);
                onChange && onChange(internalValue);
              }}
            />
          </div>
        </SelectBoxModalContent>
      </Modal>
    </div>
  );
};

export default TrafficLifeSelectBox;

const TrafficLifeSelectOptionView: React.FC<
  PropsWithChildren<{
    title: string;
    selectedKey?: number;
    options?: SelectBoxOption<number, string>[];
    onChange?: (value: SelectBoxOption<number, string>) => void;
  }>
> = ({ title, selectedKey, options, onChange }) => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      })}
    >
      <div
        className={css({
          textStyle: 'body-14-sb',
          color: 'text.dark.04',
        })}
      >
        {title}
      </div>
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
        })}
      >
        {options?.map((option) => {
          return (
            <SelectBoxOptionRow
              className={css({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              })}
              key={option.key}
              selected={option.key === selectedKey}
              onClick={() => {
                onChange && onChange(option);
              }}
            >
              {option.value}
            </SelectBoxOptionRow>
          );
        })}
      </div>
    </div>
  );
};
