import { registerPlugin } from '@capacitor/core';

export interface KakaoLoginTokenData {
  accessToken: string;
  refreshToken: string;
  idToken: string;
}

export interface KakaoLoginPlugin {
  initialize(options: { appKey: string }): Promise<void>;
  loginWithKakaoTalk(): Promise<KakaoLoginTokenData>;
  logout(): Promise<void>;
  unlink(): Promise<void>;
}

const KakaoLogin = registerPlugin<KakaoLoginPlugin>('KakaoLogin', {
  web: () => import('./KakaoLoginPluginWeb').then((m) => new m.KakaoLoginPluginWeb()),
});

export default KakaoLogin;
