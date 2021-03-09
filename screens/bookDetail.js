import React,{useEffect,useState,useCallback
} from 'react'
import axios from 'axios'
import { View,Text, ActivityIndicator,Image,StyleSheet,Button,Alert} from 'react-native'
import {useDispatch,useSelector} from 'react-redux'
import * as bookActions from '../store/actions/shopActions.js'
import {HeaderButtons,Item} from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton.js'
import {GoogleApi} from '../api'
const bookDetail=(props)=>{
    const[load,setLoad]=useState(true)
    const [book,setBook]=useState({})
    const id=props.navigation.getParam('id')
    const {navigation}=props
    const loadBook=async()=>{
        try{
     setBook({})
      const res=await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}?key=${GoogleApi}`)
      const book =res.data
      setBook(book)
      setLoad(false)
        }
        catch(err){
         console.log(err)
        }
    }
    useEffect(()=>{   
      loadBook(id)
     },[id])
     const dispatch=useDispatch()
     const img='https://secocms.cpa.texas.gov/sca-dev-kilimanjaro/img/no_image_available.jpeg'
     const sta=useSelector(state=>state.shop.favourites)
     const addFavourite=useCallback(()=>{
      dispatch(bookActions.addFavourite(book))
      Alert.alert('Favourite added','Added as Favourite',[{text:'Ok'}],{cancelable:true})
   },
   [book])
   useEffect(()=>{
     navigation.setParams({favourite:addFavourite})
   },[addFavourite])

    const cartHandler=()=>{
         Alert.alert('Added Successfully','check in cart for ur products',[{text:'ok',style:{color:'green'}}],{cancelable:true})
         dispatch(bookActions.addToCart(book))
    }
  
    return (
      load?(<ActivityIndicator size={40} style={{flex:1,justifyContent:'center',alignItems:'center'}} color='#1DB954'/>):  
        <View style={styles.book}>
          {book.volumeInfo.imageLinks ? <Image source={{uri:book.volumeInfo.imageLinks.small || book.volumeInfo.imageLinks.medium || book.volumeInfo.imageLinks.large }} style={styles.img}/>:(<Image source={{uri:img}} style={styles.img}/>)}
           <View style={styles.txt}>
           <Text style={{color:'white'}}>Title: {book.volumeInfo.title}</Text>
           {book.volumeInfo.subtitle && <Text  style={{color:'white'}}>SubTitle:{book.volumeInfo.subtitle}</Text>}
           <Text  style={{color:'white'}}>Authours: {book.volumeInfo.authors.toString()}</Text>
           <Text  style={{color:'white'}}>Publisher: {book.volumeInfo.publisher}</Text>
           <Text  style={{color:'white'}}>Date: {book.volumeInfo.publishedDate}</Text>
           <Text  style={{color:'white'}}>Language: {book.volumeInfo.language}</Text>
           </View>
           <Button title="Add to Cart" color="#FF9900" onPress={cartHandler}/>
        </View>
    )

}
bookDetail.navigationOptions=(navData)=>{
 return{
     headerTitle:navData.navigation.getParam('title'),
     headerRight:
    
  (    <HeaderButtons HeaderButtonComponent={HeaderButton}>
       <Item
        title='Favourite'
        iconName="heart-outline"
        onPress={navData.navigation.getParam('favourite')}
       />
      </HeaderButtons>
  )
}
}
const styles=StyleSheet.create({
    book:{
        flex:1,
        backgroundColor:"black",
       justifyContent:'flex-start',
       alignItems:'center',   
      },
      img:{
      
        minHeight:450,
        width:"85%"
      },
      txt:{
        padding:3,
        margin:5,
       justifyContent:'center',
       alignItems:'center'
      }
})
export default bookDetail
