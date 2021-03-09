import React,{useEffect,useState} from 'react'
import {FlatList,ActivityIndicator} from 'react-native'
import {useSelector,useDispatch} from 'react-redux'
import * as bookActions from '../store/actions/shopActions'
import Book2 from '../components/Book2'
const GenreResult = props => {
    const genre=props.navigation.getParam('Genre')
    const dispatch=useDispatch()
    const [load,setLoad]=useState(true)
    
    
    useEffect(()=>{
     dispatch(bookActions.deleteBooks())
     dispatch(bookActions.loadBooks(genre))
     setLoad(false)
    },[dispatch,genre])
    const books=useSelector(state => state.shop.books)
    return (
    load?(<ActivityIndicator size={40} color='black'/>):
       (<FlatList
        numColumns={2}
        data={books}
      renderItem={(itemData)=>(
        <Book2
         image={itemData.item.volumeInfo.imageLinks.thumbnail}
         title={itemData.item.volumeInfo.title} id={itemData.item.id}
         navigation={props.navigation}
        />
      )  
      }
       />)
    )
}

GenreResult.navigationOptions=navData=>{
   return{
     headerTitle:navData.navigation.getParam('Genre')
}}
export default GenreResult
