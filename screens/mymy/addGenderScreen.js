import React, { useState, useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { setUserProfile } from '../../store/actions/index';
import { View, ScrollView, Text, TouchableOpacity, TextInput} from 'react-native';
import { SvgXml } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import arSvg from '../../assets/common/arrow-back.svg';
import manSvg from '../../assets/profile/man.svg';
import manActiveSvg from '../../assets/profile/man_active.svg';
import womanSvg from '../../assets/profile/woman.svg';
import womanActiveSvg from '../../assets/profile/woman_active.svg';
import {styles} from '../style/Register';

const AddGenderScreen = (props) => {

    let { user, userProfile } = useSelector((state) => {
        return (
            state.user
        )
    });
    if (!userProfile) userProfile = {};
    const dispatch = useDispatch();

    const [gender, setGender] = useState('');
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');

    const finishOnboarding = () => {
        if (gender == '') {
            setIsError(true);
            setMessage('Gender is required field!');
            return ;
        }
        userProfile.gender = gender;
        dispatch(setUserProfile(userProfile));
        props.navigation.navigate('AddCity');
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
                    <Text style={styles.FieldTitle}>What's your gender?</Text>
                </View>
                <View style={styles.GenerContainer}>
                    <TouchableOpacity style={{marginRight:32}} onPress={()=>setGender('M')}>
                        <SvgXml width="32" height="32" xml={gender == 'M' ? manActiveSvg : manSvg} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:32}} onPress={()=>setGender('F')}>
                        <SvgXml width="20" height="32" xml={gender == 'F' ? womanActiveSvg : womanSvg} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.confirmButtonWrapGender} onPress={finishOnboarding}>
                    <LinearGradient 
                        style={styles.confirmButton} 
                        start={{x:0,y:0}} end={{x:1,y:0}} 
                        colors={[gender ? '#DD2E44' : '#C4C4C4', gender ? '#DD2E44' : '#C4C4C4']}> 
                        <Text style={styles.confirmButtonText}>CONFIRM</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </ScrollView> 
    );
};

export default AddGenderScreen  ;