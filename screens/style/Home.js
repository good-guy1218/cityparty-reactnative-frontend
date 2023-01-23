
import { StyleSheet} from 'react-native';


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
        // height:windowHeight,
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
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 1, 
        },
        shadowOpacity: 1,
        shadowRadius: 0,
        elevation: 2,  
    },
    PageTitle:{
        fontFamily: 'Montserrat-Black',
        fontSize:18,
        lineHeight:22,
        color:'#66757F'
    },
    PageContainer:{
        alignItems:'center',
        width:windowWidth,
    },
    searchInputWrap:{
        width:235 * widthRate,
        borderRadius:30,
        backgroundColor:'#F6F6F6',
        alignItems:'center',
        paddingHorizontal:29 * widthRate ,
        flexDirection:'row',
        marginTop:78 * heightRate
    },
    homeAvatarView:{
        marginTop: 130 * heightRate,
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
        zIndex:2
    },
    homeDetailsFirst: {
        marginTop: 30 * heightRate,
        fontSize:20,
        lineHeight:23,
        fontFamily:'Roboto-Regular',
        color: 'black',
        textAlign: 'center'
    },
    homeDetails: {
        fontSize:20,
        lineHeight:23,
        fontFamily:'Roboto-Regular',
        color: 'black',
        textAlign: 'center',
    },
    cityTextInput:{
        padding: 18,
        fontSize:20,
        fontFamily: 'Roboto-Regular',
        lineHeight:23,
        color:'#525252',
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
        borderWidth:1,
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