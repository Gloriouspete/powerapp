import React, { useState } from 'react';
import { Nav } from '../../components/Nav';
import { View, Text, Pressable, Image, ScrollView } from 'react-native';
import {styles} from './style';



export const Account = () => {
   
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.texty}>Fund wallet</Text>
                <View style={styles.tablecover}>
                    <View style={styles.table}>
                        <Text style={styles.textly}>You can fund your wallet instantly by making a transfer to the account details below. </Text>
                        <Text style={styles.textlly}>Bank name</Text>
                        <Text style={styles.textye}>Wema Bank</Text>
                        <Text style={styles.textlly}>Account Name</Text>
                        <Text style={styles.textye}>NOKI MOBILE</Text>
                        <Text style={styles.textlly}>Bank account</Text>
                        <Text style={styles.textye}>1234567891</Text>
                    </View>
                </View>
                <Pressable style={styles.press} onPress={() => webview()} >
                    <Text>Click</Text>
                </Pressable>
            </View>
            <Nav />
        </>
    )
}

