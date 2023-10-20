import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import SignInScreen from "../screens/SignInScreen";
import HomeScreen from "../screens/HomeScreen";
import AppNavigator from "./AppNavigator";
import PatientNavigator from "./PatientNavigator";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="AuthLoading"  >
      <Stack.Screen
        name="AuthLoading"
        component={AuthLoadingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Auth"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
      name="App"  
      options={{ headerShown: false }}
      component={AppNavigator} />
      <Stack.Screen 
      name="PatientNavigator"  
      options={{ headerShown: false }}
      component={PatientNavigator} />

    </Stack.Navigator>
  );
};

export default RootNavigator;
