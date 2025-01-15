import React, { useState, useEffect } from 'react';
import { Nav } from '../../components/Nav';
import { View, Text, Pressable, Image, ScrollView, FlatList,ActivityIndicator } from 'react-native';
import { styles } from './style';
import { Entypo, AntDesign, Ionicons, FontAwesome, Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import TextTicker from 'react-native-text-ticker';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ClipBoard from 'expo-clipboard'
const deal = require('../../assets/images/avatar.png');
const cabledeal = require('../../assets/images/cable.jpg');
const airdeal = require('../../assets/images/airtime2cash.jpg');
const utideal = require('../../assets/images/utility.jpg');
const datadeal = require('../../assets/images/data_buy.jpg');
const betdeal = require('../../assets/images/4617435.png');
const bulkimage = require('../../assets/images/bulk_sms.png');
const referimage = require('../../assets/images/refer.png');
const resultdeal = require('../../assets/images/resultchecker.png');
const wema = require('../../assets/images/wema.png')
const monie = require('../../assets/images/monie.png')
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Log } from './log';
import FloatingButton from '../../components/floating/float';


export const Home = ({ route }) => {
    const loadii = () => (
        <ActivityIndicator color='white' size={26} />
    )
    const navigation = useNavigation();
    const [refbal, setRefbal] = useState(bal);
    const [balance, setBalance] = useState(loadii)
    const [firstname, setFirstname] = useState('user');
    const [bankname, setBankname] = useState('');
    const [accountname, setAccountname] = useState('');
    const [accountnumber, setAccountnumber] = useState('');
    const [packagename, setPackagename] = useState('');
    const [secbank, setSecbank] = useState('');
    const [secnumber, setSecnumber] = useState('');
    const [mytoken, setMytoken] = useState('');
    const [tranlist, setTranlist] = useState([]);
    const [eye, setEye] = useState('eye-off')
    const [bal, setBal] = useState('1.00')
    useEffect(() => {
        if (route.params?.datar) {
            setMytoken(route.params.datar);
            AsyncStorage.setItem('token', route.params.datar)
            console.log('check this out', route.params.datar)
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const idandata = route.params.datar === '' ? mytoken : route.params.datar;
                const mydatar = await Log(idandata);
                console.log(mydatar);
                if (mydatar.success) {
                    const { username, accountbalance, email, bankname, firstname,bankaccountnumber,pin
                    } = mydatar.data;
                    await AsyncStorage.multiSet([
                        ['username', username],
                        ['balance',accountbalance.toString()],
                        ['name', firstname],
                        ['email', email],
                        ['pin',pin || '1234'],
                        ['accountname', "powerpay-"+username.slice(0,3)],
                        ['bankname', bankname],
                        ['accountnumber',bankaccountnumber],
                    ]);

                    console.log('User data stored successfully',mydatar);
                    const [
                        retrievedName,
                        retrievedAccount,
                        retrievedAccountnumber,
                        retrievedBankname,
                        retrievedBalance,
                        retrievedToken,
                     
                    ] = await AsyncStorage.multiGet([
                        'username',
                        'accountname',
                        'accountnumber',
                        'bankname',
                        'balance',
                        'token',
                    ]);

                    setFirstname(retrievedName[1]);
                    setMytoken(retrievedToken[1]);
                    setBal(retrievedBalance[1]);
                    setBalance(retrievedBalance[1]);
                    setBankname(retrievedBankname[1]);
                    setAccountname(retrievedAccount[1]);
                    setAccountnumber(retrievedAccountnumber[1]);
                    console.log('this is the balance', balance)
                } else {
                    console.log('Error fetching details');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                alert('No internet connectivity, please turn on and restart!')
            }
        };

        const unsubscribe = navigation.addListener('focus', fetchData);
        return unsubscribe;
    }, []);

    const handleClick = () => {
        alert('Coming soon, Stay tuned for update');
    }
    const renderItem = ({ item }) => (
        <View style={styles.recent}>
            <Image source={deal} style={styles.imge} />
            <View style={styles.info}>
                <View style={styles.infotext}>
                    <Text style={styles.quitext}>{`${item.network} - ${item.size} -`}</Text>
                </View>
                <View style={styles.infotex}>
                    <Text style={styles.quickys}>&#8358; {item.price}</Text>
                </View>
                <View style={styles.infotexts}>
                    <Text style={styles.smatext}>{item.date}</Text>
                    <Text style={styles.quicky}> {item.status}</Text>
                </View>


            </View>
        </View>
    )
    const Settings = () => {
        setEye(prevcall => prevcall === 'eye-off' ? 'eye' : 'eye-off')
        setBalance(prevcall => prevcall === bal ? '****' : bal)
    }
    const copyy = async (laal) => {
        await ClipBoard.setStringAsync(laal);
        alert('Account Number copied')
    }
    return (
        <>
            <ScrollView style={styles.container}>
                <SafeAreaView>
                    <View style={styles.idancover}>
                        <View style={styles.idanh}>
                            <View style={styles.firstview}>
                                <View style={styles.boxview}>
                                    <TouchableOpacity style={styles.imgdet} onPress={() => navigation.navigate('Profile')} >
                                        <Image source={deal} style={styles.img} onPress={() => navigation.navigate('Profile')} />
                                    </TouchableOpacity>
                                    <View style={styles.upview}>
                                        <Text style={styles.smalltext}>Welcome</Text>
                                        <Text style={styles.stext}>{firstname}</Text>
                                    </View>
                                </View>

                                <View style={styles.notifycont}>
                                    <Pressable style={styles.notify} onPress={() => navigation.navigate('Transact', { datar: mytoken })} >
                                        <Ionicons name='notifications-outline' size={24} color='white' style={styles.nony} />
                                    </Pressable>
                                </View>
                            </View>
                            <View style={styles.viewonee}>
                                <View style={styles.dead}>
                                    <Text style={styles.balanceone}>&#8358; {balance}</Text>
                                </View>
                                <View style={styles.fund}>
                                    <Text style={styles.balanceone} onPress={() => Settings()} ><Feather name={eye} size={20} color='white' /> </Text>

                                </View>

                            </View>
                            <View style={styles.twotext}>
                                
                            </View>
                            <ScrollView style={styles.moneycont}
                                horizontal={true}
                            >
                                <View style={styles.moneybox}>

                                    <View style={styles.viewuna}>
                                        <Text style={styles.stext}>{accountnumber}</Text>
                                        <Pressable onPress={(value) => copyy(accountnumber)} style={{
                                            marginLeft: 15,
                                        }} >
                                            <Feather name='copy' size={21} color='white' />
                                        </Pressable>

                                    </View>
                                    <View style={styles.viewuna}>
                                        <Text style={styles.setext}>{bankname}</Text>
                                        <Text style={styles.setext}>&#8358;50 Naira charge</Text>

                                    </View>
                                    <View style={styles.viewuna}>
                                        <Text style={styles.sertext}>{accountname}</Text>
                                        <Image source={bankname.startsWith("wema") ? wema : monie} style={styles.imgd} />

                                    </View>

                                </View>
                                <View style={styles.moneybox}>

                                    <View style={styles.viewuna}>
                                        <Text style={styles.stext}>{secnumber}</Text>
                                        <Pressable onPress={(value) => copyy(secnumber)} style={{
                                            marginLeft: 15,
                                        }} >
                                            <Feather name='copy' size={21} color='white' />
                                        </Pressable>

                                    </View>
                                    <View style={styles.viewuna}>
                                        <Text style={styles.setext}>{secbank}</Text>
                                        <Text style={styles.setext}>&#8358;50 Naira charge</Text>

                                    </View>
                                    <View style={styles.viewuna}>
                                        <Text style={styles.sertext}>{accountname}</Text>
                                        <Image source={monie} style={styles.imgd} />

                                    </View>

                                </View>

                            </ScrollView>
                        </View>
                    </View>
                    <View style={styles.trancover}>
                        <TextTicker
                            style={{ fontSize: 24, color: 'green', padding: 5, fontWeight: '600' }}
                            duration={30000}
                            loop
                            bounce
                            repeatSpacer={50}
                        >
                            Welcome to Powerpaybill where you experience seamless transactions.
                        </TextTicker>
                    </View>

                    <View style={styles.action}>
                        <Pressable style={styles.actionp} onPress={() => navigation.navigate('Airtime', { datar: mytoken })} >
                            <Feather name='phone-call' size={22} color='green' />
                            <Text style={styles.liltext}>Airtime </Text>
                        </Pressable>
                        <Pressable style={styles.actionp} onPress={() => navigation.navigate('Data', { datar: mytoken })}>
                            <Ionicons name='wifi' size={22} color='red' />
                            <Text style={styles.liltext}>Data</Text>
                        </Pressable>
                        
                        <Pressable style={styles.actionp} onPress={() => navigation.navigate('Electric', { datar: mytoken })}>
                            <Entypo name='light-bulb' size={22} color='blue' />
                            <Text style={styles.liltext}>Electricity </Text>
                        </Pressable>
                        <Pressable style={styles.actionp} onPress={() => navigation.navigate('Cable', { datar: mytoken })}>
                            <FontAwesome name='tv' size={22} color='black' />
                            <Text style={styles.liltext}>Cable </Text>
                        </Pressable>
                        <Pressable style={styles.actionp} onPress={() => alert("Coming soon..")}>
                            <MaterialCommunityIcons name='book-education' size={22} color='darkblue' />
                            <Text style={styles.liltext}>Result  </Text>
                        </Pressable>
                        <Pressable style={styles.actionp} onPress={() => navigation.navigate('Transfer', { datar: mytoken }) } >
                            <FontAwesome name='paper-plane-o' size={22} color='black' />
                            <Text style={styles.liltext}>Transfer</Text>
                        </Pressable>
                        <Pressable style={styles.actionp} onPress={() => alert("Coming soon..")} >
                            <FontAwesome5 name='sms' size={22} color='#005f00' />
                            <Text style={styles.liltext}>Bulk SMS </Text>
                        </Pressable>
                        <Pressable style={styles.actionp} onPress={() => handleClick()} >
                            <FontAwesome name='soccer-ball-o' size={22} color='green' />
                            <Text style={styles.liltext}>Betting</Text>
                        </Pressable>
                    </View>


                </SafeAreaView>
            </ScrollView>
              <FloatingButton /> 
            <Nav font1color='#11153b' />
            <StatusBar barStyle="auto" />
        </>
    )
}