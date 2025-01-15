import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { styler } from './discss';
import { styles } from '../style';
import { AntDesign } from '@expo/vector-icons';

export const Displayone = () => {
    const navigation = useNavigation();
    return (
        <>
            <View style={styler.previewbox}>
  
                <View style={styler.boxcont}>
                    <View style={styler.container}>
                        <Pressable style={styler.buttonstyle} onPress={() => navigation.navigate('Displaytwo')} >
                            <Text style={styler.kilode}>Skip</Text>
                        </Pressable>
                        <Text> <AntDesign name="arrowright" size={28} color="#25292e" style={styles.buttonIcon} /></Text>
                    </View>
                </View>
            </View>
        </>
    )
}