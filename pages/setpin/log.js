import React, { useState } from "react";
import axios from "axios";

export const Log = async (token, pin) => {
  const datag = JSON.stringify({
    pincode: pin.toString(),
  });

  try {
    const response = await axios({
      url: "https://api.powerpaybill.com.ng/api/v1/createpin",
      method: "post",
      data: datag,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    console.log(response);
    const responsed = {
      message: "approved",
      data: response.data,
    };
    console.log(responsed);
    return responsed;
  } catch (error) {
    const responsed = {
      message: "rejected",
      data: error?.response?.data,
    };

    console.log(error.response, "oga oos");
    throw responsed;
  }
};
