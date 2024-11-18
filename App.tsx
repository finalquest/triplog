import React from 'react';
import { LogBox, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/Login';
import Home from './src/screens/Home';
import { Camera, useCameraPermission } from 'react-native-vision-camera';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export default () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const permissionStatus = Camera.getLocationPermissionStatus();

  if (permissionStatus !== 'granted') {
    Camera.requestLocationPermission();
  }

  if (!hasPermission) {
    requestPermission();
  }

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <SafeAreaView style={{ flex: 1, alignSelf: 'stretch' }}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

if (__DEV__) {
  const ignoreWarns = ['Warning:', 'Track event:'];

  const warn = console.warn;
  const err = console.error;

  console.error = (...arg) => {
    for (const warning of ignoreWarns) {
      if (arg[0].startsWith(warning)) {
        return;
      }
    }
    err(...arg);
  };

  console.warn = (...arg) => {
    for (const warning of ignoreWarns) {
      if (arg[0].startsWith(warning)) {
        return;
      }
    }
    warn(...arg);
  };

  LogBox.ignoreLogs(ignoreWarns);
}

LogBox.ignoreAllLogs(true);
