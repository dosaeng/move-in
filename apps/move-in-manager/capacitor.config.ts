import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kreit.move_in_manager',
  appName: 'MoveInManager',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
