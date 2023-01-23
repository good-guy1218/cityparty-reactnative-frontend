import React, { useState ,useRef, useEffect} from 'react';
import { View,FlatList, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import Toast from './MyToast';
import {default_photo, windowHeight, windowWidth} from '../../config/config';
import { SvgXml } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import arSvg from '../../assets/common/arrow-back.svg';
import {API_URL , STORAGE_KEY} from '../../config/config';
import { ScrollView } from 'react-native-gesture-handler';

const BlockListScreen = (props) => {

    const [blockList,setBlockList] = useState([]);
    const [token, setToken] = useState('');
    const [loadingAlert,setLoadingAlert] = useState(false);
    const [isError, setIsError] =  useState(false);

    const defaultToast = useRef(null);

    //load whole user list at first
    useEffect(() => {
        setLoadingAlert(true);
        getBlockList();
        setLoadingAlert(false);
        getToken();
    }, []);  
    const getToken = async () => {
        const tokenData = await AsyncStorage.getItem(STORAGE_KEY);
        setToken(tokenData);
    }
    //load block list
    const getBlockList = async () =>{
        const tk =  await AsyncStorage.getItem(STORAGE_KEY);
        fetch(`${API_URL}/${'relation?relationType=block'}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': tk
            }
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                console.log(jsonRes);
                if (res.status !== 200) {
                    setIsError(true);
                } else {
                    if (jsonRes.success) {
                        setIsError(false);
                        setBlockList(jsonRes.result);
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

    const unblockUser = async (rId) => {
        const tk = await AsyncStorage.getItem(STORAGE_KEY);
        const rtype = 'block';
        let payload = {
            rUserId: rId,
            rType: rtype,
            val: false
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
                        let tp = [...blockList];
                        tp.map((eTp, index) => {
                            if(eTp.rUser.id === rId)
                                tp.splice(index,1);
                        });
                        setBlockList(tp);
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

    //render full name to first & last
    const renderName = (name) => {
        const fl_name = name.split(' ');
        const first_name = fl_name[0];
        const last_name = fl_name.length > 1 ? fl_name[1]:'';
        return (
            <View style={styles.nameContainer}>
                <Text style={styles.first_name}>{first_name} </Text>
                <Text style={styles.last_name}>{last_name}</Text>
            </View>
        )
    };

    return (
        <View style={styles.container}>
            <View style={styles.topHeader}>
                <View style={styles.topHeaderInner}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <TouchableOpacity onPress={() => props.navigation.goBack()}>
                            <SvgXml width="24" height="20" xml={arSvg} />
                        </TouchableOpacity>    
                        <Text style={styles.PageTitle}>BLOCKED USERS</Text>
                    </View>
                </View>
            </View>
            <ScrollView style={styles.searchUserListContainer}>
                {
                    blockList.length ? 
                    blockList.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} style={styles.historyItemContainer}>
                                <View style={[{flexDirection:'row'},{alignItems:'center'}]}>
                                    <Image style={styles.photo} 
                                        source={{
                                            uri: item.rUser.profile.profilePicture==''?default_photo:item.rUser.profile.profilePicture
                                        }}>
                                    </Image>
                                    <Text style={styles.name}>
                                        {item.rUser.profile.firstName ? item.rUser.profile.firstName + ' ' : ''}
                                        {item.rUser.profile.lastName ? item.rUser.profile.lastName + ' ' : ''}
                                    </Text>
                                </View>
                                <TouchableOpacity style={styles.unblockContainer} onPress={() => unblockUser(item.rUser.id)}>
                                    <Text style={styles.unblockButton}>UNBLOCK</Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )
                    }) : null
                }
            </ScrollView>
            <AwesomeAlert
                show={loadingAlert}
                showProgress={true}
                title="Processing"
                message="Wait a moment..."
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
            />
            <Toast ref = {defaultToast} backgroundColor = "#57D172" style={styles.myToast}/>
       </View>
    );
};

const styles = StyleSheet.create({
    unblockContainer:{
        borderWidth:1,
        borderColor:'rgba(0, 0, 0, 0.3)',
        width:87,
        height:33,
        alignItems:'center',
        justifyContent:'center'
    },
    unblockButton:{
        fontSize:12,
        fontFamily:'Montserrat_500Medium'
    },
    container: {
        width: '100%',
        height:'100%',
        display: "flex", 
        flexDirection: "row", 
        flexWrap: "wrap",
        backgroundColor:'white',
        marginBottom:50,
        alignItems:'center'
    },
    searchUserListContainer:{
        marginLeft:21,
        height:windowHeight - 180
    },
    nameContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:14
    },
    historyItemContainer:{
        marginTop:12,
        width:windowWidth - 40,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    name:{
        fontFamily:'Montserrat_500Medium',
        fontSize:16,
        lineHeight:20,
        marginLeft:14
    },
    photo:{
        width:35 * windowWidth / 375,
        height:35 * windowWidth / 375,
        borderRadius:50
    },
    searchContainer:{
        width:windowWidth,
        alignItems:'center',
        height:44
    },
    searchInput:{
        fontSize:14,
        paddingLeft:20,
        width:windowWidth - 40,
        justifyContent:'center',
        borderWidth:1,
        height:'100%',
        borderRadius:4,
        borderColor:'#E5E5E5',
        fontFamily:'Montserrat_400Regular'
    },
    headerLeftContainer:{
        marginLeft:25
    },
    headerRightContainer:{
        marginRight:25
    },
    topHeader:{
        height:70,
        width:windowWidth,
        paddingHorizontal:22,
        flexDirection:'column',
        justifyContent:'center',
        backgroundColor:'#FFFFFF',
    },
    topHeaderInner:{
        flexDirection:'row',
        justifyContent: 'space-between',
    },
    PageTitle:{
        fontFamily: 'Montserrat-Bold',
        fontSize:20,
        lineHeight:24,
        color:'black',
        marginLeft: 15
    },
});

export default BlockListScreen;