import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux'

class HomeScreen extends React.Component {
  static navigationOptions = { title: 'Home' }
  render() {
    const { navigate } = this.props.navigation
    const { user } = this.props
    return (
      <View style={styles.container}>
        <Text>Welcome to Pothole Patrol!</Text>
        <Text>Let's make Chicago better, together.</Text>
        {
          (user && user.potholes.length > 0) ?
          <View style={{margin: 20, alignItems: 'center'}}>
            <Text>My active pothole requests:</Text>
              {user.potholes.map(pothole => <Text key={pothole.id}>{pothole.streetAddress}</Text>)}
          </View>
          : <View />
        }
        <TouchableOpacity onPress={() => navigate('ReportPothole')} color="blue">
          <Image source={require('../customStyling/butReportAPothole.png')} style={styles.button} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#B3DDF2',
    width: 200,
    height: 93,
    resizeMode: Image.resizeMode.contain
  }
})

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

export default connect(mapStateToProps)(HomeScreen)
