import { useQuery } from 'react-query';
import FilterSelectBox from '../base/FilterSelectBox';

interface Props {
  defaultValue?: number;
  onChange?: (value: number) => void;
}

const FamilyTypeSelectBox: React.FC<Props> = ({ defaultValue, onChange }) => {
  const { data: options, isLoading } = useQuery(['familyTypeSelectBoxOptions'], () => {
    return [
      { key: 1, value: '싱글 라이프' },
      { key: 2, value: '신혼 부부' },
      { key: 3, value: '아기가 있는 집' },
      { key: 4, value: '취학 자녀가 있는 집' },
      { key: 5, value: '부모님과 함께 사는 집' },
      { key: 6, value: '기타' },
    ];
  });

  return (
    <FilterSelectBox
      key={isLoading ? 'loading' : 'loaded'}
      labelPrefix="01-A"
      label="누구와 함께 할 집을 구하나요?"
      modalTitle="누구와 함께할 집을 구하나요?"
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

export default FamilyTypeSelectBox;
