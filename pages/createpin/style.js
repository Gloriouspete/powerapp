import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get('window');
export const styles = StyleSheet.create({
   
    scroll: {
        flex: 1,
    },
    pinback: {
        backgroundColor: '#0000ff'
    },
    textmod: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
        margin: 30,
        fontFamily:'inter',
        marginBottom:30,
    },
    pinmod: {
        width: '100%',
        height: 'auto',
        backgroundColor: '#ffffff',
        position: 'absolute',
        bottom: 0,
        borderColor:'black',
        borderWidth:2,
        borderTopRightRadius:15,
        borderTopLeftRadius:15,

    },
    boxx: {
        marginTop: 100,
        flex: 1,
        alignItems: 'center',
    },
    pinmodal: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    inputmod: {
        width: '15%',
        height: '90%',
        borderColor: 'black',
        borderBottomWidth: 2,
        color:'black',
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '500',
        marginBottom:15,
    },
    small: {
        height: 25,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    pressmall: {
        borderRadius: 20,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 20,
        alignItems: 'center',
    },
    numberbox: {
        width: width,
        height: 280,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#00000020',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop:20,
        paddingVertical:20,
     //   position:'absolute',
      //  bottom:0,
    },
    numpress: {
        width: width * 0.3,
        height: 50,
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius:5,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    numpres: {
        width: width * 0.3,
        height: 50,
        marginBottom: 10,
        borderRadius:15,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    boxcenter:{
        width:'70%',
        height:70,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        borderColor:'grey',
        borderWidth:0.5,
        borderRadius:8,
        marginBottom:35,
    },
    pleasewait:{
        fontFamily:'inter',
        fontSize:17,
        fontWeight:'700'
    },
    vowbox:{
        width:'90%',
        height:200,
        backgroundColor:'white',
        flexDirection:"column",
        alignItems:'center',
        borderColor:'#753ff6',
        borderWidth:1.5,
        borderRadius:20,
    },
    idanm:{
        width:'70%',
        height:40,
        backgroundColor:'black',
        alignItems:"center",
        justifyContent:'center',
        color:"white",
        borderRadius:20,
        marginTop:10,
        marginBottom:20,
    },
    idan:{
        marginVertical:30,
        fontFamily:'inter',
        fontWeight:'800',
        fontSize:20
    }

})