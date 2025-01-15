import { StyleSheet } from "react-native";
export const styler = StyleSheet.create({

    previewbox: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'

    },
    buttonIcon: {
        paddingRight: 8,
    },
    dealer: {
        width: '70%',
        height: 200,
        marginRight:30,
    },
    dealercover: {
        width: '100%',
        height: 400,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonstyle: {
        width: '60%',
        backgroundColor: 'black',
        borderRadius: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
        right: 0,
    },
    kilode: {
        color: 'white',
        fontSize: 18,
        fontWeight: '800',

    },
    boxcont: {
        width: '100%',
        borderRadius: 25,
        height: 70,
        position: 'absolute',
        alignItems: 'center',
        bottom: 19,
    },
    container: {
        width: '40%',
        backgroundColor: 'white',
        borderRadius: 25,
        height: 30,
        justifyContent: 'space-between',
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',

    },
    ftext: {
        color: 'yellow',
        fontSize: 48,
        fontWeight: '900',
        fontFamily: 'inter-Medium',
    },
});
