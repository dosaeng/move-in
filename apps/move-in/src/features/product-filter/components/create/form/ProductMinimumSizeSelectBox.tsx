import { useQuery } from 'react-query';
import FilterSelectBox from '../base/FilterSelectBox';

interface Props {
  defaultValue?: number;
  onChange?: (value: number) => void;
}

const ProductMinimumSizeSelectBox: React.FC<Props> = ({ defaultValue, onChange }) => {
  const { data: options, isLoading } = useQuery(['productMinimumSizeSelectOptions'], () => {
    return [
      { key: 1, value: '5평 이상 (16.5㎡)' },
      { key: 2, value: '10평 이상 (33.1㎡)' },
      { key: 3, value: '15평 이상 (49.6㎡)' },
      { key: 4, value: '20평 이상 (66.1㎡)' },
      { key: 5, value: '25평 이상 (82.6㎡)' },
      { key: 6, value: '30평 이상 (99.2㎡)' },
      { key: 7, value: '35평 이상 (115.7㎡)' },
      { key: 8, value: '40평 이상 (132.2㎡)' },
      { key: 9, value: '45평 이상 (148.8㎡)' },
      { key: 10, value: '50평 이상 (165.3㎡)' },
      { key: 11, value: '75평 이상 (247.9㎡)' },
      { key: 12, value: '100평 이상 (330.6㎡)' },
    ];
  });

  return (
    <FilterSelectBox
      key={isLoading ? 'loading' : 'loaded'}
      labelPrefix="01-C"
      label="집이 얼마나 컸으면 하나요?"
      modalTitle={
        <>
          집이 얼마나 컸으면 하나요?
          <br />
          최소 조건을 입력해주세요.
        </>
      }
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

export default ProductMinimumSizeSelectBox;
