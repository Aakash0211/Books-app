import React from 'react'
import {TouchableOpacity,Image,StyleSheet,Text} from 'react-native'
import Colors from '../constants/Colors.js'
const Book = (props) => {
  const genre=props.category
  const pressHandler=()=>{
    props.navigation.navigate('Genre',{Genre:genre})
  }
return(<TouchableOpacity style={styles.book} onPress={pressHandler}>
      <Image source={{uri:props.image}} style={styles.img}/>
       <Text style={styles.txt}>{props.category}</Text>
      </TouchableOpacity>
);}
const styles=StyleSheet.create({
 book:{
   flex:1,
  justifyContent:'center',
  alignItems:'center',
  elevation:5,
  borderColor:'#fff',
  backgroundColor:'#FFE5B4',
  margin:6
 },
 img:{
   flex:1,
   margin:1,
   height:140,
   width:'100%'
 },
 txt:{
  padding:1
 }
})

export default Book
