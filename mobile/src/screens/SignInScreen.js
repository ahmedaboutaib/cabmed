import React, { useState } from 'react';
import {  View, Text, TextInput, KeyboardAvoidingView, Pressable } from 'react-native';
import { useForm, Controller} from 'react-hook-form';
import { Box,Button ,Center, Input, VStack, Icon, Row } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {API_URL} from '@env'
import  useStore  from '../store';

const SignInScreen = () => {
  
  const { loginUser, token } = useStore();
  const state = useStore()

  const {  setValue, handleSubmit,control,  formState: {errors}} = useForm({
    defaultValues: {
      username: '',
      password:'' 
    }
  });
  const [show, setShow] = useState(false)


  const onSubmit = data =>{
    const {username, password} = data
    
    const authenticate = async()=>{
    try {
       await loginUser(username, password);

    } catch (error) {
      console.error(error)
    }   }
    authenticate();

  }

  return (
    <KeyboardAvoidingView>
    <Box
    alignContent={'center'}
    margin={5}
    padding={4}
    >
      <VStack
      justifyContent={'center'}
      alignContent={'center'}
      space={4}
      >
        <Row
        justifyContent={'center'}
        >
        <Text 
        style={{fontFamily: 'Lobster_400Regular', color:'#046791', fontSize:40}}
         >Cab</Text>

        <Text 
        style={{fontFamily: 'Lobster_400Regular', color:'#333', fontSize:40}}
         >Med</Text>

        </Row>

      <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({
        field: {onChange, onBlur, value}
      })=>(
        <Input
        style={''}
        placeholder='username'
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        />
      )}
      name="username"
      />
      <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({
        field: {onChange, onBlur, value}
      })=>(
        <Input
        placeholder='********'
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
            <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
          </Pressable>}
        />
      )}
      name="password"
      />
      <Button onPress={handleSubmit(onSubmit)} >Connexion </Button>

</VStack>
    </Box>
</KeyboardAvoidingView>
  );
      
};


export default SignInScreen;
