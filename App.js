import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation'
import ReportPhoto from './components/ReportPhoto.js'
import HomeScreen from './components/HomeScreen.js'
import AddLocation from './AddLocation'
import AddLocation2 from './AddLocation2'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
      <NavLinks />
      <AddLocation2 />
        <Text>Pothole Patrol</Text>
        <Text>Let's make Chicago better, together.</Text>
      </View>
    );
  }
}

const NavLinks = createStackNavigator(
  {
    Home: HomeScreen,
    ReportPhoto: ReportPhoto
  },
  { initialRouteName: 'Home' }
)
