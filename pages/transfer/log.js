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

export const Log = async (token, number, texts) => {
  try {
    let data = JSON.stringify({
        "username": texts,
        "amount": number,
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.connectvaluedataservice.com/api/v1/transactions/transfer',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: data,
    };

    console.log(config);

    const response = await axios(config);

    if (response.status === 200) {
      const responseData = response.data;
      return {
        message: 'Success',
        data: responseData,
      };
    } else {
      const errorMessage = `Request failed with status code ${response.status}`;
      throw new Error(errorMessage);
    }
  } catch (error) {
    const responsed = {
      message: 'rejected',
      data: error.response?.data?.message,
    };
    console.log(error.response.data.message);
    throw responsed;
  }
};


