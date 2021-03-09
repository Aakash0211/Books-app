import React, { useEffect } from 'react'
import { View,Text,Image,StyleSheet } from 'react-native'
import {HeaderButtons,Item} from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import {useSelector,useDispatch} from 'react-redux'
import * as profileActions from '../store/actions/profileActions'
const profileScreen =props => {
  const uri=props.navigation.getParam('uri')
  const name=props.navigation.getParam('name')
  const number=props.navigation.getParam('number')
  const bio=props.navigation.getParam('bio')
  const dispatch=useDispatch()
  useEffect(()=>{
   dispatch(profileActions.loadProfile())
  },[dispatch])
  const profile=useSelector(state=>state.profile.profile)
      return(
        <View style={{flex:1,justifyContent:'flex-start',alignItems:'center',marginTop:30}}>
        <View style={styles.dp}>
        {profile.imageUri!==undefined ?<Image style={styles.image} source={{uri:uri}}/> :(<Image style={styles.image} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmLvRhTwcc4NtSQ7PscwmQ2wpkPwPBYZdQaA&usqp=CAU'}}/>)}
          </View>
        {profile.name!==undefined ? <Text style={{paddingTop:60,fontSize:22}}>{name}</Text> :(<Text style={{paddingTop:50,fontSize:20}}>Please Edit Your Profile</Text>)}
        <View style={{ 
            justifyContent:'center',
            alignItems:'center',
            marginTop:40,
            padding:30,}}>
        {profile.bio &&  <Text style={{fontSize:30}}>{bio}</Text>}
        {profile.number && <Text>{number}</Text>}
        </View>
        </View>
         );
}

profileScreen.navigationOptions=navData=>{
  return{
    headerRight:(
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
         title='Edit'
        onPress={()=>{navData.navigation.navigate('edit')}}
        />
       </HeaderButtons>
    )
  }
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
        width:300,
        height:200
     },
})
export default profileScreen