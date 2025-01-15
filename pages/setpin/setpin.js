import { View, Text, Button, TextInput, Pressable, Image, ScrollView, ActivityIndicator, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Entypo, AntDesign, Ionicons, FontAwesome, Feather } from '@expo/vector-icons';
import { styles } from './style';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { Log } from './log';
import Loader from '../../components/layout/loader';


export const Setpin = ({ route }) => {
    const [pin, setPin] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsloading] = useState(false);
    const [incorrect, setIncorrect] = useState(false);
    const [content, setContent] = useState('');
    const [token, setToken] = useState('')

    const navigation = useNavigation();
    useEffect(() => {
        const setp = route.params.datar;
        setToken(setp);
        console.log(setp)
    }, [])

    const handleSubmit = async () => {
        if (pin === '' || password === '') {
            setIsloading(false);
            setIncorrect(true);
            setContent('Inputs Are not meant to be empty');
            return;
        }
        setIsloading(true);
        try {
            const response = await Log(token, pin)
            const mydata = response.data;
            console.log('na my data be this', mydata)
            if (mydata?.success) {
                setIncorrect(true);
                setContent(mydata.message);
                console.log('i want to check if number exist', password)
                setIsloading(false);
            } else {
                setIsloading(false);
                setIncorrect(true);
                setContent(mydata.message);

            }

        } catch (error) {
            console.log(error);
            console.log('cant log in, dont know why');
            setIsloading(false);
            setIncorrect(true);
            setContent(error.message);
        }
        finally {
            setIsloading(false); // Stop loading when the request is completed
        }

    };
    const closeModal = () => {
        setIncorrect(false);
    };
    return (
        <>
            <ScrollView style={styles.cert}>
                <View style={styles.previewbox} >
                    <Text style={styles.create}>Set transaction pin</Text>
                    <Text style={styles.textsmaller}> </Text>
                    <Text style={styles.textsmall}>Input your Password:</Text>
                    <TextInput style={styles.input} placeholder='password' value={password} onChangeText={value => setPassword(value)} />
                    <Text style={styles.textsmall}>Enter New Transaction Pin:</Text>
                    <TextInput style={styles.input} placeholder='****' keyboardType='numeric' maxLength={4} value={pin} onChangeText={value => setPin(value)} />
                    <Text style={styles.textsmall}>Re-enter new transaction pin:</Text>
                    <TextInput style={styles.input} placeholder='****' value={pin} keyboardType='numeric' maxLength={4} onChangeText={value => setPin(value)} />
                    <View style={styles.boxcont}>
                        <Pressable style={styles.hutton} title='Sign Up' onPress={() => handleSubmit()}>
                            <Text style={styles.press}>Set Pin</Text>
                        </Pressable>
                    </View>
                  <Loader visible={isLoading} />
                    <Modal visible={incorrect} transparent={true} onRequestClose={closeModal}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.vowbox}>
                                <Text style={styles.idan} >{content}</Text>
                                <Pressable style={styles.idanm} onPress={closeModal} >
                                    <FontAwesome name='close' size={26} />
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView>
            <StatusBar style='dark' />
        </>
    )
}