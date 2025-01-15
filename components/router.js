import React from 'react';
import { Profile } from '../layout/profile/Profile';
import { Account } from '../layout/account/Account';
import { Market } from '../layout/market/Market';
import { Transact } from '../layout/transact/transact';
import { Home } from '../layout/home/Home';
import { Preview } from '../pages/preview/Preview';
import { Login } from '../pages/login/Login';
import { Signup } from '../pages/signup/Signup';
import { Fund } from '../layout/fund/fund';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Airtime } from '../pages/airtime/airtime';
import { Autofund } from '../pages/autofund/auto';
import { Manualfund } from '../pages/manualfund/manualfund';
import { Data } from '../pages/data/data';
import { Setpin } from '../pages/setpin/setpin';
import {Betting} from '../pages/betting/betting';
import {Cable} from '../pages/Cable/cable';
import {Result} from '../pages/result/result';
import {Electric} from '../pages/Electricity/Electric';
import { Setpass } from '../pages/setpass/setpass';
import { DisplayOne } from './displayone/displayone';
import { DisplayTwo } from './displaytwo/displaytwo';
import { DisplayThree } from './displaythree/displaythree';
import { Createpin } from '../pages/createpin/createpin'
import { Transfer } from '../pages/transfer/transfer';
import { Bulksms } from '../pages/bulksms/bulksms';
const Stack = createStackNavigator();
export const Route = () => {
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Preview" options={{ headerTransparent: true, headerTitle: '', headerLeft: () => null, }} component={Preview} />
                    <Stack.Screen name="Profile" options={{ headerTransparent: true, headerTitle: '', }} component={Profile} />
                    <Stack.Screen name="Transact" options={{ headerTransparent: true, headerTitle: 'Transactions', }} component={Transact} />
                    <Stack.Screen name="Login" options={{ headerTransparent: true, headerTitle: '', }} component={Login} />
                    <Stack.Screen name="Airtime" options={{ headerTransparent: true, headerTitle: 'Back', }} component={Airtime} />
                    <Stack.Screen name="Transfer" options={{ headerTransparent: true, headerTitle: 'Back', }} component={Transfer} />
                    <Stack.Screen name="Betting" options={{ headerTransparent: true, headerTitle: 'Back', }} component={Betting} />
                    <Stack.Screen name="Result" options={{ headerTransparent: true, headerTitle: 'Back', }} component={Result} />
                    <Stack.Screen name="Cable" options={{ headerTransparent: true, headerTitle: 'Back', }} component={Cable} />
                    <Stack.Screen name="Electric" options={{ headerTransparent: true, headerTitle: 'Back', }} component={Electric} />
                    <Stack.Screen name="Bulksms" options={{ headerTransparent: true, headerTitle: 'Bulk SMS', }} component={Bulksms} />
                    <Stack.Screen name="Data" options={{ headerTransparent: true, headerTitle: 'Back', }} component={Data} />
                    <Stack.Screen name="Fund" options={{ headerTransparent: true, headerTitle: '', }} component={Fund} />
                    <Stack.Screen name="Autofund" options={{ headerTransparent: false, headerTitle: 'Back', }} component={Autofund} />
                    <Stack.Screen name="Manualfund" options={{ headerTransparent: true, headerTitle: 'Back', }} component={Manualfund} />
                    <Stack.Screen name="Signup" options={{ headerTransparent: true, headerTitle: '', }} component={Signup} />
                    <Stack.Screen name="Account" options={{ headerTransparent: true, headerTitle: '', }} component={Account} />
                    <Stack.Screen name="Setpin" options={{ headerTransparent: true, headerTitle: '', }} component={Setpin} />
                    <Stack.Screen name="Setpass" options={{ headerTransparent: true, headerTitle: '', }} component={Setpass} />
                    <Stack.Screen name="Displayone" options={{ headerTransparent: true, headerTitle: '', headerLeft: () => null,}} component={DisplayOne} />
                    <Stack.Screen name="Market" options={{ headerTransparent: true, headerTitle: '', headerLeft: () => null, }} component={Market} />
                    <Stack.Screen name="Home" options={{ headerTransparent: true, headerTitle: '', headerLeft: () => null, }} component={Home} />
                    <Stack.Screen name="Createpin" options={{ headerTransparent: true, headerTitle: '', headerLeft: () => null, }} component={Createpin} />
                    <Stack.Screen name="Displaytwo" options={{ headerTransparent: true, headerTitle: '', headerLeft: () => null, }} component={DisplayTwo} />
                    <Stack.Screen name="Displaythree" options={{ headerTransparent: true, headerTitle: '', headerLeft: () => null, }} component={DisplayThree} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    idan: {
        color: 'white'
    }
})