import { KakaoLoginTokenData } from '@/common/plugins/KakaoLoginPlugin';
import { create } from 'zustand';
import { SignUpType } from '../../sign-up/sign-up';

interface SignInState {
  type: SignUpType | undefined;
  kakaoToken: KakaoLoginTokenData | undefined;
  appleToken: { idToken: string } | undefined;
  setKakaoToken: (data: KakaoLoginTokenData) => void;
  setAppleToken: (data: { idToken: string }) => void;
}

const useSignInState = create<SignInState>((set) => ({
  type: undefined,
  kakaoToken: undefined,
  appleToken: undefined,
  setKakaoToken: (data) =>
    set(() => ({ type: SignUpType.kakao, kakaoToken: data })),
  setAppleToken: (data) => set(() => ({ type: SignUpType.apple, token: data })),
}));

export default useSignInState;
