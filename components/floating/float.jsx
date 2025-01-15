import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image,Linking } from 'react-native';
const image = require('../../assets/images/avatar.png')

const FloatingButton = () => {
    return <>
        <TouchableOpacity onPress={() => Linking.openURL('https://wa.me/2347044546743')} style={styles.button}>
            <FontAwesome name='whatsapp' size={40} color='green'/>
        </TouchableOpacity>
    </>
}
const styles = StyleSheet.create({

    button: {
        position: 'absolute',
        bottom: 80,
        left: 20,
        backgroundColor: 'white',
        borderRadius: 50,
        padding:5,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius:25,
    }
})
export default FloatingButton;