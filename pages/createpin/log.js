import React, { useState } from 'react';
import axios from 'axios';
export const Log = async (pin,token) => {
    
    const intplan = parseInt(pin,10)
    const datag = JSON.stringify ({
      "pincode":pin
    });
      
    try {
        const response = await axios({
            url: 'https://api.powerpaybill.com.ng/api/v1/createpin',
            method: 'post', 
            data: datag,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token 
            },
        });
        
        if (response.data?.message == "successful") {
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
            data: error,
        };

        console.log(error,'seeeee');
        throw responsed;
    }
};

