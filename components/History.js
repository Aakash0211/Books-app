import React from 'react'
import {View,Text,TouchableWithoutFeedback,StyleSheet } from 'react-native'
const History = props=> {
    return (
        <TouchableWithoutFeedback>
         <View style={styles.search}>
            <Text>{props.value}</Text>
         </View>
        </TouchableWithoutFeedback>
    )
}
const styles=StyleSheet.create({
  search:{
    padding:10,
    flex:1,
    borderColor:'#ddd',
    borderWidth:1,
    marginVertical:1
  }


})
export default History
