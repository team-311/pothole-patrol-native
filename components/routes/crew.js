import React from 'react'
import { Icon } from 'native-base'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import Home from '../crew/home'
import Settings from '../Settings'
import SingleOrder from '../crew/single-order'
import OrderDirections from '../crew/order-directions'

const SingleOrderLinks = createStackNavigator({
  SingleOrder: {
    screen: SingleOrder,
  },
  Directions: {
    screen: OrderDirections,
  }
}, {
  initialRouteName: 'SingleOrder',
})


// Resident main app routes
const DrawerLinks = createDrawerNavigator({
  Home: {
    screen: Home
  },
  SingleOrder: {
    screen: SingleOrderLinks,
    navigationOptions: {
      drawerLabel: `Today's Work Order`
    }
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
      headerLeft: <Icon name="menu" style={{marginLeft: 15}} onPress={() => navigation.toggleDrawer()} />
    })
})