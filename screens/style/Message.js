
import { StyleSheet} from 'react-native';
import { round } from 'react-native-reanimated';


import { windowWidth,windowHeight } from '../../config/config';

export const widthRate = windowWidth / 411;
export const heightRate = windowHeight / 860;

export const styles = StyleSheet.create({
    keyboardContainer:{
        backgroundColor:'#FFFFFF',
        flex:1
    },
    container: {
        width: windowWidth,
        display: "flex", 
        flexDirection: "row", 
        flexWrap: "wrap",
        backgroundColor:'#FFFFFF'
    },
    topHeader:{
        height:70,
        width:windowWidth,
        paddingHorizontal:22,
        flexDirection:'column',
        justifyContent:'center',
        backgroundColor:'#FFFFFF',
    },
    PageTitle:{
        fontFamily: 'Roboto-Black',
        fontSize:22,
        lineHeight:26,
        color:'black'
    },
    PageContainer:{
        alignItems:'center',
        width:windowWidth,
    },
    searchInputWrap:{
        width: windowWidth - 40,
        borderRadius:6,
        backgroundColor:'#F6F6F6',
        alignItems:'center',
        paddingHorizontal:21 * widthRate ,
        flexDirection:'row',
    },
    noMessageAvatarView:{
        marginTop: 150 * heightRate,
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
        zIndex:2
    },
    noMessageDetails: {
        marginTop: 15 * heightRate,
        fontSize:24,
        lineHeight:28,
        fontFamily:'Roboto-Black',
        color: 'black',
        textAlign: 'center'
    },
    messageTextInput:{
        padding: 11,
        fontSize:16,
        fontFamily: 'Roboto-Regular',
        lineHeight:19,
        color:'black',
    },
    MessageListView:{
        width:windowWidth,
        padding:22
    },
    newChatView:{
        flexDirection:'column'
    },
    oldChatView:{
        flexDirection:'column'
    },
    chatItem:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:10,
        marginBottom:10
    },
    chatLeft:{
        flexDirection:'row',
        alignItems:'center'
    },
    userAvatar:{
         width:55,
         height:55,
         borderWidth:2,
         borderColor:'#EEEEEE',
         borderRadius:30
    },
    textContainer:{
        marginLeft: 15
    },
    userNameUnread:{
        fontFamily:'Roboto-Black',
        fontSize:16,
        lineHeight:19,
        color:'#000000'
    },
    userNameRead:{
        fontFamily:'Roboto-Regular',
        fontSize:16,
        lineHeight:19,
        color:'#000000'
    },
    lastMessageUnread :{
        fontFamily:'Roboto-Black',
        fontSize:16,
        lineHeight:19,
        color:'#000000',
        marginTop:6,
    },
    lastMessageRead :{
        fontFamily:'Roboto-Regular',
        fontSize:16,
        lineHeight:19,
        color:'#000000',
        marginTop:6
    },
    newButton:{
        borderRadius:20,
        color: '#FFFFFF',
        fontFamily: 'Roboto-Black',
        fontSize: 14,
        lineHeight: 16,
        backgroundColor: '#DD2E44',
        width:90,
        height:35,
        textAlign:'center',
        textAlignVertical:'center'
    },
    divider:{
        borderBottomColor: '#E5E5E5', 
        borderBottomWidth: 1,
        marginTop:10,
        marginBottom:10
    },
    footer:{
        width:windowWidth,
        alignItems:'center',
        justifyContent:'space-evenly',
        flexDirection:'row',
        backgroundColor:'white',
        height:84, 
        shadowColor: 'black',
        shadowOffset: {width: 0, height: -4},
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 5
    },
    navBarProfileAvatar:{
        width:24,
        height:24,
        borderWidth:1 ,
        borderRadius:100,
        borderColor:'#EEEEEE',
    },
    navBarText:{
        fontFamily:'Montserrat-Bold',
        fontSize:10,
        lineHeight:12,
        marginTop:5
    },
});