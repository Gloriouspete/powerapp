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

export const Log = async (firstname, username, email, phone, referrer, password) => {
  const postData = JSON.stringify({
    firstname: firstname,
    username,
    email: email,
    phonenumber: phone,
    password: password,
    referrer: referrer || 'gloriouspete'
  });

  try {
    const response = await axios.post('https://api.powerpaybill.com.ng/api/v1/signup', postData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("see response", response);
    if (response.data.success === true) {
      const result = await Store(response.data.data);
      if (result === "success") {
        return response.data;
      }
    }
  } catch (error) {
    console.log(error)
    const message = error?.response?.data?.message
      const responsed = {
          message: message,
          data: error.response.data
      }
      throw responsed
    }
};

export const Store = async (token) => {
  try {
    AsyncStorage.setItem("token", token);
    return "success";
  } catch (error) {
    const idan = "failed";
    throw idan;
  }
};
