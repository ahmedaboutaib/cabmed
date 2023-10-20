import React, { useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import { VStack, ScrollView } from 'native-base';
import  useStore  from '../store';




const RendezVousScreen = () => {
  const { fetchRendezVous, rendezVous } = useStore();
  useEffect(() => {
    fetchRendezVous();
  }, []);
  return (
    <View>
      <Text>hi this is the rendez vous page  !</Text>
      <ScrollView>
        <VStack>
          <Text>hi this is the rendez vous page  !</Text>
          <Text>hi this is the rendez vous page  !</Text>
          <Text>hi this is the rendez vous page  !</Text>
          <Text>hi this is the rendez vous page  !</Text>
        </VStack>
        <Text>
          {JSON.stringify(rendezVous, null, 2)}
        </Text>
      </ScrollView>
    </View>
  );
};

export default RendezVousScreen;