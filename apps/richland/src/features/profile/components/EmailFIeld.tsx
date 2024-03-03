import {
  OutlinedFieldContainer,
  OutlinedFieldContainerProps,
  OutlinedTextField,
  OutlinedTextFieldProps,
} from '@move-in/design-system';
import { forwardRef } from 'react';

interface Props
  extends Omit<OutlinedTextFieldProps, 'hasError'>,
    Omit<OutlinedFieldContainerProps, 'label'> {
  className?: string;
}

const EmailField: React.FC<Props> = forwardRef<HTMLInputElement, Props>(
  ({ className, errorText, id, ...props }, ref) => {
    return (
      <OutlinedFieldContainer
        className={className}
        label="이메일"
        errorText={errorText}
        id={id}
      >
        <OutlinedTextField {...props} ref={ref} hasError={errorText != null} />
      </OutlinedFieldContainer>
    );
  }
);

export default EmailField;
