import { useQuery } from 'react-query';
import FilterMultipleSelectBox from '../base/FilterMultipleSelectBox';

interface Props {
  defaultValue?: number[];
  onChange?: (value: number[]) => void;
}

const ItemHouseTypeSelectBox: React.FC<Props> = ({ defaultValue, onChange }) => {
  const { data: options, isLoading } = useQuery(['itemHouseTypeSelectOptions'], () => {
    return [
      { key: 1, value: '아파트' },
      { key: 2, value: '오피스텔' },
      { key: 3, value: '다세대 빌라' },
      { key: 4, value: '원룸 ・투룸' },
      { key: 5, value: '단독 주택' },
      { key: 6, value: '기타' },
    ];
  });

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
      defaultValue={options?.filter((option) => defaultValue?.includes(option.key))}
      options={options ?? []}
      disabled={isLoading}
      onChange={(value) => {
        onChange && onChange(value.map((option) => option.key));
      }}
    />
  );
};

export default ItemHouseTypeSelectBox;
