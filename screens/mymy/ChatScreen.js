import React, { useState, useEffect, useRef } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ScrollView, Image, Text, TouchableOpacity, TextInput} from 'react-native';
import { SvgXml } from 'react-native-svg';
import arSvg from '../../assets/common/arrow-back.svg';
import sendDeactive from '../../assets/chat/sendDeactive.svg';
import sendActive from '../../assets/chat/sendActive.svg';
import {API_URL , STORAGE_KEY} from '../../config/config';
import {styles} from '../style/Chat';

const ChatScreen = (props) => {

    if(!props.navigation.state.params){
        props.navigation.goBack()
    }

    let { user, userProfile, socketInstance} = useSelector((state) => {
        return (
            state.user
        )
    });
    if (!userProfile) userProfile = {};
    const dispatch = useDispatch();
    const [token, setToken] = useState('');
    const [conversation, setConversation] = useState({});
    const [rUserProfile, setRUserProfile] = useState({});
    const [messageContent, setMessageContent] = useState('');
    const [messageList, setMessageList] = useState([]);
    const [isError, setIsError] =  useState(false);
    const [message, setMessage] = useState('');
    const [onlineStatus, setOnlineStatus] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [receiverFlag, setReceiverFlag] = useState(false);
    const [blockStatus, setBlockStatus] = useState(false);

    const scrollRef = useRef();

    const tMonth = new Date().getMonth();
    const tDay = new Date().getDate();
    

    const getToken = async () => {
        const tokenData = await AsyncStorage.getItem(STORAGE_KEY);
        setToken(tokenData);
    }

    const createConversation = async (r_id) => {
        const tk = await AsyncStorage.getItem(STORAGE_KEY);
        const payload = {
            receiver_id:r_id
        };
        fetch(`${API_URL}/${'conversation/create'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': tk
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
                    let convId ;
                    if (jsonRes.success) {
                        setIsError(false);
                        setMessage(jsonRes.result);
                        setConversation(jsonRes.result);
                        if (jsonRes.result.participants[0].user.id == user.id){
                            setRUserProfile(jsonRes.result.participants[1]);
                        } else if (jsonRes.result.participants){
                            setRUserProfile(jsonRes.result.participants[0]);
                        }
                        convId = jsonRes.result.id;
                    } else {
                        setIsError(true);
                        setMessage(jsonRes.result);
                        setConversation(jsonRes.result[0]);
                        if (jsonRes.result[0].participants[0].user.id == user.id){
                            setRUserProfile(jsonRes.result[0].participants[1]);
                            setReceiverFlag(true);
                        } else {
                            setRUserProfile(jsonRes.result[0].participants[0]);
                        }
                        convId = jsonRes.result[0].id;
                    }
                    let payload = {
                        conversationId:convId,
                        page:1,
                        take:100
                    }
                    fetch(`${API_URL}/${'messages'}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'token': tk
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
                                    setMessageList(jsonRes.result);
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
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    }

    const sendMessage = async () => {
        if(!messageContent) return;

        const tk = await AsyncStorage.getItem(STORAGE_KEY);
        const payload = {
            conversationId:conversation.id,
            message: messageContent
        };
        fetch(`${API_URL}/${'messages/create'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': tk
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
                        socketInstance.emit("sendmessage", {receiver_id:props.navigation.state.params.r_id, message_text:messageContent,message_id:jsonRes.result.id});
                        setMessageContent('');
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

    const readMessage = async (id) => {

        const tk = await AsyncStorage.getItem(STORAGE_KEY);
        const payload = {
            message_id:id
        };
        fetch(`${API_URL}/${'messages/read'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': tk
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

    const setIsTypingFunc = (value) => {
        setIsTyping(true);
        const timer = setInterval(() => {
            setIsTyping(false);
            clearInterval(timer);
        }, 2000)
    }

    const changeMessageContent = (v) => {
        setMessageContent(v);
        socketInstance.emit('istyping', props.navigation.state.params.r_id);
    }

    const acceptConversationRequest = async () => {
        const tk = await AsyncStorage.getItem(STORAGE_KEY);
        fetch(`${API_URL}/${'conversations/accept?id=' + conversation.id}`, {
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
                        let tp = {...conversation};
                        tp.accepted = true;
                        setConversation(tp);
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
    const declineUser = async () => {
        const tk = await AsyncStorage.getItem(STORAGE_KEY);
        const rtype = 'block';
        let payload = {
            rUserId: rUserProfile.user.id,
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
                        props.navigation.goBack();
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

    const getBlockStatus = async () => {
        let isMounted = true;
        const tk = await AsyncStorage.getItem(STORAGE_KEY);
        let payload = {
            doneUserId: props.navigation.state.params.r_id,
            relationType: 'block'
        }
        fetch(`${API_URL}/relation/status`, {
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
                } else if(isMounted) {
                    if (jsonRes.success) {
                        setIsError(false);
                        setBlockStatus(jsonRes.result.block);
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
        isMounted = false;
    }
    useEffect(() => {
        getToken();
        createConversation(props.navigation.state.params.r_id);
        socketInstance.on("message", (data) => {
            if (props.navigation.state.params.r_id == data.sender.id || user.id == data.sender.id){
                let messageId = data.message_id;
                delete data.message_id;
                setMessageList((oldList) => [data, ...oldList]);
                if(props.navigation.state.params.r_id == data.sender.id ){
                    readMessage(messageId);
                }
            }
        });

        socketInstance.emit("gethisonline", props.navigation.state.params.r_id);

        socketInstance.on('hisonline', (yn) =>{
            setOnlineStatus(yn);
        });

        socketInstance.on('joined', (joinedUser) => {
            socketInstance.off('joined');
            if (joinedUser.user_id == props.navigation.state.params.r_id) setOnlineStatus(true);
        });

        socketInstance.on('here', (data) => {
            socketInstance.off('here');
        });

        socketInstance.on('outed', (outedUser) => {
            socketInstance.off('outed');
            if (outedUser.user_id == props.navigation.state.params.r_id) setOnlineStatus(false);
        });

        socketInstance.on('istyping', (flag) => {
            setIsTypingFunc(true);
        });

    }, [])

    useEffect(() => {
        getBlockStatus();
    }, [conversation, messageList]);
    
    return (
        <View 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardContainer}
        >
            <View style={styles.topHeader}>
                <TouchableOpacity style={styles.backIcon} onPress={()=>props.navigation.goBack()}>
                    <SvgXml width="24" height="24" xml={arSvg} />
                </TouchableOpacity>
                <View style={styles.headerUserInfo}>
                    {rUserProfile.user&&<Image source={{uri:rUserProfile.user ? rUserProfile.user.profile.profilePicture ? rUserProfile.user.profile.profilePicture : '' : ''}} 
                                            style={styles.userAvatar}/>}
                    <View style={styles.userinfoContainer}>
                        {rUserProfile.user ? 
                        <Text style={styles.userName}>
                        
                            {rUserProfile.user.profile.firstName ? rUserProfile.user.profile.firstName : ''}
                            {' '}
                            {rUserProfile.user.profile.lastName ? rUserProfile.user.profile.lastName : ''}
                        </Text>
                        : null}
                        {
                            onlineStatus ? 
                            <Text style={styles.statusOnline}>online</Text>
                            :
                            <Text style={styles.statusOffline}>offline</Text>
                        }
                    </View>
                </View>
            </View>
            <View style={styles.divider}></View>
            {
                !conversation.accepted && !messageList.length ? 
                <ScrollView ref={scrollRef} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                    <Text style={styles.chatPlaceholder}>Before you start writing,</Text>
                    <Text style={[styles.chatPlaceholder, {marginBottom:30}]}>the chat request should be accepted</Text>

                    <Text style={styles.chatPlaceholder}>Send a message in the box below,</Text>
                    <Text style={styles.chatPlaceholder}>and wait until your chat request is accepted</Text>
                </ScrollView>
                :
                <ScrollView   ref={scrollRef} style={styles.container}  onContentSizeChange={()=>scrollRef.current?.scrollToEnd({animated:true})}>
                    <View  style={styles.PageContainer}>
                        <View style={styles.chatContainer}>
                            {
                                messageList.map((eMessage, index) => {
                                    return (
                                        eMessage.sender.id == user.id ? 
                                        <>
                                        <View key={index} style={styles.myMessage}>
                                            <View style={styles.mMessageWrap}>
                                                <Text style={styles.message}>{eMessage.message}</Text>
                                                <Text style={styles.messageTime}>{new Date(eMessage.createdAt).getHours() + ':' + new Date(eMessage.createdAt).getMinutes()}</Text>
                                            </View>
                                        </View>
                                        {index + 1 < messageList.length ? new Date(eMessage.createdAt).getMonth() != new Date(messageList[index + 1].createdAt).getMonth() || 
                                        new Date(eMessage.createdAt).getDate() != new Date(messageList[index + 1].createdAt).getDate() ?
                                        <Text style={styles.dayText}>
                                        {
                                        new Date(eMessage.createdAt).getDate() == new Date().getDate() && 
                                        new Date(eMessage.createdAt).getMonth() == new Date().getMonth() ? 'today' :
                                        new Date(eMessage.createdAt).getDate() - 1 == new Date().getDate() && 
                                        new Date(eMessage.createdAt).getMonth() == new Date().getMonth() ? 'yesterday' :
                                        <>
                                            {new Date(eMessage.createdAt).getFullYear() + ':'}
                                            {new Date(eMessage.createdAt).getMonth() + 1 + ':'}
                                            {new Date(eMessage.createdAt).getDate()}
                                        </>
                                        }
                                        </Text>
                                        :
                                        null
                                        : <Text style={styles.dayText}>
                                            {
                                        new Date(eMessage.createdAt).getDate() == new Date().getDate() && 
                                        new Date(eMessage.createdAt).getMonth() == new Date().getMonth() ? 'today' :
                                        new Date(eMessage.createdAt).getDate() - 1 == new Date().getDate() && 
                                        new Date(eMessage.createdAt).getMonth() == new Date().getMonth() ? 'yesterday' :
                                        <>
                                            {new Date(eMessage.createdAt).getFullYear() + ':'}
                                            {new Date(eMessage.createdAt).getMonth() + 1 + ':'}
                                            {new Date(eMessage.createdAt).getDate()}
                                        </>
                                        }
                                        </Text>
                                        }
                                        </>
                                        : 
                                        <>
                                        <View key={index} style={styles.friendMessage}>
                                            <View style={styles.fMessageWrap}>
                                                <Text style={styles.message}>{eMessage.message}</Text>
                                                <Text style={styles.messageTime}>{new Date(eMessage.createdAt).getHours() + ':' + new Date(eMessage.createdAt).getMinutes()}</Text>
                                            </View>
                                        </View>
                                        {index + 1 < messageList.length ? new Date(eMessage.createdAt).getMonth() != new Date(messageList[index + 1].createdAt).getMonth() || 
                                        new Date(eMessage.createdAt).getDate() != new Date(messageList[index + 1].createdAt).getDate() ?
                                        <Text style={styles.dayText}>
                                        {
                                        new Date(eMessage.createdAt).getDate() == new Date().getDate() && 
                                        new Date(eMessage.createdAt).getMonth() == new Date().getMonth() ? 'today' :
                                        new Date(eMessage.createdAt).getDate() - 1 == new Date().getDate() && 
                                        new Date(eMessage.createdAt).getMonth() == new Date().getMonth() ? 'yesterday' :
                                        <>
                                            {new Date(eMessage.createdAt).getFullYear() + ':'}
                                            {new Date(eMessage.createdAt).getMonth() + 1 + ':'}
                                            {new Date(eMessage.createdAt).getDate()}
                                        </>
                                        }
                                        </Text>
                                        :
                                        null
                                        : <Text style={styles.dayText}>
                                            {
                                        new Date(eMessage.createdAt).getDate() == new Date().getDate() && 
                                        new Date(eMessage.createdAt).getMonth() == new Date().getMonth() ? 'today' :
                                        new Date(eMessage.createdAt).getDate() - 1 == new Date().getDate() && 
                                        new Date(eMessage.createdAt).getMonth() == new Date().getMonth() ? 'yesterday' :
                                        <>
                                            {new Date(eMessage.createdAt).getFullYear() + ':'}
                                            {new Date(eMessage.createdAt).getMonth() + 1 + ':'}
                                            {new Date(eMessage.createdAt).getDate()}
                                        </>
                                        }
                                        </Text>
                                        }
                                        </>
                                    )
                                })
                            }
                        </View>
                    </View>
                </ScrollView> 
            
            }
            <View style={styles.messageInputContainer}>
                {
                    isTyping ? 
                    <View style={styles.messageInputInfo}>
                        <Image source={{uri:rUserProfile.user ? rUserProfile.user.profile.profilePicture ? rUserProfile.user.profile.profilePicture : '': ''}} 
                            style={styles.friendAvatar}/>
                            
                                <Text style={styles.isTyping}>is typing...</Text>
                    </View>
                    : null
                }
                {
                    blockStatus ? 
                    <View style={styles.acceptContainerWrap}>
                        <View style={styles.acceptContainer}>
                            <View style={styles.acceptWrap}>
                                <Text style={styles.acceptText}>You cannot chat with this user</Text>
                            </View>
                        </View>
                    </View>
                    :
                    !conversation.accepted && receiverFlag ?
                    <View style={styles.acceptContainerWrap}>
                        <View style={styles.acceptContainer}>
                            <View style={styles.acceptWrap}>
                                <TouchableOpacity onPress={() => acceptConversationRequest()}>
                                    <Text style={styles.acceptText}>accept</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.verticalDivider}></View>
                            <View style={styles.declineWrap}>
                                <TouchableOpacity onPress={() => declineUser()}>
                                    <Text style={styles.declineText}>decline</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    :
                    <View style={styles.messageInputWrap}>
                        <TextInput style={styles.messageInput} value={messageContent} onChangeText={changeMessageContent} placeholder={'write a message'} placeholderTextColor={'#AEBBC1'}></TextInput>
                        <TouchableOpacity onPress={()=>sendMessage()}>
                            <SvgXml width="32" height="32" xml={messageContent ? sendActive : sendDeactive} />
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </View>
    );
};

export default ChatScreen;