import React from 'react';
import { LogBox, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/Login';
import Home from './src/screens/Home';
import { useCameraPermission } from 'react-native-vision-camera';

const Stack = createNativeStackNavigator();

export default () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  if (!hasPermission) {
    requestPermission();
  }

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1, alignSelf: 'stretch' }}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

LogBox.ignoreAllLogs(true);
