
import { StyleSheet} from 'react-native';


import { windowWidth } from '../../config/config';

export const styles = StyleSheet.create({
    topHeader:{
        height:70,
        width:windowWidth,
        paddingHorizontal:22,
        flexDirection:'column',
        justifyContent:'center',
        backgroundColor:'#FFFFFF',
    },
    topHeaderInner:{
        flexDirection:'row',
        justifyContent: 'space-between',
    },
    PageTitle:{
        fontFamily: 'Roboto-Medium',
        fontSize:20,
        lineHeight:23,
        color:'black',
        marginLeft: 15
    },
    saveButton:{
        borderRadius:20,
        color: 'white',
        fontFamily: 'Roboto-Black',
        fontSize: 15,
        lineHeight: 18,
        backgroundColor: '#55ACEE',
        width:80,
        height:40,
        textAlign:'center',
        textAlignVertical:'center'
    },
    keyboardContainer:{
        flex: 1,
        justifyContent: "space-between",
        backgroundColor:'#FFFFFF'
    },
    container:{
        backgroundColor:'#FFFFFF',
        flex:1,
    },
    scrollContainer:{
        flex:1
    },
    mainInfoContainer:{
        padding:31
    },
    profileAvatarView:{
        marginTop:-10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        zIndex:2
    },
    profileAvatar:{
        width:120,
        height:120,
        borderWidth:3 ,
        borderRadius:100,
        borderColor:'#EEEEEE',
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
    nameFieldWrap:{
        marginTop:21
    },
    nameFiledTitle:{
        fontFamily: 'Roboto-Regular',
        fontSize:16,
        lineHeight:19,
        color:'#99AAB5',
    },
    nameFiled:{
        fontFamily: 'Roboto-Black',
        fontSize:20,
        lineHeight:23,
        color:'#282828',
        padding:0
    },
    positionFieldWrap:{
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop:9,
        marginBottom:22
    },
    positionField:{
        fontFamily:'Roboto-Regular',
        fontSize:16,
        lineHeight:12,
        color:'black',
        marginLeft:6,
        padding:0,
    },
    textareaContainer:{
        
    },
    textarea:{
        fontFamily:'Roboto-Regular',
        fontSize:16,
        lineHeight:19,
        color:'black',
        marginLeft:6,
    },
    specialFieldWrap:{
        marginTop: 5,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    divider:{
        borderBottomColor: '#E5E5E5', 
        borderBottomWidth: 0.5,
        marginTop:19,
        marginBottom:10
    },
    socialFieldWrap:{
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop:9,
        alignItems:'center'
    },
    socialField:{
        fontFamily:'Roboto-Bold',
        fontSize:16,
        color:'black',
        marginLeft:6,
        paddingTop: 0,
        paddingBottom:0,
        width:'80%'
    },
    buttonWrap:{
        marginTop: 43
    },
    sendButton:{
        height:46,
        flex:1,
        borderRadius:3,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    buttonText:{
        color:'white',
        fontSize:15,
        fontFamily: 'Roboto-Black',
        lineHeight:18
    },
    CityList:{
        width:windowWidth,
        paddingLeft: 75

    },
    cityText:{
        fontFamily:'Roboto-Medium',
        fontSize:16,
        lineHeight:18,
        color:'rgba(0, 0, 0, 0.8)',
        marginBottom:5
    },
    footer:{
        width:windowWidth,
        alignItems:'center',
        justifyContent:'space-evenly',
        flexDirection:'row',
        backgroundColor:'white',
        height:84,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    navBarText:{
        fontFamily:'Montserrat-Bold',
        fontSize:10,
        lineHeight:12,
        marginTop:5
    },
    navBarProfileAvatar:{
        width:24,
        height:24,
        borderWidth:1,
        borderRadius:100,
        borderColor:'#EEEEEE',
    }
});