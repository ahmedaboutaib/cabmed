import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StatusBar } from 'react-native';
import  useStore  from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage'

const AuthLoadingScreen = ({ navigation }) => {
  const { isAuthenticated } = useStore();
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const jwt = await AsyncStorage.getItem('jwt');
        if (jwt) {
          setHasToken(true);
        }
      } catch (error) {
        console.log("Cannot get the JWT token!", error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    navigation.navigate(isAuthenticated  ? 'App' : 'Auth');
  }, [isAuthenticated, navigation, hasToken]);

  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};

export default AuthLoadingScreen;
