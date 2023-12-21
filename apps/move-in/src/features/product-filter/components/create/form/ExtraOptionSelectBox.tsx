import { useCodeList } from '@move-in/core'
import {
  Button,
  FormInputLabel,
  IconButton,
  IconChevronLeft,
  IconChevronRight,
  Modal,
  SelectBoxModalContent,
  SelectBoxOption,
  SelectBoxOptionRow,
  SelectBoxTrigger,
} from '@move-in/design-system';
import { css } from '@move-in/styled-system/css';
import { useState } from 'react';

interface ExtraOptionSelectBoxValue {
  livingOption?: number[];
  communityLife?: number[];
  livingInfra?: number[];
  educationLife?: number[];
  deliveryLife?: number[];
}

interface Props {
  value?: ExtraOptionSelectBoxValue;
  defaultValue?: ExtraOptionSelectBoxValue;
  onChange?: (value?: ExtraOptionSelectBoxValue) => void;
}

const ExtraOptionSelectBox: React.FC<Props> = ({
  value,
  defaultValue,
  onChange,
}) => {
  const { data: codeTable } = useCodeList();
  const options = codeTable?.extraOptions;
  const [internalValue, setInternalValue] = useState<
    ExtraOptionSelectBoxValue | undefined
  >(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const currentValue = value != null ? value : internalValue;

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      })}
    >
      <FormInputLabel
        prefix="05-B"
        label="내게 중요한 희망 사항을 골라주세요."
      />
      <SelectBoxTrigger
        hasValue={currentValue != null}
        placeholder="눌러서 선택해주세요"
        onClick={() => setIsOpen(true)}
      >
        {currentValue != null &&
          Object.entries(currentValue)
            .reduce((result, item) => {
              if (item?.length > 0) {
                const [key, value] = item as [
                  keyof ExtraOptionSelectBoxValue,
                  number[],
                ];
                const valueList =
                  options?.[key]?.filter((option) =>
                    value.includes(option.key)
                  ) ?? [];

                result.push(...valueList.map((option) => option.value));
              }

              return result;
            }, [] as string[])
            .join(', ')}
      </SelectBoxTrigger>
      <Modal isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
        <SelectBoxModalContent title="내게 중요한 희망 사항을 골라주세요.">
          <ExtraOptionTabView
            value={currentValue}
            onChange={(value) => {
              setInternalValue(value);
              onChange && onChange(value);
              setIsOpen(false);
            }}
          />
        </SelectBoxModalContent>
      </Modal>
    </div>
  );
};

export default ExtraOptionSelectBox;

const ExtraOptionTabView: React.FC<{
  value?: ExtraOptionSelectBoxValue;
  onChange: (value?: ExtraOptionSelectBoxValue) => void;
}> = ({ value, onChange }) => {
  const [internalValue, setInternalValue] = useState<
    ExtraOptionSelectBoxValue | undefined
  >(value);
  const [tabIndex, setTabIndex] = useState(0);
  const onPrev = tabIndex > 0 ? () => setTabIndex(tabIndex - 1) : undefined;
  const onNext = tabIndex < 4 ? () => setTabIndex(tabIndex + 1) : undefined;
  const onUpdate = (key: keyof ExtraOptionSelectBoxValue) => {
    return (value: number[]) => {
      setInternalValue((prevValue) => {
        return {
          ...prevValue,
          [key]: value,
        };
      });
    };
  };
  const hasValue =
    internalValue != null &&
    Object.values(internalValue).reduce(
      (acc, value) => acc || value?.length > 0,
      false
    );

  const children = [
    <LivingOptionView
      value={internalValue?.livingOption}
      onChange={onUpdate('livingOption')}
      onPrev={onPrev}
      onNext={onNext}
    />,
    <CommunityLifeView
      value={internalValue?.communityLife}
      onChange={onUpdate('communityLife')}
      onPrev={onPrev}
      onNext={onNext}
    />,
    <LivingInfraView
      value={internalValue?.livingInfra}
      onChange={onUpdate('livingInfra')}
      onPrev={onPrev}
      onNext={onNext}
    />,
    <EducationLifeView
      value={internalValue?.educationLife}
      onChange={onUpdate('educationLife')}
      onPrev={onPrev}
      onNext={onNext}
    />,
    <DeliveryLifeView
      value={internalValue?.deliveryLife}
      onChange={onUpdate('deliveryLife')}
      onPrev={onPrev}
      onNext={onNext}
    />,
  ];

  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      })}
    >
      {children[tabIndex]}
      <Button
        shape={hasValue ? 'fill' : 'outline'}
        label={hasValue ? '입력을 완료했어요' : '넘어갈께요'}
        theme={hasValue ? 'brand' : 'neutral'}
        onClick={() => {
          onChange(internalValue);
        }}
      />
    </div>
  );
};

const LivingOptionView: React.FC<
  Omit<TabContentViewProps, 'title' | 'options'>
> = ({ value, ...props }) => {
  const { data: codeTable } = useCodeList();
  const options = codeTable?.extraOptions.livingOption;

  return (
    <TabContentView
      title="구성 옵션"
      value={value}
      options={options ?? []}
      {...props}
    />
  );
};

const CommunityLifeView: React.FC<
  Omit<TabContentViewProps, 'title' | 'options'>
> = ({ value, ...props }) => {
  const { data: codeTable } = useCodeList();
  const options = codeTable?.extraOptions.communityLife;

  return (
    <TabContentView
      title="공동 생활"
      value={value}
      options={options ?? []}
      {...props}
    />
  );
};

const LivingInfraView: React.FC<
  Omit<TabContentViewProps, 'title' | 'options'>
> = ({ value, ...props }) => {
  const { data: codeTable } = useCodeList();
  const options = codeTable?.extraOptions.livingInfra;

  return (
    <TabContentView
      title="생활권"
      value={value}
      options={options ?? []}
      {...props}
    />
  );
};

const EducationLifeView: React.FC<
  Omit<TabContentViewProps, 'title' | 'options'>
> = ({ value, ...props }) => {
  const { data: codeTable } = useCodeList();
  const options = codeTable?.extraOptions.educationLife;

  return (
    <TabContentView
      title="학군"
      value={value}
      options={options ?? []}
      {...props}
    />
  );
};

const DeliveryLifeView: React.FC<
  Omit<TabContentViewProps, 'title' | 'options'>
> = ({ value, ...props }) => {
  const { data: codeTable } = useCodeList();
  const options = codeTable?.extraOptions.deliveryLife;

  return (
    <TabContentView
      title="배달권"
      value={value}
      options={options ?? []}
      {...props}
    />
  );
};

interface TabContentViewProps {
  title: string;
  value?: number[];
  onChange?: (value: number[]) => void;
  options: SelectBoxOption<number, string>[];
  onPrev?: () => void;
  onNext?: () => void;
}

const TabContentView: React.FC<TabContentViewProps> = ({
  title,
  value,
  options,
  onChange,
  onNext,
  onPrev,
}) => {
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      })}
    >
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textStyle: 'body-16-m',
          overflow: 'hidden',
        })}
      >
        {onPrev ? (
          <IconButton
            shape="outline"
            size="s"
            theme="neutral"
            icon={<IconChevronLeft />}
            onClick={onPrev}
          />
        ) : (
          <div
            className={css({
              width: '32px',
            })}
          />
        )}
        <div>{title}</div>
        {onNext ? (
          <IconButton
            shape="outline"
            size="s"
            theme="neutral"
            icon={<IconChevronRight />}
            onClick={onNext}
          />
        ) : (
          <div
            className={css({
              width: '32px',
            })}
          />
        )}
      </div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          flex: 1,
          paddingY: '32px',
          overflowY: 'auto',
        })}
      >
        {options?.map((option) => {
          return (
            <SelectBoxOptionRow
              selected={value?.includes(option.key)}
              onClick={() => {
                const newValue = value?.includes(option.key)
                  ? value.filter((key) => key !== option.key)
                  : [...(value ?? []), option.key];

                onChange && onChange(newValue);
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
