import React,{useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View,ScrollView,KeyboardAvoidingView, Button, Image, Text,TouchableOpacity, DrawerLayoutAndroid, TextInput } from 'react-native';
import Textarea from 'react-native-textarea';
import { useDispatch } from 'react-redux';
import { setUserProfile } from '../../store/actions/index';
import {styles} from '../style/EditProfile';
import { launchImageLibrary } from 'react-native-image-picker';
import { SvgXml } from 'react-native-svg';
import {API_URL , STORAGE_KEY} from '../../config/config';
import arSvg from '../../assets/common/arrow-back.svg';
import photoSvg from '../../assets/common/photoSvg.svg';
import currentLocationSvg from '../../assets/profile/bx-current-location.svg';
import instagramSvg from '../../assets/profile/instagram.svg';
import snapchatSvg from '../../assets/profile/snapchat.svg';
import telegramSvg from '../../assets/profile/telegram.svg';
import linkedinSvg from '../../assets/profile/linkedin.svg';
import websiteSvg from '../../assets/profile/website.svg';
import homeSvg from '../../assets/common/home.svg';
import sendSvg from '../../assets/common/send.svg';
import profileSvg from '../../assets/common/profile.svg';

const EditProfileScreen = (props) => {
    const dispatch = useDispatch()
    const [token, setToken] = useState('');
    const [profileData, setProfileData] = useState(props.navigation.state.params.profileData);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [cityList, setCityList] = useState([]);
    const [cityId, setCityId] = useState(profileData.city.id);
    const [cityText, setCityText] = useState(profileData.city.name + ', ' + profileData.city.subcountry + ', ' + profileData.city.country);
    const [cityObject, setCityObject] = useState({});

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

    const selectedCity = (index) => {
        setCityText(cityList[index].name + ', ' + cityList[index].country);
        setCityId(cityList[index].id);
        let pData = {...profileData};
        pData.city = cityList[index];
        setProfileData(pData);
        setCityObject(cityList[index]);
        setCityList([]);
    }

    const selectFile = () => {

        var options = {
            title: 'Select Image',
            customButtons: [
                { 
                    name: 'customOptionKey', 
                    title: 'Choose file from Custom Option' 
                },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
    
        launchImageLibrary(options, res => {
            if (res.didCancel) {
               console.log('User cancelled image picker');
            } else if (res.error) {
               console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
               alert(res.customButton);
            } else {
               let source = res;
               if (source.assets) {
                    const data = new FormData();
                    data.append('picture', { 
                        uri: source.assets[0].uri, 
                        name: source.assets[0].fileName, 
                        type: source.assets[0].type 
                    });
                    fetch(`${API_URL}/${'profile/upload/photo?type=profile_picture'}`, {
                        method: 'POST',
                        headers: {
                            'token': token
                        },
                        body: data
                    })
                    .then(async res => { 
                        try {
                            const jsonRes = await res.json();
                            if (res.status !== 200) {
                                setIsError(true);
                                setMessage(jsonRes.response);
                            } else {
                                if (jsonRes.success) {
                                    setIsError(false);
                                    let pData = {...profileData};
                                    pData.profilePicture = jsonRes.photo_url;
                                    setProfileData(pData);
                                } else {
                                    setIsError(true);
                                    setMessage(jsonRes.response);
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
            }
        });
    };

    const changeName = (v) => {
        let nameArray = v.split(' ');
        let pData = profileData;
        pData.firstName = nameArray[0];
        pData.lastName = nameArray.length >= 2 ? nameArray[1] : '';
        setProfileData(pData);
    }

    const changeCity = (v) => {
    }

    const changeBio = (v) => {
        let pData = profileData;
        pData.bio = v;
        setProfileData(pData);
    }

    const changeInstagram = (v) => {
        let pData = profileData;
        pData.socialNetworks.instagram = v;
        setProfileData(pData);
    }

    const changeSnapchat = (v) => {
        let pData = profileData;
        pData.socialNetworks.snapchat = v;
        setProfileData(pData)
    }

    const changeTelegram = (v) => {
        let pData = profileData;
        pData.socialNetworks.telegram = v;
        setProfileData(pData)
    }

    const changeLinkedin = (v) => {
        let pData = profileData;
        pData.socialNetworks.linkedin = v;
        setProfileData(pData)
    }

    const changeWebsite = (v) => {
        let pData = profileData;
        pData.socialNetworks.website = v;
        setProfileData(pData)
    }

    const saveProfileData = () => {
        const payload = {
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            bio: profileData.bio,
            cityId: cityId,
            interests: [],
            socials: profileData.socialNetworks,
            profilePicture: profileData.profilePicture
        };
        fetch(`${API_URL}/${'profile/update'}`, {
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
                if (res.status !== 200) {
                    setIsError(true);
                    setMessage(jsonRes.message);
                } else {
                    if (jsonRes.success) {
                        setIsError(false);
                        setMessage(jsonRes.result);
                        myActionCreator().then(() => {
                            props.navigation.navigate('Profile', {from:'edited'});
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
    }

    const myActionCreator = () => {
        return new Promise((resolve, reject) => {
            dispatch(setUserProfile(profileData));
            resolve()
        });
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardContainer}
        >  
            <View style={styles.topHeader}>
                <View style={styles.topHeaderInner}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <TouchableOpacity onPress={() => props.navigation.goBack()}>
                            <SvgXml width="24" height="20" xml={arSvg} />
                        </TouchableOpacity>    
                        <Text style={styles.PageTitle}>Edit Profile</Text>
                    </View>
                    <TouchableOpacity onPress={saveProfileData}>
                        <Text style={styles.saveButton}>SAVE</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer} contentContainerStyle={{}}>
                <View style={styles.mainInfoContainer}>
                    <View>
                        <View style={styles.profileAvatarView}>
                            <Image source={{uri:profileData.profilePicture}} style={styles.profileAvatar}/>
                            <TouchableOpacity style={styles.uploadButton} onPress={selectFile}>
                                <SvgXml width="20" height="20" xml={photoSvg}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.divider}/>
                    <View style={styles.nameFieldWrap}>
                        <Text style={styles.nameFiledTitle}>NAME</Text>
                        <TextInput onChangeText={changeName} style={styles.nameFiled} defaultValue={
                            profileData.firstName + ' ' + profileData.lastName
                        }/>
                    </View>
                    <View style={styles.divider}/>
                    <View style={styles.nameFieldWrap}>
                        <Text style={styles.nameFiledTitle}>WHERE DO YOU LIVE?</Text>
                        <View style={styles.positionFieldWrap}>
                            <SvgXml width="20" height="20" xml={currentLocationSvg} />
                            <TextInput onChangeText={getCity} style={styles.positionField} value={cityText}  defaultValue={
                                profileData.city.name + ', ' + profileData.city.subcountry + ', ' + profileData.city.country}/>
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
                    </View>
                    <View style={styles.divider}/>
                    <View style={styles.nameFieldWrap}>
                        <Text style={styles.nameFiledTitle}>BIO</Text>
                        <View style={styles.positionFieldWrap}>
                            <Textarea
                                containerStyle={styles.textareaContainer}
                                style={styles.textarea}
                                onChangeText={changeBio}
                                defaultValue={profileData.bio}
                                maxLength={200}
                                placeholderTextColor={'#c7c7c7'}
                                underlineColorAndroid={'transparent'}
                            />
                        </View>
                    </View>
                    <View style={styles.divider}/>
                    <View style={styles.nameFieldWrap}>
                        <Text style={styles.nameFiledTitle}>SOCIAL</Text>
                        <View style={styles.socialFieldWrap}>
                            <SvgXml width="20" height="20" xml={instagramSvg} />
                            <TextInput onChangeText={changeInstagram} style={styles.socialField} multiline={false} placeholder='instagram' placeholderTextColor='#E5E5E5' defaultValue={
                                profileData.socialNetworks.instagram ? profileData.socialNetworks.instagram : ''
                            }/>
                        </View>
                        <View style={styles.socialFieldWrap}>
                            <SvgXml width="20" height="20" xml={snapchatSvg} />
                            <TextInput onChangeText={changeSnapchat} style={styles.socialField} multiline={false} placeholder='snapchat' placeholderTextColor='#E5E5E5' defaultValue={
                                profileData.socialNetworks.snapchat ? profileData.socialNetworks.snapchat : ''
                            }/>
                        </View>
                        <View style={styles.socialFieldWrap}>
                            <SvgXml width="20" height="20" xml={telegramSvg} />
                            <TextInput onChangeText={changeTelegram} style={styles.socialField} multiline={false} placeholder='telegram' placeholderTextColor='#E5E5E5' defaultValue={
                                profileData.socialNetworks.telegram ? profileData.socialNetworks.telegram : ''
                            }/>
                        </View>
                        <View style={styles.socialFieldWrap}>
                            <SvgXml width="20" height="20" xml={linkedinSvg} />
                            <TextInput onChangeText={changeLinkedin} style={styles.socialField} multiline={false} placeholder='email' placeholderTextColor='#E5E5E5' defaultValue={
                                profileData.socialNetworks.linkedin ? profileData.socialNetworks.linkedin : ''
                            }/>
                        </View>
                        <View style={styles.socialFieldWrap}>
                            <SvgXml width="20" height="20" xml={websiteSvg} />
                            <TextInput onChangeText={changeWebsite} style={styles.socialField} multiline={false} placeholder='website' placeholderTextColor='#E5E5E5' defaultValue={
                                profileData.socialNetworks.website ? profileData.socialNetworks.website : ''
                            }/>
                        </View>
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
        </KeyboardAvoidingView>
    );
};

export default EditProfileScreen;