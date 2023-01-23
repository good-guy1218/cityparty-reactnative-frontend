import React from 'react';
import { View, ScrollView, Image, Text, TouchableOpacity, TextInput} from 'react-native';
import io from "socket.io-client";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from 'react-native-check-box';
import { NavigationActions, StackActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import AwesomeAlert from 'react-native-awesome-alerts';
import { useDispatch } from 'react-redux';
import { setUser, setSocketInstance } from '../../store/actions/index';
import {API_URL , STORAGE_KEY, SOCKET_URL} from '../../config/config';
import {styles} from '../style/Auth';
import { useState } from 'react';

const RegisterScreen = (props) => {

    const dispatch = useDispatch()
    const [isSelectedTerms, setTermsAndConditions] = useState(false);
    const [isAdult, setIsAdult] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rpassword, setRpassword] = useState('');
    const [username, setUsername] = useState('');
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [showAlert , setShowAlert] = useState(false);

    const goOnboarding = (cur_user) => {
        dispatch(setUser(cur_user));
        socket = io(SOCKET_URL);
        dispatch(setSocketInstance(socket));
        socket.on("connect", () => {
            socket.emit("login", {uid:cur_user.id, email:cur_user.email});
        });
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'AddPhoto'})],
        });
        props.navigation.dispatch(resetAction); 
    }

    const _storeData = async (token) => {
        try {
          await AsyncStorage.setItem(
            STORAGE_KEY,
            token
          );
        } catch (error) {
          // Error saving data
        }
    };

    const onSubmitHandler = () => {  //Sign in & Sign up
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
        if (password == '') {
            setIsError(true);
            setMessage("Password is empty");
            return;
        }
        if (password != rpassword) {
            setIsError(true);
            setMessage("Please check password again!");
            return;
        }
        if (!isSelectedTerms) {
            setIsError(true);
            setMessage("Please check terms and condition!");
            return;
        }
        if (!isAdult) {
            setIsError(true);
            setMessage("You must be a adult!");
            return;
        }
        setShowAlert(true);
        setIsError(false);
        setMessage('');
        const payload = {
            email,
            password,
            username
        };
        fetch(`${API_URL}/${'users/register'}`, {
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
                if (res.status !== 200) {
                    setIsError(true);
                    setMessage(jsonRes.message);
                } else {
                    if (jsonRes.success) {
                        setIsError(false);
                        setMessage(jsonRes.message);
                        _storeData(jsonRes.token.token);
                        goOnboarding(jsonRes.token.user);
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

    //set status message(error or success)
    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
            <View style={styles.RegisterContainer}>
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
                <View style={[styles.formInput,{marginTop:32}]}>
                    <Text style={styles.InputLabel}>repeat password</Text>
                    <TextInput secureTextEntry={true} style={styles.formtextInput_password} onChangeText={setRpassword}></TextInput>
                </View>
                <View style={styles.authCheckbox}>
                    <CheckBox
                        style={{flex: 1, padding:0}}
                        onClick={()=>{
                          setTermsAndConditions(!isSelectedTerms)
                        }}
                        isChecked={isSelectedTerms}
                        checkBoxColor={'black'}
                        rightTextStyle={{color:'black'}}
                        rightText={'by clicking REGISTER you accept out terms and conditions'}
                    />
                </View>
                <View style={styles.authCheckboxAdult}>
                    <CheckBox
                        style={{flex: 1, padding:0}}
                        onClick={()=>{
                          setIsAdult(!isAdult)
                        }}
                        isChecked={isAdult}
                        checkBoxColor={'black'}
                        rightTextStyle={{color:'black'}}
                        rightText={'i am 18 years old'}
                    />
                    <Text style={styles.adultMessage}>(please, if you are less than 18 years old don't register on Cityparty app)</Text>
                </View>
                <TouchableOpacity style={styles.buttonWrap} onPress={onSubmitHandler}>
                    <LinearGradient style={styles.signInButton} start={{x:0,y:0}} end={{x:1,y:0}} colors={[email && password && rpassword ? '#F12626' : '#E9E9E9', email && password && rpassword ? '#F12626' : '#E9E9E9']}> 
                        <Text style={styles.signText}>REGISTER</Text>
                    </LinearGradient>
                </TouchableOpacity>
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

export default RegisterScreen;