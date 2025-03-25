
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.772a5dacdc3d4eba92cfae8b7a6e5f06',
  appName: 'matchify-hirelink',
  webDir: 'dist',
  server: {
    url: 'https://772a5dac-dc3d-4eba-92cf-ae8b7a6e5f06.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
      keystorePassword: undefined,
      keystoreAliasPassword: undefined,
    }
  }
};

export default config;
