import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Entypo, AntDesign, Ionicons, FontAwesome, Feather } from '@expo/vector-icons';
import { styles } from './style';
import axios from 'axios';

export const Log = async (username, password) => {
    const loginData = {
        username: username,
        password: password,
      };
      console.log(loginData)
  
    try {
        const response = await axios.post('https://api.powerpaybill.com.ng/api/v1/login',loginData, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        const result = response.data
        console.log(result);
        return (result)
    }

    catch (error) {
        throw error
    }
}

export const Forgotfuncion = async (email) => {
 const formData = {
  "email":email
 }

  try {
      const response = await axios.post('https://api.powerpaybill.com.ng/api/v1/forgot', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

      const responsed = {
          message: 'approved',
          data: response.data
      }
      console.log(responsed)
      return (responsed)
  }

  catch (error) {
    console.log(error.response,'depeeee')
    const message = error?.response
      const responsed = {
          message: message,
          data: error.response
      }
      throw responsed
  }
}