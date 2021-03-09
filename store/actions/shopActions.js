 import GOOGLE_API from '../../helpers/api.js'
 import axios from 'axios'
 import Cart from '../../models/Cart'
import { applyMiddleware } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Favourite from '../../models/Favorite.js'
 export const GET_BOOKS='GET_BOOKS'
 export const DELETE_BOOKS='DELETE_BOOKS'
 export const DELETE_BOOK='DELETE_BOOK'
 export const GET_BOOK='GET_BOOK'
 export const ADD_TO_CART='ADD_TO_CART'
 export const REMOVE_FROM_CART='REMOVE_FROM_CART'
 export const ADD_FAVOURITE='ADD_FAVOURITE'
 export const REMOVE_FAVOURITE='REMOVE_FAVOURITE'
 export const LOAD_CART='LOAD_CART'
 export const LOAD_FAVOURITE='LOAD_FAVOURITE'
 export const loadBooks=(genre)=>{
     return async dispatch=>{
      try{
         const res= await axios.get(`https://www.googleapis.com/books/v1/volumes?q={subject:${genre}}&maxResults=40&printType=books&key=AIzaSyDgdPE2t0KqxNBTYnbt5dSzICTZHneiDng`)
         const books=await res.data.items
         dispatch({
            type:GET_BOOKS,
            books:books 
           })   
      }
       catch(err){
         console.error(err)
       }
     
    }
}
export const deleteBooks=()=>{
  return async dispatch =>{
   try{
      dispatch({
       type:DELETE_BOOKS
      })
   }
   catch(err){
    console.error(err)
   }
  }}

  export const searchBooks=(query)=>{
   
   return async dispatch=>{
    try{
       const res= await axios.get(`https://www.googleapis.com/books/v1/volumes?q={${query}}&maxResults=40&printType=books&key=AIzaSyDgdPE2t0KqxNBTYnbt5dSzICTZHneiDng`)
       const books=await res.data.items
       dispatch({
          type:GET_BOOKS,
          books:books 
         })   
    }
     catch(err){
       console.error(err)
     }
   
  }
}

export const addToCart=(book)=>{
  return async (dispatch,getState)=>{
    const userId=getState().auth.userId
    dispatch({
    type:ADD_TO_CART,
    payload:{
     book:book,
    userId:userId}
  })
 }
}

export const removeFromCart=(id)=>{
  return {
    type:REMOVE_FROM_CART,
    id:id 
  }
}
export const addFavourite=(book)=>{
 return async (dispatch,getState)=>{
   const userId=getState().auth.userId
   dispatch({
   type:ADD_FAVOURITE,
   payload:{
    book:book,
   userId:userId}
 })
}
}
export const removeFavourite=(id)=>{
  return{
    type:REMOVE_FAVOURITE,
    id:id
  }
}
