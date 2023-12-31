import { CapacitorConfig } from '@capacitor/cli';
import dotenv from 'dotenv-flow';

dotenv.config();

const config: CapacitorConfig = {
  appId: 'com.kreit.move-in',
  appName: 'MoveIn',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  android: {
    buildOptions: {
      keystoreAlias: process.env.ANDROID_KEYSTORE_KEY_ALIAS,
      keystoreAliasPassword: process.env.ANDROID_KEYSTORE_KEY_PASSWORD,
      keystorePassword: process.env.ANDROID_KEYSTORE_PASSWORD,
      keystorePath: process.env.ANDROID_KEYSTORE_PATH
    },
  },
};

export default config;
