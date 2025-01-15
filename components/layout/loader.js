import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, Image, ScrollView, FlatList, ActivityIndicator, Modal, Animated, Easing } from 'react-native';
const deal = require('../../assets/images/spins.png');
export default function Loader({ visible }) {
    const [animatedValue, setAnimatedValue] = useState(50)

    useEffect(() => {
        const toggleNumber = () => {
            if (animatedValue === 50) {
                setAnimatedValue(100)
            }
            else if (animatedValue === 100) {
                setAnimatedValue(50)
            }

        }
        const intervalId = setInterval(toggleNumber, 500)

        return () => clearInterval(intervalId)
    }, [animatedValue]);
    const animatedStyle = {
        width: animatedValue,
        height: animatedValue
    }
    return (
        <>
            <Modal visible={visible} transparent={true} animationType='slide' >
                <View style={styles.dealers}>
                    <Animated.View
                        style={[styles.box, animatedStyle]}
                    >
                        <Image source={deal} style={styles.dealer} />
                    </Animated.View>
                </View>

            </Modal>
        </>
    )
}

import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get('window');
export const styles = StyleSheet.create({
    box: {
        backgroundColor: '#ffffff',
        borderRadius: 90,
        borderWidth: 3,
        borderColor: '#00ff0050'
    },
    dealers: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#33333380'

    },
    dealer: {

        width: '100%',
        height: '100%',

    },
})