import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './src/screens/RegisterScreen';
import ProviderProfile from './src/screens/ProviderProfile';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Register"
        screenOptions={{ headerShown: true }}
      >
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Register Provider' }}
        />
        <Stack.Screen
          name="ProviderProfile"
          component={ProviderProfile}
          options={{ title: 'Provider Profile' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
