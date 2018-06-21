import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';
import { connect } from 'react-redux'
import { getSinglePotholeServer } from '../store/potholes'


export class IndividualPothole extends React.Component {
  constructor(props) {
    super(props)
    this.props.getSinglePothole(1)
  }


  static navigationOptions = { title: 'Potholes' }
  render() {
    //const { navigate } = this.props.navigation
    const pothole = this.props.potholes
    console.log(pothole)
    return (
      <View style={styles.container}>
        <Text>ID: {pothole.id} || STATUS:{pothole.status}</Text>
        <Text>MAP HERE</Text>
        <Text>ADDRESS: {pothole.streetAddress}</Text>
        <Text>ZIP: {pothole.zip}</Text>
        <Text>DESCRIPTION HERE</Text>
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
});


const mapState = state => {
  return {
    potholes: state.potholes,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getSinglePothole: (id) => dispatch(getSinglePotholeServer(id))
  }
}

export default connect(mapState, mapDispatch)(IndividualPothole)
