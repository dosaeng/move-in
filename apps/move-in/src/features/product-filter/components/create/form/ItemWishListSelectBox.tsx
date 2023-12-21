import { useCodeList } from '@move-in/core'
import FilterMultipleSelectBox from '../base/FilterMultipleSelectBox';

interface Props {
  defaultValue?: number[];
  onChange?: (value: number[]) => void;
}

const ItemWishListSelectBox: React.FC<Props> = ({ defaultValue, onChange }) => {
  const { data: codeTable, isLoading } = useCodeList();
  const options = codeTable?.itemWithList;

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
