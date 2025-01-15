import { View, Text, Image, Pressable, StatusBar } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { styles } from './style';
import { AntDesign } from '@expo/vector-icons';
const deal = require('../../assets/images/care.png');

export const DisplayThree = () => {
    const navigation = useNavigation();
    return (
        <>
            <View style={styles.previewbox}>
                <View style={styles.firstbox}>
                    <View style={styles.container}>
                        <View style={styles.circlea}>
                        </View>
                        <View style={styles.circleb}>

                        </View>
                        <View style={styles.circle}>

                        </View>
                    </View>
                </View>
                <View style={styles.secondbox}>
                    <View style={styles.dealercover}>
                        <Image source={deal} style={styles.dealer} />
                    </View>
                    <Text style={styles.firsttext}>24 HOURS SUPPORT</Text>
                    <Text style={styles.secondtext}>24-hour support to cater to your transaction needs anytime, day or night.</Text>

                </View>
                <View style={styles.thirdbox}>
                    <View style={styles.boxcont}>

                        <Pressable style={styles.buttonstyle} onPress={() => navigation.navigate('Signup')} >
                            <Text style={styles.kilode}>Create account</Text>
                        </Pressable>
                        <Pressable style={styles.buttonstyles} onPress={() => navigation.navigate('Login')} >
                            <Text style={styles.kilodes}>Login</Text>
                        </Pressable>

                    </View>
                </View>


            </View>
            <StatusBar barStyle='dark-content' />
        </>
    )
}