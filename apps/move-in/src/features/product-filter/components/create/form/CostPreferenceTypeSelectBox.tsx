import { useCodeList } from '@move-in/core'
import { SelectBox } from '@move-in/design-system';
import InputFieldHeaderContainer from '../base/InputFieldHeaderContainer';

interface Props {
  defaultValue?: number;
  onChange?: (value: number) => void;
}

const CostPreferenceTypeSelectBox: React.FC<Props> = ({
  defaultValue,
  onChange,
}) => {
  const { data: codeTable, isLoading } = useCodeList();
  const options = codeTable?.costPreference;

  return (
    <InputFieldHeaderContainer
      title="주거 비용 구성"
      subtitle="아래 두 방향 중 한가지를 골라주세요"
    >
      <SelectBox
        key={isLoading ? 'loading' : 'loaded'}
        modalTitle={
          <>
            아래 두가지 주거 비용 구성 중
            <br />
            어느쪽을 선호하시나요?
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
    </InputFieldHeaderContainer>
  );
};

export default CostPreferenceTypeSelectBox;
