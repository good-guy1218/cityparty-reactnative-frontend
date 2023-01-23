import React, { useState, useEffect, useRef }from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { withNavigation } from "react-navigation";
import { View, ScrollView, KeyboardAvoidingView, Button, Text, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SvgXml } from 'react-native-svg';
import currentLocationSvg from '../../assets/profile/bx-current-location.svg';
import threeDotSvg from '../../assets/common/threedot.svg';
import instagramSvg from '../../assets/profile/instagram.svg';
import snapchatSvg from '../../assets/profile/snapchat.svg';
import telegramSvg from '../../assets/profile/telegram.svg';
import tiktokSvg from '../../assets/profile/tiktok.svg';
import linkedinSvg from '../../assets/profile/linkedin.svg';
import websiteSvg from '../../assets/profile/website.svg';

import profileSvg from '../../assets/common/profile.svg';
import homeSvg from '../../assets/common/home.svg';
import sendSvg from '../../assets/common/send.svg';
import dangerSvg from '../../assets/common/danger_triangle.svg';
import closeSvg from '../../assets/common/close_square.svg';
import malePhotoSvg from '../../assets/profile/male_photo.svg';
import femalePhotoSvg from '../../assets/profile/female_photo.svg';
import noMessageSvg from '../../assets/message/no_message.svg';
import {API_URL , STORAGE_KEY} from '../../config/config';
import {styles} from '../style/FriendProfile';

const FriendProfileScreen = (props) => {
    let myProfile = useSelector((state) => state.user.userProfile);
    const [token, setToken] = useState('');
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [userData, setUserData] = useState({});
    const [profileData, setProfileData] = useState({});
    const [relationData,setRelationData] = useState({});
    const [myProfileData] = useState(myProfile);
    const [age, setAge] = useState(0);
    const [confirmModal, setConfirmModal] = useState(false);

    const showConfirmModal = () => {
        setConfirmModal(true);
    }

    const hideModal = () => {
        setConfirmModal(false);
    }

    const getUserData = async (userId) => {
        let tk = await AsyncStorage.getItem(STORAGE_KEY);
        fetch(`${API_URL}/${'users?user_id=' + userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': tk
            }
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status !== 200) {
                    setIsError(true);
                    setMessage(jsonRes.message);
                } else {
                    let{
                        mainContent,
                        relation
                    }=jsonRes
                    if(relation === null) relation = {};
                    setUserData(mainContent);
                    setProfileData(mainContent.profile);
                    setRelationData(relation);
                    var nYear = new Date().getFullYear();
                    var bYear = new Date(jsonRes.mainContent.profile.birthday).getFullYear();
                    setAge(nYear - bYear);
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

    const goPhotoView = (pIndex) => {
        props.navigation.navigate('PhotoView', {data:profileData.photo[pIndex], self:false});
    }
    
    const onChangeUserRelation = async(rtype)=>{
        hideModal();
        const tk = await AsyncStorage.getItem(STORAGE_KEY);
        let payload = {
            rUserId: userData.id,
            rType: rtype,
            val: true
        }
        fetch(`${API_URL}/relation/set`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': tk
            },
            body:JSON.stringify(payload)
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status !== 200) {
                    setIsError(true);
                } else {
                    if (jsonRes.success) {
                        setIsError(false);
                        let tp = {...relationData};
                        if(rtype==='block')
                            tp.block = true;
                        if(rtype==='flag')
                            tp.flag = true;
                        setRelationData(tp);
                    } else {
                        setIsError(true);
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

    if(props.navigation.state.params){
        if(props.navigation.state.params.user_id){
            getUserData(props.navigation.state.params.user_id);
            props.navigation.state.params = null;
        }
    }

    useEffect(() => {
        getToken();
        // getProfileData();
    }, [])
    
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardContainer}
        >   
            <View style={styles.topHeader}>
                <View style={styles.topHeaderInner}>
                    <Text style={styles.PageTitle}>Cityparty</Text>
                    <TouchableOpacity onPress={() => showConfirmModal()}>
                        <SvgXml width="5" height="24" xml={threeDotSvg} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={styles.container}>
                {relationData.block===true&&<View style={[styles.relationState,{backgroundColor:'#000000'}]}>
                    <Text style={styles.relationText}>user blocked</Text>
                </View>}
                {relationData.flag===true&&<View style={[styles.relationState,{backgroundColor:'#777777'}]}>
                    <Text style={styles.relationText}>user reported</Text>
                </View>}
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
                        <>
                        <View style={styles.blockDivider} ></View>
                        <View style={[styles.socialFieldWrap, {marginTop:20}]}>
                            <SvgXml width="20" height="20" xml={instagramSvg} />
                            <Text style={styles.socialField}>{profileData.socialNetworks.instagram}</Text>
                        </View>
                        </>
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
                        profileData.socialNetworks && profileData.socialNetworks.tiktok ?
                        <View style={styles.socialFieldWrap}>
                            <SvgXml width="20" height="20" xml={tiktokSvg} />
                            <Text style={styles.socialField}>{profileData.socialNetworks.tiktok}</Text>
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
                            <Text style={styles.socialField}>{profileData.socialNetworks.website}</Text>
                        </View>
                        :
                        null
                    }
                    <TouchableOpacity style={styles.buttonWrap} onPress={() => props.navigation.navigate('Chat', {r_id:userData.id})}>
                        <LinearGradient style={styles.sendButton} start={{x:0,y:0}} end={{x:1,y:0}} colors={['#DD2E44', '#DD2E44']}> 
                            <Text style={styles.buttonText}>SEND A MESSAGE</Text>
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
                            <SvgXml width="104" height="103" xml={noMessageSvg} />
                            <View style={styles.NoPicString}>
                                <Text style={styles.NoPicUserName}>{profileData.firstName} </Text>
                                <Text style={styles.NoPicTitle}>has no photos</Text>
                            </View>
                        </View> 
                    }
                </View>
            </ScrollView>
            {
            confirmModal ? 
            <TouchableOpacity style={styles.confrimModal} onPress={() => hideModal()}>
                <View style={styles.confirmMain}>
                    <View style={{alignItems:'center',marginBottom:21}}>
                        <View style={{marginTop:15, width:'25%', borderWidth:1, borderColor:'rgba(0, 0, 0, 0.8)'}}/>
                    </View>
                    <View>
                        <Text style={styles.confirmField}>
                            {profileData.firstName ? profileData.firstName + ' ' : ''}
                            {profileData.lastName ? profileData.lastName + ' ' : ''}
                        </Text>
                    </View>
                    <View style={{flexDirection:'column', justifyContent:'space-evenly',height:110,position:'absolute',bottom:20,left:40}}>
                        <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPress={()=>onChangeUserRelation('block')}>
                            <SvgXml width="24" height="24" xml={closeSvg} />
                            <Text style={styles.confirmText}>Block User</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}} onPress={()=>onChangeUserRelation('flag')}>
                            <SvgXml width="24" height="24" xml={dangerSvg} />
                            <Text style={styles.confirmText}>Report User</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
            :
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
                    {myProfile.profilePicture ? 
                        <Image source={ {uri:myProfile.profilePicture}} 
                            style={styles.navBarProfileAvatar}/>
                        :
                        <SvgXml style={{backgroundColor:'white'}} width="24" height="24" xml={profileSvg} />
                    }
                    <Text style={styles.navBarText}>ME</Text>
                </TouchableOpacity>
            </View>
            }
        </KeyboardAvoidingView>
    );
};

export default withNavigation(FriendProfileScreen);