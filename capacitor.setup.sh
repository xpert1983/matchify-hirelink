
#!/bin/bash

# Install Capacitor dependencies
npm install @capacitor/core
npm install @capacitor/cli --save-dev
npm install @capacitor/android

# Initialize Capacitor
npx cap init matchify-hirelink app.lovable.772a5dacdc3d4eba92cfae8b7a6e5f06 --web-dir=dist

# Add Android platform
npx cap add android

# Build web app
npm run build

# Sync with Capacitor
npx cap sync
