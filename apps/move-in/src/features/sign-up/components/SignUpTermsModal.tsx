import { Button, Modal } from '@move-in/move-in-design-system';
import { css } from '@move-in/styled-system/css';
import React from 'react';
import SignUpTermsListItem from './SignUpTermsListItem';

interface SignUpTermsModalProps {
  isOpen?: boolean;
  onDidDismiss?: (isAgree: boolean) => void;
}

const SignUpTermsModal: React.FC<SignUpTermsModalProps> = ({ isOpen, onDidDismiss }) => {
  return (
    <Modal isOpen={isOpen} onDidDismiss={() => onDidDismiss && onDidDismiss(false)}>
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          paddingX: '24px',
          paddingBottom: '24px',
        })}
      >
        <h3
          className={css({
            textStyle: 'header-18-sb',
            marginBottom: '24px',
          })}
        >
          무브인을 사용하려면
          <br />
          약관 동의가 필요해요
        </h3>
        <fieldset
          className={css({
            display: 'flex',
            flexDirection: 'column',
            textStyle: 'header-18-sb',
            marginBottom: '32px',
            gap: '15px',
          })}
        >
          <SignUpTermsListItem id="terms1" label="(필수) 무브인 서비스 이용약관" />
          <SignUpTermsListItem id="terms2" label="(필수) 개인정보 처리방침 동의" />
          <SignUpTermsListItem id="terms3" label="(필수) 만 14세 이상 입니다" />
          <SignUpTermsListItem id="terms4" label="(선택) 광고성 정보 수신 및 마케팅 활용" />
        </fieldset>
        <Button
          label="모두 동의하고 완료하기"
          onClick={() => {
            onDidDismiss && onDidDismiss(true);
          }}
        />
      </div>
    </Modal>
  );
};

export default SignUpTermsModal;
