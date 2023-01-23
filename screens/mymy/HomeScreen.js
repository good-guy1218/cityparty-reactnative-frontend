import React, { useState, useEffect }from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { View, ScrollView, Image, KeyboardAvoidingView, TextInput, Text, TouchableOpacity} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { SvgXml } from 'react-native-svg';
import homeAvatarSvg from '../../assets/home/svg/homeAvatar.svg';
import searchSvg from '../../assets/home/svg/search.svg';
import homeActiveSvg from '../../assets/common/home_active.svg';
import sendSvg from '../../assets/common/send.svg';
import profileSvg from '../../assets/common/profile.svg';
import {styles} from '../style/Home';

const HomeScreen = (props) => {
    let { user, userProfile } = useSelector((state) => {
        return (
            state.user
        )
    });
    if (!userProfile) userProfile = {};
    const dispatch = useDispatch();

    const [city, setCity] = useState('');
    const [profileData, setProfileData] = useState(userProfile);

    if(!userProfile) {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'AddPhoto'})],
        });
        props.navigation.dispatch(resetAction); 
    }else{
        if(userProfile.enteredCityId) {
            // props.navigation.navigate('City', {enteredCityId: userProfile.enteredCityId});
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'City'})],
                params: {enteredCityId: userProfile.enteredCityId}
            });
            props.navigation.dispatch(resetAction); 
        }

        if(props.navigation.state.params){
            if(userProfile.enteredCityId){
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'City'})],
                    params: {enteredCityId: userProfile.enteredCityId}
                });
                props.navigation.dispatch(resetAction); 
            }
        }
    }

    useEffect(() => {
        
    }, [])
    

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardContainer}
        >   
            <View style={styles.topHeader}>
                <TouchableOpacity onPress={()=>props.navigation.goBack()}>
                    <Text style={styles.PageTitle}>Cityparty</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.container}>
                <View style={styles.PageContainer}>
                    <View style={styles.homeAvatarView}>
                        <SvgXml width="100" height="146" xml={homeAvatarSvg} />
                        <Text style={styles.homeDetailsFirst}>Search and enter the City</Text>
                        <Text style={styles.homeDetails}>where you want to talk and meet</Text>
                        <Text style={styles.homeDetails}>people</Text>
                    </View> 
                    <TouchableOpacity style={styles.searchInputWrap} onPress={()=>props.navigation.navigate('Search')}>
                        <SvgXml width="24" height="24" xml={searchSvg} />
                        <Text style={styles.cityTextInput}>search city</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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

export default HomeScreen;