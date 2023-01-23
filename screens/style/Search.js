
import { StyleSheet} from 'react-native';
import { ceil } from 'react-native-reanimated';


import { windowWidth,windowHeight } from '../../config/config';

export const widthRate = windowWidth / 411;
export const heightRate = windowHeight / 860;

export const styles = StyleSheet.create({
    keyboardContainer:{
        backgroundColor:'#FFFFFF',
        flex:1
    },
    container:{
        width: windowWidth,
        // height:windowHeight,
        display: "flex", 
        flexDirection: "column", 
        backgroundColor:'#FFFFFF',
        flex:1
    },
    topHeader:{ 
        height:70,
        width:windowWidth,
        paddingHorizontal:22,
        flexDirection:'row',
        alignItems:'center', 
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
    mainContainer:{
        paddingLeft:28,
        paddingRight:28,
        width:windowWidth
    },  
    searchInput:{
        marginLeft:17,
        fontFamily:'Roboto-Black',
        fontSize:14,
        lineHeight:16,
        color:'black',
        width: windowWidth - 150
    },
    resultContainer:{
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
        height:85,
        marginTop:33
    },
    rowContainer:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    enterButtonText:{
        backgroundColor:'#3B88C3',
        color:'white',
        width: 105,
        height:40,
        borderRadius:30,
        textAlign:'center',
        textAlignVertical:'center',
        fontFamily:'Roboto-Bold',
        fontSize:14,
        lineHeight:16
    },
    resultTitle:{
        fontFamily:'Roboto-Regular',
        fontSize:15,
        lineHeight:18,
        color:'#99AAB5',
        marginTop:19
    },
    CityContainer:{
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'center'
    },
    CityInnerContainer:{
        alignItems:'center',
        justifyContent:'space-between',
        width:windowWidth - 56,
        flexDirection:'row',
        height:110,
    },
    CityInput:{
        padding:13,
        paddingLeft: 30,
        fontSize:16 ,
        lineHeight:19,
        color:'black',
        fontFamily: 'Roboto-Medium',
        width:(windowWidth - 160) * widthRate, 
        borderWidth:1,
        borderColor:'#E5E5E5',
        borderRadius:30,
    },
    cityTitle:{
        fontFamily:'Roboto-Bold',
        fontSize:26,
        lineHeight:30,
        color:'#525252'
    },
    cityLocation:{
        fontFamily:'Roboto-Medium',
        fontSize:16,
        lineHeight:19,
        color:'#525252'
    },
    cityResult:{
        fontFamily:'Roboto-Regular',
        fontSize:15,
        lineHeight:18,
        color:'#66757F',
        marginTop:10
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