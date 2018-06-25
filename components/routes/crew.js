import React from 'react'
import { Text } from 'react-native'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import Home from '../crew/home'
import Settings from '../Settings'

// Resident main app routes
const DrawerLinks = createDrawerNavigator({
  Home: {
    screen: Home
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings'
    }
  }
},
{
  initialRouteName: 'Home',
})

export default createStackNavigator({
  Base: {
    screen: DrawerLinks,
  },
}, {
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: '#B3DDF2' },
      headerTintColor: '#FF0000',
      title: 'Pothole Patrol',
      headerLeft: <Text onPress={() => navigation.toggleDrawer()}>     MENU</Text>
    })
})
