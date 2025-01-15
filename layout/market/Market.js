import React, { useState,useEffect } from 'react';
import { Nav } from '../../components/Nav';
import { View, Text, Pressable, Image, ScrollView } from 'react-native';
import { styles } from './style';
import { Entypo, AntDesign, Ionicons, FontAwesome, Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const cabledeal = require('../../assets/images/cable.jpg');
const airdeal = require('../../assets/images/airtime2cash.jpg');
const utideal = require('../../assets/images/utility.jpg');
const datadeal = require('../../assets/images/data_buy.jpg');
const betdeal = require('../../assets/images/4617435.png');
const bulkimage = require('../../assets/images/bulk_sms.png');
const referimage = require('../../assets/images/refer.png');
const resultdeal = require('../../assets/images/resultchecker.png');


export const Market = ({route}) => {
    const [mynumber , setMynumber] = useState('')
    const navigation = useNavigation();

    const focusOn = async () => {
        if (route.params && route.params.datar) {
            const number = route.params.datar;
            setMynumber(number);
            console.log(number);
        } else {
            const idannumber = await AsyncStorage.getItem('token');
            setMynumber(idannumber);
            console.log('this is number', idannumber);
        }
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', focusOn);
        return unsubscribe;
    }, [])
    
    const handleClick = () => {
        alert('Coming soon!');
    }
    return (
        <>
            <ScrollView style={styles.container}>
                <ScrollView style={styles.ScrollView}>
                    <Text style={styles.texty}>Services</Text>
                    <View style={styles.boxxy}>
                        <Pressable style={styles.box} onPress={() => navigation.navigate('Airtime', { datar: mynumber })} >
                        <Feather name='phone-call' size={22} color='green' />
                            <Text style={styles.liltext}>Airtime </Text>
                        </Pressable>
                        <Pressable style={styles.box} onPress={() => navigation.navigate('Data', { datar: mynumber })} >
                        <Ionicons name='wifi' size={22} color='red' />
                            <Text style={styles.liltext}>Data</Text>
                        </Pressable>
                        <Pressable style={styles.box} onPress={() => handleClick()} >
                        <FontAwesome name='soccer-ball-o' size={22} color='green' />
                            <Text style={styles.liltext}>Betting</Text>
                        </Pressable>
                    </View>
                    <View style={styles.boxxy}>
                        <Pressable style={styles.box} onPress={() => navigation.navigate('Electric', { datar: mynumber })}>
                        <Image source={utideal} style={styles.imgd} />
                            <Text style={styles.liltext}>Electricity </Text>
                        </Pressable>
                        <Pressable style={styles.box} onPress={() => handleClick()} >
                        <MaterialCommunityIcons name='book-education' size={22} color='darkblue' />
                            <Text style={styles.liltext}>Result </Text>
                        </Pressable>
                        <Pressable style={styles.box} onPress={() => navigation.navigate('Cable', { datar: mynumber })}>
                            <FontAwesome name='tv' size={22} color='black' />
                            <Text style={styles.liltext}>Cable </Text>
                        </Pressable>
                    </View>
                    <View style={styles.boxxy}>
                    <Pressable style={styles.box} onPress={() => handleClick()} >
                            <FontAwesome5 name='sms' size={22} color='#005f00' />
                            <Text style={styles.liltext}>Bulk SMS </Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </ScrollView>
            <Nav font2color='#11053b' />
        </>
    )
}