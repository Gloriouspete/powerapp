import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  Entypo,
  AntDesign,
  Ionicons,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";
import { styles } from "./style";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Log = async (token, mobile, amount) => {
  const pin = await AsyncStorage.getItem("pin")
  const formData = new URLSearchParams();
  //formData.append(`netcode`, network);
  formData.append(`number`, mobile);
  formData.append(`amount`, amount);
  formData.append('pincode', pin);
 console.log(pin)

  try {
      const response = await axios.post('https://api.powerpaybill.com.ng/api/v1/buyairtime', formData.toString(), {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': token
          }
      })
    
      if (response.data) {
          const responsed = {
              message: 'approved',
              data: response.data,
          };
     
          return responsed;
      } 

  } catch (error) {
      const responsed = {
          message: 'rejected',
          data: error.response?.data,
      };
      throw responsed
  }
};


