import { View, Text, Image, Pressable, TextInput, Modal, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './style';
export default function Pinmodal({ visible,onSuccess,onFail,onClose }) {
    
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
    const handleSubmit = async () => {
        const pincode = inputs.join('')
        const savedpin = await AsyncStorage.getItem('pin')
        if (pincode === savedpin) {
            onSuccess()
        }
        else if (pincode !== savedpin) {
            onFail()
        }
     }
    return (
        <>
         <Modal visible={visible} transparent={true} >
                <View style={styles.pinback}>
                    <View style={styles.pinmod}>
                        <View style={styles.small}>
                            <Pressable style={styles.pressmall} onPress={() => onClose()} >
                                <MaterialCommunityIcons name='close' size={17} color='red' />
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