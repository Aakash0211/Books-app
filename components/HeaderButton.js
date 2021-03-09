import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'
import {HeaderButton} from 'react-navigation-header-buttons'

const Headerbutton = props => {
    return ( 
        <HeaderButton
        {...props}
         IconComponent={Ionicons}
         iconSize={28}
        />
    )
}

export default Headerbutton
