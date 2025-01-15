import { View, Text, Image, Pressable,StatusBar } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { styles } from './style';
import { AntDesign } from '@expo/vector-icons';
const deal = require('../../assets/images/easy.png')

export const DisplayTwo = () => {
    const navigation = useNavigation();
    return (
        <>
            <View style={styles.previewbox}>
                <View style={styles.firstbox}>
                    <View style={styles.container}>
                        <View style={styles.circlea}>

                        </View>
                        <View style={styles.circle}>

                        </View>
                        <View style={styles.circleb}>

                        </View>

                    </View>
                </View>
                <View style={styles.secondbox}>
                    <View style={styles.dealercover}>
                        <Image source={deal} style={styles.dealer} />
                    </View>
                    <Text style={styles.firsttext}>MOBILE TOP-UP</Text>
                    <Text style={styles.secondtext}>Add credit and data balances to your mobile phone numbers without the need for physical recharge cards or visiting a retail store.</Text>

                </View>
                <View style={styles.thirdbox}>
                    <View style={styles.boxcont}>

                        <Pressable style={styles.buttonstyle} onPress={() => navigation.navigate('Displaythree')} >
                            <Text style={styles.kilode}>Next</Text>
                        </Pressable>

                    </View>
                </View>


            </View>
            <StatusBar barStyle='dark-content' />
        </>
    )
}