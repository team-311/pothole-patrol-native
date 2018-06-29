import React from 'react';
import { connect } from 'react-redux'
import { createGetResidentReportsThunk, getUserUpvotesThunkCreator } from '../../store/resident-reports';
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

  static navigationOptions = { title: 'HOME' }

  componentDidMount() {
    this.props.getReports(this.props.user.id)
    this.props.getUpvotes(this.props.user.id)
  }

  render() {
    const { navigate } = this.props.navigation
    const { user, openPotholes } = this.props
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../customStyling/home.jpg')} style={styles.image}>
          <Button block rounded style={styles.button} onPress={() => navigate('ReportPothole')}>
            <Text>Report a Pothole</Text>
          </Button>
        </ImageBackground>
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
    getUpvotes: (id) => dispatch(getUserUpvotesThunkCreator(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
