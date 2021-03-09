import React,{useState} from 'react';
import {AppLoading} from 'expo-app-loading'
import { StyleSheet, Text, View,LogBox } from 'react-native';
import {Provider} from 'react-redux'
import {createStore,combineReducers,applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'
import authReducer from './store/reducers/authReducer'
import ProfileReducer from './store/reducers/profileReducer.js'
import ShopReducer from './store/reducers/shopReducer.js'
import BookNavigator from './navigation/bookNavigator'
import {enableScreens} from 'react-native-screens'
export default function App() {
  enableScreens()
  LogBox.ignoreAllLogs(true)
  const mainReducer=combineReducers({
   auth:authReducer,
   profile:ProfileReducer,
   shop:ShopReducer
  })
  const store =createStore(mainReducer,applyMiddleware(ReduxThunk))
  return (
    <Provider store={store}>
    <BookNavigator/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
