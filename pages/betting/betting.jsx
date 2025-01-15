import { View, Text, Image, Pressable, TextInput, Modal, ActivityIndicator,ScrollView } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { styles } from './style';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
const deal = require('../../assets/images/verify.png')
const nodeal = require('../../assets/images/cancel.png')

export const Betting = ({ route }) => {
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

    const handleInputChange = (index, text) => {
        if (/^\d*$/.test(text) && text.length <= 1) {
            const newInputs = [...inputs];
            newInputs[index] = text;
            setInputs(newInputs);  // Corrected line

            if (text.length === 1 && index < 3) {
                {/*}  text !== '' && inputs[index + 1].focus(); */ }
                inputsRefs.current[index + 1].focus();
            }
        }
    }


    useEffect(() => {

        setMynumber(route.params.datar)
        const formData = new URLSearchParams();
        formData.append('phonenumber', route.params.datar);
        console.log(formData)
        axios
            .post('https://nodejs.gloriouspete.repl.co/getall', formData.toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            .then((response) => {
                const mydata = response.data;

                if (mydata !== 'undefined') {
                    setAccbalance(mydata.accountbalance);
                };
            })
            .catch(error => {
                console.error(error)
            })
    }, [])
    const handleChange = (wells) => {
        setNumber(wells);
    }
    const handleAmount = (lmao) => {
        setText(lmao)
    }
    const handleSubmit = () => {
        const pincode = parseInt(inputs.join(''), 10);
        setIsloading(true)
        setTimeout(() => {
            setIsloading(false);
        }, 10000);
        const myamount = texts;
        const netcode = selected;
        const formData = new URLSearchParams();
        formData.append(`netcode`, netcode);
        formData.append(`amount`, myamount);
        formData.append(`number`, number);
        formData.append(`phonenumber`, mynumber);
        formData.append('pincode', pincode)

        console.log(formData)
        axios
            .post('https://nodejs.gloriouspete.repl.co/buyairtime', formData.toString(), {

            })
            .then((response) => {
                setIsloading(false)
                console.log('stop playing', response.data)
                const reppin = response.data;
                if (reppin.Status === 'successful') {
                    setModalContent('ORDER SUCCESSFUL');
                    setPics(deal);
                    setModalVisible(true);
                }
                else if (reppin === 'nonmoney') {
                    setPics(nodeal);
                    setModalContent('Insufficient balance');

                    setModalVisible(true);
                }

                else {
                    setModalContent('Error:Check mobile Number');
                    setPics(nodeal);
                    setModalVisible(true);
                }
            }).catch((error) => {
                console.error(error);
                setModalContent('Error Purchasing Airtime');
                setPics(nodeal);
                setModalVisible(true);
            })
    }
    const closeModal = () => {
        setModalVisible(false);
    }

    const alan = () => {
        setIspin(true)
        setTimeout(() => {
            setIsloading(false);
        }, 2000);

    }



    return (
        <>
            <View style={styles.boxx}>
              
                <View style={styles.bcont}>
                    <Text style={styles.boldtext}>Betting Platform</Text>
                </View>
                <View style={styles.boxcont}>
                    <Picker selectedValue={selected} itemStyle={styles.itemstyle} mode="dropdown" onValueChange={(itemValue, itemIndex) => setSelected(itemValue)} style={styles.picker} >
                        <Picker.Item label='Sporty Bet' value='1' />
                        <Picker.Item label='AIRTEL' value='4' />
                        <Picker.Item label='9MOBILE' value='3' />
                        <Picker.Item label='GLO' value='2' />
                    </Picker>
                </View>
                <View style={styles.bcont}>
                    <Text style={styles.boldtext}>Betting Account ID</Text>
                </View>

                <TextInput style={styles.boxcont} value={number} onSubmit={text => ''} keyboardType='numeric' onChangeText={text => handleChange(text)} placeholder="Betting Account ID" />

                <Text style={styles.untext}>This transaction attracts 5% of your interested funding amount as charge</Text>

                <View style={styles.bcont}>
                    <Text style={styles.boldtext}>Amount</Text>
                </View>
                <Text style={styles.unntext}>You would be Debited approximately &#8358; 9450 for this transaction</Text>
                <TextInput style={styles.boxcont} value={texts} onSubmit={text => ''} keyboardType='numeric' onChangeText={text => handleAmount(text)} placeholder="Amount" />
                <View style={styles.idancover}>
                    <Pressable style={styles.idan} onPress={alan} >
                        <Text style={styles.buttonin}>Purchase</Text>
                    </Pressable>
                </View>
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
            <Modal visible={isLoading} transparent={true} >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={50} color='red' />
                </View>
            </Modal>
            <Modal visible={isPin} transparent={true} >
                <View style={styles.pinback}>
                    <View style={styles.pinmod}>
                        <View style={styles.small}>
                            <Pressable style={styles.pressmall} onPress={() => setIspin(false)} >
                                <MaterialCommunityIcons name='close' size={17} color='black' />
                            </Pressable>
                        </View>
                        <Text style={styles.textmod}>ENTER PAYMENT PIN</Text>
                        <View style={styles.pinmodal}>
                            {inputs.map((value, index) => (
                                <TextInput
                                    key={index}
                                    ref={(ref) => (inputsRefs.current[index] = ref)}
                                    style={styles.inputmod}
                                    onSubmitEditing={() => handleSubmit()}
                                    placeholder={`${index + 1}`} keyboardType='numeric' secureTextEntry={true} value={value} onChangeText={(text) => handleInputChange(index, text)} maxLength={1} />
                            ))}
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}


