import React,{useState,useEffect} from 'react'
import {View,KeyboardAvoidingView,ScrollView,Text,StyleSheet,TextInput,Button, Keyboard,Alert,ActivityIndicator } from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import {useDispatch} from 'react-redux'
import * as authActions from '../store/actions/authActions' 
import {Formik} from 'formik'
import * as Yup from 'yup'
const AuthScreen = (props) => {
 const [log,setLog]=useState(true)
 const [load,setLoad]=useState(false)
 const [err,setErr]=useState()
 useEffect(()=>{
   if(err){
   Alert.alert('An Error Ocurred',err,[{text:'OK'}],{cancelable:true})}
 }
 ,[err])
 const dispatch=useDispatch()
 const formhandler=async (values)=>{ 
  if(log){
    setErr(null)
    setLoad(true)
   try{
  await dispatch(authActions.logIn(values.email,values.password))
  props.navigation.navigate('app')
  }
  catch(err){
    setErr(err.message)
    setLoad(false)
  }
}
  else{
    setErr(null)
    setLoad(true)
    try{
       await dispatch(authActions.signUp(values.email,values.password))
       props.navigation.navigate('app')
     }
     catch(err){
       setErr(err.message)
       setLoad(false)
     }
  }

 }
  const schema=Yup.object().shape({
   email:Yup.string()
         .email().required(),
  password:Yup.string().min(6).required()
  })
    return (

   <ScrollView contentContainerStyle={styles.screen}>
        <View>
        <Formik
         initialValues={{email:'',password:''}}
         onSubmit={(values,actions)=>{
          actions.resetForm()
          formhandler(values)
          Keyboard.dismiss
         }}
         validationSchema={schema}
        >
       {(props)=>(
    <View style={styles.form}>
        <Text>Email:</Text>
       <TextInput
       returnKeyType='next'
       style={styles.input}
        keyboardType='default'
        autoCompleteType='email'
        value={props.values.email}
        onChangeText={props.handleChange('email')}
       />
       <Text style={styles.text}>{props.touched.email && props.errors.email}</Text>
       <Text>Password:</Text>
       <TextInput
       returnKeyType='done'
       secureTextEntry={true}
       keyboardType='default'
       autoCompleteType='password'
       value={props.values.password}
        onChangeText={props.handleChange('password')}
        style={styles.input}
       />
       <Text style={styles.text}>{props.touched.password && props.errors.password}</Text>
       <View style={{width:120,marginTop:10}}>
        
       {load?<ActivityIndicator size={80}   color='#1DB954'/> :<Button title="Submit" color='red' onPress={props.handleSubmit} />}</View>
       {log && (<View style={styles.signup}>
       <Text>didn't have an account ??  -  </Text><Button title='signUp'onPress={()=>{setLog(false)}}/></View>)}
      </View>
       )}
     
        </Formik>
        </View>
      </ScrollView>
    
       
      
    )
}

const styles=StyleSheet.create({

screen:{
 flex:1,
 justifyContent:'center',
 alignItems:'center',
 backgroundColor:'#222930'
},
form:{
justifyContent:'center',
backgroundColor:'#4EB1BA',
elevation:1,
borderWidth:1,
padding:20,
borderColor:'#E9E9E9',
margin:6
},
input:{
 width:281,
 height:35,
 padding:6,
 margin:1,
borderWidth:1,
borderColor:'black',
margin:5
},
text:{
 color:'red',
 fontSize:8,
 margin:3
},
signup:{
 flexDirection:'row',
 padding:2,
 alignItems:'center',
 justifyContent:'space-between'
}
})
AuthScreen.navigationOptions={
  headerTitle:'Register'
}
export default AuthScreen
