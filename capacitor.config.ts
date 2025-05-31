import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.hug.app',
  appName: 'HUG',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: true,
    allowNavigation: ['*']
  },
  ios: {
    contentInset: 'automatic',
    preferredContentMode: 'mobile',
    backgroundColor: '#ffffff',
    webViewAllowingMedia: true,
    scrollEnabled: true,
    allowsLinkPreview: false,
    statusBarStyle: 'dark',
    permissions: {
      camera: {
        text: "HUG needs camera access for video conversations with your AI coach"
      },
      microphone: {
        text: "HUG needs microphone access for voice interactions with your AI coach"
      },
      notifications: {
        text: "HUG sends reminders for meditation, mood tracking, and wellness check-ins"
      }
    }
  }
};

export default config;