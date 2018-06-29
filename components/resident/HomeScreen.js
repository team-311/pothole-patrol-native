import React from 'react';
import { connect } from 'react-redux'
import { createGetResidentReportsThunk } from '../../store/resident-reports';
import MyPotholes from './MyPotholes'
import { StyleSheet, ImageBackground, Dimensions } from 'react-native'
import { Container, View, Text, Button, Icon } from 'native-base'


const ScreenHeight = Dimensions.get('window').height;


class HomeScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      isVisible: true
    }
  }

  hideSplashScreen = () => {
    this.setState({
      isVisible: false
    })
  }
  static navigationOptions = { title: 'HOME' }

  componentDidMount() {
    var that = this
    this.props.getReports(this.props.user.id)
    setTimeout(function () {
      that.hideSplashScreen()
    }, 3000)
  }

  render() {
    const { navigate } = this.props.navigation
    const { user, openPotholes } = this.props
    let splashScreen = (
      <View>
        <ImageBackground source={require('../../customStyling/splash-screen.jpg')} style={styles.image}>
        </ImageBackground>
      </View>
    )
    return (
      <View style={styles.container}>
        {(this.state.isVisible === true) ? splashScreen : (
          <ImageBackground source={require('../../customStyling/home.jpg')} style={styles.image}>
            <Button block rounded style={styles.button} onPress={() => navigate('ReportPothole')}>
              <Text>Report a Pothole</Text>
            </Button>
          </ImageBackground>)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  button: {
    width: '80%',
    marginTop: 375,
    alignSelf: 'center',
  },
  flex: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  message: {
    color: 'gray',
    margin: 10,
    textAlign: 'center',
  },
  image: {
    height: ScreenHeight,
    width: '100%',
    marginTop: 0,
    alignSelf: 'center',
  }
})

const mapStateToProps = (state) => {
  return {
    openPotholes: state.residentReports.potholes.filter(report => report.status.toLowerCase() === 'open'),
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getReports: (id) => dispatch(createGetResidentReportsThunk(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
