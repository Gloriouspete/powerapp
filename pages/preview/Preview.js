import { View, Text, Image, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { styler } from './style';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const deal = require('../../assets/images/spins.png')

export const Preview = () => {
    const navigation = useNavigation();

    const handleLogin = async () => {
            try {
            const storedPassword = await AsyncStorage.getItem('password');
            const storedToken = await AsyncStorage.getItem('token');
            console.log(storedToken)
            if (storedToken !== null && storedToken.length > 1) {
                navigation.navigate('Home', { datar: storedToken });
            } else {
                navigation.navigate('Displayone');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            navigation.navigate('Login');
        }
    };
    useEffect(() => {
       const unsubscribe = navigation.addListener('focus', handleLogin);
         return unsubscribe;

    }, [])
    return (
        <>
            <View style={styler.previewbox}>
                <View style={styler.dealercover}>
                     <Image source={deal} style={styler.dealer} /> 
                    {/*<Text style={styler.ftext}>CVDS</Text>*/}
                    {/*<Text style={styler.ftext}> DATA SERVICE</Text> */}
                </View>
                <View style={styler.boxcont}>
                </View>
            </View>
            <StatusBar style='light' />
        </>
    )
}