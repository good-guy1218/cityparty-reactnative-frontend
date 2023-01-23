import React, { useState, useEffect }from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { View, ScrollView, Image, KeyboardAvoidingView, TextInput, Text, TouchableOpacity} from 'react-native';
import io from "socket.io-client";
import { withNavigationFocus } from 'react-navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SvgXml } from 'react-native-svg';
import searchSvg from '../../assets/home/svg/search.svg';
import homeSvg from '../../assets/common/home.svg';
import sendActiveSvg from '../../assets/common/send_active.svg';
import profileSvg from '../../assets/common/profile.svg';
import noMessageSvg from '../../assets/message/no_message.svg';
import dotSvg from '../../assets/chat/dot.svg';
import onlineDotSvg from '../../assets/chat/online_dot.svg';
import threeDotSvg from '../../assets/chat/threeDot.svg';
import {styles} from '../style/Message';

import {windowWidth, API_URL , SOCKET_URL, STORAGE_KEY} from '../../config/config';

const MessageScreen = (props) => {
    const user = useSelector((state) => state.user.user);
    const userProfile = useSelector((state) => state.user.userProfile);
    const socketInstance = useSelector((state) => state.user.socketInstance);
    const dispatch = useDispatch();

    const [token, setToken] = useState('');
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [profileData, setProfileData] = useState(userProfile);
    const [conversationList, setConversationList] = useState([]); //unread
    const [readConversationList, setReadConversationList] = useState([]); //read
    const [newConversationList, setNewConversationList] = useState([]);
    const [joinedUsersList, setJoinedUsersList] = useState([]);

    const getToken = async () => {
        const tokenData = await AsyncStorage.getItem(STORAGE_KEY);
        setToken(tokenData);
    }

    const getConversations = async () => {
        const tk = await AsyncStorage.getItem(STORAGE_KEY);
        fetch(`${API_URL}/${'conversations'}`, {
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
                    if (jsonRes.success) {
                        setIsError(false);
                        setMessage(jsonRes.result);
                        let conversationListRawData = jsonRes.result;
                        let newMessageRequest = [];
                        let theOthers = [];
                        let readMessages = [];
                        let unreadMessages = [];
                        conversationListRawData.map((eConversation, index) => {
                            if(eConversation.participants[0]?.user && eConversation.participants[1]?.user){
                                if(eConversation.participants[0].user.id == user.id && !eConversation.accepted && eConversation.messages){
                                    //New Message Request
                                    newMessageRequest.push(eConversation);
                                } else {
                                    //The Others
                                    if (eConversation.messages[0].readState || eConversation.messages[0].senderId == user.id) {
                                        readMessages.push(eConversation);
                                    } else {
                                        unreadMessages.push(eConversation);
                                    }
                                }
                            }
                        });
                        setNewConversationList(newMessageRequest);
                        setConversationList(unreadMessages);
                        setReadConversationList(readMessages)
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

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('didFocus', () => {
            getConversations();
        });
        return unsubscribe;
      }, [props.navigation]);

    useEffect(() => {
        getToken();
    }, [])


    useEffect(() => {
        socketInstance.emit('getjoinedusers');
        socketInstance.on('joinedusers', (joinedUsers) => {
            socketInstance.off('joinedusers');
            setJoinedUsersList(joinedUsers);
        });

        socketInstance.on('joined', (joinedUser) => {
            socketInstance.off('joined');
            setJoinedUsersList(prevData => prevData[joinedUser.user_id] = joinedUser);
        });

        socketInstance.on('outed', (outedUser) => {
            socketInstance.off('outed');
            setJoinedUsersList(prevData => prevData.splice(outedUser.user_id, 1));
        });

    }, [conversationList])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardContainer}
        >   
            <ScrollView style={styles.container}>
                <View style={styles.topHeader}>
                    <Text style={styles.PageTitle}>Chats</Text>
                </View>
                <View style={styles.PageContainer}>
                    <View style={styles.searchInputWrap}>
                        <SvgXml width="21" height="21" xml={searchSvg} />
                        <TextInput style={styles.messageTextInput} placeholder="search" placeholderTextColor="#66757F"></TextInput>
                    </View>
                    {
                        !readConversationList.length && !conversationList.length && !newConversationList.length ? 
                        <View style={styles.noMessageAvatarView}>
                            <SvgXml width="134" height="134" xml={noMessageSvg} />
                            <Text style={styles.noMessageDetails}>No messages here</Text>
                        </View>
                        :                     
                        <View style={styles.MessageListView}>
                            {newConversationList.length ?
                            <View style={styles.newChatView}>
                                {
                                    newConversationList.map((eNewConversation, index) => {
                                        return (
                                            <TouchableOpacity key={index} style={styles.chatItem} onPress={() => props.navigation.navigate('Chat', {r_id: eNewConversation.participants[1].user.id})}>
                                                <View style={styles.chatLeft}>
                                                    <Image 
                                                        source={{uri:eNewConversation.participants[1].user.profile.profilePicture ? eNewConversation.participants[1].user.profile.profilePicture : ''}} 
                                                        style={styles.userAvatar}/>
                                                    <View style={styles.textContainer}>
                                                        <Text numberOfLines={2} style={styles.userNameUnread}>
                                                            {eNewConversation.participants[1].user.profile.firstName ? eNewConversation.participants[1].user.profile.firstName : ''}
                                                            {' '}
                                                            {eNewConversation.participants[1].user.profile.lastName ? eNewConversation.participants[1].user.profile.lastName : ''}
                                                        </Text>
                                                        <Text style={styles.lastMessageUnread}>new message request</Text>
                                                    </View>
                                                </View>
                                                <Text style={styles.newButton}>new</Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                                <View style={styles.divider}></View>
                            </View>
                            : null }
                            <View style={styles.oldChatView}>
                            {
                                conversationList.map((eConversation, index) => {
                                    console.log(eConversation.participants.count+"  cc");
                                    return (
                                        (eConversation.participants[0]?.user && eConversation.participants[1]?.user)? 
                                        <TouchableOpacity 
                                            key={index}
                                            style={styles.chatItem} 
                                            onPress={() => props.navigation.navigate('Chat', {r_id: 
                                                eConversation.participants[0].user.id == user.id ? eConversation.participants[1].user.id : eConversation.participants[0].user.id})}
                                        >
                                            <View style={styles.chatLeft}>
                                                <Image 
                                                    source={{uri:
                                                        eConversation.participants[0].user.id == user.id ? 
                                                        eConversation.participants[1].user.profile.profilePicture ? eConversation.participants[1].user.profile.profilePicture : ''
                                                        : eConversation.participants[0].user.profile.profilePicture ? eConversation.participants[0].user.profile.profilePicture : ''
                                                    }} 
                                                    style={styles.userAvatar}/>
                                                <View style={styles.textContainer}>
                                                    <Text style={styles.userNameUnread}>
                                                            {
                                                                eConversation.participants[0].user.id == user.id ? 
                                                                eConversation.participants[1].user.profile.firstName ? eConversation.participants[1].user.profile.firstName : ''
                                                                : eConversation.participants[0].user.profile.firstName ? eConversation.participants[0].user.profile.firstName : ''
                                                            }
                                                            {' '}
                                                            {
                                                                eConversation.participants[0].user.id == user.id ? 
                                                                eConversation.participants[1].user.profile.lastName ? eConversation.participants[1].user.profile.lastName : ''
                                                                : eConversation.participants[0].user.profile.lastName ? eConversation.participants[0].user.profile.lastName : ''
                                                            }
                                                    </Text>
                                                    <Text numberOfLines={1} style={[styles.lastMessageUnread, {width:windowWidth - 160}]}>
                                                        {eConversation.messages[0] ? eConversation.messages[0].message : ''}
                                                    </Text>
                                                </View>
                                            </View>
                                            <TouchableOpacity style={{marginRight:15}}>
                                                {
                                                    eConversation.participants[0].user.id == user.id ?
                                                        joinedUsersList[eConversation.participants[1].user.id] ? 
                                                            <SvgXml style={{backgroundColor:'white'}} width="10" height="10" xml={onlineDotSvg} />
                                                        :  <SvgXml style={{backgroundColor:'white'}} width="10" height="10" xml={dotSvg} />
                                                    :   joinedUsersList[eConversation.participants[0].user.id] ? 
                                                            <SvgXml style={{backgroundColor:'white'}} width="10" height="10" xml={onlineDotSvg} />
                                                        :  <SvgXml style={{backgroundColor:'white'}} width="10" height="10" xml={dotSvg} />
                                                }
                                            </TouchableOpacity>
                                        </TouchableOpacity>
                                        : null 
                                    )
                                })
                            }
                            </View>
                            <View style={styles.oldChatView}>
                            {
                                readConversationList.map((eConersation, index) => {
                                    return (
                                        eConersation.participants[0].user.profile && eConersation.participants[1].user.profile ? 
                                        <TouchableOpacity 
                                            key={index}
                                            style={styles.chatItem} 
                                            onPress={() => props.navigation.navigate('Chat', {r_id: 
                                                eConersation.participants[0].user.id == user.id ? eConersation.participants[1].user.id : eConersation.participants[0].user.id})}
                                        >
                                            <View style={styles.chatLeft}>
                                                <Image 
                                                    source={{uri:
                                                        eConersation.participants[0].user.id == user.id ? 
                                                        eConersation.participants[1].user.profile.profilePicture ? eConersation.participants[1].user.profile.profilePicture : ''
                                                        : eConersation.participants[0].user.profile.profilePicture ? eConersation.participants[0].user.profile.profilePicture : ''
                                                    }} 
                                                    style={styles.userAvatar}/>
                                                <View style={styles.textContainer}>
                                                    <Text style={styles.userNameRead}>
                                                            {
                                                                eConersation.participants[0].user.id == user.id ? 
                                                                eConersation.participants[1].user.profile.firstName ? eConersation.participants[1].user.profile.firstName : ''
                                                                : eConersation.participants[0].user.profile.firstName ? eConersation.participants[0].user.profile.firstName : ''
                                                            }
                                                            {' '}
                                                            {
                                                                eConersation.participants[0].user.id == user.id ? 
                                                                eConersation.participants[1].user.profile.lastName ? eConersation.participants[1].user.profile.lastName : ''
                                                                : eConersation.participants[0].user.profile.lastName ? eConersation.participants[0].user.profile.lastName : ''
                                                            }
                                                    </Text>
                                                    <Text numberOfLines={1} style={[styles.lastMessageRead, {width:windowWidth - 160}]}>
                                                        {eConersation.messages[0] ? eConersation.messages[0].message : ''}
                                                    </Text>
                                                </View>
                                            </View>
                                            <TouchableOpacity style={{marginRight:15}}>
                                                <SvgXml style={{backgroundColor:'white'}} width="4" height="16" xml={threeDotSvg} />
                                            </TouchableOpacity>
                                        </TouchableOpacity>
                                        : null 
                                    )
                                })
                            }
                                {/* <TouchableOpacity style={styles.chatItem}>
                                    <View style={styles.chatLeft}>
                                        <Image source={require('../../assets/chat/user7.png')} 
                                            style={styles.userAvatar}/>
                                        <View style={styles.textContainer}>
                                            <Text style={styles.userNameUnread}>Ludovica Belli</Text>
                                            <Text style={styles.lastMessageUnread}>i'll tell you</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={{marginRight:15}}>
                                        <SvgXml style={{backgroundColor:'white'}} width="10" height="10" xml={dotSvg} />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.chatItem}>
                                    <View style={styles.chatLeft}>
                                        <Image source={require('../../assets/chat/user6.png')} 
                                            style={styles.userAvatar}/>
                                        <View style={styles.textContainer}>
                                            <Text style={styles.userNameRead}>Jimmy George</Text>
                                            <Text style={styles.lastMessageRead}>maybe we can do some</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={{marginRight:18}}>
                                        <SvgXml style={{backgroundColor:'white'}} width="4" height="16" xml={threeDotSvg} />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.chatItem}>
                                    <View style={styles.chatLeft}>
                                        <Image source={require('../../assets/chat/user5.png')} 
                                            style={styles.userAvatar}/>
                                        <View style={styles.textContainer}>
                                            <Text style={styles.userNameRead}>Yvonne Rossi</Text>
                                            <Text style={styles.lastMessageRead}>thank you</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={{marginRight:18}}>
                                        <SvgXml style={{backgroundColor:'white'}} width="4" height="16" xml={threeDotSvg} />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.chatItem}>
                                    <View style={styles.chatLeft}>
                                        <Image source={require('../../assets/chat/user4.png')} 
                                            style={styles.userAvatar}/>
                                        <View style={styles.textContainer}>
                                            <Text style={styles.userNameRead}>Jeffrey Lingard</Text>
                                            <Text style={styles.lastMessageRead}>😁😁</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={{marginRight:18}}>
                                        <SvgXml style={{backgroundColor:'white'}} width="4" height="16" xml={threeDotSvg} />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.chatItem}>
                                    <View style={styles.chatLeft}>
                                        <Image source={require('../../assets/chat/user8.png')} 
                                            style={styles.userAvatar}/>
                                        <View style={styles.textContainer}>
                                            <Text style={styles.userNameRead}>Heather Frings</Text>
                                            <Text style={styles.lastMessageRead}>ok</Text>
                                        </View>
                                    </View>
                                    <TouchableOpacity style={{marginRight:18}}>
                                        <SvgXml style={{backgroundColor:'white'}} width="4" height="16" xml={threeDotSvg} />
                                    </TouchableOpacity>
                                </TouchableOpacity> */}
                            </View>
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
                    <SvgXml style={{backgroundColor:'white'}} width="24" height="24" xml={sendActiveSvg} />
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

export default MessageScreen;