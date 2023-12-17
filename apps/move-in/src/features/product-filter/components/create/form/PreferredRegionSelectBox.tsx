import {
  Button,
  Modal,
  SearchInput,
  SelectBoxModalContent,
  SelectBoxOption,
  SelectBoxOptionRow,
  SelectBoxTrigger,
  FormInputLabel,
} from '@move-in/design-system';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { css } from '@move-in/styled-system/css';

interface PreferredRegionSelectBoxValue {
  region?: number;
  address?: string;
  place?: string[];
}

interface Props {
  value?: PreferredRegionSelectBoxValue;
  defaultValue?: PreferredRegionSelectBoxValue;
  onChange?: (value?: PreferredRegionSelectBoxValue) => void;
}

const PreferredRegionSelectBox: React.FC<Props> = ({ value, defaultValue, onChange }) => {
  const { data: options } = useRegionList();
  const [internalValue, setInternalValue] = useState<PreferredRegionSelectBoxValue | undefined>(defaultValue);
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false);
  const currentValue = value != null ? value : internalValue;
  const regionOption = options?.find((option) => option.key === currentValue?.region);

  return (
    <div>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        })}
      >
        <FormInputLabel prefix="04-A" label="어느 지역을 선호하시나요?" />
        <SelectBoxTrigger
          hasValue={currentValue != null}
          placeholder="눌러서 선택해주세요"
          onClick={() => setIsRegionModalOpen(true)}
        >
          {[regionOption?.value, currentValue?.address, currentValue?.place?.join(', ')]
            .filter((value) => value != null && value !== '')
            .join(', ')}
        </SelectBoxTrigger>
      </div>
      <Modal isOpen={isRegionModalOpen} onDidDismiss={() => setIsRegionModalOpen(false)}>
        <RegionSelectView
          selectedKey={internalValue?.region}
          onChange={(value) => {
            setInternalValue((prevValue) => {
              return {
                ...prevValue,
                region: value.key,
              };
            });

            setIsRegionModalOpen(false);
            setIsAddressModalOpen(true);
          }}
        />
      </Modal>
      <Modal isOpen={isAddressModalOpen} onDidDismiss={() => setIsAddressModalOpen(false)}>
        <AddressSearchView
          onChange={(value) => {
            setInternalValue((prevValue) => {
              return {
                ...prevValue,
                address: value,
              };
            });
            setIsAddressModalOpen(false);
            setIsPlaceModalOpen(true);
          }}
        />
      </Modal>
      <Modal isOpen={isPlaceModalOpen} onDidDismiss={() => setIsPlaceModalOpen(false)}>
        <PlaceSearchView
          value={currentValue?.place}
          onChange={(value) => {
            setInternalValue((prevValue) => {
              return {
                ...prevValue,
                place: value,
              };
            });
            setIsPlaceModalOpen(false);
            onChange && onChange(internalValue);
          }}
        />
      </Modal>
    </div>
  );
};

export default PreferredRegionSelectBox;

const useRegionList = () => {
  return useQuery(['preferredRegionSelectOptions'], () => {
    return [
      { key: 1, value: '서울 / 경기 / 인천' },
      { key: 2, value: '충청 / 대전 / 세종' },
      { key: 3, value: '경상 / 부산 / 대구' },
      { key: 4, value: '전라 / 광주' },
      { key: 5, value: '강원' },
      { key: 6, value: '제주' },
    ];
  });
};

const RegionSelectView: React.FC<{
  selectedKey?: number;
  onChange: (value: SelectBoxOption<number, string>) => void;
}> = ({ selectedKey, onChange }) => {
  const { data: options, isLoading } = useRegionList();

  return (
    <SelectBoxModalContent key={isLoading ? 'loading' : 'loaded'} title="어느 지역을 선호하시나요?">
      <div
        className={css({
          display: 'grid',
          flexDirection: 'column',
          gap: '12px',
          gridTemplateColumns: `repeat(2, 1fr)`,
        })}
      >
        {options?.map((option) => {
          return (
            <SelectBoxOptionRow
              key={option.key}
              className={css({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              })}
              selected={option.key === selectedKey}
              onClick={() => {
                onChange(option);
              }}
            >
              {option.value}
            </SelectBoxOptionRow>
          );
        })}
      </div>
    </SelectBoxModalContent>
  );
};

const AddressSearchView: React.FC<{
  onChange: (value: string) => void;
}> = ({ onChange }) => {
  const { data: addressList, isLoading: isLoadingAddress } = useQuery(['preferredRegionAddressSearch'], () => {
    return ['서울특별시 강남구 역삼동', '서울특별시 강남구 논현동', '서울특별시 강남구 대치동'];
  });

  return (
    <SelectBoxModalContent key={isLoadingAddress ? 'loading' : 'loaded'} title="살고 싶은 동네를 입력해 주세요.">
      <SearchInput placeholder="관심 동네를 검색해주세요 (ex-도담동)" />
      <div
        className={css({
          display: 'grid',
          flexDirection: 'column',
          gap: '12px',
        })}
      >
        {addressList?.map((address) => {
          return (
            <SelectBoxOptionRow
              key={address}
              onClick={() => {
                onChange(address);
              }}
            >
              {address}
            </SelectBoxOptionRow>
          );
        })}
      </div>
    </SelectBoxModalContent>
  );
};

const PlaceSearchView: React.FC<{
  value?: string[];
  onChange: (value: string[]) => void;
}> = ({ value, onChange }) => {
  const { data: placeList, isLoading: isLoadingPlace } = useQuery(['preferredRegionPlaceSearch'], () => {
    return ['서울대학교', '서울대학교 의과대학', '서울대학교 치과대학', '서울대학교 약학대학', '서울대학교 사범대학'];
  });
  const [selectedList, setSelectedList] = useState<string[]>(value ?? []);
  const hasValue = selectedList.length > 0;

  return (
    <SelectBoxModalContent
      key={isLoadingPlace ? 'loading' : 'loaded'}
      title={
        <>
          직장 또는 학교 등 자주 가는 장소를
          <br />
          최대 3곳까지 입력 가능해요.
        </>
      }
    >
      <SearchInput placeholder="자주 가는 장소를 검색해 주세요" />
      <div
        className={css({
          display: 'grid',
          flexDirection: 'column',
          gap: '12px',
        })}
      >
        {placeList?.map((place) => {
          return (
            <SelectBoxOptionRow
              key={place}
              selected={selectedList.includes(place)}
              onClick={() => {
                setSelectedList((prevList) => {
                  if (prevList.includes(place)) {
                    return prevList.filter((prevPlace) => prevPlace !== place);
                  } else {
                    return [...prevList, place];
                  }
                });
              }}
            >
              {place}
            </SelectBoxOptionRow>
          );
        })}
      </div>
      <Button
        shape={hasValue ? 'fill' : 'outline'}
        label={hasValue ? '입력을 완료했어요' : '넘어갈께요'}
        theme={hasValue ? 'brand' : 'neutral'}
        onClick={() => {
          onChange(selectedList);
        }}
      />
    </SelectBoxModalContent>
  );
};
