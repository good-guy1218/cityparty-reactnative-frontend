import React, { useState , useEffect} from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity, TextInput} from 'react-native';

import io from "socket.io-client";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationActions, StackActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useDispatch } from 'react-redux';
import { setUser, setUserProfile, setSocketInstance } from '../../store/actions/index';
import {API_URL , STORAGE_KEY, SOCKET_URL} from '../../config/config';
import {styles} from '../style/Auth';

const LoginScreen = (props) => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [showAlert , setShowAlert] = useState(false); //success alert

    let socket = null;

    const goFeed = (cur_user, flag) => {
        dispatch(setUser(cur_user));
        socket = io(SOCKET_URL);
        dispatch(setSocketInstance(socket));
        socket.on("connect", () => {
            socket.emit("login", {uid:cur_user.id, email:cur_user.email});
        });
        const resetActionFalse = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'AddPhoto'})],
        });
        const resetActionTrue = StackActions.reset({
            index: 0,
            params:{check:true},
            actions: [NavigationActions.navigate({ routeName: 'Home'})],
        });
        if (flag)
            props.navigation.dispatch(resetActionTrue); 
        else 
            props.navigation.dispatch(resetActionFalse); 
    }   

    const _storeData = async (token) => {
        try {
          await AsyncStorage.setItem(
            STORAGE_KEY,
            token
          );
        } catch (error) {
        }
    };

    const onSubmitHandler = () => { 
        if(email == ''){
            setIsError(true);
            setMessage("Email is empty");
            return;
        }
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(email) === false) {
            setIsError(true);
            setMessage("Invalid Email Address");
            return;
        }
        if(password == ''){
            setIsError(true);
            setMessage("Password is empty");
            return;
        }
        setShowAlert(true);
        setIsError(false);
        setMessage('');
        const payload = {
            email,
            password
        };
        fetch(`${API_URL}/${'users/login'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                setShowAlert(false);
                console.log(res.status);
                if (res.status !== 200) {
                    setIsError(true);
                    setMessage('Check email and password!');
                } else {
                    if (jsonRes.success) {
                        setIsError(false);
                        setMessage(jsonRes.message);
                        _storeData(jsonRes.token.token);
                        let userData = jsonRes.token.user;
                        fetch(`${API_URL}/${'profile'}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'token': jsonRes.token.token
                            }
                        })
                        .then(async res => { 
                            try {
                                const jsonRes = await res.json();
                                if (res.status !== 200) {
                                    setIsError(true);
                                    setMessage(jsonRes.message);
                                    dispatch(setUserProfile([]));
                                    goFeed(userData, false);
                                } else {
                                    if (jsonRes.success) {
                                        setIsError(false);
                                        setMessage(jsonRes.message);
                                        dispatch(setUserProfile(jsonRes.result));
                                        goFeed(userData, jsonRes.result ? true : false);
                                    } else {
                                        setIsError(true);
                                        setMessage(jsonRes.result);
                                    }
                                }
                            } catch (err) {
                                console.log(err);
                            };
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    } else {
                        setIsError(true);
                        setMessage(jsonRes.result);
                    }
                }
                
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    };

    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
    }

    const checkLogin = async () => {
        try {
            const token = await AsyncStorage.getItem(STORAGE_KEY);
            if(token !== null)
            {
                setShowAlert(true);
                //Go to Feed
                fetch(`${API_URL}/users/check`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({token}),
                })
                .then(async res => { 
                    try {
                        const jsonRes = await res.json();
                        setShowAlert(false);
                        if (res.status == 200) {
                            if(jsonRes.success){
                                dispatch(setUserProfile(jsonRes.result.user.profile));
                                goFeed(jsonRes.result.user, jsonRes.result.user.profile ? true : false);
                            }else{

                            }
                        }                     
                    } catch (err) {
                        console.log(err);
                    };
                })
                .catch(err => {
                });
            }      
            // }
        } catch(e) {
        }
    }

    useEffect(() => {
        checkLogin();
    }, [])

    return (
        <ScrollView style={styles.container}>
            <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
            <View style={styles.LoginContainer}>
                <Image source={require('../../assets/common/logo.png')} style={{width:80,height:80}} />
                <Text style={styles.LogoText}>Cityparty</Text>
                
                <View style={[styles.formInput]}>
                    <Text style={styles.InputLabel}>email</Text>
                    <TextInput style={styles.formtextInput} autoCapitalize="none"  onChangeText={setEmail}></TextInput>
                </View>
                <View style={[styles.formInput,{marginTop:32}]}>
                    <Text style={styles.InputLabel}>password</Text>
                    <TextInput secureTextEntry={true} style={styles.formtextInput_password} onChangeText={setPassword}></TextInput>
                </View>
                <TouchableOpacity style={styles.buttonWrap} onPress={onSubmitHandler}>
                    <LinearGradient style={styles.signInButton} start={{x:0,y:0}} end={{x:1,y:0}} 
                        colors={[email && password ? '#F12626' : '#E9E9E9', email && password ? '#F12626' : '#E9E9E9']}
                    > 
                        <Text style={styles.signText}>LOGIN</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <View style={styles.signInOptionContainer}>
                    <Text style={styles.accountYet}>don't have an account yet?</Text>
                    <TouchableOpacity style={styles.signInOptionBtn} onPress={()=>props.navigation.navigate('Reigster')}>
                        <Text style={styles.signInOptionText}>REGISTER</Text>
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
            </View>
        </ScrollView>
    );
};

export default LoginScreen;