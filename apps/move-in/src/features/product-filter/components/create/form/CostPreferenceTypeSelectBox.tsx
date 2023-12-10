import { SelectBox } from '@move-in/move-in-design-system';
import { useQuery } from 'react-query';
import InputFieldHeaderContainer from '../base/InputFieldHeaderContainer';

interface Props {
  defaultValue?: number;
  onChange?: (value: number) => void;
}

const CostPreferenceTypeSelectBox: React.FC<Props> = ({ defaultValue, onChange }) => {
  const { data: options, isLoading } = useQuery(['costPreferenceTypeSelectOptions'], () => {
    return [
      { key: 1, value: '낮은 보증, 높은 월 고정 비용이 좋아요' },
      { key: 2, value: '높은 보증, 낮은 월 고정 비용이 좋아요' },
    ];
  });

  return (
    <InputFieldHeaderContainer title="주거 비용 구성" subtitle="아래 두 방향 중 한가지를 골라주세요">
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
