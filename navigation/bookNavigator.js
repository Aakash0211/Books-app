import React from 'react'
import {Platform,View,Button } from 'react-native'
import {useDispatch} from 'react-redux'
import * as authActions from '../store/actions/authActions'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import {createDrawerNavigator,DrawerNavigatorItems} from 'react-navigation-drawer'
import BooksView from '../screens/booksView'
import BookDetail from '../screens/bookDetail'
import OrdersScreen from '../screens/ordersScreen'
import GenreResult from '../screens/GenreResult'
import bookSearchScreen from '../screens/bookSearchScreen'
import ProfileScreen from '../screens/profileScreen'
import {Ionicons} from '@expo/vector-icons'
import StartUpScreen from '../screens/StartUpScreen.js'
import SearchResult from '../screens/SearchResult'
import favouritesScreen from '../screens/favouritesScreen'
import authScreen from '../screens/AuthScreen.js'
import EditProfile from '../screens/EditProfile.js'

const defaultNavigationOptions={
  headerStyle:{
    backgroundColor:'#1DB954',
  },
  headerTintColor:Platform.OS==='ios'?'#FF00FF':'white'
}
const booksNavigator=createStackNavigator({
  Books:BooksView,
  Genre:GenreResult,
  detail:BookDetail,
  Order:OrdersScreen
},{
  defaultNavigationOptions:defaultNavigationOptions})

const searchNavigator=createStackNavigator({
 search:bookSearchScreen,
 result:SearchResult,
 detail:BookDetail,
 order:OrdersScreen
 },{defaultNavigationOptions:defaultNavigationOptions})

const orderNavigator=createStackNavigator({
  Order:OrdersScreen,
  detail:BookDetail
},{defaultNavigationOptions:defaultNavigationOptions})

const profileNavigator=createStackNavigator({
  profile:ProfileScreen,
  edit:EditProfile,
  favourites:favouritesScreen
},{defaultNavigationOptions:defaultNavigationOptions})

const favouriteNavigator=createStackNavigator({
  favourite:favouritesScreen,
  book:BooksView
},{defaultNavigationOptions:defaultNavigationOptions})
const authNavigator=createStackNavigator({
   auth:authScreen
},{defaultNavigationOptions:defaultNavigationOptions})

const TabsNavigator=createBottomTabNavigator({
 books:{screen:booksNavigator,navigationOptions:{
  tabBarIcon:(tabInfo)=>{
   return <Ionicons name='md-home' size={27} color={tabInfo.tintColor}/>
  },title:'Genres'
}},
search:{screen:searchNavigator, navigationOptions:{
    tabBarIcon:(tabInfo)=>{
    return <Ionicons name='search' size={27} color={tabInfo.tintColor}/>
    },
    title:'Search', 
  },defaultNavigationOptions:defaultNavigationOptions},
  order:{screen:orderNavigator,navigationOptions:{
      tabBarIcon:(tabInfo)=>{
        return <Ionicons name='cart' size={27} color={tabInfo.tintColor}/>
        },
        title:'Cart',
    }},
    profile:{screen:profileNavigator, navigationOptions:{
        tabBarIcon:(tabInfo)=>{
          return <Ionicons name='person' size={27} color={tabInfo.tintColor}/>
        },
        title:'Profile'
      }}
},{
  tabBarOptions:{
   activeTintColor:'green',
   inactiveTintColor:'black',
   keyboardHidesTabBar:'true',
  
   style:{
    padding:5,
   }
  }
},)
const drawerNavigator=createDrawerNavigator({
   Book:{ screen:TabsNavigator,navigationOptions:{
            drawerLabel:"Books"        
   }   
   },
   favourite:{
     screen:favouriteNavigator,navigationOptions:{
       drawerLabel:'Favourites',
     },
  }},{
    contentOptions: {
        activeTintColor:'blue'    
    },
    contentComponent:(props)=>{
      const dispatch=useDispatch()
      return <View style={{flex:1,paddingTop:30}}>
        <DrawerNavigatorItems {...props}/>    
        <Button title="Log Out"onPress={()=>{dispatch(authActions.logOut()),
          props.navigation.navigate('auth')
        }}/>
        </View>
      
    }
  })
const mainNavigator=createSwitchNavigator({
  start:StartUpScreen,
  auth:authNavigator,
  app:drawerNavigator
})



export default createAppContainer(mainNavigator)