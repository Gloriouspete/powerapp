import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        backgroundColor: 'white',
    },
    boxxy: {
        width: '100%',
        backgroundColor: 'white',
        height: 70,
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    texty: {
        fontSize: 30,
        fontWeight: '700',
        marginLeft: 20,
        marginTop: 20,
        fontFamily:'inter-bold',
    },
    box: {
        width: '25%',
        height: "100%",
        backgroundColor: 'white',
        borderColor: 'black',

        borderRadius: 10,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    liltext: {
        fontSize: 14,
        fontFamily:'inter-Medium',
        fontWeight:'800',
    },
    imgd: {
        width: 45,
        height: 45,
    },
})