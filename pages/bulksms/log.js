import React, { useState } from 'react';
import axios from 'axios';
export const Log = async (token,sender, recipient,message) => {
  
    let data = JSON.stringify({
        "sender": sender,
        "recipient": recipient,
        "message":message,
        "dnd":false
    });
  console.log(data, 'see data oo')
    try {
        const response = await axios.post(`https://api.connectvaluedataservice.com/api/v1/transactions/send-sms`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        if (response.data) {
            const responsed = {
                message: 'approved',
                data: response.data,
            };
            console.log(responsed)
            return responsed;
        } else {
            console.log('Response or response data is undefined.');
        }
    } catch (error) {
        const responsed = {
            message: 'rejected',
            data: error.response.data.message,
        };

        console.log(error);
        throw responsed;
    }
};




