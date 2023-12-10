import { useQuery } from 'react-query';
import FilterSelectBox from '../base/FilterSelectBox';

interface Props {
  defaultValue?: number;
  onChange?: (value: number) => void;
}

const PetPresenceSelectBox: React.FC<Props> = ({ defaultValue, onChange }) => {
  const { data: options, isLoading } = useQuery(['petPresenceSelectOptions'], () => {
    return [
      { key: 1, value: '반려동물과 함께 살 거에요' },
      { key: 2, value: '반려동물과 함께 하지 않아요' },
    ];
  });

  return (
    <FilterSelectBox
      key={isLoading ? 'loading' : 'loaded'}
      labelPrefix="01-B"
      label="반려동물과 함께 하시나요?"
      modalTitle="반려동물과 함께 하시나요?"
      placeholder="눌러서 선택해주세요"
      defaultValue={options?.find((option) => option.key === defaultValue)}
      options={options ?? []}
      disabled={isLoading}
      onChange={(value) => {
        onChange && onChange(value.key);
      }}
    />
  );
};

export default PetPresenceSelectBox;
