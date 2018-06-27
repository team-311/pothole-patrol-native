import React from 'react'
import { Icon } from 'native-base'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import Home from '../crew/home'
import Settings from '../Settings'
import SingleOrder from '../crew/single-order'
import OrderDirections from '../crew/order-directions'
import OrderHistory from '../crew/order-history'
import SingleOrderHistory from '../crew/single-order-history'
import IndividualPothole from '../IndividualPothole'

const SingleOrderLinks = createStackNavigator({
  SingleOrder: {
    screen: SingleOrder,
    navigationOptions: () => ({
      title: "Today's Work Order"
    })
  },
  Directions: {
    screen: OrderDirections,
  },
  IndividualPothole: {
    screen: IndividualPothole,
  }
}, {
  initialRouteName: 'SingleOrder',
})

const OrderHistoryLinks = createStackNavigator({
  OrderHistory: {
    screen: OrderHistory,
  },
  SingleOrderHistory: {
    screen: SingleOrderHistory,
  },
  IndividualPothole: {
    screen: IndividualPothole
  }
}, {
  initialRouteName: 'OrderHistory'
})


const DrawerLinks = createDrawerNavigator({
  SingleOrder: {
    screen: SingleOrderLinks,
    navigationOptions: {
      title: "Today's Work Order"
    }
  },
  OrderHistory: {
    screen: OrderHistoryLinks,
    navigationOptions: {
      drawerLabel: 'Work Order History'
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
  initialRouteName: 'SingleOrder',
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
