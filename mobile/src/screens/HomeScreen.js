import React, { useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import  useStore  from '../store';

const HomeScreen = () => {
  const { signout, user, token, cabinet } = useStore();
  return (
    <View>
      <Text>Welcome  {JSON.stringify(cabinet)} this is the cabinet!</Text>
      <Button title="Sign out" onPress={signout} />
    </View>
  );
};

export default HomeScreen;
