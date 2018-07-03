import React from 'react'
import { Icon, Text, Button } from 'native-base'
import { createStackNavigator, createDrawerNavigator, StackActions, NavigationActions } from 'react-navigation'
import AddPotholeLocation from '../resident/AddPotholeLocation';
import ReportPhoto from '../resident/ReportPhoto';
import LandingPage from '../resident/LandingPage';
import ReportDescription from '../resident/ReportDescription';
import HomeScreen from '../resident/HomeScreen';
import IndividualPothole from '../IndividualPothole';
import MyPotholes from '../resident/MyPotholes'
import Settings from '../Settings'
import Logout from '../logout'

const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      drawerLabel: 'Home'
    }
  },
  ReportPothole: {
    screen: AddPotholeLocation,
    navigationOptions: {
      drawerLabel: 'Report a Pothole'
    }
  },
  MyPotholes: {
    screen: MyPotholes,
    navigationOptions: {
      drawerLabel: 'View My Potholes'
    }
  },
  LandingPage: {
    screen: LandingPage,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  Settings: {
    screen: Settings,
  },
  Logout: {
    screen: Logout,
  }
},
  {
    initialRouteName: 'Home',
    contentOptions: {
      activeTintColor: "#FC4C02"
    }
  })

const createBackButton = (navigation) => <Icon name="ios-arrow-back" type="Ionicons" style={{ marginLeft: 15, color: 'white' }} onPress={() => navigation.goBack()} />
const createCancelButton = (navigation) => {
  const action = StackActions.reset({
    index: 0,
    key: null, // black magic
    actions: [NavigationActions.navigate({ routeName: 'Base' })]
  })

  return (
    <Button
      small
      transparent
      onPress={() => navigation.dispatch(action)}
      style={{ alignSelf: 'center' }}
    ><Text style={{
      textDecorationLine: 'underline',
      color: 'white',
    }}>Cancel</Text></Button>
  )
}

DrawerNavigator.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  // Add any title here that does NOT match the route name verbatim
  const customRouteTitles = {
    Home: "Pothole Patrol",
    ReportPothole: "Report a Pothole",
    MyPotholes: "My Potholes",
    LandingPage: "Pothole Patrol"
  }
  if (customRouteTitles[routeName]) {
    if (routeName === 'ReportPothole') {
      return {
        headerTitle: customRouteTitles[routeName],
        headerRight: createCancelButton(navigation)
      }
    } else {
      return {
        headerTitle: customRouteTitles[routeName]
      }
    }
  } else {
    return {
      headerTitle: routeName
    }
  }
}

export default createStackNavigator({
  Base: {
    screen: DrawerNavigator,
  },
  ViewSinglePothole: {
    screen: IndividualPothole,
    navigationOptions: ({ navigation }) => ({
      headerLeft: createBackButton(navigation),
      title: 'Individual Pothole'
    })
  },
  Camera: {
    screen: ReportPhoto,
    navigationOptions: ({ navigation }) => ({
      headerLeft: createBackButton(navigation),
      headerRight: createCancelButton(navigation),
      title: 'Take a Photo (optional)'
    })
  },
  ReportDescription: {
    screen: ReportDescription,
    navigationOptions: ({ navigation }) => ({
      headerLeft: createBackButton(navigation),
      headerRight: createCancelButton(navigation),
      title: 'Add Details'
    })
  },
}, {
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
      headerStyle: { backgroundColor: '#FC4C02' },
      headerTintColor: '#FFFFFF',
      title: 'Pothole Patrol',
      headerLeft: <Icon name="menu" style={{ marginLeft: 15, color: '#FFFFFF' }} onPress={() => navigation.toggleDrawer()} />
    })
  })
