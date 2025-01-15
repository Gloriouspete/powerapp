import { View, Text, Button, TextInput, Pressable, Image, ScrollView, ActivityIndicator, Modal, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Entypo, AntDesign, Ionicons, FontAwesome, Feather } from '@expo/vector-icons';
import { styles } from './style';
import axios from 'axios';
import { Log } from './log';
import { StatusBar } from 'expo-status-bar';
import Loader from '../../components/layout/loader';
import { Forgotfuncion } from './log';

export const Login = () => {
  const [password, setPassword] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [content, setContent] = useState('');
  const [forgoton, setForgot] = useState(false)
  const [forgotemail, setEmail] = useState('')
  const navigation = useNavigation();
  /*
  { "data": { "message": "Successfully logged in as peterninyo4@gmail.com (devglo) !", "success": true, "token": "46|WPJXBjRYdfiJgpr1i8nZNOnY3MgAmMmYyugsMSQf8cf886ca", "user": { "account": [Object], "created_at": "2023-11-02T11:22:07.000000Z", "email": "peterninyo4@gmail.com", "email_verified_at": null, "id": 3, "last_ip": "105.113.18.211", "last_login": "2023-11-04 02:01:54", "name": "Developer Glo", "phone": "08123456789", "ref_code": "864536", "referrer": null, "role": "user", "status": "active", "updated_at": "2023-11-05T07:03:30.000000Z", "username": "devglo" } }, "message": "approved" }
  */
  const handleSubmit = async () => {
    // navigation.navigate('Home');
    if (password === '' || phonenumber === '') {
      setIsloading(false);
      setIncorrect(true);
      setContent('Inputs Are not meant to be empty');
      return;
    }

    const passwords = password.trim();
    const username = phonenumber.trim()
    setIsloading(true);
    try {
      const response = await Log(username, passwords)
      const {message,success} = response;
      if (success) {
        const token = response.data
        navigation.navigate('Home', { datar: token });
        setIsloading(false);
      }
      else {
        setIsloading(false);
        setIncorrect(true);
        setContent(message);

      }

    } catch (error) {

      setIsloading(false);
      setIncorrect(true);
      setContent(error.response.data.message);
      console.log('cant log in, dont know why', error);
    }
    finally {
      setIsloading(false); // Stop loading when the request is completed
    }
  };
  const forgotFunction =async () => {
    if(!forgotemail){
      alert('Please enter your email')
      return
    }
    setForgot(false)
    setIsloading(true)
    try {
      const response = await Forgotfuncion(forgotemail.trim())
      const mydata = response.data
      console.log(mydata)
      alert(mydata.message)
    }
    catch (error) {
   alert(error.data)
    }
    finally {
      setIsloading(false)
    }
  }
  const closeModal = () => {
    setIncorrect(false);
  };
  const closeforgot = () => {
    setForgot(false)
  }
  const openForgot = async () => {
    setForgot(true)
  }
  return (
    <>
      <ScrollView style={styles.cert}>
        <View className="flex-1">
          <Text style={styles.create}>Power Pay Bill</Text>
          <Text style={styles.textsmaller}>Login to Your Account</Text>
          <View className="w-screen h-auto rounded-t-2xl right-0">
          <Text className="text-md mx-3 font-interbold">Enter Username</Text>
          <TextInput style={styles.input} placeholder='Username' value={phonenumber} onChangeText={value => setPhonenumber(value)} />
          <Text className="text-md mx-2 font-interbold">Password</Text>
          <TextInput style={styles.input} placeholder='Enter Your Password' secureTextEntry={true} value={password} onChangeText={value => setPassword(value)} />
          <View style={styles.textcont}>
            <Text style={styles.textsmal} onPress={() => openForgot()} >Forgot password?</Text>
          </View>
          <View style={styles.boxcont}>
            <Pressable style={styles.hutton} title='Sign Up' onPress={() => handleSubmit()}>
              <Text style={styles.press}>Login</Text>
            </Pressable>
          </View>
          <View style={styles.textcont}>
            <Text style={styles.textsmalser} >Don't have an Account? </Text>
            <Text className="text-md font-interbold" onPress={() => navigation.navigate('Signup')} >Register</Text>
          </View>
          </View>
     
          <Modal visible={incorrect} transparent={true} onRequestClose={closeModal}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View style={styles.vowbox}>
                <Text style={styles.idan} >{content}</Text>
                <Pressable style={styles.idanm} onPress={closeModal} >
                  <FontAwesome name='close' size={26} />
                </Pressable>
              </View>
            </View>
          </Modal>
          <Modal visible={forgoton} transparent={true} onRequestClose={closeModal} animationType='fade'>
            <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#00000050" }}>
              <View style={styles.forbox}>
                <Text style={styles.infor} >Enter Your Email Address</Text>
                <TextInput style={styles.inputt} placeholder='Email Address' value={forgotemail} onChangeText={value => setEmail(value)} />
                <TouchableOpacity style={styles.idanmo} onPress={() => forgotFunction()} >
                  <Text style={styles.next} onPress={() => forgotFunction()} >Next</Text>
                </TouchableOpacity>
                <Text style={styles.back} onPress={closeforgot}>Back</Text>
              </View>
            </View>
          </Modal>
          <Loader visible={isLoading} />
        </View>
      </ScrollView>
      <StatusBar style='dark' />
    </>
  )
}