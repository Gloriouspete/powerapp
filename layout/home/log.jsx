import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Entypo, AntDesign, Ionicons, FontAwesome, Feather } from '@expo/vector-icons';
import { styles } from './style';
import axios from 'axios';

export const Log = async (token) => {
   
    const axiosConfig = {
        method: 'get',
        url: 'https://api.powerpaybill.com.ng/api/v1/getuser',
        maxBodyLength: Infinity,
        headers: {
            'Content-type':'application/json',
            'Authorization':token
        },
    }
    try {
        const response = await axios(axiosConfig)
        const result = response.data;
        console.log(result)
        return (result)
    }

    catch (error) {
        console.log(error)
        const responsed = {
            message: 'rejected',
            data: error.status
        }
        throw responsed
    }
}