import React from 'react';
import {connect} from 'react-redux'
import { Platform, Text, StyleSheet, Dimensions } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
const { Marker } = MapView;
import {fetchPotholes} from '../store'

const ScreenHeight = Dimensions.get('window').height;


class AddPotholeLocation extends React.Component {
  constructor() {
    super();
    this.state = {
      errorMessage: null,
      potholes: [],
      initialRegion: {
        latitude: 41.895266,
        longitude: -87.639035,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
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
    this._getPotholesAsync(latitude, longitude)
  };

  _getPotholesAsync = async (lat, lon) => {
    await this.props.getPotholes(lat, lon)
  }

  render() {
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.initialRegion) {
      text = JSON.stringify(this.state.initialRegion);
    }
    return (
      <MapView
        style={styles.backgroundMap}
        region={this.state.initialRegion}
        provider={MapView.PROVIDER_GOOGLE}
      >
      <Text style={styles.text}>Do You See Your Pothole?</Text>
        {this.props.potholes.map(marker => {
          const lat = Number(marker.latitude)
          const lon = Number(marker.longitude)
          return (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: lat,
                longitude: lon,
              }}
              title="Open pothole"
              description="It's already on the map! If this is the one you were going to report, click on it to upvote so it gets to your rep's attention faster. (Maybe)."
              image='https://s3.us-east-2.amazonaws.com/soundandcolor/poo.png'
            />
          );
        })}
        <Marker
          draggable
          coordinate={this.state.x}
          onDragEnd={(e) => this.setState({
            x: e.nativeEvent.coordinate
          })}
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
    height: ScreenHeight,
  },
  text: {
    backgroundColor: '#fff',
    height: 20,
    width: 170,
    top: 200,
    left: 80
  }
});

const mapStateToProps = (state) => {
  return {
    potholes: state.potholes.potholes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPotholes: (lat, lon) => dispatch(fetchPotholes(lat, lon))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPotholeLocation)
