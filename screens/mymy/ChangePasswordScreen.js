import React, { useState,useRef} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import Toast from './MyToast';
import {windowWidth,windowHeight} from '../../config/config';
import { SvgXml } from 'react-native-svg';
import arSvg from '../../assets/common/arrow-back.svg';
const ChangePasswordScreen = (props) => {

    const [message,setMessage] = useState('');
    const [oldPass,setOldPass] = useState('');
    const [newPass1,setNewPass1] = useState('');
    const [newPass2,setNewPass2] = useState('');

    const defaultToast = useRef(null);

    const onSave = () => {
        if(oldPass == '' || newPass1 == '' || newPass2 == ''){
            setMessage("ERROR : You must fill the fields");
            return;
        }
        
        if(newPass1 != newPass2)
        {
            setMessage("ERROR : New passwords are different");
            return;
        }

        // fetch(`${API_URL}/changePasswordUser`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         email:user.email,
        //         password:oldPass,
        //         new_password:newPass1
        //     })
        // })
        // .then(async res => { 
        //     try {
        //         const jsonRes = await res.json();
                
        //         console.log(res.status);
        //         if (res.status !== 200) {
        //             setMessage(jsonRes.message);
        //         } else {
        //             console.log(jsonRes);
        //             defaultToast.current.showToast("Password has deleted.");
        //         }
        //     } catch (err) {
        //         console.log(err);
        //     };
        // })
        // .catch(err => {
        //     console.log(err);
        // });

        setMessage('');
    }

    return (
        <View style={styles.container}>
            <View style={styles.topHeader}>
                <View style={styles.topHeaderInner}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <TouchableOpacity onPress={() => props.navigation.goBack()}>
                            <SvgXml width="24" height="20" xml={arSvg} />
                        </TouchableOpacity>    
                        <Text style={styles.PageTitle}>GENERAL</Text>
                    </View>
                </View>
            </View>
            <View style={styles.mainContainer}>
                <Text style={[styles.message, {color: 'red'}]}>{message!='' ? message : null}</Text>
                <View style={styles.accountItem}>
                    <TextInput secureTextEntry={true} style={styles.menu_input} defaultValue={oldPass} onChangeText={(text)=>setOldPass(text)} placeholder="INSERT OLD PASSWORD"/>
                </View>
                <View style={styles.accountItem}>
                    <TextInput secureTextEntry={true} style={styles.menu_input} defaultValue={newPass1} onChangeText={(text)=>setNewPass1(text)} placeholder="ADD NEW PASSWORD"/>
                </View>
                <View style={styles.accountItem}>
                    <TextInput secureTextEntry={true} style={styles.menu_input} defaultValue={newPass2} onChangeText={(text)=>setNewPass2(text)} placeholder="REPEAT NEW PASSWORD"/>
                </View>
                <TouchableOpacity style={styles.logoutContainer} onPress={()=>onSave()}>
                    <Text style={styles.logoutText}>SAVE</Text>
                </TouchableOpacity>
            </View>
            
            {/* <Toast ref = {defaultToast} backgroundColor = "#57D172" style={styles.myToast}/> */}
       </View>
    );
};

const styles = StyleSheet.create({
    message: {
        fontSize: 16,
        height:20,
        marginBottom:10
    },
    privateDesc:{
        fontSize:12,
        fontFamily:'Roboto-Regular',
        color:'rgba(0, 0, 0, 0.6)',
        lineHeight:15
    },
    privateTitle:{
        fontSize:16,
        fontFamily:'Roboto-Regular'
    },
    menu_input:{
        fontFamily:'Roboto-Regular',
        fontSize:16,
        paddingBottom:0,
        borderBottomWidth:0.5,
        height:40,
        borderColor:'#E5E5E5'
    },
    toggleDesc:{
        width:'50%'
    },
    menu_img:{
        width:24,
        height:24,
    },
    menu_text:{
        fontSize:16,
        fontFamily:'Roboto-Regular'
    },
    accountItem:{
        height:50,
        width:windowWidth - 72
    },
    toggleContainer:{
        width:windowWidth - 72,
        marginTop:30,
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'space-between'
    },
    mainContainer:{
        alignItems:'center',
        width:windowWidth,
        height:windowHeight - 125
    },
    logoutContainer:{
        position:'absolute',
        bottom: 100,
        width:windowWidth - 150,
        height:60,
        backgroundColor:'#DD2E44',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:2
    },
    logoutText:{
       fontSize:16,
       lineHeight:19,
       color:'white',
        fontFamily:'Roboto-Regular'
    },
    container: {
        width: '100%',
        height:'100%',
        display: "flex", 
        flexDirection: "row", 
        flexWrap: "wrap",
        backgroundColor:'white'
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

export default ChangePasswordScreen; 