import { View, Text, Modal, TextInput, Pressable, KeyboardAvoidingView, ScrollView, ActivityIndicator, Platform } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';
import { Entypo, AntDesign, Ionicons, FontAwesome, Feather } from '@expo/vector-icons';
import axios from 'axios';
import { Log } from './log';
import Loader from '../../components/layout/loader';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [referral, setReferral] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [content, setContent] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    setIsloading(true);
    if (password === '' || phonenumber === '' || fullname === '' || password === "" || username === "") {
      setIsloading(false);
      setIncorrect(true);
      setContent('Inputs Are not meant to be empty,please ensure all inputs are filled correctly');
      return;
    }
    else if (email === '') {
      setIsloading(false);
      setIncorrect(true);
      setContent('Inputs Are not meant to be empty');
      return;
    }
    try {
      const response = await Log(fullname.trim(), username, email, phonenumber,referral, password)
      console.log('response o client', response)
      const { message, success ,data } = response;
      if (success === true) {
        setIsloading(false)
        navigation.navigate('Createpin', { datar: data });
      }
      else {
        setIsloading(false)
        setIncorrect(true);
        setContent(message);
      }
    }
    catch (error) {
      console.log(error,'i see this error')
      if (error && error.message) {
        setIsloading(false)
        setIncorrect(true);
        setContent(error.message);
        alert(error.message)
      }
      else {
        setIsloading(false)
        alert('We are currently unable to sign you up.Kindly try again later!')
      }
    }
  }
  const closeModal = () => {
    setIncorrect(false);
  };
  return (
    <>
      <ScrollView style={styles.cert}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behaviour={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}>
          <View className="flex-1 bg-slate-200" >
            <Text className="text-[20px] font-interbold mt-20 text-center">Powerpaybill Services</Text>
            <Text style={styles.textsmaller}>Sign Up</Text>

            <Text className="mx-2 font-interbold text-md" >Enter Your First Name:</Text>
            <TextInput style={styles.input} placeholder='Enter Your Full Name' value={fullname} onChangeText={text => setFullname(text)} />
            <Text className="mx-2 font-interbold text-md">Enter Username:</Text>
            <TextInput style={styles.input} placeholder='Enter Your Username' value={username} onChangeText={texts => setUsername(texts)} />
            <Text className="mx-2 font-interbold text-md">Email Address:</Text>
            <TextInput style={styles.input} placeholder='johndoe@xyz.com' keyboardType='email-address' value={email} onChangeText={value => setEmail(value)} />
            <Text className="mx-2 font-interbold text-md">Enter your Phone Number</Text>
            <TextInput style={styles.input} placeholder='090 234 699 27' keyboardType='numeric' value={phonenumber} onChangeText={text => setPhonenumber(text)} />
            <Text className="mx-2 font-interbold text-md">Referral Username(optional)</Text>
            <TextInput style={styles.input} placeholder='Refferal Username' value={referral} onChangeText={texts => setReferral(texts)} />
            <Text className="mx-2 font-interbold text-md">Enter Password</Text>
            <TextInput style={styles.input} placeholder='Password' value={password} onChangeText={text => setPassword(text)} />
            <Text className="mx-2 font-interbold text-md">Confirm Password</Text>
            <TextInput style={styles.input} placeholder='Confirm The Password' value={password} keyboardType='numeric' onChangeText={text => setPassword(text)} />

            <View style={styles.boxconter}>
              <Pressable style={styles.hutton} title='Sign Up' onPress={() => handleSubmit()}>
                <Text style={styles.press}>Sign Up</Text>
              </Pressable>
            </View>
            <View className="w-full flex items-center justify-center h-auto mb-10">
            <Pressable className="border-2 rounded-2xl w-3/5 h-11 flex items-center justify-center">
            <Text className="text-md font-intermedium" onPress={() => navigation.navigate('Login')}>Login</Text>
          
            </Pressable>
             
            </View>
         
          </View>
        </KeyboardAvoidingView>
        <Loader visible={isLoading} />
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
      </ScrollView>
    </>
  )
};