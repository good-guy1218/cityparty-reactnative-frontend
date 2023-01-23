import React, { useState, useEffect, useRef }from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector , useDispatch } from 'react-redux';
import { withNavigation } from "react-navigation";
import { View, ScrollView, KeyboardAvoidingView, Button, Text, TouchableOpacity, Image} from 'react-native';
import Drawer from 'react-native-drawer'
import LinearGradient from 'react-native-linear-gradient';
import { SvgXml } from 'react-native-svg';
import currentLocationSvg from '../../assets/profile/bx-current-location.svg';
import instagramSvg from '../../assets/profile/instagram.svg';
import snapchatSvg from '../../assets/profile/snapchat.svg';
import telegramSvg from '../../assets/profile/telegram.svg';
import linkedinSvg from '../../assets/profile/linkedin.svg';
import websiteSvg from '../../assets/profile/website.svg';
import homeSvg from '../../assets/common/home.svg';
import sendSvg from '../../assets/common/send.svg';
import malePhotoSvg from '../../assets/profile/male_photo.svg';
import femalePhotoSvg from '../../assets/profile/female_photo.svg';
import maleNoPicSvg from '../../assets/profile/male_no_pic.svg';
import femaleNoPicSvg from '../../assets/profile/female_no_pic.svg';
import hamburgerSvg from '../../assets/common/hamburger.svg';
import profileSvg from '../../assets/common/profile.svg';
import { setUser, setUserProfile, setSocketInstance } from '../../store/actions/index';
import { useHeaderHeight } from '@react-navigation/elements';
import {API_URL , STORAGE_KEY} from '../../config/config';
import {styles} from '../style/Profile';
import { Linking } from 'react-native';

import { windowWidth } from '../../config/config';

const ProfileScreen = (props) => {
    let user = useSelector((state) => state.user.user);
    let userProfile = useSelector((state) => state.user.userProfile);
    const dispatch = useDispatch();
    var nYear = new Date().getFullYear();
    var bYear = new Date(userProfile.birthday).getFullYear();
    let drawer = useRef(null);
    const [token, setToken] = useState('');
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [profileData, setProfileData] = useState(userProfile);
    const [age, setAge] = useState(nYear - bYear);
    const [uploadingSatus, setUploadingSatus] = useState(0);

    const setUploadingStatus = (v) => {
        setUploadingSatus(v);
        const timer = setInterval(() => {
            if (v != 1) 
                setUploadingSatus(0);
            clearInterval(timer);
        }, 1000)
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
               console.log('User tapped custom button: ', res.customButton);
               alert(res.customButton);
            } else {
               let source = res;
               confirmAddPhoto(source);
            }
        });
    };

    const confirmAddPhoto = (pData) => {
        const data = new FormData();
        data.append('picture', { 
            uri: pData.assets[0].uri, 
            name: pData.assets[0].fileName, 
            type: pData.assets[0].type 
        });
        setUploadingStatus(1);
        fetch(`${API_URL}/${'profile/upload/photo?type=profile'}`, {
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
                    setUploadingStatus(3);
                } else {
                    if (jsonRes.success) {
                        setIsError(false);
                        upload_new_profile_picture(jsonRes.photo_url);
                    } else {
                        setUploadingStatus(3);
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

    const upload_new_profile_picture = (pUrl) => {
        const payload = {
            picture_url: pUrl
        }
        fetch(`${API_URL}/${'profile/upload/profile_picture'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(payload)
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status !== 200) {
                    setIsError(true);
                    setMessage(jsonRes.result);
                    setUploadingStatus(3);
                } else {
                    if (jsonRes.success) {
                        setIsError(false);
                        setMessage(jsonRes.result);
                        setUploadingStatus(2);
                        let profileDataCopy = profileData;
                        if(!profileDataCopy.photo) profileDataCopy.photo = [];
                        profileDataCopy.photo.push(jsonRes.result);
                        setProfileData(profileDataCopy);
                        dispatch(setUserProfile(profileDataCopy));
                    } else {
                        setIsError(true);
                        setMessage(jsonRes.result);
                        setUploadingStatus(3);
                    }
                }
            } catch (err) {
                console.log(err);
                setUploadingStatus(3);
            };
        })
        .catch(err => {
            console.log(err);
        });
    }

    const closeControlPanel = () => {
        drawer?.close()
      };
    const openControlPanel = () => {
        drawer?.open()
      };

    const drawerStyles = {
        drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
    }

    const getProfileDataFromRedux = () => {
        userProfile = useSelector((state) => state.user.userProfile);
        setProfileData(userProfile);
    }
    
    const getProfileData = () => {
        fetch(`${API_URL}/${'profile'}`, {
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
                        var nYear = new Date().getFullYear();
                        var bYear = new Date(jsonRes.result.birthday).getFullYear();
                        setAge(nYear - bYear);
                        setProfileData(jsonRes.result)
                        dispatch(setUserProfile(jsonRes.result));
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

    const getToken = async () => {
        const tokenData = await AsyncStorage.getItem(STORAGE_KEY);
        setToken(tokenData);
    }

    const goToEditProfile = () => {
        closeControlPanel();
        if (!profileData.socialNetworks) profileData.socialNetworks = {};
        props.navigation.navigate('EditProfile', {profileData});   
    }

    const goToGeneral = () => {
        closeControlPanel();
        props.navigation.navigate('General'); 
    }

    const goPhotoView = (pIndex) => {
        props.navigation.navigate('PhotoView', {data:profileData.photo[pIndex], self:true});
    }

    if(props.navigation.state.params){
        if(props.navigation.state.params.from == 'edited' || props.navigation.state.params.from == 'deletePhoto'){
            getProfileData();
            props.navigation.state.params = null;
        }
    }

    useEffect(() => {
        getToken();
      //  getProfileData();
    }, [])
    
    return (
        <Drawer
            type="overlay"
            tapToClose={true}
            openDrawerOffset={0.17} // 20% gap on the right side of drawer
            panCloseMask={0}
            closedDrawerOffset={-3}
            styles={drawerStyles}
            side={'right'}
            tweenHandler={(ratio) => ({
                main: { opacity:(3-ratio)/2 }
            })}
            ref={(ref) => drawer = ref}
            content={
                <View style={[{display:'flex', flexDirection:'column', justifyContent:'flex-start', alignItems:'stretch', flex:1}, styles.navigationContainer]}>
                    <TouchableOpacity onPress={goToEditProfile}>
                        <Text style={styles.drawderNenu}>Edit Profile</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} ></View>
                    <TouchableOpacity onPress={goToGeneral}>
                        <Text style={styles.drawderNenu}>General</Text>
                    </TouchableOpacity>
                </View>
            }
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardContainer}
            >   
                <View style={styles.topHeader}>
                    <View style={styles.topHeaderInner}>
                        <Text style={styles.PageTitle}>Cityparty</Text>
                        <TouchableOpacity onPress={openControlPanel}>
                            <SvgXml width="24" height="24" xml={hamburgerSvg} />
                        </TouchableOpacity>
                    </View>
                </View>
                {uploadingSatus ? 
                    <TouchableOpacity onPress={() => setUploadingStatus(0)}>
                        <View style={[styles.topStatusBar, {backgroundColor: uploadingSatus == 1 ? '#55ACEE' : uploadingSatus == 2 ? '#0DA61C' : '#bb2124'}]}>
                            <Text style={styles.statusText}>{uploadingSatus == 1 ? 'uploading photo...' : uploadingSatus == 2 ? 'completed!' : 'upload faild!'}</Text>
                        </View>
                    </TouchableOpacity>
                :
                null
                }
                <ScrollView style={styles.container}>
                    <View style={styles.PageContainer}>
                        <View style={styles.profilePhotoContainer}>
                            {profileData.profilePicture ? 
                            <View>
                                <View style={styles.profileAvatarView}>
                                    <Image source={{uri:profileData.profilePicture}} 
                                        style={styles.profileAvatar}/>
                                </View>
                            </View>
                            :
                            <View style={styles.photoWrap}>
                                <SvgXml width="65" height="100" xml={profileData.gender == 'M' ? malePhotoSvg : femalePhotoSvg} />
                            </View>
                            }
                        </View>
                        <View style={styles.profilePhotoContainer}>
                            <Text style={styles.nameField}>
                                {profileData.firstName ? profileData.firstName + ' ' : ''}
                                {profileData.lastName ? profileData.lastName + ' ' : ''}
                                {age ? age : ''}
                            </Text>
                        </View>
                        {
                            profileData.city ?
                            <View style={styles.positionFieldWrap}>
                                <SvgXml width="20" height="20" xml={currentLocationSvg} />
                                <Text style={styles.positionField}>
                                    {profileData.city.name + ', '}
                                    {profileData.city.subcountry + ', '}
                                    {profileData.city.country}
                                </Text>
                            </View>
                        :
                            null
                        }
                        {
                            profileData.bio ?
                            <View style={styles.specialFieldWrap}>
                                <Text style={styles.specialFiled}>{profileData.bio}</Text>
                            </View> 
                            :
                            null
                        }
                        {
                            profileData.socialNetworks && profileData.socialNetworks.instagram ?
                                <View style={styles.blockDivider} ></View>
                        :
                            null
                        }
                        {
                            profileData.socialNetworks && profileData.socialNetworks.instagram ?
                            <View style={[styles.socialFieldWrap, {marginTop:20}]}>
                                <SvgXml width="20" height="20" xml={instagramSvg} />
                                <Text style={styles.socialField}>{profileData.socialNetworks.instagram}</Text>
                            </View>
                            :
                            null
                        }
                        {
                            profileData.socialNetworks && profileData.socialNetworks.snapchat ?
                            <View style={styles.socialFieldWrap}>
                                <SvgXml width="20" height="20" xml={snapchatSvg} />
                                <Text style={styles.socialField}>{profileData.socialNetworks.snapchat}</Text>
                            </View>
                            :
                            null
                        }
                        {
                            profileData.socialNetworks && profileData.socialNetworks.telegram ?
                            <View style={styles.socialFieldWrap}>
                                <SvgXml width="20" height="20" xml={telegramSvg} />
                                <Text style={styles.socialField}>{profileData.socialNetworks.telegram}</Text>
                            </View>
                            :
                            null
                        }
                        {
                            profileData.socialNetworks && profileData.socialNetworks.linkedin ?
                            <View style={styles.socialFieldWrap}>
                                <SvgXml width="20" height="20" xml={linkedinSvg} />
                                <Text style={styles.socialField}>{profileData.socialNetworks.linkedin}</Text>
                            </View>
                            :
                            null
                        }
                        {
                            profileData.socialNetworks && profileData.socialNetworks.website ?
                            <View style={styles.socialFieldWrap}>
                                <SvgXml width="20" height="20" xml={websiteSvg} />
                                <Text style={styles.socialField}onPress={() => Linking.openURL(profileData.socialNetworks.website)}>{profileData.socialNetworks.website}</Text>
                            </View>
                            :
                            null
                        }
                        <TouchableOpacity style={styles.buttonWrap} onPress={selectFile}>
                            <LinearGradient style={styles.addButton} start={{x:0,y:0}} end={{x:1,y:0}} colors={['#FFF', '#FFF']}> 
                                <Text style={styles.buttonText}>+ add new</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        {
                            profileData.photo && profileData.photo.length ?
                            <View style={styles.photoSliderWrap} >
                                {
                                    profileData.photo.map((photoData, index) => {
                                        return (
                                            <TouchableOpacity key={index} style={styles.ePhotoContainer} onPress={() => goPhotoView(index)}>
                                                <Image source={{uri:photoData.photo}} style={{width:'100%',height:'100%'}}/>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View>
                            :
                            <View style={styles.NoPicView}>
                                <SvgXml width="138" height="208" xml={profileData.gender == 'M' ? maleNoPicSvg : femaleNoPicSvg} />
                                <Text style={styles.NoPicTitle}>No pics here</Text>
                                <Text style={styles.NoPicDetails}>what about posting</Text>
                                <Text style={styles.NoPicDetails}>the first one? :)</Text>
                            </View> 
                        }
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
        </Drawer>
    );
};

export default withNavigation(ProfileScreen);