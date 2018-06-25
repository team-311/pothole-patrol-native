import { createStackNavigator, createSwitchNavigator } from 'react-navigation'
import ResidentSignedIn from './routes/resident'
import CrewSignedIn from './routes/crew'
import Login from './login'

export const SignedOut = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login'
    }
  }
}, {
  headerMode: 'none',
  navigationOptions: {
      headerVisible: false,
  }
})

export const createRootNavigator = (signedIn = false, type = 'resident') => {
  let initialRouteName = 'SignedOut'
  if (signedIn && type === 'crew') initialRouteName = 'CrewSignedIn'
  else if (signedIn) initialRouteName = 'ResidentSignedIn'

  return createSwitchNavigator({
    ResidentSignedIn: {
      screen: ResidentSignedIn,
    },
    CrewSignedIn: {
      screen: CrewSignedIn,
    },
    SignedOut: {
      screen: SignedOut,
    }
  },{
    initialRouteName,
  })
}
