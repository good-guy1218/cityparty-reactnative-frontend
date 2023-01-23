import React, { useState, useEffect } from 'react';
import { NavigationActions, StackActions } from 'react-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector , useDispatch } from 'react-redux';
import { setUserProfile } from '../../store/actions/index';
import { View, ScrollView, Text, TouchableOpacity, TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SvgXml } from 'react-native-svg';
import AwesomeAlert from 'react-native-awesome-alerts';
import arSvg from '../../assets/common/arrow-back.svg';
import {styles} from '../style/Register';
import {API_URL , STORAGE_KEY} from '../../config/config';

const AddCityScreen = (props) => {

    let { user, userProfile } = useSelector((state) => {
        return (
            state.user
        )
    });
    if (!userProfile) userProfile = {};
    const dispatch = useDispatch();
    const [token, setToken] = useState('');
    const [cityList, setCityList] = useState([]);
    const [cityId, setCityId] = useState('');
    const [cityObject, setCityObject] = useState({});
    const [cityText, setCityText] = useState('');
    const [isError, setIsError] =  useState(false);
    const [message, setMessage] = useState('');
    const [showAlert , setShowAlert] = useState(false);

    const getToken = async () => {
        const tokenData = await AsyncStorage.getItem(STORAGE_KEY);
        setToken(tokenData);
    }

    useEffect(() => {
        getToken();
    }, [])

    const getCity = (v) => {
        setCityText(v);
        fetch(`${API_URL}/${'city/search?city=' + v}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status !== 200) {
                    setIsError(true);
                    setMessage(jsonRes.message);
                } else {
                    if (jsonRes.success) {
                        setIsError(false);
                        setMessage(jsonRes.message);
                        setCityList(jsonRes.result)
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
    }

    const finishOnboarding = (e) => {
        if (cityId == '') {
            setIsError(true);
            setMessage('Select City!');
            return ;
        }
        userProfile.city = cityObject;
        userProfile.enteredCity = cityObject;
        userProfile.enteredCityId = cityId;
        dispatch(setUserProfile(userProfile));
        const payload = {
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            bio: '',
            birthday: userProfile.birthday,
            cityId: cityId,
            interests: [],
            socials: {},
            profilePicture: userProfile.profilePicture ? userProfile.profilePicture : '',
            gender: userProfile.gender
        };
        setShowAlert(true);
        fetch(`${API_URL}/${'profile/create'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
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
                        setMessage(jsonRes.result);
                        const resetActionTrue = StackActions.reset({
                            index: 0,
                            params:{check:true},
                            actions: [NavigationActions.navigate({ routeName: 'Home'})],
                        });
                        props.navigation.dispatch(resetActionTrue); 
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
    }

    const selectedCity = (index) => {
        setCityText(cityList[index].name + ', ' + cityList[index].country);
        setCityId(cityList[index].id);
        setCityObject(cityList[index]);
        setCityList([]);
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
                    <Text style={styles.FieldTitle}>Enter the city where you live</Text>
                    <TextInput style={styles.CityInput} autoCapitalize={'words'} onChangeText={getCity} placeholder='enter city' value={cityText} placeholderTextColor='rgba(0, 0, 0, 0.2)'></TextInput>
                </View>
                <View style={styles.CityList}> 
                    {
                        cityList.map((city, index) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => selectedCity(index)}>
                                    <Text style={styles.cityText}>{city.name + ', ' + city.country}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                    
                </View>
                <TouchableOpacity style={styles.confirmButtonWrap} onPress={finishOnboarding}>
                    <LinearGradient 
                        style={styles.confirmButton} 
                        start={{x:0,y:0}} end={{x:1,y:0}} 
                        colors={[cityId ? '#DD2E44' : '#C4C4C4', cityId ? '#DD2E44' : '#C4C4C4']}
                    > 
                        <Text style={styles.confirmButtonText}>FINISH</Text>
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

export default AddCityScreen;