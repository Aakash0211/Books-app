import React, { useEffect } from 'react'
import { FlatList } from 'react-native'
import {useSelector,useDispatch} from 'react-redux'
import FavouriteItem from '../components/FavouriteItem'
import * as bookActions from '../store/actions/shopActions'
const favouritesScreen = () => {
 
  
   const favourites=useSelector(state=>state.shop.favourites)
   if(favourites.length>0){
        return(
            <FlatList
              data={favourites}
              renderItem={(itemData)=>(
              <FavouriteItem
               id={itemData.item.id}
               title={itemData.item.title}
               authors={itemData.item.authors}
               language={itemData.item.language}      
              />  
              )}        
            />
        );
    }
    else{
      return null;
    }
    
}
favouritesScreen.navigationOptions={
  headerTitle:'Favorites',
  
}
export default favouritesScreen
