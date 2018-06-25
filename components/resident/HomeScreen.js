import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux'
import { createGetResidentReportsThunk } from '../../store/resident-reports';


class HomeScreen extends React.Component {
  static navigationOptions = { title: 'HOME' }

  componentDidMount () {
    this.props.getReports(this.props.user.id)
  }

  render() {
    const { navigate } = this.props.navigation
    const { user, openPotholes } = this.props
    return (
      <View style={styles.container}>
        <Text>Welcome {user.firstName}!</Text>
        <Text>Let's make Chicago better, together.</Text>
        {
          (openPotholes && openPotholes.length > 0) && (
            <View style={styles.openPotholes}>
              {openPotholes.map(pothole => <Text key={pothole.id}>{pothole.streetAddress}</Text>)}
            </View>
          )
        }
        <TouchableOpacity onPress={() => navigate('ReportPothole')} color="blue">
          <Image source={require('../../customStyling/butReportAPothole.png')} style={styles.button} />
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
  },
  openPotholes: {
    margin: 20,
  }
});

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
