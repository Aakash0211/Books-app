import React,{useEffect} from 'react'
import {View,Text,FlatList, Alert} from 'react-native'
import {useDispatch,useSelector} from 'react-redux'
import CartItem from '../components/CartItem'
import * as bookActions from '../store/actions/shopActions.js'
const ordersScreen =(props) => {
  
  
    const carts=useSelector(state =>state.shop.cart) 
 if(carts.length>0){
    return(
        <FlatList
          data={carts}
          renderItem={(itemData)=>(
          <CartItem
           id={itemData.item.id}
           title={itemData.item.title}
           authors={itemData.item.authors}
           language={itemData.item.language}
           quantity={itemData.item.quantity}           
          />  
          )}        
        />
    );
}
else{
  return null;
}

}

export default ordersScreen
