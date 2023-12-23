import { useCodeList } from '@move-in/core';
import FilterSelectBox from '../base/FilterSelectBox';

interface Props {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
}

const FamilyTypeSelectBox: React.FC<Props> = ({
  value,
  defaultValue,
  onChange,
}) => {
  const { data: codeTable, isLoading } = useCodeList();
  const options = codeTable?.familyType;

  return (
    <FilterSelectBox
      key={isLoading ? 'loading' : 'loaded'}
      labelPrefix="01-A"
      label="누구와 함께 할 집을 구하나요?"
      modalTitle="누구와 함께할 집을 구하나요?"
      placeholder="눌러서 선택해주세요"
      value={options?.find((option) => option.key === value)}
      defaultValue={options?.find((option) => option.key === defaultValue)}
      options={options ?? []}
      disabled={isLoading}
      onChange={(value) => {
        onChange && onChange(value.key);
      }}
    />
  );
};

export default FamilyTypeSelectBox;
