import React from 'react'
import { Icon, Text, View } from 'native-base'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import Home from '../crew/home'
import Settings from '../Settings'
import OrderDirections from '../crew/order-directions'
import OrderHistory from '../crew/order-history'
import SingleOrderHistory from '../crew/single-order-history'
import IndividualPothole from '../IndividualPothole'
import FinishedLanding from '../crew/finished-landing'
import Logout from '../logout'

const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      drawerLabel: "Today's Assignment",
    }
  },
  OrderHistory: {
    screen: OrderHistory,
    navigationOptions: {
      drawerLabel: "Assignment History",
    }
  },
  Settings: {
    screen: Settings,
  },
  Logout: {
    screen: Logout,
  },
  Finished: {
    screen: FinishedLanding,
    navigationOptions: {
      drawerLabel: () => null
    }
  }
},
{
  initialRouteName: 'Home',
  contentOptions: {
    activeTintColor: "#FC4C02"
  }
})

DrawerNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  // Add any title here that does NOT match the route name verbatim
  const customRouteTitles = {
    Home: "Today's Assignment",
    OrderHistory: "Assignment History",
  }
  if (customRouteTitles[routeName]) {
    return {
      headerTitle: customRouteTitles[routeName]
    }
  } else {
    return {
      headerTitle: routeName
    }
  }
}

const createBackButton = (navigation) => <Icon name="ios-arrow-back" type="Ionicons" style={{marginLeft: 15, color: 'white'}} onPress={() => navigation.goBack()} />

export default createStackNavigator({
  Base: {
    screen: DrawerNavigator,
  },
  Directions: {
    screen: OrderDirections,
    navigationOptions: ({navigation}) => ({
      headerLeft: createBackButton(navigation),
      title: 'Directions'
    })
  },
  IndividualPothole: {
    screen: IndividualPothole,
    navigationOptions: ({navigation}) => ({
      headerLeft: createBackButton(navigation),
      title: 'Individual Pothole'
    })
  },
  SingleOrderHistory: {
    screen: SingleOrderHistory,
    navigationOptions: ({navigation}) => ({
      headerLeft: createBackButton(navigation),
      title: 'Individual Assignment'
    })
  },
}, {
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: '#FC4C02' },
      headerTintColor: '#FFFFFF',
      title: 'Pothole Patrol',
      headerLeft: <Icon name="menu" style={{marginLeft: 15, color: '#FFFFFF'}} onPress={() => navigation.toggleDrawer()} />
    })
})
