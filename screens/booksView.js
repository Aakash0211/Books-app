import React from 'react'
import { FlatList,StyleSheet} from 'react-native'
import Categories from '../data/dummy-data'
import Book from '../components/Book.js'
import {HeaderButtons,Item} from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
const booksView=props=> {
    return (
        <FlatList
          numColumns={2}
          data={Categories}
         renderItem={(itemData)=>(
        <Book image={itemData.item.imageUri} category={itemData.item.name} navigation={props.navigation}/>
         )}
         style={styles.screen}/>
        
    );
}
booksView.navigationOptions=(navData)=>{
  return{
    headerTitle:'Genres',
    headerLeft:<HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item 
         title='drawer'
        iconName='md-menu' 
        iconSize={30}
         onPress={()=>{navData.navigation.toggleDrawer()}}
        />
      </HeaderButtons>}
}
const styles=StyleSheet.create({
  screen:{
   backgroundColor:'#FFFFFF'
  }
})

export default booksView
