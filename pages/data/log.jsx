import React, { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Log = async (token, network, mobile, plan) => {
  const formData = new URLSearchParams();
  formData.append(`netcode`, network);
  formData.append(`dataplan`, plan.planid);
  formData.append(`number`, mobile);
  formData.append(`dataamount`, plan.price);
  formData.append("pincode", "");

  try {
    const response = await axios.post(
      "https://api.powerpaybill.com.ng/api/v1/buydata",
      formData.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: token,
        },
      }
    );

    const responsed = {
      message: "approved",
      data: response.data,
    };

    return responsed;
  } catch (error) {
    const responsed = {
      message: "rejected",
      data: error.response.data,
    };

    throw responsed;
  }
};

export const Validate = async (iuc, type) => {
  const token = await AsyncStorage.getItem("token");

  const postData = {
    network: iuc,
    type: type,
  };
  try {
    const response = await axios.post(
      "https://api.powerpaybill.com.ng/api/v1/getdata",
      postData,
      {
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    const filteredData = [];

    response.data.data.forEach((item) => {
      if (item.network === iuc && item.type === type) {
        filteredData.push(item);
      }
    });
    const responsed = {
      message: "approved",
      data: filteredData,
    };

    return responsed;
  } catch (error) {
    const responsed = {
      message: "rejected",
      data: error,
    };

    throw responsed;
  }
};
