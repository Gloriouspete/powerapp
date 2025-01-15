import React, { useState, useEffect } from 'react';
import { Nav } from '../../components/Nav';
import { View, Text, Pressable, Image, ScrollView,Linking } from 'react-native';
import { styles } from './style';
import { StatusBar } from 'expo-status-bar';
import { Entypo, AntDesign, Ionicons, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const deale = require('../../assets/images/avatar.png');

export const Profile = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('connectvalue');
    const [token, setToken] = useState('connect');
    const [phonenumber, setPhonenumber] = useState('connect');
    const [packagename, setPackagename] = useState('Smart');
    const [email, setEmail] = useState('Connectvalue');
    const [deal, setDeal] = useState(deal);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const username = await AsyncStorage.getItem('username');
                const email = await AsyncStorage.getItem('email');
                const phonenumber = await AsyncStorage.getItem('phonenumber');
                const packagename = await AsyncStorage.getItem('package');
                const token = await AsyncStorage.getItem('token');
                console.log('retrieved into profile');
                setUsername(username);
                setToken(token)
                setEmail(email);
                setPhonenumber(phonenumber);
                setPackagename(packagename);
            } catch (error) {
                console.log('Error rerieving profile');
            }
        }
        const unsubscribe = navigation.addListener('focus', fetchData);
        return unsubscribe;
    }, []);
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setDeal(result.assets[0].uri);
            console.log(result);
        } else {
            alert('You did not select any image.');
        }
    };
    const uploadImage = async () => {
        if (deal) {
            const formData = new FormData();
            formData.append('image', {
                uri: deal,
                name: 'image.jpg',
                type: 'image/jpeg',
            });

            try {
                const response = await fetch('YOUR_UPLOAD_URL', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                // Handle the response from the server
                const responseData = await response.json();
                console.log('Upload response:', responseData);
            } catch (error) {
                console.error('Upload error:', error);
            }
        }
    };
    const signout = async () => {
        await AsyncStorage.removeItem('firstname');
        await AsyncStorage.removeItem('balance');
        await AsyncStorage.removeItem('lastname');
        await AsyncStorage.removeItem('password');
        await AsyncStorage.removeItem('phonenumber');
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('accountname');
        await AsyncStorage.removeItem('bankname');
        await AsyncStorage.removeItem('accountnumber');
        await AsyncStorage.removeItem('token');
        navigation.navigate('Preview')
    }
    return (
        <>
            <View style={styles.container}>
                <ScrollView style={styles.ScrollView}>
                    <View style={styles.imgcover}>
                        <Image source={deale} style={styles.img} />
                        <Pressable style={styles.imadd}>
                            <AntDesign name='pluscircleo' size={24} onPress={() => pickImageAsync()} color='black' />
                        </Pressable>
                    </View>
                    <Text style={styles.acctext}>Account</Text>
                    <View style={styles.drawer}>
                        <View style={styles.myidea}>
                            <Ionicons name='person-outline' size={20} color='#5f00ff' />
                            <Text style={styles.drawtext}>{username}</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={20} color="transparent" style={styles.buttonIcon} />
                    </View>
                    <View style={styles.drawer}>
                        <View style={styles.myidea}>
                            <MaterialCommunityIcons name='email-outline' size={20} color='darkblue' />
                            <Text style={styles.drawtext}>{email}</Text>
                        </View>
                        <AntDesign name="arrowright" size={20} color="transparent" style={styles.buttonIcon} />
                    </View>
                  
                    <Text style={styles.acctext}>Security</Text>
                    <Pressable style={styles.drawer} onPress={() => navigation.navigate('Setpass', { datar: token })}>
                        <View style={styles.myidea}>
                            <Entypo name='lock' size={20} color='black' />
                            <Text style={styles.drawtext}>Change Security Password</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={20} color="#25292e" style={styles.buttonIcon} />
                    </Pressable>
                    <Pressable style={styles.drawer} onPress={() => navigation.navigate('Setpin', { datar: token })} >
                        <View style={styles.myidea}>
                            <FontAwesome name='drivers-license-o' size={20} color='green' />
                            <Text style={styles.drawtext}>Change Transaction Pin</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={20} color="#25292e" style={styles.buttonIcon} />
                    </Pressable>
                    <View style={styles.drawerly}>
                        <Pressable style={styles.myidea} onPress={() => signout()} >
                            <AntDesign name='logout' size={20} color='red' />
                            <Text style={styles.drawtext}>Sign Out</Text>
                        </Pressable>
                        <MaterialIcons name="keyboard-arrow-right" size={20} color="#25292e" style={styles.buttonIcon} />
                    </View>
                    <Text style={styles.acctext}>About</Text>
                    <Pressable style={styles.drawer} onPress={() => Linking.openURL('https://wa.me/2347044546743')} >
                        <View style={styles.myidea}>
                            <MaterialCommunityIcons name='message-alert' size={20} color='blue' />
                            <Text style={styles.drawtext}>Contact Us</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={20} color="#25292e" style={styles.buttonIcon} />
                    </Pressable>
                    <Pressable style={styles.drawer} onPress={() => Linking.openURL('https://www.powerpaybill.com.ng')} >
                        <View style={styles.myidea}>
                            <MaterialCommunityIcons name='web' size={20} color='green' />
                            <Text style={styles.drawtext}>Visit Website</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={20} color="#25292e" style={styles.buttonIcon} />
                    </Pressable>
                </ScrollView>

            </View>
            <StatusBar barStyle="light-content" />
            <Nav font4color='#11053b' />
        </>
    )
}