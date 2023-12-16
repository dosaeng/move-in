import {
  Button,
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
import { useQuery } from 'react-query';
import FilterSelectBoxLabel from '../base/FilterSelectBoxLabel';

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

const ExtraOptionSelectBox: React.FC<Props> = ({ value, defaultValue, onChange }) => {
  const { data: options } = useExtraOptions();
  const [internalValue, setInternalValue] = useState<ExtraOptionSelectBoxValue | undefined>(defaultValue);
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
      <FilterSelectBoxLabel prefix="05-B" label="내게 중요한 희망 사항을 골라주세요." />
      <SelectBoxTrigger
        hasValue={currentValue != null}
        placeholder="눌러서 선택해주세요"
        onClick={() => setIsOpen(true)}
      >
        {currentValue != null &&
          Object.entries(currentValue)
            .reduce((result, item) => {
              if (item?.length > 0) {
                const [key, value] = item as [keyof ExtraOptionSelectBoxValue, number[]];
                const valueList = options?.[key]?.filter((option) => value.includes(option.key)) ?? [];

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
  const [internalValue, setInternalValue] = useState<ExtraOptionSelectBoxValue | undefined>(value);
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
    internalValue != null && Object.values(internalValue).reduce((acc, value) => acc || value?.length > 0, false);

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

const LivingOptionView: React.FC<Omit<TabContentViewProps, 'title' | 'options'>> = ({ value, ...props }) => {
  const { data: options } = useExtraOptions();

  return <TabContentView title="구성 옵션" value={value} options={options?.livingOption ?? []} {...props} />;
};

const CommunityLifeView: React.FC<Omit<TabContentViewProps, 'title' | 'options'>> = ({ value, ...props }) => {
  const { data: options } = useExtraOptions();

  return <TabContentView title="공동 생활" value={value} options={options?.communityLife ?? []} {...props} />;
};

const LivingInfraView: React.FC<Omit<TabContentViewProps, 'title' | 'options'>> = ({ value, ...props }) => {
  const { data: options } = useExtraOptions();

  return <TabContentView title="생활권" value={value} options={options?.livingInfra ?? []} {...props} />;
};

const EducationLifeView: React.FC<Omit<TabContentViewProps, 'title' | 'options'>> = ({ value, ...props }) => {
  const { data: options } = useExtraOptions();

  return <TabContentView title="학군" value={value} options={options?.educationLife ?? []} {...props} />;
};

const DeliveryLifeView: React.FC<Omit<TabContentViewProps, 'title' | 'options'>> = ({ value, ...props }) => {
  const { data: options } = useExtraOptions();

  return <TabContentView title="배달권" value={value} options={options?.deliveryLife ?? []} {...props} />;
};

interface TabContentViewProps {
  title: string;
  value?: number[];
  onChange?: (value: number[]) => void;
  options: SelectBoxOption<number, string>[];
  onPrev?: () => void;
  onNext?: () => void;
}

const TabContentView: React.FC<TabContentViewProps> = ({ title, value, options, onChange, onNext, onPrev }) => {
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
          <IconButton shape="outline" size="s" theme="neutral" icon={<IconChevronLeft />} onClick={onPrev} />
        ) : (
          <div
            className={css({
              width: '32px',
            })}
          />
        )}
        <div>{title}</div>
        {onNext ? (
          <IconButton shape="outline" size="s" theme="neutral" icon={<IconChevronRight />} onClick={onNext} />
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

const useExtraOptions = () => {
  return useQuery(['extraSelectBoxOptions'], () => {
    return {
      livingOption: [
        { key: 1, value: '냉장고' },
        { key: 2, value: '김치 냉장고' },
        { key: 3, value: '가스레인지' },
        { key: 4, value: '인덕션 / 하이라이트' },
        { key: 5, value: '에어컨' },
        { key: 6, value: '침대' },
        { key: 7, value: '옷장' },
        { key: 8, value: '스타일러' },
        { key: 9, value: '신발장' },
        { key: 10, value: 'TV' },
        { key: 11, value: '식탁 세트' },
        { key: 12, value: '책상' },
        { key: 13, value: '소파' },
      ],
      communityLife: [
        { key: 1, value: '공동 현관 보안' },
        { key: 2, value: '경비원 및 시설 관리자' },
        { key: 3, value: '대형 세대 단지' },
        { key: 4, value: '무인 택배함' },
        { key: 5, value: '분리수거 및 쓰레기 처리 시설' },
        { key: 6, value: '커뮤니티 시설 (헬스장)' },
      ],
      livingInfra: [
        { key: 1, value: '동네 대형마트' },
        { key: 2, value: '5분 내 편의점' },
        { key: 3, value: '백화점' },
        { key: 4, value: '영화관 / 극장' },
        { key: 5, value: '헬스장 등 체육 시설' },
        { key: 6, value: '근린 공원' },
        { key: 7, value: '은행 및 ATM' },
        { key: 8, value: '행정 복지 센터' },
      ],
      educationLife: [
        { key: 1, value: '유아 놀이방' },
        { key: 2, value: '유치원' },
        { key: 3, value: '초등학교' },
        { key: 4, value: '중학교' },
        { key: 5, value: '고등학교' },
        { key: 6, value: '대학교 / 대학원' },
        { key: 7, value: '학원가' },
      ],
      deliveryLife: [
        { key: 1, value: '일반 택배 배송 가능' },
        { key: 2, value: '쿠팡 / SSG 등 당일 배송 서비스 가능' },
        { key: 3, value: '배달의 민족 등 음식 배달 가능' },
      ],
    };
  });
};
