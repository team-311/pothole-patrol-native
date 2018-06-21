import React from 'react';
import { Platform, Text, View, StyleSheet, Dimensions } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
const { Marker } = MapView;

const ScreenHeight = Dimensions.get('window').height;

const location = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default class AddLocation2 extends React.Component {
  constructor() {
    super();
    this.state = {
      errorMessage: null,
      initialRegion: {
        latitude: 41.895266,
        longitude: -87.639035,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'This is not going to work',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    let { latitude, longitude } = location.coords;
    const initialRegion = {
      latitude,
      longitude,
      latitudeDelta: 0.002,
      longitudeDelta: 0.001,
    };
    this.setState({ initialRegion });
  };

  render() {
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage
    } else if (this.state.initialRegion) {
      text = JSON.stringify(this.state.initialRegion)
    }
    return (
        <MapView
          style={styles.backgroundMap}
          region={this.state.initialRegion}
          provider={MapView.PROVIDER_GOOGLE}
        >
          <Marker
            coordinate={{
              latitude: this.state.initialRegion.latitude,
              longitude: this.state.initialRegion.longitude,
            }}
            title={text}
          />
        </MapView>
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
  backgroundMap: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: ScreenHeight
  },
});
