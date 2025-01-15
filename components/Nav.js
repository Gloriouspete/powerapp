import React, { useState } from 'react';
import { StyleSheet } from "react-native";
import { View, Text, Pressable } from 'react-native';
import { Entypo, AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const Nav = ({font1color,font2color,font3color,font4color}) => {
    
    const navigation = useNavigation();


    const handleClick = (value) => {

        if (value === 1) {
            navigation.navigate('Home');
          
        }
        else if (value === 2) {
            navigation.navigate('Market');
         
        }
        else if (value === 3) {
            navigation.navigate('Fund');
          
        }
        else if (value === 4) {
            navigation.navigate('Profile');
          
        }
    };
    return (
        <>
            <View style={styles.footerly}>
                <View style={styles.Homenav}>
                    <Pressable style={styles.homie} onPress={() => handleClick(1)}>
                        <Entypo name='home' size={22} color={font1color||'grey'} />
                        <Text style={{color:font1color||'grey',fontWeight:'600',}}>Home</Text>
                    </Pressable>

                </View>
                <View style={styles.marketnav} >
                    <Pressable style={styles.homie} onPress={() => handleClick(2)}>
                        <Entypo name='shop' size={22} color={font2color||'grey'} />
                        <Text style={{color:font2color||'grey' ,fontWeight:'600',}}>Market</Text>
                    </Pressable>
                </View>
                <View style={styles.accountnav}>
                    <Pressable style={styles.homie} onPress={() => handleClick(3)}>
                        <MaterialCommunityIcons name='card' size={22} color={font3color||'grey'} />
                        <Text style={{color:font3color||'grey',fontWeight:'600'}}>Account</Text>
                    </Pressable>

                </View>
                <View style={styles.profilenav}>
                    <Pressable style={styles.homie} onPress={() => handleClick(4)} >
                        <Ionicons name='person-circle-sharp' size={22} color={font4color||'grey'} />
                        <Text style={{color:font4color||'grey',fontWeight:'600',}}>Profile</Text>
                    </Pressable>

                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    footerly: {
        position: 'absolute',
        backgroundColor: '#ffffff',
        width: '100%',
        bottom: 0,
        left: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 60,
        borderTopWidth: 1,
        borderColor: 'white',
        elevation: 50,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
    },
    homie: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 50,
    },
    Homenav: {

    },
    accountnav: {

    },
    profilenav: {

    },

})