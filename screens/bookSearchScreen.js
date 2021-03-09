import React,{useState} from 'react'
import {View,TextInput,ScrollView,Button,StyleSheet,KeyboardAvoidingView,Keyboard,TouchableWithoutFeedback,Text, FlatList} from 'react-native'
import History from '../components/History.js'
const bookSearchScreen = props => {
    const [search,setSearch]=useState('')
    const [searches,setSearches]=useState([])
    const textHandler=(text)=>{
     setSearch(text)
    }
    const searchHandler=()=>{
      if(search.length>0){
    setSearches(currentSearches=>[...currentSearches,{id:Math.random().toString(),value:search}])
     console.log(searches)
     props.navigation.navigate('result',{query:search})}
     setSearch('')
    }
    return (
       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        
        <View style={styles.form}>
       <TextInput
       style={styles.input}
        placeholder="Search a book"
        placeholderTextColor="#696969"
        value={search}
        onChangeText={textHandler}
        autoCompleteType='name'
        autoCorrect
        keyboardType='default' 
         returnKeyType='done'
       />
       <View style={{margin:5,width:80,height:20}}>
       <Button  title="search" onPress={searchHandler}/>
       </View>
       <View style={{flex:1,justifyContent:'center'}}>
       <FlatList
         data={searches}
         renderItem={(itemData)=>(<History value={itemData.item.value} id={itemData.item.id}/>)}
         />
      </View>
        </View> 
       </TouchableWithoutFeedback>
    )
}
bookSearchScreen.navigationOptions={
      headerTitle:'Search',    
}
const styles=StyleSheet.create({
 
  form:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'flex-start'
  },
  input:{
   width:250,
   height:35,
   padding:1,
   borderColor:'#ddd',
   borderWidth:1,
   borderRadius:5,
   margin:5
  }
})
export default bookSearchScreen
