import { useCodeList } from '@move-in/core'
import FilterSelectBox from '../base/FilterSelectBox';

interface Props {
  defaultValue?: number;
  onChange?: (value: number) => void;
}

const MinimumRoomCountSelectBox: React.FC<Props> = ({
  defaultValue,
  onChange,
}) => {
  const { data: codeTable, isLoading } = useCodeList();
  const options = codeTable?.minimumRoomCount;

  return (
    <FilterSelectBox
      key={isLoading ? 'loading' : 'loaded'}
      labelPrefix="01-B"
      label="방은 최소 몇 개는 있어야 하나요?"
      modalTitle={
        <>
          방은 몇 개 필요한가요?
          <br />
          최소 조건을 입력해 주세요.
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

export default MinimumRoomCountSelectBox;
