
import { StyleSheet} from 'react-native';


import { windowWidth,windowHeight } from '../../config/config';

export const widthRate = windowWidth / 411;
export const heightRate = windowHeight / 860;

export const styles = StyleSheet.create({
    container:{
        width: windowWidth,
        height:windowHeight,
        display: "flex", 
        flexDirection: "row", 
        flexWrap: "wrap",
        backgroundColor:'#FFFFFF'
    },
    message: {
        position:'absolute',
        top: 20,
        fontSize: 16,
        height:20,
        textAlign:'center',
        width:windowWidth,
    },
    LoginContainer:{
        alignItems:'center',
        width:windowWidth,
        marginTop:140 * heightRate
    },
    RegisterContainer:{
        alignItems:'center',
        width:windowWidth,
        marginTop:90 * heightRate
    },
    LogoText:{
        color:'#000000',
        fontSize:16,
        lineHeight:20,
        marginTop: 17 * heightRate,
        fontWeight:'900',
        fontFamily: 'Montserrat-Black'
    },
    InputLabel:{
        color:'rgba(0, 0, 0, 0.4)',
        fontSize:14,
        lineHeight:16,
        marginTop: 0,
        fontFamily: 'Roboto',
        position: 'absolute',
        top: -8,
        backgroundColor: 'white',
        left: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    formInput:{
        width:290,
        height:50 * heightRate,
        borderRadius:5,
        backgroundColor:'white',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgba(0,0,0,0.4)',
        alignItems:'center',
        paddingHorizontal:29 * widthRate ,
        flexDirection:'row',
        marginTop:50 * heightRate
    },
    formtextInput:{
        fontSize:14,
        lineHeight:16,
        color:'black',
        width:230 * widthRate
    },
    formtextInput_password:{
        fontSize:14,
        lineHeight:16,
        color:'black',
        width:230 * widthRate
    },
    forgotTextWrap:{
        width:290 * widthRate,
        marginTop: 17 * heightRate
    },
    forgottext:{
        color:'rgba(0, 0, 0, 0.75)',
        fontSize:14,
        lineHeight:16,
        textAlign: 'right',
        fontFamily: 'Roboto'
    },
    buttonWrap:{
        marginTop: 50 * heightRate
    },
    signInButton:{
        height:50 * heightRate,
        width:290 * widthRate,
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    signText:{
        color:'white',
        fontSize:16,
        fontWeight:'bold',
        fontFamily: 'Roboto'
    },
    signInOptionContainer:{
        alignItems:'center',
        width:windowWidth,
        marginHorizontal:100,
        marginTop:67 * heightRate
    },
    accountYet:{
        color:'black',
        fontFamily:'Roboto',
        lineHeight: 19,
        fontFamily: 'Roboto',
        fontSize: 16
    },
    signInOptionBtn:{
        marginTop: 16 * heightRate,
        alignItems:'center',
        justifyContent:'center',
    },
    signInOptionText:{
        color:'#DD2E44',
        fontWeight: 'bold',
        fontFamily:'Roboto'
    },
    authCheckbox: {
        width: 310 * widthRate,
        height: 40 * heightRate,
        marginTop: 50 * heightRate,
        justifyContent:'flex-start',
        fontSize: 14
    },
    authCheckboxAdult: {
        width: 310 * widthRate,
        height: 60 * heightRate,
        marginTop: 16 * heightRate,
        justifyContent:'flex-start',
        fontSize: 14
    },
    adultMessage: {
        color: 'rgba(0, 0, 0, 0.7)',
        fontSize: 13,
        lineHeight: 15,
        fontFamily: 'Roboto',
        marginLeft: 33
    }
});