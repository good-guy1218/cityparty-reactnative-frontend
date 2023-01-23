import React, { useState ,useRef, useEffect} from 'react';
import { View,FlatList, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Toast from './MyToast';
import {API_URL,STORAGE_KEY, default_photo, windowHeight, windowWidth} from '../../config/config';
import { SvgXml } from 'react-native-svg';
import arSvg from '../../assets/common/arrow-back.svg';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationActions, StackActions } from 'react-navigation';
import AwesomeAlert from 'react-native-awesome-alerts';

const onDeactivateAccount = async()=>{
    const tokenData = await AsyncStorage.getItem(STORAGE_KEY);
    setShowAlert(true);
    fetch(`${API_URL}/${'users/deactivate'}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': tokenData
        }
    })
    .then(async res => { 
        try {
            const jsonRes = await res.json();
            setShowAlert(false);
            if (res.status !== 200) {
               // setIsError(true);
               // setMessage(jsonRes.message);
            } else {
                await AsyncStorage.removeItem(
                    STORAGE_KEY
                );
                if (jsonRes.success) {
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'Login' })],
                    });
                    props.navigation.dispatch(resetAction); 
                }else {
                 //   setIsError(true);
                //    setMessage(jsonRes.message);
                }
            }
        } catch (err) {
            console.log(err);
        };
    })
    .catch(err => {
        console.log(err);
    });
}

const DeleteAccountScreen = (props) => {
    const defaultToast = useRef(null);
    const [showAlert , setShowAlert] = useState(false);
    const onDeleteAccount = async()=>{
        const tokenData = await AsyncStorage.getItem(STORAGE_KEY);
        setShowAlert(true);
        fetch(`${API_URL}/${'users/deleteAccount'}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': tokenData
            }
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                setShowAlert(false);
                if (res.status !== 200) {
                   // setIsError(true);
               //     setMessage(jsonRes.message);
                } else {
                    await AsyncStorage.removeItem(
                        STORAGE_KEY
                    );
                    if (jsonRes.success) {
                        const resetAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'Login' })],
                        });
                        props.navigation.dispatch(resetAction); 
                    }else {
                     //   setIsError(true);
                    //    setMessage(jsonRes.message);
                    }
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.topHeader}>
                <View style={styles.topHeaderInner}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <TouchableOpacity onPress={() => props.navigation.goBack()}>
                            <SvgXml width="24" height="20" xml={arSvg} />
                        </TouchableOpacity>    
                        <Text style={styles.PageTitle}>DELETE YOUR ACCOUNT</Text>
                    </View>
                </View>
            </View>
            <View style={styles.mainContainer}>
                <View style={{width:"90%"}}>
                    <Text style={styles.topText}>YOU ARE GOING TO</Text>
                    <Text style={[styles.topText,{marginBottom:38}]}>DELETE YOUR ACCOUNT</Text>
                    <Text style={styles.mainText}>This action is irreversible,you'will not be able</Text>
                    <Text style={styles.mainText}>to recover your account anymore.</Text>
                    <Text></Text>
                    <Text style={styles.mainText}>In alternative you can choose to deactivate</Text>
                    <Text style={styles.mainText}>your account if you want to take a pause</Text>
                </View>
                <View style={styles.deactivateButtonWrap}> 
                    <TouchableOpacity   onPress={()=>onDeactivateAccount()}>
                        <LinearGradient style={styles.deactivateButton} start={{x:0,y:0}} end={{x:1,y:0}} 
                            colors={['#FFFFFF','#FFFFFF']}
                        > 
                        <Text style={styles.deactivateText}>DEACTIVATE ACCOUNT</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <Text style={styles.comebackText}>You can come back anytime with login</Text>
                </View>
                <TouchableOpacity style={styles.deleteButtonWrap}  onPress={()=>onDeleteAccount()}>
                    <LinearGradient style={styles.deleteButton} start={{x:0,y:0}} end={{x:1,y:0}} 
                        colors={['#E8596E','#E8596E']}
                    > 
                    <Text style={styles.deleteText}>DELETE ACCOUNT</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <AwesomeAlert
                show={showAlert}
                showProgress={true}
                title="Processing"
                message="Wait a moment..."
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
            />
            <Toast ref = {defaultToast} backgroundColor = "#57D172" style={styles.myToast}/>
       </View>
    );
};

const styles = StyleSheet.create({
    mainContainer:{
        marginTop:30,
        alignItems:'center',
        width:windowWidth,
        height:windowHeight - 100
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
    container: {
        width: '100%',
        height:'100%',
        display: "flex", 
        flexDirection: "row", 
        flexWrap: "wrap",
        backgroundColor:'white'
    },
    PageTitle:{
        fontFamily: 'Montserrat-Bold',
        fontSize:20,
        lineHeight:24,
        color:'black',
        marginLeft: 15
    },
    topText:{
        fontFamily:'Roboto-Bold',
        fontSize:20,
        lineHeight:23,
        color:'rgba(0,0,0,0.5)',
    },
    mainText:{
        fontFamily:'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19
    },
    deactivateButton:{
        height:56,
        width: 362,
        borderRadius:2,
        borderWidth:1,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    deleteButton:{
        height:56,
        width: 362,
        borderRadius:2,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    deactivateButtonWrap:{
        position:'absolute',
        bottom: 270,
        alignItems:'center',
    },
    deleteButtonWrap:{
        position:'absolute',
        bottom: 50
    },
    deactivateText:{
        color:'black',
        fontSize:16,
        fontFamily: 'Roboto-Regular',
        lineHeight:19,
    },
    deleteText:{
        color:'white',
        fontSize:16,
        fontFamily: 'Roboto-Regular',
        lineHeight:19,
    },
    comebackText:{
        fontSize:16,
        fontFamily: 'Roboto-Regular',
        lineHeight:19,
        color:'rgba(0,0,0,0.5)',
        marginTop:13
    },
});

export default DeleteAccountScreen;