import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kreit.move-in-manager',
  appName: 'MoveInManager',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
