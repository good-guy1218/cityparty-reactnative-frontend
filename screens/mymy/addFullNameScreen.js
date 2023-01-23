import React, { useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { setUserProfile } from '../../store/actions/index';
import { View, ScrollView, Text, TouchableOpacity, TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SvgXml } from 'react-native-svg';
import arSvg from '../../assets/common/arrow-back.svg';
import {styles} from '../style/Register';

const AddFullNameScreen = (props) => {

    let { user, userProfile } = useSelector((state) => {
        return (
            state.user
        )
    });
    if (!userProfile) userProfile = {};
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isError, setIsError] =  useState(false);
    const [message, setMessage] = useState('');

    const confirmFullName = (e) => {
        if (firstName == '') {
            setIsError(true);
            setMessage('First Name is required field!');
            return;
        }
        if (lastName == '') {
            setIsError(true);
            setMessage('Last Name is required field!');
            return;
        }
        userProfile.firstName = firstName;
        userProfile.lastName = lastName;
        dispatch(setUserProfile(userProfile));
        props.navigation.navigate('AddBirthday');
    }

    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.topHeader}>
                <TouchableOpacity onPress={()=>props.navigation.goBack()}>
                    <SvgXml width="24" height="24" xml={arSvg} />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
                <View style={styles.PageContainer}>
                    <Text style={styles.FieldTitle}>First Name</Text>
                    <TextInput style={styles.FullNameInput} autoCapitalize={'words'} onChangeText={setFirstName}></TextInput>
                </View>
                <View style={styles.PageContainer}>
                    <Text style={styles.FieldTitle}>Last Name</Text>
                    <TextInput style={styles.FullNameInput} autoCapitalize={'words'} onChangeText={setLastName}></TextInput>
                </View>
                <TouchableOpacity style={styles.confirmButtonWrap} onPress={confirmFullName}>
                    <LinearGradient 
                        style={styles.confirmButton} 
                        start={{x:0,y:0}} end={{x:1,y:0}} 
                        colors={[firstName && lastName ? '#DD2E44' : '#C4C4C4', firstName && lastName ? '#DD2E44' : '#C4C4C4']}
                    > 
                        <Text style={styles.confirmButtonText}>CONFIRM</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </ScrollView> 
    );
};

export default AddFullNameScreen;