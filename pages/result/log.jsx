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

export const Log = async (serviceID, variation_code, phone, amount) => {
  const data = JSON.stringify({
    serviceID: serviceID,
    variation_code: variation_code,
    phone: phone,
    amount: amount,
  });

  console.log(data, "this is", token);

  const axiosConfig = {
    method: "post",
    url: "https://api.connectvaluedataservice.com/api/v1/transactions/exams",
    maxBodyLength: Infinity,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
  try {
    console.log("Sending request...");
    const response = await axios(axiosConfig);
    console.log("Response:", response);
    const responsed = {
      message: "approved",
      data: response.data,
    };
    console.log("Responsed:", responsed);
    return responsed;
  } catch (error) {
    console.log("Error:", error);
    const responsed = {
      message: "rejected",
      data: error,
    };
    throw responsed;
  }
};
export const Checker = async (token) => {
console.log(token)
  const axiosConfig = {
    method: "get",
    url: `https://api.connectvaluedataservice.com/api/v1/transactions/exam`,
    maxBodyLength: Infinity,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  console.log(axiosConfig);
  try {
    const response = await axios(axiosConfig);
    const responsed = {
      message: "approved",
      data: response.data,
    };
    console.log(responsed);
    return responsed;
  } catch (error) {
    const responsed = {
      message: "rejected",
      data: error.status,
    };
    console.log(error)
    throw responsed;
  }
};
