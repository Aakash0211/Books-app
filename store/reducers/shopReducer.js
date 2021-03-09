import Cart from "../../models/Cart"
import Favourite from '../../models/Favorite.js'
import { DELETE_BOOKS, GET_BOOKS,ADD_TO_CART, REMOVE_FROM_CART, ADD_FAVOURITE, REMOVE_FAVOURITE ,LOAD_CART, LOAD_FAVOURITE} from "../actions/shopActions"
import {addItemToCart,removeItemFromCart} from '../../helpers/Carti.js'
import { Alert} from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState={
  books:[],
  cart:[],
  favourites:[]
}
export default (state=initialState,action)=>{
    switch(action.type){
     
     case GET_BOOKS:
       return{  
           ...state,
          books:action.books
      }
      case DELETE_BOOKS:{
        return {
          ...state,
          books:[]
        }
      }
      case LOAD_CART:{
        return{
          ...state,
          cart:action.cart.filter(item=>{item.ownerId===action.id})
        }
      }
     case ADD_TO_CART:{
       const newCart=addItemToCart(state.cart,action.payload)
    return{
      ...state,
      cart:newCart
    }
  }
   case REMOVE_FROM_CART:{
    return{
      ...state,
      cart:removeItemFromCart(state.cart,action.id)
    }
   }
   case ADD_FAVOURITE:{
     book=action.payload.book;
     
     const favourites=new Favourite(book.id,action.payload.userId,book.volumeInfo.title,book.volumeInfo.authors,book.volumeInfo.language)
    return{
      ...state,
      favourites:[...state.favourites,favourites]
    }
  }
  
   case REMOVE_FAVOURITE:{
     const id=action.id
     const newFavourites=state.favourites.filter(item=>item.id!==id)
     return{
     ...state,
     favourites:newFavourites
     }
   }
     default:
        return state
    }
}