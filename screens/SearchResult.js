import React,{useEffect,useState} from 'react'
import {FlatList,ActivityIndicator,Text} from 'react-native'
import {useSelector,useDispatch} from 'react-redux'
import * as bookActions from '../store/actions/shopActions'
import Book2 from '../components/Book2'
const GenreResult = props => {
    
    const query=props.navigation.getParam('query')
    const dispatch=useDispatch()
    useEffect(()=>{
     dispatch(bookActions.deleteBooks())
     dispatch(bookActions.searchBooks(query))
    },[dispatch,query,bookActions.searchBooks])
    const books=useSelector(state => state.shop.books)

    if(books){
        return(  
            <FlatList
             numColumns={2}
             data={books}
           renderItem={(itemData)=>(  <Book2
            image={ itemData.item.volumeInfo.imageLinks && itemData.item.volumeInfo.imageLinks.thumbnail}
            title={itemData.item.volumeInfo.title} id={itemData.item.id}
            navigation={props.navigation}
           /> )} 
           /> 
        );}
     else{
         return <Text>No Books To Show</Text>
     }
      
       
}

GenreResult.navigationOptions={
 headerTitle:'Result'
}
export default GenreResult
