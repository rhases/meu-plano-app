#!/bin/bash
echo "Instalando cordova & ionic..."
#npm install -g cordova ionic # install required basic dependencies

echo "Instalando dependencias node..."
npm install # intall/update dependencies
echo "Instalando dependencias bower..."
bower install # intall/update dependencies

echo "Adicionando plataforma ANDROID..."
ionic platform add android # Install android platform

echo "Instalando plugins..."​
ionic plugin add cordova-plugin-console --save # This plugin is meant to ensure that console.log() is as useful as it can be. It adds additional function for iOS, Ubuntu, Windows Phone 8, and Windows. If you are happy with how console.log() works for you, then you probably don't need this plugin.
ionic plugin add cordova-plugin-splashscreen --save # This plugin is required to work with splash screens. This plugin displays and hides a splash screen during application launch.
ionic plugin add cordova-plugin-email-composer --save # The plugin provides access to the standard interface that manages the editing and sending an email message.
ionic plugin add cordova-plugin-whitelist --save # This plugin implements a whitelist policy for navigating the application webview on Cordova 4.0
ionic plugin add phonegap-plugin-push --save --variable SENDER_ID="835746108347" # Register and receive push notifications
#ionic plugin add phonegap-facebook-plugin --variable APP_ID="1702791466664692" --variable APP_NAME="Rhases - Test" # This is the official plugin for Facebook in Apache Cordova/PhoneGap!
ionic plugin add cordova-plugin-facebook4 --save --variable APP_ID="1702791466664692" --variable APP_NAME="Rhases - Test" # This is the official plugin for Facebook in Apache Cordova/PhoneGap!
ionic plugin add cordova-plugin-device --save # This plugin defines a global device object, which describes the device's hardware and software.
ionic plugin add cordova-plugin-transport-security --save # IOS transport security
ionic plugin add cordova-plugin-statusbar --save # IOS status bar
ionic plugin add cordova-plugin-google-analytics --save # Google Analytics
ionic plugin add ionic-plugin-keyboard --save # Contrala a subida do teclado

echo "Instalando browser CROSSWALK..."​
ionic browser add crosswalk # https://crosswalk-project.org/

echo "PRONTO!!!"​
echo "Execute 'ionic serve' para executar no browser e 'ionic run android' para executar no seu android."​
ionic serve -l
