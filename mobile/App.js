import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import { NativeBaseProvider } from "native-base";
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Lobster_400Regular': require('./assets/fonts/Lobster-Regular.ttf'),
  });
  if(!fontsLoaded){
    return null;
  }

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
