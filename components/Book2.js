import React from 'react'
import {TouchableOpacity,Image,StyleSheet,Text} from 'react-native'
import Colors from '../constants/Colors.js'
const Book2 = (props) => {
  const img='https://secocms.cpa.texas.gov/sca-dev-kilimanjaro/img/no_image_available.jpeg'
  const pressHandler=()=>{
     props.navigation.navigate('detail',{id:props.id,title:props.title})
  }
return(<TouchableOpacity style={styles.book} onPress={pressHandler}>
{props.image?(<Image source={{uri:props.image}} style={styles.img}/>):(<Image source={{uri:img}} style={styles.img}/>)}
      <Text style={styles.txt}>{props.title}</Text>
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
   minHeight:240,
   width:'100%'
 },
 txt:{
  padding:1
 }
})

export default Book2