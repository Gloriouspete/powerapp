import { View, Text, Image, TouchableOpacity, TextInput, Modal, ActivityIndicator, Button, Pressable } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import * as Contacts from 'expo-contacts';
import { Picker } from '@react-native-picker/picker';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { styles } from '../displayone/style';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const ContactComponent = ({ Mymodal, Closemodal, Submit }) => {
    const [contactss, setContacts] = useState([])
    const [selectedContact, setSelectedContact] = useState(null)
    const [isSearch, setIsSearch] = useState(false)
    const [searchquery, setSearchquery] = useState('')
    useEffect(() => {
        handleContact()
    }, [])
    const handleContact = async () => {
        const { status } = await Contacts.requestPermissionsAsync()
        const getstatus = await AsyncStorage.getItem('getstatus')
        if (status !== 'granted') {
            if (getstatus !== 'done') {
                alert('You need to allow permission to Select contact')
                AsyncStorage.setItem('getstatus', 'done')
                return
            }

        }
        else {
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.FirstName]
            })
            if (data.length > 0) {
                const processedContact = data.map(contact => ({
                    id: contact.id,
                    name: contact.name,
                    PhoneNumber: contact.phoneNumbers ? contact.phoneNumbers[0]?.number : 'No Phone Numbers',
                }))
                const deprocess = processedContact.slice(0, 50)
                setContacts(processedContact)
            }
        }
    }

    const handleSearch = async (text) => {
        if (text !== '') {
            console.log('this is text', text)
            const filteredItems = contactss.filter((item) =>
                item.name && item.name.includes(text))
            console.log(filteredItems)
            setContacts(filteredItems)
        }
        else{
            handleContact()
        }
    }
    useEffect(() => {
        handleSearch(searchquery)
    }, [searchquery])
    const handlePress = (item) => {
        Submit(item)
        console.log('this is the item', item)
    }
    const renderItem = ({ item, index }) => (
        <Pressable style={{ color: 'black', fontWeight: 700, fontFamily: 'inter', padding: 20,flexDirection:'row',alignItems:'center' }} key={index} value={item.PhoneNumber} onPress={() => handlePress(item.PhoneNumber)}>
            <Ionicons name='person-circle-sharp' size={35} color='blue' style={{marginRight:12}} />
            <View style={{}}>
            <Text style={{ color: 'black', fontWeight: 700, fontFamily: 'inter', fontSize: 18 }} >{`${item.name} ${index}`}</Text>
            <Text style={{ color: '#333333', fontWeight: 500, fontFamily: 'inter', fontSize: 15 }} >{`${item.PhoneNumber} ${index}`}</Text>
            </View>
        
        </Pressable>
    )
    return (
        <>
            <Modal
                animationType='slide'
                transparent={true}
                backgroundColor='#333333'
                visible={Mymodal}
                onRequestClose={Closemodal}

            >
                <View style={{ width: '100%', height: 40, backgroundColor: '#ffffff', flex: 1 }}>
                    <View style={{ width: '100%', height: 40, backgroundColor: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 5 }}>
                        <Text style={{ color: 'white', fontFamily: 'inter', fontWeight: '700', fontSize: 20 }}>Choose Contact</Text>
                        <MaterialCommunityIcons name='magnify-scan' color='white' size={26} style={{ marginHorizontal: 9 }} onPress={() => setIsSearch(prev => !prev)} />
                        <MaterialCommunityIcons name='cancel' color='white' size={26} style={{ marginHorizontal: 9 }} onPress={() => Closemodal()} />
                    </View>
                    {
                        isSearch &&
                        <TextInput style={{ height: 40, borderColor: '#cccccc', borderWidth: 2, paddingHorizontal: 10, marginHorizontal: 10, borderRadius: 10, color: 'black', fontSize: 18 }}
                            placeholder='Search ...'
                            onChangeText={(text) => setSearchquery(text)}
                            value={searchquery} />
                    }
                    <FlatList
                        data={contactss}
                        renderItem={renderItem}
                        keyExtractor={(contactss) => contactss.PhoneNumber}
                    />
                </View>
            </Modal>

        </>
    )
}