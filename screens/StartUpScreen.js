import React,{useEffect} from 'react'
import {View,ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {useDispatch} from 'react-redux'
import * as authActions from '../store/actions/authActions'
const StartUpScreen = props => {
    const dispatch=useDispatch()
   useEffect(()=>{
    const tryLogin=async()=>{
    const data=await AsyncStorage.getItem('user')
    if(!data){
        props.navigation.navigate('auth')
        return;
    }
    const transformedData=JSON.parse(data)
    const {token,userId,expireDate}=transformedData
    const expirationDate=new Date(expireDate)
    if(expirationDate <= new Date() ||!token || !userId){
        props.navigation.navigate('auth')
        return;
    }
     props.navigation.navigate('app')
     dispatch(authActions.authenticate(token,userId))
    };

    tryLogin()
   },[dispatch])
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size='large' color="green"/>
        </View>
    )
}
export default StartUpScreen
