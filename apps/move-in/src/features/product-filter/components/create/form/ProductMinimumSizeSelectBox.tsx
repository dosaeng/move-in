import { useCodeList } from '@move-in/core';
import { css } from '@move-in/styled-system/css';
import FilterSelectBox from '../base/FilterSelectBox';

interface Props {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
}

const ProductMinimumSizeSelectBox: React.FC<Props> = ({
  value,
  defaultValue,
  onChange,
}) => {
  const { data: codeTable, isLoading } = useCodeList();
  const options = codeTable?.productMinimumSize;

  return (
    <FilterSelectBox
      key={isLoading ? 'loading' : 'loaded'}
      modalClassName={css({
        overflow: 'hidden',
        '& .modal-content-grid': {
          overflowY: 'auto',
          paddingBottom: '16px',
        },
      })}
      labelPrefix="01-C"
      label="집이 얼마나 컸으면 하나요?"
      modalTitle={
        <>
          집이 얼마나 컸으면 하나요?
          <br />
          최소 조건을 입력해주세요.
        </>
      }
      placeholder="눌러서 선택해주세요"
      value={options?.find((option) => option.key === value)}
      defaultValue={options?.find((option) => option.key === defaultValue)}
      options={options ?? []}
      disabled={isLoading}
      onChange={(value) => {
        onChange && onChange(value.key);
      }}
    />
  );
};

export default ProductMinimumSizeSelectBox;
