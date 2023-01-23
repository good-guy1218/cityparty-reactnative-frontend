
import { StyleSheet} from 'react-native';


import { windowWidth,windowHeight } from '../../config/config';

export const widthRate = windowWidth / 411;
export const heightRate = windowHeight / 860;

export const styles = StyleSheet.create({
    container:{
        width: windowWidth,
        height:windowHeight,
        display: "flex", 
        flexDirection: "column", 
        backgroundColor:'#FFFFFF',
        justifyContent:'space-between',
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
    filterTitle:{
        marginLeft:16,
        fontFamily:'Roboto-Black',
        fontSize:22,
        lineHeight:26 
    },
    GenerContainer:{
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
        height:85,
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
        fontSize:18,
        lineHeight:21,
        color:'#99AAB5'
    },
    CityList:{
        width:windowWidth,
        paddingLeft: 75

    },
    cityText:{
        fontFamily:'Roboto-Medium',
        fontSize:16,
        lineHeight:19,
        color:'rgba(0, 0, 0, 0.8)',
        marginBottom:5
    },
    AgeContainer:{
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'center'
    },
    AgeInnerContainer:{
        alignItems:'center',
        justifyContent:'space-between',
        width:windowWidth - 56,
        flexDirection:'row',
        height:110,
    },
    AgeTitle:{
        fontFamily:'Roboto-Bold',
        fontSize:18,
        lineHeight:21,
        color:'#99AAB5'
    },
    ageSliderContainer:{
        width:(windowWidth - 160) * widthRate, 
    },
    cityExplain:{
        fontFamily:'Roboto-Regular',
        fontSize:15,
        lineHeight:18,
        color:'#99AAB5',
        width:windowWidth - 56,
    },
    rowContainer:{
        flexDirection:'row',
        justifyContent:'space-between'
    },  
    divider:{
        borderBottomColor: '#EEEEEE', 
        borderBottomWidth: 1,
    },
    genderTitle:{
        fontFamily:'Roboto-Bold',
        fontSize:18,
        lineHeight:21,
        color:'#99AAB5'
    },
    resultPanel:{
        width:windowWidth,
        height:80,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#55ACEE',
        zIndex:2
    },
    resultText:{
       fontFamily:'Montserrat-Bold',
       fontSize:20,
       lineHeight:24,
       color:'white'
    }
});