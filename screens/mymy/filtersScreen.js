import React, { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector , useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, TextInput} from 'react-native';
import RangeSlider from '../component/RangeSlider';
import { SvgXml } from 'react-native-svg';
import arSvg from '../../assets/common/arrow-back.svg';
import manSvg from '../../assets/profile/man.svg';
import manActiveSvg from '../../assets/profile/man_active.svg';
import womanSvg from '../../assets/profile/woman.svg';
import womanActiveSvg from '../../assets/profile/woman_active.svg';
import {API_URL , STORAGE_KEY} from '../../config/config';
import {styles} from '../style/Filters';

const FiltersScreen = (props) => {

    let { user, userProfile, oldFilterData } = useSelector((state) => {
        return (
            state.user
        )
    });
    if (!oldFilterData) oldFilterData = {};
    const dispatch = useDispatch();

    const [gender, setGender] = useState('');
    const [token, setToken] = useState('');
    const [isError, setIsError] = useState(false);
    const [filters, setFilters] = useState(oldFilterData);
    const [showPeople, setShowPeople] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [cityId, setCityId] = useState(props.navigation.state.params.cityId);
    const [cityObject, setCityObject] = useState({});
    const [cityText, setCityText] = useState('');
    const [message, setMessage] = useState('');

    const getToken = async () => {
        const tokenData = await AsyncStorage.getItem(STORAGE_KEY);
        setToken(tokenData);
    }

    const getFilterPeople = async (filterData, tk = token) => {
        filterData.page = 1;
        filterData.take = 10;
        if(!filterData.city_id) {
            filterData.city_id = cityId
        }
        fetch(`${API_URL}/${'profiles/search'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token ? token : tk
            },
            body: JSON.stringify(filterData),
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status !== 200) {
                    setIsError(true);
                    setMessage(jsonRes.message);
                } else {
                    setShowPeople(jsonRes.profiles);
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
    }

    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
    }

    const genderChange = (gv) => {
        setGender(gv);
        let filterData = {...filters};
        filterData.gender = gv;
        setFilters(filterData);
        // dispatch(setFilter(filterData));
        getFilterPeople(filterData);
    }

    const ageChange = async (newLow, newHigh, tk) => {
        newHigh = newHigh + 1;
        let tkData = await AsyncStorage.getItem(STORAGE_KEY);
        const filterData = {...filters};
        filterData.start_date = formatDate(new Date().getFullYear() - newLow);
        filterData.end_date = formatDate(new Date().getFullYear() - newHigh);
        setFilters(filterData);
        // dispatch(setFilter(filterData));
        getFilterPeople(filterData, tkData);
    }

    const formatDate = (yy) => {
        var nDate = new Date(),
            month = '' + (nDate.getMonth() + 1),
            day = '' + nDate.getDate(),
            year = yy;
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
        return [year, month, day].join('-');
    }

    const cityChange = (index) => {
        setCityText(cityList[index].name + ', ' + cityList[index].country);
        setCityId(cityList[index].id);
        let filterData = {...filters};
        filterData.city_id = cityList[index].id;
        setFilters(filterData);
        // dispatch(setFilter(filterData));
        getFilterPeople(filterData);
        setCityObject(cityList[index]);
        setCityList([]);
    }

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

    useEffect(() => {
        getToken();
        // getFilterPeople();
    }, [])

    return (
        <View style={styles.container}>
            <View>
            <View style={styles.topHeader}>
                    <TouchableOpacity onPress={()=>props.navigation.goBack()}>
                        <SvgXml width="24" height="24" xml={arSvg} />
                    </TouchableOpacity>
                    <Text style={styles.filterTitle}>FILTERS</Text> 
                </View>
                <View style={styles.mainContainer}>
                    <View style={styles.GenerContainer}>
                        <Text style={styles.genderTitle}>GENDER</Text>
                        <View style={[styles.rowContainer, {paddingLeft:30, paddingRight:30}]}>
                            <TouchableOpacity style={{marginRight:32}} onPress={()=>genderChange('M')}>
                                <SvgXml width="32" height="32" xml={gender == 'M' ? manActiveSvg : manSvg} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginLeft:32}} onPress={()=>genderChange('F')}>
                                <SvgXml width="20" height="32" xml={gender == 'F' ? womanActiveSvg : womanSvg} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.divider}/>
                    <View style={styles.CityContainer}>
                        <View style={styles.CityInnerContainer}>
                            <Text style={styles.cityTitle}>CITY</Text>
                            <TextInput onChangeText={getCity} value={cityText} style={styles.CityInput} autoCapitalize={'words'}  placeholder='enter city' placeholderTextColor='rgba(0, 0, 0, 0.2)'></TextInput>
                        </View>                        
                        <View style={styles.CityList}> 
                        {
                            cityList.map((city, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => cityChange(index)}>
                                        <Text style={styles.cityText}>{city.name + ', ' + city.country}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                        </View>
                        <Text style={styles.cityExplain}>Filter the city where the people live</Text>
                    </View>
                    <View style={[styles.divider, {marginTop:30}]}/>
                    <View style={styles.AgeContainer}>
                        <View style={styles.AgeInnerContainer}>
                            <Text style={styles.AgeTitle}>AGE</Text>
                            <View style={styles.ageSliderContainer}>
                                 <RangeSlider from={18} to={100} token={token} onValueChanged={ageChange}/>
                            </View>
                        </View>                        
                    </View>
                    <View style={styles.divider}/>
                </View>
            </View>
            <TouchableOpacity style={styles.resultPanel} disabled={filters.city_id ? false : true} onPress={() => props.navigation.navigate('City', {filters})}>
                <Text style={styles.resultText}>SHOW {showPeople.length} PEOPLE</Text>
            </TouchableOpacity>
        </View> 
    );
};

export default FiltersScreen  ;