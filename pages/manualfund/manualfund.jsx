import React, { useState, useEffect } from 'react';
import { Nav } from '../../components/Nav';
import { View, Text, Pressable, Image, ScrollView,Modal,Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Clipboard from 'expo-clipboard';
import { Feather, FontAwesome } from '@expo/vector-icons';
const nodeal = require('../../assets/images/cancel.png');
const axios = require('axios');
const opay = require('../../assets/images/monie.png');

export const Manualfund = () => {
    const [bankname, setBankname] = useState('')
    const [accname, setAccname] = useState('')
    const [accnumber, setAccnumber] = useState(null)
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [pics,setPics] = useState(null)
    const navigation = useNavigation();

    useEffect(() => {
        const fetchAcc = async () => {
        const acname = await AsyncStorage.getItem('accountname');
            const baname = await AsyncStorage.getItem('bankname');
            const acnumber = await AsyncStorage.getItem('accountnumber');
            if (acnumber === null) {
                setPics(nodeal);
                setModalContent('Your Account is still under processing, Please check back in a minute');
                setModalVisible(true);
                try {
                    const phonenumber = AsyncStorage.getItem('phonenumber');
                    const formData = new URLSearchParams();
                    formData.append('phonenumber', phonenumber);
                    const response = await axios
                        .post('https://dataserver-swart.vercel.app/getacc', formData.toString(), {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                        })
                    const mydata = response.data;
                    if (mydata !== null) {
                        if (mydata !== 'errorlog') {
                            const mname = mydata.accountName;
                            const bname = mydata.bankName;
                            const bnumber = mydata.accountNumber;
                            await AsyncStorage.setItem('accountname', mname);
                            await AsyncStorage.setItem('bankname', bname);
                            await AsyncStorage.setItem('accountnumber', bnumber);
                    
                        }
                    }
                }
                catch (error) {
                    console.error('Error getting it', error);
    
                }
            }
             else if(acnumber !== null){
          setBankname(baname);
          setAccname(acname);
          setAccnumber(acnumber);
        }
        }
        const unsubscribe = navigation.addListener('focus', fetchAcc);
        return unsubscribe;
    }, [])
    const closeModal = () => {
        setModalVisible(false);
    }
    const copyy = async() => {
        const idann = '9027255833';
       await Clipboard.setStringAsync(idann)
        alert('Account Number Copied')
    }
    return (
        <>
            <ScrollView style={styles.container}>
            <Text style={styles.textly}>With Manual Funding, A Deposit is to be made into the Account Details Below. </Text>
              
                <View style={styles.tablecover}>
                <Text style={styles.text}>MANUAL FUNDING </Text>
                    <View style={styles.tabletwo}>
                        <Text style={styles.textlly}>Bank name</Text>
                        <View style={{ width: '100%', height: 'auto', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={opay} style={styles.imgd} />
                            <Text style={styles.textye}>Monie Point bank</Text>
                            </View>
                        <Text style={styles.textlly}>Account Name</Text>
                        <Text style={styles.textye}>Mike Power enterprise</Text>
                        <Text style={styles.textlly}>Account Number</Text>
                        <View style={{ width: '100%', height: 'auto',flexDirection:'row',alignItems:'center',justifyContent:'center' }}>
                            <Text style={styles.textye}>9027255833</Text>
                            <Pressable onPress={(value) => copyy(value)} style={{
                                marginLeft:15,
                            }} >
                                <Feather name='copy' size={21} />
                            </Pressable>
                           
                        </View>
                       
                    </View>
                </View>

                <Text style={styles.textly}>After Making the transaction, Contact Customer Service on <FontAwesome name='whatsapp' size={25} color='green' onPress={() =>  Linking.openURL('https://wa.me/2347044546743')} />  with Receipt of payment. </Text>
                <Modal
                    visible={modalVisible}
                    onRequestClose={closeModal}
                    animationType="slide">
                    <View style={styles.modalcontain}>
                        <View style={styles.modalcontent}>
                        <Image source={pics} style={styles.imgsrc}></Image>
                            <Text style={styles.modaltext}>{modalContent}</Text>
                            <Pressable style={styles.idan} onPress={closeModal} >
                                <Text style={styles.buttonin}>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </>
    )
}
