import React,{useState} from 'react'
import {View,Text, Alert,Image,TouchableWithoutFeedback,StyleSheet,Button,TextInput, KeyboardAvoidingView, Keyboard} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import {useDispatch} from 'react-redux'
import * as profileActions from '../store/actions/profileActions.js'
const EditProfile =props => {
    const[img,setImg]=useState()
    const[user,setUser]=useState()
    const[num,setNum]=useState()
    const[bio,setBio]=useState()
  const dispatch=useDispatch()
const getPermissions=async()=>{
  const result=await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
  if(result.status!=='granted'){
  Alert.alert('Permission required','It is required to upload',[{text:'ok'}],{cancelable:true})
    return false
  }
 return true;
}
const imageTaker=async()=>{
    const hadPermission=await getPermissions()
    if(!hadPermission){
        return;
    }
    try{
   const imag= await ImagePicker.launchImageLibraryAsync({
     quality:0.7,
     aspect:[1,1],
     allowsEditing:true
    })
    if(!imag.uri){
        return;
    }
    setImg(imag.uri)
}
catch(err){
    console.log(err)
    throw(err)
}
}
const submitHandler=()=>{
  
    props.navigation.navigate('profile',{
        'uri':img,
       'name':user,
        'number':num,
        'bio':bio
    })
    dispatch(profileActions.saveProfile(img,user,num,bio))
}

    return (  
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:30}}>
         <Text>Tap on below Image to set Profile picture</Text>
            <View style={styles.dp}>
         <TouchableWithoutFeedback onPress={imageTaker} >
             {!img ?(<Image style={styles.image} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmLvRhTwcc4NtSQ7PscwmQ2wpkPwPBYZdQaA&usqp=CAU'}}/>):(<Image  style={styles.image}source={{uri:img}}/>) }
         </TouchableWithoutFeedback>   
        </View>
    <View style={styles.input}>
        <Text>UserName:</Text>
        <TextInput  
            style={styles.in}
            maxLength={20}
            returnKeyType='done'
            autoCompleteType='username'
             autoCapitalize='characters'
             value={user}
             onChangeText={(text)=>{setUser(text)}}
             keyboardType='default'
            />
    </View>
    <View style={styles.input}>
        <Text>Mobile Number:</Text>
        <TextInput
        style={styles.in}
          keyboardType='number-pad'
          autoCompleteType='tel'
          value={num}
          returnKeyType='done'
          onChangeText={(text)=>{setNum(text)}}
        maxLength={13}
        />
    </View>
    <View style={styles.input}>
        <Text>Bio:</Text>
        <TextInput
        style={styles.i}
        keyboardType='default'
        multiline
        numberOfLines={2}
        value={bio}
        returnKeyType="done"
        onChangeText={(text)=>{setBio(text)}}
        />
    </View>
        <Button title="Submit" onPress={submitHandler}/>
        </View>
    </TouchableWithoutFeedback>
    )
}
const styles=StyleSheet.create({
   dp:{
    alignItems:'center',
    justifyContent:'center',
    width:'32%',
    height:97,
    marginTop:40
   },
    image:{
        width:"100%",
        height:'100%'
      
     },
     input:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      margin:10,
      padding:30
     },
     in:{
        borderColor:'#ddd',
        width:210,
        height:40,
        borderWidth:1,
     },
     i:{
        borderColor:'#ddd',
        width:250,
        height:65,
        borderWidth:1,
     }
})

EditProfile.navigationOptions={
    headerTitle:'Edit Profile'
}

export default EditProfile
