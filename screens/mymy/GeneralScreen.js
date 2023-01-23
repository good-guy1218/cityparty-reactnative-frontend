import React,{useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setUserProfile, setSocketInstance } from '../../store/actions/index';
import { View,ScrollView,StyleSheet,Text,TouchableOpacity } from 'react-native';
import Toast from './MyToast';
import { SvgXml } from 'react-native-svg';
import { NavigationActions, StackActions } from 'react-navigation';
import {API_URL , STORAGE_KEY,windowWidth,windowHeight} from '../../config/config';
import arSvg from '../../assets/common/arrow-back.svg';
import LinearGradient from 'react-native-linear-gradient';

const GeneralScreen = (props) => {

    const dispatch = useDispatch();
    const [token, setToken] = useState('');
    const socketInstance = useSelector((state) => state.user.socketInstance);

    const getToken = async () => {
        const tokenData = await AsyncStorage.getItem(STORAGE_KEY);
        setToken(tokenData);
    }

    const defaultToast = useRef(null);
    const onLogout = async () => {
        try {
            await AsyncStorage.removeItem(
                STORAGE_KEY
            );

            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Login' })],
            });
            dispatch(setUserProfile({}));
            dispatch(setUser({}));
            socketInstance.disconnect();
            dispatch(setSocketInstance(null));

            props.navigation.dispatch(resetAction); 

        } catch (error) {
            console.log(error)
          // Error saving data
        }
    };

    const onDelete = () => {
        fetch(`${API_URL}/delUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email:user.email
            })
        })
        .then(async res => { 
            try {
                if (res.status !== 200) {
                } else {
                    defaultToast.current.showToast("Your profile has deleted.");
                    
                    setTimeout(() => {
                        onLogout();
                    }, 3000);  
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    };

    const goChangePassword = () => {
        props.navigation.navigate('ChangePassword');
    }
    const goBlockList = () => {
        props.navigation.navigate('BlockList');
    }
    const onDeleteAccount = () => {
        props.navigation.navigate('DeleteAccount');
    }

    useEffect(() => {
        getToken();
    }, [])

    return (
        <ScrollView style={styles.container}>
            <View style={styles.topHeader}>
                <View style={styles.topHeaderInner}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <TouchableOpacity onPress={() => props.navigation.goBack()}>
                            <SvgXml width="24" height="20" xml={arSvg} />
                        </TouchableOpacity>    
                        <Text style={styles.PageTitle}>GENERAL</Text>
                    </View>
                </View>
            </View>
            <View style={styles.mainContainer}>
                <TouchableOpacity style={styles.accountItem} onPress={()=>goChangePassword()}>
                    <Text style={styles.menu_text}>CHANGE PASSWORD</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.accountItem} onPress={()=>goBlockList()}>
                    <Text style={styles.menu_text}>BLOCKED USERS</Text>
                </TouchableOpacity>
                <TouchableOpacity  style={styles.buttonWrap} onPress={()=>onLogout()}>
                    <LinearGradient style={styles.logOutButton} start={{x:0,y:0}} end={{x:1,y:0}} 
                        colors={['#E8596E','#E8596E']}
                    > 
                        <Text style={styles.logOutText}>LOGOUT</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteAccountContainer} onPress={()=>onDeleteAccount()}>
                    <Text style={styles.deleteAccountText}>DELETE YOUR ACCOUNT</Text>
                </TouchableOpacity>
            </View>
            
            <Toast ref = {defaultToast} backgroundColor = "#57D172" style={styles.myToast}/>
       </ScrollView>
    );
};

const styles = StyleSheet.create({
    privateDesc:{
        fontSize:12,
        fontFamily:'Montserrat_400Regular',
        color:'rgba(0, 0, 0, 0.6)',
        lineHeight:15
    },
    logOutButton:{
        height:56,
        width:266,
        borderRadius:2,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    buttonWrap:{
        position:'absolute',
        bottom: 110,
    },
    logOutText:{
        color:'white',
        fontSize:13,
        fontStyle:'normal',
        fontFamily: 'Roboto-Regular',
        lineHeight:15,
        textAlign:'center'
    },
    privateTitle:{
        fontSize:16,
        fontFamily:'Montserrat_400Regular'
    },
    menu_input:{
        fontFamily:'Montserrat_600SemiBold',
        width:180,
        fontSize:14,
        paddingBottom:0,
        borderBottomWidth:0.5,
        height:40,
        borderColor:'rgba(0, 0, 0, 0.1)'
    },
    
    toggleDesc:{
        width:'50%'
    },
    menu_img:{
        width:24,
        height:24,
    },
    menu_text:{
        fontFamily: 'Roboto-Regular',
        fontSize:16,
        lineHeight:19,
        color:'black'
    },
    accountItem:{
        height:50,
        width:windowWidth - 72
    },
    toggleContainer:{
        width:windowWidth - 72,
        marginTop:30,
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'space-between'
    },
    mainContainer:{
        marginTop:30,
        alignItems:'center',
        width:windowWidth,
        height:windowHeight - 100
    },
    deleteAccountContainer:{
        position:'absolute',
        bottom: 40,
        width:windowWidth - 60,
        height:54,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:3
    },
    deleteAccountText:{
       fontSize:13,
       color:'rgba(221, 46, 68, 1)',
       letterSpacing:1,
        fontFamily:'Montserrat_400Regular'
    },
    container: {
        width: '100%',
        height:'100%',
        display: "flex", 
        flexDirection: "row", 
        flexWrap: "wrap",
        backgroundColor:'white'
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
        fontFamily: 'Montserrat-Bold',
        fontSize:20,
        lineHeight:24,
        color:'black',
        marginLeft: 15
    },
});

export default GeneralScreen;