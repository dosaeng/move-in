import { CurrencyInput } from '@move-in/design-system';
import InputFieldContainer from '../base/InputFieldContainer';
import InputFieldHeaderContainer from '../base/InputFieldHeaderContainer';
import { css } from '@move-in/styled-system/css';

interface Props {}

const MonthlyRentCurrencyInput: React.FC<Props> = () => {
  return (
    <InputFieldHeaderContainer title="희망 월 고정 비용" subtitle="월세 및 공용 관리비로 산정 (별도 부과 금액 제외)">
      <div
        className={css({
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
        })}
      >
        <InputFieldContainer suffix="이상">
          <CurrencyInput id="minimum-monthly-rent" minLength={3} maxLength={4} />
        </InputFieldContainer>
        <InputFieldContainer suffix="이하">
          <CurrencyInput id="maximum-monthly-rent" minLength={3} maxLength={4} />
        </InputFieldContainer>
      </div>
    </InputFieldHeaderContainer>
  );
};

export default MonthlyRentCurrencyInput;
