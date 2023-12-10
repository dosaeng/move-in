import { useQuery } from 'react-query';
import FilterSelectBox from '../base/FilterSelectBox';

interface Props {
  defaultValue?: number;
  onChange?: (value: number) => void;
}

const MinimumRoomCountSelectBox: React.FC<Props> = ({ defaultValue, onChange }) => {
  const { data: options, isLoading } = useQuery(['minimumRoomCountSelectOptions'], () => {
    return [
      { key: 1, value: '방 구분은 따로 없어도 돼요' },
      { key: 2, value: '방 1개 이상 필요해요' },
      { key: 3, value: '방 2개 이상 필요해요' },
      { key: 4, value: '방 3개 이상 필요해요' },
      { key: 5, value: '방 4개 이상 필요해요' },
      { key: 6, value: '방 5개 이상 필요해요' },
    ];
  });

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
