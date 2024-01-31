import { WebPlugin } from '@capacitor/core';
import { KakaoLoginPlugin, KakaoLoginTokenData } from './KakaoLoginPlugin';

export class KakaoLoginPluginWeb extends WebPlugin implements KakaoLoginPlugin {
  constructor() {
    super();
  }

  initialize(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async loginWithKakaoTalk(): Promise<KakaoLoginTokenData> {
    return {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      idToken: 'idToken',
    };
    throw new Error('Method not implemented.');
  }

  logout(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  unlink(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
