import { Button, Modal, ModalProps } from '@move-in/design-system';
import { css } from '@move-in/styled-system/css';
import { SignUpType, signUpTypeToString } from '../sign-up';

interface Props extends ModalProps {
  signUpType: SignUpType;
  email: string;
  onConfirm?: () => void;
}

const FindIdExistPopup: React.FC<Props> = ({
  signUpType,
  email,
  onConfirm,
  ...props
}) => {
  return (
    <Modal {...props}>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        })}
      >
        <div
          className={css({
            textStyle: 'header-18-sb',
            color: 'text.dark.04',
            marginTop: '32px',
            marginBottom: '8px',
          })}
        >
          아래 계정을 확인해주세요
        </div>
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '4px',
            marginBottom: '8px',
          })}
        >
          <div
            className={css({
              textStyle: 'header-14-m',
              color: 'text.dark.02',
            })}
          >
            {signUpTypeToString(signUpType)}로 가입
          </div>
          <div
            className={css({
              textStyle: 'header-18-sb',
              color: 'text.dark.04',
            })}
          >
            {email}
          </div>
        </div>
        <div
          className={css({
            width: '100%',
            padding: '32px 24px 24px 24px',
          })}
        >
          <Button
            className={css({
              maxWidth: '100%',
            })}
            label="로그인 하러가기"
            onClick={onConfirm}
          />
        </div>
      </div>
    </Modal>
  );
};

export default FindIdExistPopup;
