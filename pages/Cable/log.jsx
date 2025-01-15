import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const Log = async (billersCode, serviceID, variation_code, amount, phone) => {
    const token = await AsyncStorage.getItem('token')
    const intamount = parseInt(amount,10)
    let data = JSON.stringify({
        "billersCode": billersCode,
        "serviceID": serviceID,
        "variation_code": variation_code,
        "phone": phone,
        "amount": intamount
    });
    console.log(data,"lool")
    try {
        const response = await axios.post(`https://api.powerpaybill.com.ng/api/v1/buycable`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })
        if (response.data) {
            const responsed = {
                message: 'approved',
                data: response.data,
            };
            return responsed;
        } else {
            console.log('Response or response data is undefined.');
        }
    } catch (error) {
        console.log(error)
        const responsed = {
            message: 'rejected',
            data: error?.response?.data?.message,
        };
        throw responsed;
    }
};

export const Validate = async (plans) => {
    const token = await AsyncStorage.getItem('token')
    const datag = JSON.stringify({
        plans:plans
    })
    console.log(token,"dis i send token")
    try {
        const response = await axios.post(`https://api.powerpaybill.com.ng/api/v1/getcable`,datag, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const filteredData = [];
        console.log('check me', response.data)
        response.data.data.forEach(item => {
            filteredData.push(item);
        });
        const responsed = {
            message: 'approved',
            data: filteredData
        }
        console.log(responsed)
        return responsed;
    }

    catch (error) {
        const responsed = {
            message: 'rejected',
            data: error
        }
        console.log(error)
        throw responsed
    }
}

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
}