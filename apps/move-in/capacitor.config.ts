import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kreit.move-in',
  appName: 'MoveIn',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
