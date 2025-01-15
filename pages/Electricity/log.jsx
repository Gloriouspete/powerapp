import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const Log = async (meternumber, selectedProvider, selectedType, phonenumber, amount) => {
    const token = await AsyncStorage.getItem('token')

    let data = JSON.stringify({
        "billersCode": meternumber,
        "serviceID": selectedProvider,
        "variation_code": selectedType,
        "phone": phonenumber,
        "amount": parseInt(amount, 10)
    })

    console.log(data);
    try {
        const response = await axios.post('https://api.powerpaybill.com.ng/api/v1/buyelectric',data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })

        if (response && response.data) {
            const responsed = {
                message: 'approved',
                data: response.data,
            };
            console.log('see response electric',responsed)
            return responsed;
        } else {
            console.log('Response or response data is undefined.');
        }
    }
    catch (error) {
        const responsed = {
            message: 'rejected',
            data: error.response?.data,
        };

        console.log(error);
        throw responsed;
    }
};


export const Validate = async (iuc, type) => {
    const token = await AsyncStorage.getItem('token')
   
    try {
        const response = await axios.get(`https://api.powerpaybill.com.ng/api/v1/getelectric`, {
            headers: {
                'Authorization':token
            },
        });
        const responsed = response.data;
        console.log(responsed)
        return responsed;
    }

    catch (error) {
        const responsed = {
            message: 'rejected',
            data: error
        }
        console.log(error + token + "love")
        throw responsed
    }
};

export const Select = async (token, name) => {
    console.log(token, name)
    const axiosConfig = {
        method: 'get',
        url: `https://connectvaluedataservice.com/api/cable/?service=${name}`,
        maxBodyLength: Infinity,
        headers: {
            'Authorization': token
        },
    }
    try {
        const response = await axios(axiosConfig)

        const responsed = {
            message: 'approved',
            data: response.data
        }
        console.log('responsed')
        return (responsed)

    }

    catch (error) {
        const responsed = {
            message: 'rejected',
            data: error.status
        }
        console.log(error)
    }
};