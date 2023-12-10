import { CurrencyInput } from '@move-in/move-in-design-system';
import InputFieldContainer from '../base/InputFieldContainer';
import InputFieldHeaderContainer from '../base/InputFieldHeaderContainer';

interface Props {}

const DepositCurrencyInput: React.FC<Props> = () => {
  return (
    <InputFieldHeaderContainer title="최대 가능 보증금" subtitle="대출 금액을 포함한 가용 가능한 총 금액">
      <InputFieldContainer suffix="이하">
        <CurrencyInput id="deposit" />
      </InputFieldContainer>
    </InputFieldHeaderContainer>
  );
};

export default DepositCurrencyInput;
