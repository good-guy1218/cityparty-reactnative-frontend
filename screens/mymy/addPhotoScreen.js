import React, { useState, useEffect }from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector , useDispatch } from 'react-redux';
import { setUserProfile } from '../../store/actions/index';
import { View, ScrollView, Image, Text, TouchableOpacity} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import LinearGradient from 'react-native-linear-gradient';
import { SvgXml } from 'react-native-svg';
import arSvg from '../../assets/common/arrow-back.svg';
import photoSvg from '../../assets/common/photoSvg.svg';
import {API_URL , STORAGE_KEY} from '../../config/config';
import {styles} from '../style/Register';

const AddPhotoScreen = (props) => {
    let user = useSelector((state) => state.user.user);
    let userProfile = useSelector((state) => state.user.userProfile);
    if (!userProfile) userProfile = {};
    const dispatch = useDispatch()
    const [photoResourcePath, setPhotoResourcePath] = useState({});
    const [photoUrl, setPhotoUrl] = useState('');
    const [showAlert , setShowAlert] = useState(false); //success alert
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    useEffect(() => {
        // navigation.pop();
    }, [])
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
               setPhotoResourcePath(source);
            }
        });
    };

    const confirmAddPhoto = async () => {
        if (photoResourcePath.assets) {
            const token = await AsyncStorage.getItem(STORAGE_KEY);
            const data = new FormData();
            data.append('picture', { 
                uri: photoResourcePath.assets[0].uri, 
                name: photoResourcePath.assets[0].fileName, 
                type: photoResourcePath.assets[0].type 
            });
            setShowAlert(true);
            fetch(`${API_URL}/${'profile/upload/photo?type=profile_picture'}`, {
                method: 'POST',
                headers: {
                    'token': token
                },
                body: data
            })
            .then(async res => { 
                setShowAlert(false);
                try {
                    const jsonRes = await res.json();
                    if (res.status !== 200) {
                        setIsError(true);
                        setMessage(jsonRes.response);
                    } else {
                        if (jsonRes.success) {
                            setIsError(false);
                            let pUrl = jsonRes.photo_url;
                            pUrl = pUrl.replace(/^http:\/\//i, 'https://');
                            setPhotoUrl(pUrl);
                            userProfile.profilePicture = pUrl;
                            dispatch(setUserProfile(userProfile));
                            props.navigation.navigate('AddFullName');
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

    return (
        <ScrollView style={styles.container}>
            <View style={styles.topHeader}>
                <TouchableOpacity onPress={()=>props.navigation.goBack()}>
                    <SvgXml width="24" height="24" xml={arSvg} />
                </TouchableOpacity>
            </View>
            <View style={styles.PageContainer}>
                <Text style={[styles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
                <Text style={styles.FieldTitle}>Add a photo of you</Text>
                <View style={styles.profileAvatarView}>
                    <Image source={{uri: photoResourcePath.assets ? photoResourcePath.assets[0].uri : ''}} style={styles.profileAvatar}/>
                    <TouchableOpacity style={styles.uploadButton} onPress={selectFile}>
                        <SvgXml width="20" height="20" xml={photoSvg}/>
                    </TouchableOpacity>
                </View> 
                <TouchableOpacity style={styles.confirmButtonWrap} onPress={confirmAddPhoto}>
                    <LinearGradient 
                        style={styles.confirmButton} 
                        start={{x:0,y:0}} 
                        end={{x:1,y:0}} 
                        colors={[photoResourcePath.assets ? '#DD2E44' : '#C4C4C4' , photoResourcePath.assets ? '#DD2E44' : '#C4C4C4']}
                    > 
                        <Text style={styles.confirmButtonText}>CONFIRM</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <View style={styles.skipForNowWrap}>
                    <TouchableOpacity style={styles.signInOptionBtn} onPress={()=>props.navigation.navigate('AddFullName')}>
                        <Text style={styles.skipForNow}>skip for now</Text>
                    </TouchableOpacity>
                </View>

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

export default AddPhotoScreen;