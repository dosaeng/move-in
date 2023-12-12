import {
  Button,
  Modal,
  SelectBoxModalContent,
  SelectBoxOption,
  SelectBoxOptionRow,
  SelectBoxTrigger,
} from '@move-in/move-in-design-system';
import { PropsWithChildren, useState } from 'react';
import { useQuery } from 'react-query';
import { css } from '@move-in/styled-system/css';
import FilterSelectBoxLabel from '../base/FilterSelectBoxLabel';

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

const TrafficLifeSelectBox: React.FC<Props> = ({ value, defaultValue, onChange }) => {
  const { data: options, isLoading } = useQuery(['trafficLifeSelectOptions'], () => {
    return {
      // 버스 정류장까지
      busStop: [
        {
          key: 1,
          value: '도보 5분',
        },
        {
          key: 2,
          value: '도보 10분',
        },
        {
          key: 3,
          value: '상관없음',
        },
      ],
      // 지하철역까지
      trainStation: [
        { key: 1, value: '도보 5분' },
        { key: 2, value: '도보 10분' },
        { key: 3, value: '도보 15분' },
        { key: 4, value: '버스 5분' },
        { key: 5, value: '버스 10분' },
        { key: 6, value: '버스 15분' },
      ],
      // 버스 터미널 및 기차역까지 대중교통으로
      terminal: [
        { key: 1, value: '편의점' },
        { key: 2, value: '마트' },
        { key: 3, value: '식당' },
        { key: 4, value: '카페' },
        { key: 5, value: '병원' },
        { key: 6, value: '은행' },
      ],
      // 차량 주차 공간이 필요해요
      parking: [
        { key: 1, value: '1대' },
        { key: 2, value: '2대 이상' },
        { key: 3, value: '필요 없음' },
      ],
    };
  });
  const [internalValue, setInternalValue] = useState<TrafficLifeSelectBoxValue | undefined>(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const currentValue = value != null ? value : internalValue;

  return (
    <div
      key={isLoading ? 'loading' : 'loaded'}
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      })}
    >
      <FilterSelectBoxLabel prefix="05-A" label="교통권이 어땠으면 하시나요?" />
      <SelectBoxTrigger
        hasValue={currentValue != null}
        placeholder="눌러서 선택해주세요"
        onClick={() => setIsOpen(true)}
      >
        {Object.keys(currentValue ?? {})
          .map((key) => {
            const currentOptionValue = currentValue?.[key as keyof typeof currentValue];
            const option = options?.[key as keyof typeof options]?.find((option) => option.key === currentOptionValue);
            return option?.value;
          })
          .filter((value) => value != null)
          .join(', ')}
      </SelectBoxTrigger>
      <Modal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
        <SelectBoxModalContent title="교통권이 어땠으면 하시나요?">
          <div
            className={css({
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
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
            <Button
              label="완료"
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
