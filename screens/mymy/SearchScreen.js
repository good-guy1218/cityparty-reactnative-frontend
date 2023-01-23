import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector , useDispatch } from 'react-redux';
import { setUserProfile } from '../../store/actions/index';
import { View, ScrollView, Text, Image, KeyboardAvoidingView, TouchableOpacity, TextInput} from 'react-native';
import { SvgXml } from 'react-native-svg';
import searchSvg from '../../assets/home/svg/search.svg';
import homeSvg from '../../assets/common/home.svg';
import sendSvg from '../../assets/common/send.svg';
import profileSvg from '../../assets/common/profile.svg';
import {API_URL , STORAGE_KEY, windowWidth} from '../../config/config';
import {styles} from '../style/Search';

const SearchScreen = (props) => {

    let { user, userProfile } = useSelector((state) => {
        return (
            state.user
        )
    });
    if (!userProfile) userProfile = {};
    const dispatch = useDispatch();
    
    const [token, setToken] = useState('');
    const [profileData, setProfileData] = useState(userProfile);
    const [cityList, setCityList] = useState([]);
    const [cityId, setCityId] = useState('');
    const [cityObject, setCityObject] = useState({});
    const [cityText, setCityText] = useState('');
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');

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

    const enterCity = (cId, cIndex) => {
        setCityObject(cityList[cIndex]);
        setCityId(cId);
        fetch(`${API_URL}/${'city/update?cityId=' + cId}`, {
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
                        setMessage(jsonRes.result);
                        let profileDataCopy = {...profileData};
                        profileDataCopy.enteredCity = cityList[cIndex];
                        setProfileData(profileDataCopy);
                        dispatch(setUserProfile(profileDataCopy));
                        props.navigation.navigate('City', {enteredCityId: cId});
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

    return (
        <View
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardContainer}
        > 
            <View style={styles.topHeader}>
                <TouchableOpacity onPress={()=>props.navigation.goBack()}>
                    <SvgXml width="24" height="24" xml={searchSvg} />
                </TouchableOpacity>
                <TextInput style={styles.searchInput} onChangeText={getCity} placeholder="Enter City" placeholderTextColor="rgba(0,0,0,0.5)"  autoCapitalize={'words'} value={cityText}></TextInput> 
            </View>
            <ScrollView style={styles.container}>
                <View>
                    <View style={styles.mainContainer}>
                        {
                        cityText ? 
                        <Text style={styles.resultTitle}>results for {cityText}</Text>
                        : null
                        }
                        {
                        cityList.map((eCity, index) => {
                            return (
                            <View key={index} style={styles.resultContainer}>
                                <View style={{width:windowWidth / 2}}>
                                    <Text numberOfLines={1} style={styles.cityTitle}>{eCity.name}</Text>
                                    <Text numberOfLines={1} style={styles.cityLocation}>{eCity.subcountry}, {eCity.country}</Text>
                                    <Text numberOfLines={1} style={styles.cityResult}>{eCity.people > 1000 ? eCity.people / 1000 : eCity.people} in this city right now</Text>
                                </View>
                                <View style={[styles.rowContainer, {paddingLeft:30, paddingRight:30}]}>
                                    <TouchableOpacity style={{marginRight:32}} onPress={() => enterCity(eCity.id, index)}>
                                        <Text style={styles.enterButtonText}>Enter</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            )
                        })
                        }
                    </View>
                </View>
            </ScrollView> 
            <View style={styles.footer}>
                <TouchableOpacity style={{alignItems:'center'}} onPress={()=> props.navigation.navigate('Home', {check:true})}>
                    <SvgXml style={{backgroundColor:'white'}} width="24" height="24" xml={homeSvg} />
                    <Text style={styles.navBarText}>CITY</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems:'center'}} onPress={()=> props.navigation.navigate('Message')}>
                    <SvgXml style={{backgroundColor:'white'}} width="24" height="24" xml={sendSvg} />
                    <Text style={styles.navBarText}>CHATS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems:'center'}} onPress={()=> props.navigation.navigate('Profile')}>
                    {profileData.profilePicture ? 
                        <Image source={ {uri:profileData.profilePicture}} 
                            style={styles.navBarProfileAvatar}/>
                        :
                        <SvgXml style={{backgroundColor:'white'}} width="24" height="24" xml={profileSvg} />
                    }
                    <Text style={styles.navBarText}>ME</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SearchScreen  ;