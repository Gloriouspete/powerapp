import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },

    text: {
        marginTop: 0,
        marginLeft: 20,
        fontSize: 15,
        fontWeight: '800',
        color:'white',
    },
  

    table: {
        width: 150,
        height: 50,
        backgroundColor: '#11053b',
        borderWidth:1,
        borderColor:'darkblue',
        marginTop:10,
        borderRadius:10,
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'center',

    },
    tabletwo: {
        width: 150,
        height: 50,
        backgroundColor: '#ff7f00',
        borderWidth:1,
        borderColor:'darkblue',
        marginTop:10,
        borderRadius:10,
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'center',

    },
    tablecover: {
        width: '100%',
        marginTop: '100%',
        height: '100%',
        flex:1,
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: 'center',

    },
    modalcontain: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
      
    },
    modalcontent: {
        alignItems:'center',
        width:'90%',
        height:'auto',
        justifyContent:"space-around",
    },
    modaltext: {
        fontSize: 20,
        fontWeight: '700',
        color: 'darkblue',
        marginTop: 80,
        marginBottom: 40,
    },
    imgsrc:{
        width: 100,
        height: 100,
        backgroundColor: 'white',
        marginLeft: 10,
    }
})