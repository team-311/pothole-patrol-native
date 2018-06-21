import React from 'react';
import { Platform, Text, View, StyleSheet, Dimensions } from 'react-native';
import {MapView, Constants, Location, Permissions } from 'expo';
const { Marker } = MapView

export default class AddLocation extends React.Component {
  constructor(){
    super()
    this.state = {
      errorMessage: null,
      initialRegion: {
        latitude: 41.895266,
        longitude: -87.639035,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    }
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'This is not going to work'
      })
    } else {
      this._getLocationAsync()
    }
  }

  _getLocationAsync = async() => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied'
      })
    }
    let location = await Location.getCurrentPositionAsync({});
    let {latitude, longitude} = location.coords
    const initialRegion = {latitude, longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421}
    this.setState({initialRegion});
  }

  render() {
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage
    } else if (this.state.initialRegion) {
      text = JSON.stringify(this.state.initialRegion)
    }
    return (
      <View style={styles.container}>
       <MapView
      initialRegion={this.state.initialRegion}
      provider={MapView.PROVIDER_GOOGLE}
    >
      <Marker
        coordinate={{
          latitude: 41.895266,
          longitude: -87.639035,
        }}
        title="Your Current Location"
      />
    </MapView>
      </View>
    )
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});
