
import { StyleSheet} from 'react-native';


import { windowWidth,windowHeight } from '../../config/config';

export const widthRate = windowWidth / 411;
export const heightRate = windowHeight / 860;

export const styles = StyleSheet.create({
    topHeader:{
        height:80,
        width:windowWidth,
        paddingHorizontal:15,
        flexDirection:'column',
        justifyContent:'center',
        backgroundColor:'#FFFFFF',
    },
    topHeaderInner:{
        flexDirection:'row',
        justifyContent: 'space-between',
    },
    PageTitle:{
        fontFamily: 'Roboto-Black',
        fontSize:26,
        lineHeight:30,
        color:'black',
    },
    CityInput:{
        padding:6,
        paddingLeft: 20,
        marginLeft:15,
        height:40,
        fontSize:14,
        lineHeight:16,
        color:'#99AAB5',
        fontFamily: 'Roboto-Regular',
        width:(windowWidth - 200) * widthRate,
        backgroundColor: '#F5F5F5',
        borderRadius:30,
        textAlignVertical:'center'
    },
    exitButton:{
        borderRadius:20,
        color: 'white',
        fontFamily: 'Roboto-Bold',
        fontSize: 18,
        lineHeight: 21,
        backgroundColor: '#CE2B37',
        width:90,
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
    scrollToTop:{
        width:60,
        height:60,
        backgroundColor:'#DD2E44',
        position:'absolute',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:30,
        bottom:30,
        right:25,
        shadowColor: '#EEEEEE',
        shadowOffset: {width: 1, height: 0},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },  
    mainInfoContainer:{
        padding:10,
        paddingTop:0
    },
    cityPageTitle:{
        marginTop:15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        zIndex:2
    },
    cityLocationContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        zIndex:2
    },
    cityLocation:{
        fontFamily: 'Roboto-Regular',
        fontSize:16,
        lineHeight:19,
        color:'#525252',
    },
    cityInfoContainer:{
        marginTop: 20,
        flexDirection: "row",
        alignItems: 'center'
    },
    cityInfoTextWrap:{
        flexDirection: "row"
    },
    cityPeopleNumber:{
        fontFamily: 'Roboto-Black',
        fontSize:16,
        lineHeight:19,
        color:'#55ACEE',
        marginLeft:8,
        marginRight:8
    },
    cityInfo:{
        fontFamily: 'Roboto-Regular',
        fontSize:14,
        lineHeight:16,
        color:'#525252',
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
     eachPeopleInfoContainer:{
        marginTop:20,
        marginBottom:20,
        flexDirection:'row',
        justifyContent:'flex-start'
    },
    photoContainer:{
        width:70,
    },
    photoWrap:{
        width: 60 * widthRate,
        height: 60 * heightRate,
        backgroundColor: '#EEEEEE',
        borderRadius:60,
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'center'
    },
    photoStyle:{
        width: 60,
        height:60,
        borderRadius:30,
        borderWidth:2,
        borderColor:'#E5E5E5'
    },
    InfoContainer:{
        width: windowWidth - 120
    },
    nameFiled:{
        fontFamily: 'Roboto-Medium',
        fontSize:18,
        lineHeight:21,
        color:'#282828',
        padding:0
    },
    positionFieldWrap:{
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop:9,
        marginBottom:9
    },
    positionField:{
        fontFamily:'Roboto-Regular',
        fontSize:16,
        lineHeight:19,
        color:'#525252',
        marginLeft:5,
        padding:0,
    },
    bioFieldWrap:{
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems:'center',
        marginTop:5
    },
    bioField:{
        fontFamily:'Roboto-Light',
        fontSize:16,
        lineHeight:19,
        color:'black',
        padding:0,
    },
    photosContainer:{ 
        marginTop:17,
        flex: 1, 
        flexDirection:'row',
        flexWrap:'wrap'
    },
    ephotoStyle:{
        width:(windowWidth - 130) / 3,
        height:124,
    },
    ePhoto:{
        width: '100%',
        height: '100%',
        borderRadius:2
    },
    sendMessageButtonContainer:{
        marginTop:17,
        width:'100%'
    },
    sendMessageButton:{
        height:40,
        borderRadius:2,
        alignItems:'center',
        justifyContent:'center',
        width:'100%'
    },
    sendMessageText:{
        color:'white',
        fontSize:14,
        fontFamily: 'Roboto-Black',
        lineHeight:16
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
        borderBottomColor: '#EEEEEE', 
        borderBottomWidth: 1,
    },
    blockDivider:{
        borderBottomColor: '#EEEEEE', 
        borderBottomWidth: 1,
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

    emptyContainer: {
        width: windowWidth,
        // height:windowHeight,
        display: "flex", 
        flexDirection: "row", 
        flexWrap: "wrap",
        backgroundColor:'#FFFFFF'
    },
    emptyTopHeader:{
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
    emptyPageTitle:{
        fontFamily: 'Montserrat-Black',
        fontSize:18,
        lineHeight:22,
        color:'#66757F'
    },
    emptyPageContainer:{
        alignItems:'center',
        width:windowWidth,
    },
    emptySearchInputWrap:{
        width:235 * widthRate,
        borderRadius:30,
        backgroundColor:'#F6F6F6',
        alignItems:'center',
        paddingHorizontal:29 * widthRate ,
        flexDirection:'row',
        marginTop:78 * heightRate
    },
    emptyHomeAvatarView:{
        marginTop: 130 * heightRate,
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
        zIndex:2
    },
    emptyHomeDetailsFirst: {
        marginTop: 30 * heightRate,
        fontSize:20,
        lineHeight:23,
        fontFamily:'Roboto-Regular',
        color: 'black',
        textAlign: 'center'
    },
    emptyHomeDetails: {
        fontSize:20,
        lineHeight:23,
        fontFamily:'Roboto-Regular',
        color: 'black',
        textAlign: 'center',
    },
    emptyCityTextInput:{
        padding: 18,
        fontSize:20,
        fontFamily: 'Roboto-Regular',
        lineHeight:23,
        color:'#525252',
    },
});