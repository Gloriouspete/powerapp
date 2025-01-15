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
import { Log, Checker } from './log'

export const Result = ({ route }) => {
    const [accbalance, setAccbalance] = useState('0');
    const [selected, setSelected] = useState('waec');
    const [mytoken, setMytoken] = useState('')
    const [quantity, setQuantity] = useState('1');
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

    const Check = async () => {
        try {
            const response = await Checker(route.params.datar);
            console.log(response)
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (route.params.datar) {
            setMytoken(route.params.datar)
            console.log('set the token')
        }
    }, [])
    useEffect(() => {
        Check()
        console.log('got to check')
    }, [selected])
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
        try {

            const response = await Log(mytoken, selected, quantity, texts);

            console.log('going going gone')

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
        } catch (error) {
            console.error(error);
            setModalContent('Error Purchasing Scratch Cards');
            setPics(nodeal);
            setModalVisible(true);
        }
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
                    <Text style={styles.boldtext}>Exam Name</Text>
                </View>
                <View style={styles.boxcont}>
                    <Picker selectedValue={selected} itemStyle={styles.itemstyle} mode="dropdown" onValueChange={(itemValue, itemIndex) => setSelected(itemValue)} style={styles.picker} >
                        <Picker.Item label='WAEC' value='waec' />
                        <Picker.Item label='NECO' value='neco' />
                        <Picker.Item label='NAPTEB' value='napteb' />

                    </Picker>
                </View>
                <View style={styles.bcont}>
                    <Text style={styles.boldtext}>QUANTITY</Text>
                </View>

                <View style={styles.boxcont}>
                    <Picker selectedValue={quantity} itemStyle={styles.itemstyle} mode="dropdown" onValueChange={(itemValue, itemIndex) => setQuantity(itemValue)} style={styles.picker} >
                        <Picker.Item label='1' value='1' />
                        <Picker.Item label='2' value='2' />
                        <Picker.Item label='3' value='3' />
                        <Picker.Item label='4' value='4' />
                        <Picker.Item label='5' value='5' />
                    </Picker>
                </View>
                <View style={styles.bcont}>
                    <Text style={styles.boldtext}>Amount</Text>
                </View>
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


