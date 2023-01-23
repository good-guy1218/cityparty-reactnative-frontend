import React, { useState, useEffect }from 'react';
import { useSelector , useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL , STORAGE_KEY} from '../../config/config';
import { View, Image, Text, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import { SvgXml } from 'react-native-svg';
import arSvg from '../../assets/common/whiteBack.svg';
import threeDotSvg from '../../assets/common/whiteThree.svg';
import {styles} from '../style/PhotoView';

const PhotoViewScreen = (props) => {
    userProfile = useSelector((state) => state.user.userProfile);
    const dispatch = useDispatch();

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [photoData, setPhotoData] = useState(props.navigation.state.params ? props.navigation.state.params.data : {});
    const [isSelf, setIsSelf] = useState(props.navigation.state.params ? props.navigation.state.params.self : false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);

    const showDeleteModal = () => {
        setDeleteModal(true);
    }

    const showConfirmModal = () => {
        setDeleteModal(false);
        setConfirmModal(true);
    }

    const hideModal = () => {
        setDeleteModal(false);
        setConfirmModal(false);
    }

    const deletePhoto = async () => {
        const tokenData = await AsyncStorage.getItem(STORAGE_KEY);
        fetch(`${API_URL}/${'profile/delete/photo?id=' + photoData.id}`, {
            method: 'DELETE',
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
                    if (jsonRes.success) {
                        props.navigation.navigate('Profile', {from:'deletePhoto'});
                    }else {
                        setIsError(true);
                        setMessage(jsonRes.message);
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

    useEffect(() => {
    }, [])
    
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardContainer}
        >   
            <View style={styles.container}>
                <View style={styles.topHeader}>
                    <TouchableOpacity onPress={()=>props.navigation.goBack()}>
                         <SvgXml width="24" height="24" xml={arSvg} />
                    </TouchableOpacity>
                    {isSelf ? 
                        <TouchableOpacity onPress={()=>showDeleteModal()}>
                            <SvgXml width="24" height="24" xml={threeDotSvg} />
                        </TouchableOpacity>
                    : null}
                </View>
                <Image source={{uri: photoData.photo ? photoData.photo : ''}} 
                                style={styles.photoview}/>
                {
                    deleteModal ? 
                    <View style={styles.deleteModal}>
                        <TouchableOpacity onPress={() => showConfirmModal()}>
                            <Text style={styles.delteText}>Delete photo</Text>
                        </TouchableOpacity>
                    </View>
                    : null
                }
                {
                confirmModal ? 
                <View style={styles.confrimModal}>
                    <TouchableOpacity onPress={() => deletePhoto()}>
                        <Text style={styles.confirmText}>yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => hideModal()}>
                        <Text style={styles.confirmText}>no</Text>
                    </TouchableOpacity>
                </View>
                 : null
                }
            </View>
        </KeyboardAvoidingView>
    );
};

export default PhotoViewScreen;