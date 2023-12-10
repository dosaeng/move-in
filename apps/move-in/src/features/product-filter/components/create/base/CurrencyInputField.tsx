import { CurrencyInput, CurrencyInputProps } from '@move-in/move-in-design-system';
import { css } from '@move-in/styled-system/css';

interface CurrencyInputFieldProps extends CurrencyInputProps {
  suffix?: string;
}

const CurrencyInputField: React.FC<CurrencyInputFieldProps> = ({ suffix, ...props }) => {
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      })}
    >
      <CurrencyInput {...props} />
      <span
        className={css({
          textStyle: 'body-16-m',
          color: 'text.dark.02',
        })}
      >
        {suffix}
      </span>
    </div>
  );
};

export default CurrencyInputField;
