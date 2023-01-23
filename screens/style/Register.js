
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
    topHeader:{
        height:50,
        width:windowWidth,
        paddingHorizontal:16,
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'flex-start',
        marginTop:25
    },
    message: {
        position:'absolute',
        top: 20,
        fontSize: 16,
        height:20,
        textAlign:'center',
        width:windowWidth,
    },
    PageContainer:{
        alignItems:'center',
        width:windowWidth,
        marginTop:80 * heightRate
    },
    GenerContainer:{
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        width:windowWidth,
        marginTop:80 * heightRate
    },
    FieldTitle:{
        color:'#525252',
        fontSize:24,
        lineHeight:28,
        fontFamily: 'Roboto-Medium',
        marginBottom: 10
    },
    profileAvatarView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        zIndex:2
    },
    profileAvatar:{
        width:150,
        height:150,
        borderWidth:4,
        borderRadius:100,
        borderColor:'#E5E5E5',
        marginTop: 49 * heightRate
    },
    uploadButton:{
        position:'absolute',
        left:90,
        bottom:0,
        borderRadius:50,
        width:50,
        height:50,
        borderWidth:1,
        borderColor:'#E5E5E5',
        backgroundColor:'#F6F6F6',
        alignItems:'center',
        justifyContent:'center'
    },
    confirmButtonWrap:{
        marginTop: 200 * heightRate,
        marginBottom: 50,
        paddingLeft: 89,
        paddingRight: 89,
        width:windowWidth,
    },
    confirmButtonWrapBirthday:{
        marginTop: 280 * heightRate,
        paddingLeft: 89,
        paddingRight: 89,
        width:windowWidth,
    },
    confirmButtonWrapGender:{
        marginTop: 280 * heightRate,
        paddingLeft: 89,
        paddingRight: 89,
        width:windowWidth,
    },
    confirmButton:{
        height:60,
        borderRadius:2,
        alignItems:'center',
        justifyContent:'center',
    },
    confirmButtonText:{
        color:'white',
        fontSize:16,
        fontFamily: 'Roboto-Medium',
        lineHeight:19
    },
    skipForNowWrap:{
        marginTop: 70 * heightRate
    },
    skipForNow:{
        color:'#C4C4C4',
        fontWeight: '500',
        fontSize: 20,
        lineHeight: 23,
        fontFamily:'Roboto'
    },
    FullNameInput:{
        padding:7,
        fontSize:24 ,
        lineHeight:28,
        color:'black',
        fontFamily: 'Roboto-Medium',
        width:230 * widthRate,
        borderBottomWidth:1,
        borderBottomColor:'#E5E5E5',
        textAlign:'center'
    },
    CityList:{
        marginTop:20,
        width:windowWidth,
        paddingLeft: 75

    },
    CityInput:{
        padding:15,
        paddingLeft: 40,
        fontSize:16 ,
        lineHeight:19,
        color:'black',
        fontFamily: 'Roboto-Medium',
        width:(windowWidth - 150) * widthRate,
        borderWidth:1,
        borderColor:'#E5E5E5',
        borderRadius:30,
        marginTop: 40
    },
    cityText:{
        fontFamily:'Roboto-Medium',
        fontSize:16,
        lineHeight:19,
        color:'rgba(0, 0, 0, 0.8)',
        marginBottom:5
    },
    BirthdayPicker:{
        width: 230
    }
});