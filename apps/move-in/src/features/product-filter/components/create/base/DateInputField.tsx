import { DateInput, DateInputProps } from '@move-in/move-in-design-system';
import InputFieldContainer from './InputFieldContainer';

interface DateInputFieldProps extends DateInputProps {
  suffix?: string;
}

const DateInputField: React.FC<DateInputFieldProps> = ({ suffix, ...props }) => {
  return (
    <InputFieldContainer suffix={suffix} helperText="해당 조건은 제한이 없어요">
      <DateInput {...props} />
    </InputFieldContainer>
  );
};

export default DateInputField;
