import { View, Text, Button, TextInput, Pressable, Image, ScrollView, ActivityIndicator, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Entypo, AntDesign, Ionicons, FontAwesome, Feather } from '@expo/vector-icons';
import { styles } from './style';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { Log } from './log';
import Loader from '../../components/layout/loader';
import Pinmodal from '../../components/pinmodal/pinmodal';
const deal = require('../../assets/images/verify.png')
const nodeal = require('../../assets/images/cancel.png')


export const Bulksms = ({ route }) => {
    const [pin, setPin] = useState('');
    const [name, setname] = useState('');
    const [message, setMessage] = useState('')
    const [isLoading, setIsloading] = useState(false);
    const [incorrect, setIncorrect] = useState(false);
    const [content, setContent] = useState('');
    const [token, setToken] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [pics, setPics] = useState('')
    const [isPin, setIspin] = useState(false)
    const navigation = useNavigation();
    useEffect(() => {
        const setp = route.params.datar;
        setToken(setp);
        console.log(setp)
    }, [])

    const handleSubmit = async () => {
        if (pin === '' || name === '') {
            setIsloading(false);
            setIncorrect(true);
            setContent('Inputs Are not meant to be empty');
            return;
        }
        setIsloading(true);
        try {
            const response = await Log(token, name, pin, message)
            const mydata = response.data;
            console.log('na my data be this', mydata)
            if (mydata.success === true) {
                setModalContent(mydata.message);
                setPics(deal);
                setModalVisible(true);
            } else {
                setModalContent(mydata.message);
                setPics(nodeal);
                setModalVisible(true);
            }

        } catch (error) {
            setModalContent(error.data);
            setPics(nodeal);
            setModalVisible(true);
        }
        finally {
            setIsloading(false); // Stop loading when the request is completed
        }

    };
    const closeModal = () => {
        setModalVisible(false);
    };
    const closemodal = () => {
        setModalVisible(false);
        setIspin(false)
    }
    const incorrectpin = async () => {
        setPics(nodeal);
        setModalContent('Incorrect Pin');
        setModalVisible(true);
    }
    const alan = () => {
        setIspin(true)
        setTimeout(() => {
            setIsloading(false);
        }, 2000);

    }
    return (
        <>
            <ScrollView style={styles.cert}>
                <View style={styles.previewbox} >
                    <Text style={styles.create}></Text>
                    <Text style={styles.textsmaller}> </Text>
                    <Text style={styles.textsmall}>Enter Sender Name</Text>
                    <TextInput style={styles.input} placeholder='Name' value={name} onChangeText={value => setname(value)} />
                    <Text style={styles.textsmall}>Enter Number Lists</Text>
                    <TextInput style={styles.inpute} multiline={true} placeholder='Remember to seperate with a comma if more than one' keyboardType='numeric' value={pin} onChangeText={value => setPin(value)} />
                    <Text style={styles.textsmall}>Enter Message</Text>
                    <TextInput style={styles.inpute} multiline={true} placeholder='Enter Message Content' value={message} onChangeText={value => setMessage(value)} />

                    <View style={styles.boxcont}>
                        <Pressable style={styles.hutton} title='Sign Up' onPress={alan}>
                            <Text style={styles.press}>Send</Text>
                        </Pressable>
                    </View>
                    <Loader visible={isLoading} />
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
                    <Pinmodal visible={isPin} onSuccess={() => handleSubmit()} onFail={() => incorrectpin()} onClose={() => closemodal()} />
                </View>
            </ScrollView>
            <StatusBar style='dark' />
        </>
    )
}