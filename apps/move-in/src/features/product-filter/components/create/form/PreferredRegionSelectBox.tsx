import { useQuery } from 'react-query';
import FilterSelectBox from '../base/FilterSelectBox';

interface Props {
  defaultValue?: number;
  onChange?: (value: number) => void;
}

const PreferredRegionSelectBox: React.FC<Props> = ({ defaultValue, onChange }) => {
  const { data: options, isLoading } = useQuery(['preferredRegionSelectOptions'], () => {
    return [
      { key: 1, value: '서울 / 경기 / 인천' },
      { key: 2, value: '충청 / 대전 / 세종' },
      { key: 3, value: '경상 / 부산 / 대구' },
      { key: 4, value: '전라 / 광주' },
      { key: 5, value: '강원' },
      { key: 6, value: '제주' },
    ];
  });

  return (
    <FilterSelectBox
      key={isLoading ? 'loading' : 'loaded'}
      labelPrefix="04-A"
      label="어느 지역을 선호하시나요?"
      modalTitle="어느 지역을 선호하시나요?"
      modalColumnsCount={2}
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

export default PreferredRegionSelectBox;
