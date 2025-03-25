
#!/bin/bash

# This script configures a splash screen for Android app

# First we need to create the splash screen resource
mkdir -p android/app/src/main/res/drawable

# Create splash screen drawable XML
cat > android/app/src/main/res/drawable/splash.xml << EOF
<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@color/splashscreen_bg"/>
    <item>
        <bitmap
            android:gravity="center"
            android:src="@drawable/splash_icon"/>
    </item>
</layer-list>
EOF

# Create colors XML file
mkdir -p android/app/src/main/res/values
cat > android/app/src/main/res/values/colors.xml << EOF
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="splashscreen_bg">#121212</color>
    <color name="app_bg">#121212</color>
</resources>
EOF

# Create splash screen style
mkdir -p android/app/src/main/res/values
cat > android/app/src/main/res/values/styles.xml << EOF
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
    </style>

    <style name="AppTheme.NoActionBar" parent="Theme.AppCompat.DayNight.NoActionBar">
        <item name="windowActionBar">false</item>
        <item name="windowNoTitle">true</item>
        <item name="android:background">@null</item>
    </style>

    <style name="AppTheme.NoActionBarLaunch" parent="Theme.SplashScreen">
        <item name="android:windowBackground">@drawable/splash</item>
    </style>
</resources>
EOF

echo "Splash screen configuration is ready. You'll need to place a splash_icon.png file in android/app/src/main/res/drawable/ directory"
