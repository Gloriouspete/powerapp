import { View, Text, Image, Pressable, TextInput, Modal, ActivityIndicator,ScrollView } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { styles } from './style';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { Log } from './log';
import Loader from '../../components/layout/loader';
import Pinmodal from '../../components/pinmodal/pinmodal';
const deal = require('../../assets/images/verify.png')
const nodeal = require('../../assets/images/cancel.png')

export const Transfer = ({ route }) => {
    const [accbalance, setAccbalance] = useState('0');
    const [selected, setSelected] = useState('1');
    const [secondlet, setSecondlet] = useState('');
    const [texts, setText] = useState('');
    const [isLoading, setIsloading] = useState(false);
    const [number, setNumber] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [pics, setPics] = useState('')
    const [isPin, setIspin] = useState(false)
    const [mynumber, setMynumber] = useState('');
    const navigation = useNavigation()
    const [inputs, setInputs] = useState(['', '', '', '']);
    const [inputsFilled, setInputsDilled] = useState(false);
    const inputsRefs = useRef([]);
    const [mytoken, setMytoken] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            setMytoken(route.params.datar)
        }
        fetchData()
    }, [])
    const handleChange = (wells) => {
        setNumber(wells);
    }
    const handleAmount = (lmao) => {
        setText(lmao)
    }
    const handleSubmit = async () => {
        const pincode = parseInt(inputs.join(''), 10);
        setIsloading(true)
        setTimeout(() => {
            setIsloading(false);
        }, 10000);
        console.log('see the data im sendoingfor airtime', mytoken, number, texts)
        try {
            const response = await Log(mytoken, number, texts);

            console.log('Response from Log function:', response);

            setIsloading(false);

            if (response && response.data) {
                const reppin = response.data;
                if (reppin.success === true) {
                    setModalContent(reppin.message);
                    setPics(deal);
                    setModalVisible(true);
                } else if (reppin.success === false) {
                    setPics(nodeal);
                    setModalContent(reppin.message);
                    setModalVisible(true);
                } else {
                    setModalContent('Error: Check mobile number');
                    setPics(nodeal);
                    setModalVisible(true);
                }
            } else {
                // Handle the case where the response or response data is undefined.
                console.error('Response or response data is undefined.');
            }
        } catch (error) {
            const theerror = error?.data
            setModalContent(theerror || 'Unable to make Transfer');
            setIspin(false);
            setPics(nodeal);
            setModalVisible(true);
        }

    }
    const incorrectpin = async () => {
        setPics(nodeal);
        setModalContent('Incorrect Pin');
        setModalVisible(true);
    }
    const closeModal = () => {
        setModalVisible(false);
        setIspin(false)
    }

    const alan = () => {
        setIspin(true)
        setTimeout(() => {
            setIsloading(false);
        }, 2000);

    }

    return (
        <>
             <ScrollView style={{flex:1}}>
               <View style={styles.boxx}>

                <View style={styles.bcont}>
                    <Text style={styles.boldtext}>Enter Recipient Username</Text>
                </View>
                <TextInput style={styles.boxcont} value={texts} onSubmit={text => ''} onChangeText={text => handleAmount(text)} placeholder="Recipient Username" />

                <View style={styles.bcont}>
                    <Text style={styles.boldtext}>Enter Amount</Text>
                </View>
                <TextInput style={styles.boxcont} value={number} onSubmit={text => ''} keyboardType='numeric' onChangeText={text => handleChange(text)} placeholder="Amount" />
                <View style={styles.idancover}>
                    <Pressable style={styles.idan} onPress={alan} >
                        <Text style={styles.buttonin}>Send</Text>
                    </Pressable>
                    </View>
                    </View>
            </ScrollView>
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
            <Loader visible={isLoading} />
            <Pinmodal visible={isPin} onSuccess={() => handleSubmit()} onFail={() => incorrectpin()} onClose={() => closeModal()} />
        </>
    )
}


