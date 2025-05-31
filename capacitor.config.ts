import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.hug.app',
  appName: 'HUG',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
