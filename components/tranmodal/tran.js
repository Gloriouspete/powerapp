import { View, Text, Image, TouchableOpacity, TextInput, Modal, ActivityIndicator, Button, Pressable } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Picker } from '@react-native-picker/picker';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const glo = require('../../assets/images/spins.png')
import { StyleSheet } from "react-native";

export const Tranmodal = ({ isShow, Closemodal, Submit, load, name }) => {
    const [amount, setAmount] = useState('****')
  console.log(load)
    useEffect(() => {
        const func = () => {
            setAmount(load.price)
        }
         func
    }, [isShow])

    const change = async () => {
        setAmount('* * * *')
    }

    const color = async () => {
        if (load.status === 'successful') {
            return 'green'
        }
        else {
            return 'red'
        }
    }
    const date = new Date(load.date || '1994-01-15T06:51:42.000000Z');
    // Format the date to a specific format (e.g., YYYY-MM-DD HH:MM:SS)
    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
   
    return (
        <>
            <Modal
                animationType='slide'
                transparent={true}
                backgroundColor='#333333'
                visible={isShow}
                onRequestClose={Closemodal}

            >
                <View style={{ width: '100%', height: 'auto', backgroundColor: '#ffffff', flex: 1 }}>
                    <View style={{ width: '100%', height: 'auto', backgroundColor: 'white', flexDirection: 'column', alignItems: 'center', paddingHorizontal: 5, marginVertical: 20 }}>
                        <Image source={glo} style={{ width: 90, height: 90, }} />
                        <Text style={{ color: 'black', fontFamily: 'inter', fontWeight: '700', fontSize: 20 }}>Transaction Receipt</Text>
                    </View>

                    <View style={{ width: '100%', height: 'auto', backgroundColor: 'white', flexDirection: 'column', alignItems: 'center', paddingHorizontal: 5 }}>

                        <Pressable style={{ width: '100%', height: 'auto', backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 5, paddingVertical: 6 }}>
                            <Text style={{ color: 'black', fontFamily: 'inter', fontWeight: '500', fontSize: 16 }}>Transaction Reference</Text>

                            <Text style={{ color: 'black', fontFamily: 'inter', fontWeight: '600', fontSize: 20 }}> {load.reference}</Text>

                        </Pressable>

                        <Pressable style={{ width: '100%', height: 'auto', backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 5, paddingVertical: 6 }}>
                            <Text style={{ color: 'black', fontFamily: 'inter', fontWeight: '500', fontSize: 16 }}>Transaction Type</Text>

                            <Text style={{ color: 'black', fontFamily: 'inter', fontWeight: '600', fontSize: 18 }}>{load.network === 'nothing' ? 'Funding' : load.network} Transaction</Text>

                        </Pressable>

                        <Pressable style={{ width: '100%', height: 'auto', backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 5, paddingVertical: 6 }}>
                            <Text style={{ color: 'black', fontFamily: 'inter', fontWeight: '500', fontSize: 16 }}>Plan</Text>

                            <Text style={{ color: 'black', fontFamily: 'inter', fontWeight: '600', fontSize: 18 }}>{load?.size}</Text>

                        </Pressable>

                        <Pressable style={{ width: '100%', height: 'auto', backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 5, paddingVertical: 6 }}>
                            <Text style={{ color: 'black', fontFamily: 'inter', fontWeight: '500', fontSize: 16 }}>Recipient</Text>

                            <Text style={{ color: 'black', fontFamily: 'inter', fontWeight: '600', fontSize: 18 }}>{load?.buynumber}</Text>

                        </Pressable>

                        <Pressable style={{ width: '100%', height: 'auto', backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 5, paddingVertical: 6 }}>
                            <Text style={{ color: 'black', fontFamily: 'inter', fontWeight: '500', fontSize: 16 }}>{load.network === 'nothing' ? 'Type' : 'Network'}</Text>

                            <Text style={{ color: 'black', fontFamily: 'inter', fontWeight: '600', fontSize: 18 }}>{load?.network === 'nothing' ? 'Funding' : load.network}</Text>

                        </Pressable>

                        <Pressable style={{ width: '100%', height: 'auto', backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 5, paddingVertical: 6 }}>
                            <Text style={{ color: 'black', fontFamily: 'inter', fontWeight: '500', fontSize: 16 }}>Amount</Text>

                            <Text style={{ color: 'green', fontFamily: 'inter', fontWeight: '700', fontSize: 18 }} onPress={() => change()}>{amount}</Text>

                        </Pressable>

                        <Pressable style={{ width: '100%', height: 'auto', backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 5, paddingVertical: 6 }}>
                            <Text style={{ color: 'black', fontFamily: 'inter', fontWeight: '500', fontSize: 16 }}>Status</Text>

                            <Text style={load.status === 'successful' ? styles.quickys : load.status === 'failed' ? styles.quickysred : styles.quickys}> {load.status}</Text>

                        </Pressable>

                        <Pressable style={{ width: '100%', height: 'auto', backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 5, paddingVertical: 6 }}>
                            <Text style={{ color: 'black', fontFamily: 'inter', fontWeight: '500', fontSize: 16 }}>Time</Text>

                            <Text style={{ color: 'black', fontFamily: 'inter', fontWeight: '700', fontSize: 18 }}>{formattedDate}</Text>

                        </Pressable>



                    </View>
                    <Pressable style={{ width: '100%', height: 'auto', backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5, paddingVertical: 10 ,}}>
                            <Text style={{ color: 'black', fontFamily: 'inter', fontWeight: '500', fontSize: 13,textAlign:"center" }}>Kindly Reach out to Customer Care incase of any Transaction Dispute!</Text>


                        </Pressable>
                    <View style={{ width: '100%', height: 'auto', justifyContent: 'center', flexDirection: 'row', marginTop: 25 }} >
                        <TouchableOpacity style={{ width: '80%', height: 40, borderRadius: 8, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center' }} onPress={Closemodal}><Text style={{ fontSize: 22, fontWeight: '500', color: 'white' }}>Close</Text></TouchableOpacity>
                    </View>

                </View>
            </Modal>

        </>
    )
}
export const styles = StyleSheet.create({
    quickys: {
        color: 'green',
        fontSize: 18,
        fontWeight:'500',
        fontFamily: 'inter',
    },
    quickysred: {
        color: 'red',
        fontSize: 18,
        fontWeight:'500',
        fontFamily: 'inter',
    }

})
