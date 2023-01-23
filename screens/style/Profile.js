
import { StyleSheet} from 'react-native';


import { windowWidth,windowHeight } from '../../config/config';

export const widthRate = windowWidth / 411;
export const heightRate = windowHeight / 860;

export const styles = StyleSheet.create({
    keyboardContainer:{
        backgroundColor:'#FFFFFF',
        flexDirection:'column',
        flex:1,
        width:windowWidth,
    },
    container: {
        backgroundColor:'#FFFFFF',
        flex:1,
        width:windowWidth,
    },
    navigationContainer: {
        backgroundColor: "#FFFFFF",
        paddingLeft:90,
        paddingRight:13
    },
    drawderNenu: {
        padding: 36,
        fontSize: 20,
        lineHeight:23,
        fontFamily: 'Roboto-Bold',
        color: 'black',
        textAlign: "left",
    },
    divider:{
        borderColor: '#E5E5E5',
        borderBottomWidth: 1,
        borderStyle:'solid',
    },
    topStatusBar:{
        height:35,
        width:windowWidth,
        justifyContent:'center',
        alignItems:'center',
        zIndex:2
    },
    statusText:{
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        lineHeight: 14,
        color: 'white'
    },
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
        fontFamily: 'Montserrat-Black',
        fontSize:18,
        lineHeight:22,
        color:'#66757F'
    },
    PageContainer:{
        alignItems:'center',
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
    profilePhotoContainer:{
        width: windowWidth,
        justifyContent:'flex-start',
        paddingLeft: 30
    },
    photoWrap:{
        width: 125 * widthRate,
        height: 125 * heightRate,
        backgroundColor: '#EEEEEE',
        borderRadius:60,
        alignItems:'center',
        flexDirection:'column',
        justifyContent:'center'
    },
    profileAvatarView:{
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
    navBarProfileAvatar:{
        width:24,
        height:24,
        borderWidth:1 ,
        borderRadius:100,
        borderColor:'#EEEEEE',
    },
    positionFieldWrap:{
        width: windowWidth,
        flexDirection:'row',
        justifyContent:'flex-start',
        paddingLeft: 30,
        marginTop:9,
        marginBottom:22
    },
    positionField:{
        fontFamily:'Roboto-Regular',
        fontSize:16,
        lineHeight:19,
        color:'#525252',
        marginLeft:6
    },
    specialFieldWrap:{
        marginTop: 5,
        width: windowWidth,
        flexDirection:'row',
        justifyContent:'flex-start',
        paddingLeft: 30,
    },
    specialFiled:{
        fontFamily:'Roboto-Light',
        fontSize:16,
        lineHeight:19,
    },
    socialFieldWrap:{
        width: windowWidth,
        flexDirection:'row',
        justifyContent:'flex-start',
        paddingLeft: 30,
        marginTop:10,
    },
    socialField:{
        fontFamily:'Roboto-Regular',
        fontSize:16,
        lineHeight:19,
        color:'#525252',
        marginLeft:6
    },
    blockDivider:{
        width:windowWidth - 60,
        borderTopWidth:0.5,
        borderColor:'#E5E5E5',
        marginTop: 20
    },
    NoPicView:{
        marginTop: 45 * heightRate,
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center',
        zIndex:2
    },
    nameField: {
        marginTop: 20 * heightRate,
        fontSize:24,
        lineHeight:28,
        fontFamily:'Roboto-Black',
        color: 'black',
        textAlign: 'left'
    },
    buttonWrap:{
        marginTop: 20 * heightRate,
        width:windowWidth,
        padding:5
    },
    photoSliderWrap:{ 
        flex: 1, 
        flexDirection:'row',
        marginTop:1, 
        flexWrap:'wrap',
        width:windowWidth
    },
    ePhotoContainer:{
        width:(windowWidth) / 3,
        height:293,
        borderWidth:2,
        borderColor:'white'
    },
    addButton:{
        height:60,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        borderTopWidth:1,
        borderBottomWidth:1,
        borderColor:'#EEEEEE'
    },
    buttonText:{
        color:'#99AAB5',
        fontSize:14,
        fontFamily: 'Roboto-Regular',
        lineHeight:21
    },
    NoPicTitle: {
        fontSize:24,
        lineHeight:28,
        fontFamily:'Roboto-Black',
        color: 'black',
        textAlign: 'center',
        marginBottom:10,
        marginTop:10
    },
    NoPicDetails: {
        fontSize:18,
        lineHeight:21,
        fontFamily:'Roboto-Regular',
        color: 'black',
        textAlign: 'center',
    },
    cityTextInput:{
        padding: 18,
        fontSize:20,
        fontFamily: 'Roboto-Regular',
        lineHeight:23,
        color:'black',
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
    navBarText:{
        fontFamily:'Montserrat-Bold',
        fontSize:10,
        lineHeight:12,
        marginTop:5
    },
});