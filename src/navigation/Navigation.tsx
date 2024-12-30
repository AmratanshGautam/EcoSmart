import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList, AuthStackParamList, MainTabParamList } from './types';

import { LoginScreen } from '../screens/auth/LoginScreen';
import { CreateReportScreen } from '../screens/reports/CreateReportScreen';
import { HeritageSitesScreen } from '../screens/heritage/HeritageSitesScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}

function MainNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Reports" component={CreateReportScreen} />
      <Tab.Screen name="Heritage" component={HeritageSitesScreen} />
    </Tab.Navigator>
  );
}

export function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={MainNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}