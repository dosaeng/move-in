import {
  OutlinedFieldContainer,
  OutlinedTextField,
} from '@move-in/design-system';
import { css } from '@move-in/styled-system/css';

interface Props {
  className?: string;
  value?: string;
}

const SignUpMethodField: React.FC<Props> = ({ className, value }) => {
  return (
    <OutlinedFieldContainer className={className} label="가입 방법">
      <OutlinedTextField
        className={css({
          flex: 1,
        })}
        value={value}
        disabled
      />
    </OutlinedFieldContainer>
  );
};

export default SignUpMethodField;
