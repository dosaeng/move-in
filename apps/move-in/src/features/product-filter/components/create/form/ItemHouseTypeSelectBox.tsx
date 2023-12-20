import useCodeList from '@/common/hooks/useCodeList';
import FilterMultipleSelectBox from '../base/FilterMultipleSelectBox';

interface Props {
  defaultValue?: number[];
  onChange?: (value: number[]) => void;
}

const ItemHouseTypeSelectBox: React.FC<Props> = ({
  defaultValue,
  onChange,
}) => {
  const { data: codeTable, isLoading } = useCodeList();
  const options = codeTable?.itemHouseType;

  return (
    <FilterMultipleSelectBox
      key={isLoading ? 'loading' : 'loaded'}
      labelPrefix="04-B"
      label="어떤 주거 형태를 선호하시나요?"
      modalTitle={
        <>
          어떤 주거 형태를 선호하시나요?
          <br />
          여러개 선택할 수 있어요.
        </>
      }
      placeholder="눌러서 선택해주세요"
      defaultValue={options?.filter(
        (option) => defaultValue?.includes(option.key)
      )}
      options={options ?? []}
      disabled={isLoading}
      onChange={(value) => {
        onChange && onChange(value.map((option) => option.key));
      }}
    />
  );
};

export default ItemHouseTypeSelectBox;
