import { useQuery } from 'react-query';
import FilterMultipleSelectBox from '../base/FilterMultipleSelectBox';

interface Props {
  defaultValue?: number[];
  onChange?: (value: number[]) => void;
}

const ItemWishListSelectBox: React.FC<Props> = ({ defaultValue, onChange }) => {
  const { data: options, isLoading } = useQuery(['itemWishListSelectOptions'], () => {
    return [
      { key: 1, value: '베란다가 있으면 좋겠어요' },
      { key: 2, value: '복층이었으면 좋겠어요' },
      { key: 3, value: '낭만있는 옥탑이 있으면 좋겠어요' },
      { key: 4, value: '전용 마당이 있었으면 좋겠어요' },
      { key: 5, value: '반지하나 1층은 피하고 싶어요' },
      { key: 6, value: '엘레베이터가 있으면 좋겠어요' },
    ];
  });

  return (
    <FilterMultipleSelectBox
      key={isLoading ? 'loading' : 'loaded'}
      labelPrefix="04-D"
      label="기타 희망사항을 모두 골라주세요."
      modalTitle="기타 희망사항을 모두 골라주세요."
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

export default ItemWishListSelectBox;
