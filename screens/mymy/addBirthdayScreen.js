import React, { useState, useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { setUserProfile } from '../../store/actions/index';
import { View, ScrollView, Image, Text, TouchableOpacity, TextInput} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { SvgXml } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import arSvg from '../../assets/common/arrow-back.svg';
import {styles} from '../style/Register';

const AddBirthDayScreen = (props) => {

    let { user, userProfile } = useSelector((state) => {
        return (
            state.user
        )
    });
    if (!userProfile) userProfile = {};
    const dispatch = useDispatch();
    const [birthday, setBirthday] = useState('2016-05-01');
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');

    const confirmBirthday = () => {
        if (!birthday) {
            setIsError(true);
            setMessage('Birthday is required field!');
            return;
        }
        userProfile.birthday = birthday;
        dispatch(setUserProfile(userProfile));
        props.navigation.navigate('AddGender');
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.topHeader}>
                <TouchableOpacity onPress={()=>props.navigation.goBack()}>
                    <SvgXml width="24" height="24" xml={arSvg} />
                </TouchableOpacity>
            </View>
            <View style={styles.PageContainer}>
                <Text style={styles.FieldTitle}>Your birthday</Text>
            </View>
            <View style={styles.PageContainer}>
                <DatePicker
                    style={styles.BirthdayPicker}
                    date={birthday}
                    mode="date"
                    placeholder="select date"
                    format="DD MMMM YYYY"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon={false}
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0,
                    },
                    dateInput: {
                        borderLeftWidth:0,
                        borderTopWidth:0,
                        borderRightWidth:0,
                        width:230,
                        borderBottomWidth:1,
                        borderBottomColor:'#E5E5E5',
                    },
                    dateText: {
                        fontSize:24 ,
                        lineHeight:28,
                        color:'black',
                        fontFamily: 'Roboto-Medium',
                        width:230,
                        textAlign:'center'
                    }
                    // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {setBirthday(date)}}
                />
            </View>
            <TouchableOpacity style={styles.confirmButtonWrapBirthday} onPress={confirmBirthday}>
                <LinearGradient style={styles.confirmButton} start={{x:0,y:0}} end={{x:1,y:0}} colors={['#DD2E44', '#DD2E44']}> 
                    <Text style={styles.confirmButtonText}>CONFIRM</Text>
                </LinearGradient>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default AddBirthDayScreen ; 