import { IconInfoCircle } from '@move-in/design-system';
import { css } from '@move-in/styled-system/css';
import { useNavigate } from 'react-router-dom';

const FindIdButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        color: 'text.dark.01',
      })}
      onClick={() => {
        navigate('/identity-verification');
      }}
    >
      <IconInfoCircle size={16} /> 아이디를 잊어버렸어요
    </div>
  );
};

export default FindIdButton;
