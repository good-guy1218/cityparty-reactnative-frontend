
import { StyleSheet} from 'react-native';


import { windowWidth,windowHeight } from '../../config/config';

export const widthRate = windowWidth / 411;
export const heightRate = windowHeight / 860;

export const styles = StyleSheet.create({
    keyboardContainer:{
        width: windowWidth,
        height:windowHeight,
        display: "flex", 
        flex:1,
        flexDirection: "column", 
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#FFFFFF'
    },
    container:{
        width: windowWidth,
        height:windowHeight,
       // display: "flex", 
        flexDirection: "column", 
        backgroundColor:'#FFFFFF'
    },
    topHeader:{
        height:100,
        paddingTop:25,
        width:windowWidth,
        paddingHorizontal:16,
        flexDirection:'row',
        backgroundColor:'#FFFFFF',
        justifyContent:'flex-start',
    },
    divider:{
        marginTop:5,
        borderTopWidth:1,
        borderColor:'#EEEEEE',
        width:windowWidth - 20
    },
    headerUserInfo:{
        marginLeft:42,
        flexDirection:'row',
        alignItems:'center'
    },
    userinfoContainer:{
        marginLeft:19
    },
    userName:{
        fontFamily:'Roboto-Bold',
        fontSize:18,
        lineHeight:21,
        color:'#000000'
    },
    userAvatar:{
        width:75,
        height:75,
        borderRadius:75
    },
    statusOnline:{
        marginTop:6,
        fontFamily:'Roboto-Bold',
        fontSize:13,
        lineHeight:15,
        color:'#3B88C3'
    },
    statusOffline:{
        marginTop:6,
        fontFamily:'Roboto-Bold',
        fontSize:13,
        lineHeight:15,
        color:'#66757F'
    },
    defaultPageContainer: {
        padding: 14,
        width: windowWidth,
        height:windowHeight - 240,
        display: "flex", 
        flexDirection: "column", 
        backgroundColor:'#FFFFFF'
    },
    PageContainer:{
        padding: 14
    },
    chatContainer:{
        width:windowWidth - 28,
        flexDirection:'column-reverse',
        justifyContent:'flex-start'
    },
    dayContainer:{
        display:'flex',
        flexDirection:'row',
        height:45,
        justifyContent:'center',
        alignItems:'center'
    },
    dayText:{
        fontFamily: 'Roboto-Light',
        fontSize:15,
        lineHeight:18,
        color:'#99AAB5',
        textAlign:'center',
        marginTop: 10,
        marginBottom:10
    },
    friendMessage:{
        marginTop: 5,
        marginBottom: 5,
        flexDirection:'row',
        justifyContent:'flex-start',
    },
    fMessageWrap:{
        borderWidth:1,
        borderColor:'#EEEEEE',
        borderRadius:20,
        maxWidth: windowWidth - 130,
        flexDirection:'row',
        alignItems:'center',
        padding:15,
        paddingBottom:22
    },
    chatPlaceholder:{
        fontFamily:'Roboto-Regular',
        fontSize:16,
        lineHeight:19,
        textAlign:'center',
        color:'rgba(0, 0, 0, 0.55)'
    },
    message:{
        fontFamily:'Roboto-Regular',
        fontSize:16,
        lineHeight:19,
        color:'#1D1D1D'
    },
    messageTime:{
        marginLeft: 20,
        fontFamily:'Roboto-Bold',
        fontSize:12,
        lineHeight:14,
        color:'#99AAB5'
    },
    myMessage:{
        marginTop: 5,
        marginBottom: 5,
        flexDirection:'row',
        justifyContent:'flex-end',
    },
    mMessageWrap:{
        borderWidth:1,
        borderColor:'#F5F5F5',
        backgroundColor:'#F5F5F5',
        borderRadius:20,
        maxWidth: windowWidth - 130,
        padding:15,
        flexDirection:'row',
        alignItems:'center',
        paddingBottom:22
    },
    messageInputContainer:{
        flexDirection:'column',
        justifyContent:'space-between',
        width:windowWidth,
        paddingLeft:14,
        paddingRight:14    
    },
    messageInputInfo:{
        flexDirection:'row' ,
        alignItems:'center'
    },
    messageInputWrap:{
        marginTop: 20,
        marginBottom:30,
        flexDirection:'row' ,
        alignItems:'center',
        justifyContent:'space-between'
    },
    acceptContainerWrap:{
        marginTop: 20,
        flexDirection:'row' ,
        alignItems:'center',
        justifyContent:'space-between'
    },
    messageInput:{
        padding:15,
        paddingLeft:30,
        fontSize:16 ,
        lineHeight:19,
        color:'black',
        backgroundColor:'#F5F5F5',
        fontFamily: 'Roboto-Regular',
        width:windowWidth - 70,
        borderRadius:30,
    },
    friendAvatar:{
        width:40,
        height:40,
        borderRadius:40
    },
    isTyping:{
        marginLeft:13,
        fontFamily:'Roboto-Bold',
        fontSize:20,
        lineHeight:23
    },
    acceptContainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        borderTopWidth:1,
        borderColor:'#F5F5F5',
    },
    verticalDivider:{
        borderRightWidth:1,
        borderColor:'#F5F5F5',
        height:50
    },  
    acceptText:{
        fontFamily:'Roboto-Bold',
        fontSize:18,
        color:'#000000',
        lineHeight:21,
        marginTop:40,
        marginBottom:40
    },
    declineText:{
        fontFamily:'Roboto-Bold',
        fontSize:18,
        color:'#DD2E44',
        lineHeight:21,
        marginTop:30,
        marginBottom:30
    },
});