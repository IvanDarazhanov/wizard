import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.loginwizard.app',
  appName: 'Login Wizard',
  webDir: 'dist/login-wizard/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;