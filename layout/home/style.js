import { StyleSheet, Dimensions } from "react-native";
import React, { useState } from 'react';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginBottom: 30,
    },
    align: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    idancover: {
        flex: 1,
        backgroundColor: 'transparent',
        height: '6%',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    idanh: {
        backgroundColor: '#11053b',
        marginTop: 0,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    
    },
    img: {
        width: 45,
        height: 45,
        backgroundColor: 'red',
        borderTopLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    imgd: {
        width: 45,
        height: 45,
    },
    imge: {
        width: 45,
        height: 45,
        backgroundColor: 'red',
        marginLeft: '5%',
        borderTopLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    boxview: {
        width: 95,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    upview: {
        height: 45,
        flexDirection: 'column',
        justifyContent: 'center',
    },

    imgdet: {
        width: 45,
        height: 45,
        marginLeft: '15%',
        borderTopLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    smalltext: {
        fontSize: 14,
        color: 'white',
        fontWeight: '400',
        marginLeft: 10,
        margin: 2,
    },
    firstview: {
        width: '100%',
        backgroundColor: 'transparent',
        height: 50,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    hellotext: {
        fontSize: 20,
        color: 'white',
        fontWeight: '800',
        marginLeft: 10,
        fontFamily: 'inter-bold',
    },
    stext: {
        fontSize: 17,
        fontWeight: '700',
        marginLeft: 10,
        fontFamily: 'inter-SemiBold',
        color: "white",
    },

    moneycont: {
        width:'auto',
        height: 150,
        flexDirection: 'row',
        marginTop: 25,
    },
    moneybox: {
        width: Dimensions.get('window').width * 0.95,
        height: 130,
        flexDirection: 'column',
        backgroundColor: '#000000',
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        justifyContent: "space-around",
        marginRight: 30,
        marginLeft:10,
        borderTopRightRadius: 15,
        alignItems: 'center',
        padding: 7,
    },
    quicktext: {
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 10,
        marginTop: 10,
        color: '#333333',

    },
    quickytext: {
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 10,
        color: 'white',

    },
    action: {
        width: '100%',
        backgroundColor: 'transparent',
        height: 200,
        flexWrap: 'wrap',
        minHeight: 100,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    actionp: {
        width: '22%',
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: '#8f00ff09',
        backgroundColor: 'white',
        height: 80,
        flexDirection: 'column',
        justifyContent: 'space-around',
        borderRadius: 10,
        shadowColor: 'black',

    },
    liltext: {
        fontWeight: '600',
        fontFamily: 'inter-SemiBold',
       
    },
    viewone: {
        width: '100%',
        height: '50%',
        flexDirection: 'column',
        alignItems: 'center',

        justifyContent: 'space-between',

    },
    viewuna: {
        width: '100%',
        height: '30%',
        flexDirection: 'row',
        alignItems: 'center',

        justifyContent: 'space-between',

    },
    firtext: {
        width: '100%',
        height: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    sectext: {
        width: '100%',
        height: '50%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    twotext: {
        width: '90%',
        height: 60,
        marginTop: 0,
        borderRadius: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'column',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
    },
    thicktex: {
        fontWeight: '600',
        fontSize: 18,
        color: 'white',
    },
    thicktext: {
        fontWeight: '500',
        fontSize: 15,
        color: 'white',
        fontFamily:'inter'
    },
    viewonee: {
        width: '100%',
        height: 50,
        marginTop: 30,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        paddingLeft: 20,
        paddingRight: 15,

    },
    setext: {
        color: 'white',
        marginLeft: 10,
    },
    sertext: {
        color: 'white',
        fontWeight: '700',
        marginLeft: 10,
        fontFamily: 'inter-SemiBold',
    },
    dead: {
        width: '70%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: 15,

    },
    fund: {
        width: 40,
        height: 40,
        backgroundColor: 'transparent',
        borderColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        
    },
    fundf: {
        width: 90,
        height: 35,
        borderColor: 'white',
        borderRadius: 20,
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5f00ff',
    },
    fundy: {
        flexDirection: 'row',
        width: '60%',
        alignItems: 'center',
        justifyContent: 'space-around',

    },
    balance: {
        color: 'white',
        fontSize: 15,
        fontWeight: '900',
    },
    balanceone: {
        color: 'white',
        fontSize: 30,
        fontWeight: '800',
    },
    nony: {
        marginRight: '5%',
    },
    trancover: {
        width: '100%',
        backgroundColor: '#f1f1f1',
        height: 'auto'
    },
    recent: {
        width: '100%',
        backgroundColor: 'white',
        height: 70,
        marginTop: 10,

        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.2,
    },
    info: {
        width: '70%',
        backgroundColor: 'white',
        height: 60,
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginLeft: 15,
    },
    infotext: {
        width: '100%',
        backgroundColor: 'white',
        height: 20,
        flexDirection: 'row',
        marginLeft: 15,
    },
    infotex: {
        width: '100%',
        backgroundColor: 'white',
        height: 20,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginLeft: 15,
    },
    infotexts: {
        width: '100%',
        backgroundColor: 'white',
        height: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 15,
    },
    quicky: {
        color: 'black',
        fontSize: 15,
    },
    quickys: {
        color: 'green',
        fontSize: 15,
        fontWeight: '500',
    },
    quickyy: {
        color: 'black',
        marginRight: 15,
        fontWeight: '600',
        fontFamily: 'inter-Medium',
    },
    quitext: {
        fontSize: 15,
        fontWeight: '700',
    },
    smatext: {
        fontSize: 10,
        fontWeight: '300',
    },


})