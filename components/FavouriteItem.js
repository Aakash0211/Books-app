import React from 'react'
import {View,Text,TouchableWithoutFeedback,Button,StyleSheet,Alert} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient'
import {useDispatch} from 'react-redux'
import * as bookActions from '../store/actions/shopActions.js'
const FavouriteItem = (props) => {
  const dispatch=useDispatch()

    if(props){
    return (
       <TouchableWithoutFeedback>
          <View style={styles.item}>
          <LinearGradient colors={['#83a4d4','#b6fbff']} >
         <Text style={styles.txt}>Book:{props.title}</Text>
         <Text style={styles.txt}>Authors:{props.authors.toString()}</Text>
         <Text style={styles.txt}>Language:{props.language}</Text>
         <Button title='Remove' color='red' onPress={()=>{dispatch(bookActions.removeFavourite(props.id))}}/>
         </LinearGradient>
         </View>
         
        </TouchableWithoutFeedback>)
 } 
 return null;
}   
const styles=StyleSheet.create({
 item:{
  flex:1,
  elevation:5,
  padding:2,
  borderColor:'#ccc',
  borderRadius:1,
  borderWidth:1,
   margin:6
 },
 txt:{
   padding:5
 }
})

export default FavouriteItem
