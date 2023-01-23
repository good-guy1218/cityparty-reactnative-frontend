import React,{useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector , useDispatch } from 'react-redux';
import { View,ScrollView,KeyboardAvoidingView, Image, Text,TouchableOpacity, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from '../style/City';
import { SvgXml } from 'react-native-svg';
import {API_URL , STORAGE_KEY} from '../../config/config';
import currentLocationSvg from '../../assets/profile/bx-current-location.svg';
import toTopSvg from '../../assets/city/totop.svg';
import coffeTogoSvg from '../../assets/city/bx-coffee-togo.svg';
import homeActiveSvg from '../../assets/common/home_active.svg';
import sendSvg from '../../assets/common/send.svg';
import profileSvg from '../../assets/common/profile.svg';
import malePhotoSvg from '../../assets/profile/male_photo.svg';

import { windowWidth } from '../../config/config'

const CityScreen = (props) => {

    const scrollRef = useRef(ScrollView);

    let { user, userProfile } = useSelector((state) => {
        return (
            state.user
        )
    });
    if (!userProfile) userProfile = {};
    const dispatch = useDispatch()
    const [profileData, setProfileData] = useState(userProfile);
    const [token, setToken] = useState('');
    const [city, setCity] = useState({});
    const [profiles, setProfiles] = useState([]);
    const [top, setTop] = useState(0);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');

    const getToken = async () => {
        const tokenData = await AsyncStorage.getItem(STORAGE_KEY);
        setToken(tokenData);
    }

    const scrollToTop = () => {
        scrollRef.current?.scrollTo({
            y : 0,
            animated : true
        });
    }

    const getListProfiles = async () => {
        const tokenData = await AsyncStorage.getItem(STORAGE_KEY);
        fetch(`${API_URL}/${'list/profiles?page=1&take=100'}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': tokenData
            }
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status !== 200) {
                    setIsError(true);
                    setMessage(jsonRes.message);
                } else {
                    setCity(jsonRes.city);
                    setProfiles(jsonRes.profiles);
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    }

    const getFilterPeople = async (filterData, tk = token) => {
        filterData.page = 1;
        filterData.take = 10;
        fetch(`${API_URL}/${'profiles/search'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token ? token : tk
            },
            body: JSON.stringify(filterData),
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status !== 200) {
                    setIsError(true);
                    setMessage(jsonRes.message);
                } else {
                    setCity(jsonRes.city);
                    setProfiles(jsonRes.profiles);
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    }

    const scrollPage = (sp) => {
        setTop(sp.nativeEvent.contentOffset.y);
    }

    const exitCity = () => {
        props.navigation.navigate('Search');
    }

    useEffect(() => {
        getToken();
        if(!props.navigation.state.params){
            getListProfiles();
        }
    }, [])

    if(props.navigation.state.params){
        if(props.navigation.state.params.filters){
            getFilterPeople(props.navigation.state.params.filters);
            props.navigation.state.params = null;
        }else if(props.navigation.state.params.enteredCityId){
            getListProfiles();
            props.navigation.state.params = null;
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardContainer}
        >
            <View style={{flex:1}}>
                <View style={styles.topHeader}>
                    <View style={styles.topHeaderInner}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Image source={require('../../assets/common/logo.png')} style={{width:40,height:40}} />
                            <TouchableOpacity onPress={() => props.navigation.navigate('Filters', {cityId:city.id})}>
                            <Text style={styles.CityInput}>Filter people in this city</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={exitCity}>
                            <Text style={styles.exitButton}>EXIT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} onScroll={scrollPage} style={styles.scrollContainer} ref={scrollRef} contentContainerStyle={{}}>
                    <View style={styles.mainInfoContainer}>
                        <View style={{marginLeft:8}}>
                            <View style={styles.cityPageTitle}>
                                <Text style={styles.PageTitle}>{city.name ? city.name : ''}</Text>
                            </View>
                            <View style={styles.cityLocationContainer}>
                                <Text numberOfLines={1} style={styles.cityLocation}>
                                    {city.subcountry ? city.subcountry + ', ' : ''}
                                    {city.country ? city.country : ''}
                                </Text>
                            </View>
                            <View style={styles.cityInfoContainer}>
                                <SvgXml width="20" height="22" xml={coffeTogoSvg} />
                                <View style={styles.cityInfoTextWrap}>
                                    <Text style={styles.cityPeopleNumber}>{city.people > 1000 ? city.people / 1000 : city.people}</Text>
                                    <Text style={styles.cityInfo}>people in this city right now</Text>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.divider, {marginTop:30}]}/>
                        {profiles.map((eProfile, index) => {
                            return (
                                user.id != eProfile.user.id ? 
                                <View key={index}>
                                    <View style={styles.eachPeopleInfoContainer}>
                                        <TouchableOpacity 
                                            style={styles.photoContainer} 
                                            onPress={()=>
                                                user.id != eProfile.user.id ?
                                                props.navigation.navigate('FriendProfile', {user_id:eProfile.user.id})
                                                : props.navigation.navigate('Profile')
                                            }>
                                            {eProfile.profilePicture?
                                                <Image source={{uri:eProfile.profilePicture}} style={styles.photoStyle} />
                                                :
                                                <View style={styles.photoWrap}>
                                                    <SvgXml width="29" height="100" xml={malePhotoSvg} />
                                                </View>
                                            }
                                        </TouchableOpacity>
                                        <View style={styles.InfoContainer}>
                                            <View style={styles.nameFieldWrap}>
                                                <Text style={styles.nameFiled}>
                                                    {eProfile.firstName ? eProfile.firstName + ' ' : ''}
                                                    {eProfile.lastName ? eProfile.lastName + ' ' : ''}
                                                    {new Date().getFullYear() - new Date(eProfile.birthday).getFullYear()}
                                                </Text>
                                            </View>
                                            <View style={styles.positionFieldWrap}>
                                                <SvgXml width="20" height="20" xml={currentLocationSvg} />
                                                <Text numberOfLines={1} style={styles.positionField}>
                                                    {eProfile.city.name + ', '}
                                                    {eProfile.city.subcountry + ', '}
                                                    {eProfile.city.country}
                                                </Text>
                                            </View>
                                            {eProfile.bio ?
                                            <View style={styles.bioFieldWrap}>
                                                <Text style={styles.bioField}>
                                                    {eProfile.bio}
                                                </Text>
                                            </View>
                                            : null}
                                            {eProfile.photo.length ? 
                                            <View style={styles.photosContainer} >
                                                {eProfile.photo.map((photoData, pIndex) => {
                                                    return (
                                                        <TouchableOpacity key={pIndex} style={[styles.ephotoStyle,{marginRight:pIndex==2?0:4}]}>
                                                            <Image source={{uri:photoData.photo}} style={styles.ePhoto}/>
                                                        </TouchableOpacity>
                                                    )
                                                })}
                                            </View>
                                            : 
                                            <View style={styles.photosContainer} >
                                                <TouchableOpacity style={styles.ephotoStyle}>
                                                    <Image source={{uri:eProfile.profilePicture}} style={styles.ePhoto}/>
                                                </TouchableOpacity>
                                            </View>
                                            }
                                            <TouchableOpacity style={styles.sendMessageButtonContainer} onPress={() => props.navigation.navigate('Chat', {r_id:eProfile.user.id})}>
                                                <LinearGradient 
                                                    style={styles.sendMessageButton} 
                                                    start={{x:0,y:0}} end={{x:1,y:0}} 
                                                    colors={['#DD2E44','#DD2E44']}> 
                                                    <Text style={styles.sendMessageText}>START MESSAGING</Text>
                                                </LinearGradient>
                                            </TouchableOpacity>
                                        </View> 
                                    </View>   
                                    <View style={styles.blockDivider}></View> 
                                </View>
                                :
                                null
                            )
                        })}
                    </View>
                </ScrollView>
                {top > 140 ? 
                <TouchableOpacity style={styles.scrollToTop} onPress={()=> scrollToTop()}>
                        <SvgXml width="24" height="21" xml={toTopSvg} />
                </TouchableOpacity>
                : null }
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={{alignItems:'center'}} onPress={()=> props.navigation.navigate('Home', {check:true})}>
                    <SvgXml style={{backgroundColor:'white'}} width="24" height="24" xml={homeActiveSvg} />
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
        </KeyboardAvoidingView>
    );
};

export default CityScreen;