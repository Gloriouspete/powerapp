import { View, Text, Image, Pressable, TextInput, Modal, ActivityIndicator,ScrollView } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { styles } from './style';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const deal = require('../../assets/images/verify.png')
const nodeal = require('../../assets/images/cancel.png')
import { Log, Validate } from './log';
import Pinmodal from '../../components/pinmodal/pinmodal';
import Loader from '../../components/layout/loader';

export const Data = ({ route }) => {
    const [accbalance, setAccbalance] = useState('0')
    const [selected, setSelected] = useState('mtn');
    const [amount, setAmount] = useState(null);
    const [secondlet, setSecondlet] = useState(null);
    const [isLoading, setIsloading] = useState(false);
    const [isPin, setIspin] = useState(false);
    const [second, setSecond] = useState('sme');
    const [products, setProducts] = useState([]);
    const [texts, setText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [pics, setPics] = useState(deal)
    const [mytoken, setMytoken] = useState('');
    const navigation = useNavigation();
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


    const handleSendData = () => {
        const combinedNumber = parseInt(inputs.join(''), 10);
        console.log(combinedNumber)
    }

    const handleChange = (wells) => {
        setText(wells);
    }

    const fetchData = async () => {
        setIsloading(false)
        const balbal = await AsyncStorage.getItem('balance')
        setAccbalance(balbal)
        setMytoken(route.params.datar)
        try {
            let networkToValidate;

            if (selected === 'mtn') {
                networkToValidate = 'mtn';
            } else if (selected === 'airtel') {
                networkToValidate = 'airtel';
            } else if (selected === 'glo') {
                networkToValidate = 'glo';
            } else if (selected === '9mobile') {
                networkToValidate = '9mobile';
            }

            if (networkToValidate) {
                const response = await Validate(networkToValidate,second);
                const mydata = response.data;
                setProducts(mydata)
                const thefilter = mydata[0]
                console.log('see second let oo',thefilter)
                setSecondlet(thefilter)
            } else {
                console.log('Invalid selection');
            }
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', fetchData);
        return unsubscribe;
    }, [])

    useEffect(() => {
        fetchData();
    }, [selected,second]);

    useEffect(() => {
        console.log(secondlet, 'this is secondlet')
    }, [secondlet])
    const alan = () => {
        if(products.length === 0 || texts === ""){
            alert("Some required input is empty")
            return
        }
        else{
            setIspin(true)
        }
        
    }

    const handleSubmit = async () => {
        setIsloading(true)
        let networkToValidate;

        if (selected === 'mtn') {
            networkToValidate = '1';
        } else if (selected === 'airtel') {
            networkToValidate = '2';
        } else if (selected === 'glo') {
            networkToValidate = '3';
        } else if (selected === '9mobile') {
            networkToValidate = '4';
        }
        const newText = texts.substring(texts.length - 10);
        const realnum = '0' + newText;
        const myid = secondlet.plan_id;

        console.log('this is the data sent', mytoken, networkToValidate, realnum, secondlet)
        try {
            const response = await Log(mytoken, networkToValidate, realnum, secondlet)
            setIsloading(false)
            console.log('stop playing', response)
            const reppin = response.data;
            if (reppin.success === true) {
                setModalContent(reppin.message);
                setPics(deal);
                setModalVisible(true);
            }
            else if (reppin.success === false) {
                setPics(nodeal);
                setModalContent(reppin.message);

                setModalVisible(true);
            }
            else {
                setModalContent('Error:Check mobile Number');
                setPics(nodeal);
                setModalVisible(true);
            }
        }
        catch (error) {
            setIsloading(false)
            console.error(error);
            setModalContent('error Buying data, try again');
            setPics(nodeal);
            setModalVisible(true);
        }
        finally{
            setIsloading(false)
        }
    }
    const closeModal = () => {
        setModalVisible(false);
        setIspin(false)
    }
    const incorrectpin = async () => {
        setPics(nodeal);
        setModalContent('Incorrect Pin');
        setModalVisible(true);
    }
    

    return (
        <>
            <ScrollView style={{flex:1}}>
               <View style={styles.boxx}>
                <View style={styles.boxcorner}  >
                    <Text style={styles.stopl} >&#8358; {accbalance}</Text>
                </View>
                <View style={styles.boxcont}>
                    <Picker selectedValue={selected} itemStyle={styles.itemstyle} mode="dropdown" onValueChange={(itemValue, itemIndex) => setSelected(itemValue)} style={styles.picker} >
                        <Picker.Item label='MTN' value='mtn' />
                        <Picker.Item label='AIRTEL' value='airtel' />
                        <Picker.Item label='9MOBILE' value='9mobile' />
                        <Picker.Item label='GLO' value='glo' />
                    </Picker>
                </View>
                <View style={styles.boxcont}>
                    <Picker selectedValue={second} itemStyle={styles.itemstyle} mode="dropdown" onValueChange={(itemValue, itemIndex) => setSecond(itemValue)} style={styles.picker} >
                        <Picker.Item label='SME' value='sme' />
                        <Picker.Item label='Corporate Gifting' value='corporate gifting' />
                        <Picker.Item label='Gifting' value='gifting' />
                    </Picker>
                </View>

                <View style={styles.boxcont}>
                    <Picker
                        selectedValue={secondlet}
                        itemStyle={styles.itemstyle}
                        mode="dropdown"
                        onValueChange={(itemValue) => {
                            console.log(itemValue, 'seee item value'); // Check if 'itemValue' is the expected value
                            setSecondlet(itemValue);
                        }}
                        style={styles.picker}
                    >
                        {products.map((product,index) => (
                            <Picker.Item
                                key={index}
                                label={`${product.name} at ${product.price} Naira`}
                                value={product}
                            />
                        ))}
                    </Picker>
                </View>

                <TextInput style={styles.boxconta} value={texts} onSubmit={text => ''} keyboardType='numeric' onChangeText={text => handleChange(text)} placeholder="Enter Phone number" />
                <View style={styles.idancover}>
                    <Pressable style={styles.idan} onPress={alan} >
                        <Text style={styles.buttonin}>Proceed</Text>
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
                <Loader visible={isLoading} />
                    <Pinmodal visible={isPin} onSuccess={() => handleSubmit()} onFail={() => incorrectpin()} onClose={() => closeModal()} />
                    </View>
            </ScrollView>
        </>
    )
}


