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

export const Log = async (token) => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://api.powerpaybill.com.ng/api/v1/transactions",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  console.log(config);
  try {
    const response = await axios(config);

    console.log(response);
    const responsed = {
      message: "approved",
      data: response.data,
    };
    return responsed;
  } catch (error) {
    const responsed = {
      message: "rejected",
      data: error?.response?.data,
    };
    console.log(error);
    throw responsed;
  }
};

