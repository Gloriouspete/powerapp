import React, { useState, useEffect } from 'react';
import { Nav } from '../../components/Nav';
import { View, Text, Pressable, Image, ScrollView,Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
const nodeal = require('../../assets/images/cancel.png');
const axios = require('axios');

export const Fund = () => {
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

    return (
        <>
            <ScrollView style={styles.container}>
                <View style={styles.tablecover}>
                    <Pressable style={styles.table} onPress={() => navigation.navigate('Autofund')}>
                    <Text style={styles.text}>AUTO FUNDING </Text>
                    </Pressable>
                    <Pressable style={styles.tabletwo} onPress={() => navigation.navigate('Manualfund')}>
                    <Text style={styles.text}>MANUAL FUNDING </Text>
                    </Pressable>
                </View>
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
            <Nav font3color='#11053b'/>
        </>
    )
}
