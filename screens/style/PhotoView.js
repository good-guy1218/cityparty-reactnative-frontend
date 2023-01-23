
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
        height:windowHeight,
        display: "flex", 
        flexDirection: "row", 
        flexWrap: "wrap",
        backgroundColor:'#FFFFFF'
    },
    topHeader:{
        position:'absolute',
        top:0,
        height:70,
        width:windowWidth,
        paddingHorizontal:22,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        zIndex:2
    },
    photoview:{
        width:windowWidth,
        height:windowHeight,
    },
    deleteModal:{
        position:'absolute',
        bottom:0,
        height:172,
        flexDirection:'row',
        backgroundColor:'white',
        alignItems:'center',
        width:windowWidth,
        zIndex:2,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingHorizontal:40
    },
    delteText:{
        fontFamily:'Roboto-Medium',
        fontSize:20,
        lineHeight:23,
        color:'black'
    },

    confrimModal:{
        position:'absolute',
        bottom:0,
        height:240,
        flexDirection:'column',
        backgroundColor:'white',
        justifyContent:'space-evenly',
        width:windowWidth,
        zIndex:2,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingHorizontal:40
    },
    confirmText:{
        fontFamily:'Roboto-Medium',
        fontSize:18,
        lineHeight:21,
        color:'black'
    },
});