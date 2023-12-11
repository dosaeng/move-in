import { useQuery } from 'react-query';
import FilterMultipleSelectBox from '../base/FilterMultipleSelectBox';

interface Props {
  defaultValue?: number[];
  onChange?: (value: number[]) => void;
}

const ItemHouseConditionSelectBox: React.FC<Props> = ({ defaultValue, onChange }) => {
  const { data: options, isLoading } = useQuery(['itemHouseConditionSelectOptions'], () => {
    return [
      { key: 1, value: '신축 첫 입주' },
      { key: 2, value: '신축 3년 이내' },
      { key: 3, value: '리모델링 첫 입주' },
      { key: 4, value: '리모델링 3년 이내' },
      { key: 5, value: '도배・장판 새로 해드려요' },
      { key: 6, value: '인테리어 공사 하고 싶어요' },
    ];
  });

  return (
    <FilterMultipleSelectBox
      key={isLoading ? 'loading' : 'loaded'}
      labelPrefix="04-C"
      label="희망하시는 집의 상태를 모두 골라주세요."
      modalTitle="희망하시는 집의 상태를 모두 골라주세요."
      placeholder="눌러서 선택해주세요"
      defaultValue={options?.filter((option) => defaultValue?.includes(option.key))}
      options={options ?? []}
      disabled={isLoading}
      onChange={(value) => {
        onChange && onChange(value.map((option) => option.key));
      }}
    />
  );
};

export default ItemHouseConditionSelectBox;
