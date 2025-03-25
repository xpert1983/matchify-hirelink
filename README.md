
# HireLink - Recruiting Management System

## Project info

**URL**: https://lovable.dev/projects/772a5dac-dc3d-4eba-92cf-ae8b7a6e5f06

## Features

- **Candidate Management**: Track and manage candidates throughout the hiring process
- **Vacancy Management**: Create and manage job vacancies
- **Hiring Pipeline**: Visual kanban-style pipeline to track candidates through stages
- **Analytics**: Insights and metrics about your hiring process
- **Mobile Support**: Native Android app capabilities with Capacitor
- **Customizable Theme**: Personalize the app's appearance

## Running on Android

This project supports running as a native Android application using Capacitor. Follow these steps to set up and run the Android app:

1. Clone this repository to your local machine
2. Install dependencies:
   ```bash
   npm install
   ```
3. Make the setup script executable:
   ```bash
   chmod +x capacitor.setup.sh
   ```
4. Run the setup script to configure Capacitor:
   ```bash
   ./capacitor.setup.sh
   ```
5. Build the web app:
   ```bash
   npm run build
   ```
6. Sync with Capacitor:
   ```bash
   npx cap sync
   ```
7. Open the project in Android Studio:
   ```bash
   npx cap open android
   ```
8. Run the app on an emulator or physical device from Android Studio

### Updating the Android app

After making changes to the web code:

1. Rebuild the web app:
   ```bash
   npm run build
   ```
2. Sync with Capacitor:
   ```bash
   npx cap sync
   ```
3. Reopen or refresh Android Studio to see the changes

## Native Features

This app utilizes native features through Capacitor:

- **Camera Access**: Take profile pictures directly from the app
- **Live Reload**: Development mode enables live reload for faster testing
- **Splash Screen**: Custom splash screen when launching the app

## Technologies Used

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Capacitor for native mobile functionality

## Development

To work on this project locally:

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd hirelink

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Customization

### Theme Customization

Navigate to Settings > Appearance to customize the application's color theme.

### Notification Settings

Configure your notification preferences in Settings > Notifications.

## Deployment

Open [Lovable](https://lovable.dev/projects/772a5dac-dc3d-4eba-92cf-ae8b7a6e5f06) and click on Share -> Publish to deploy your project.
