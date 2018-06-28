import React from 'react';
import { connect } from 'react-redux';
import { Platform, StyleSheet, Dimensions } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
import { getGeocodedAddress, fetchPotholes } from '../../store/potholes';
import { createUpdateLocationAction } from '../../store/report';
import {
  Container,
  Content,
  Text,
  Card,
  Form,
  Item,
  Input,
  Button,
  H3,
} from 'native-base';
import UpvotePothole from './UpvotePothole.js';
const { Marker } = MapView;

const ScreenHeight = Dimensions.get('window').height;

class AddPotholeLocation extends React.Component {
  constructor() {
    super();
    this.state = {
      streetAddress: '',
      zipcode: '',
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
    //ask for permissions
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    //get current location
    let location = await Location.getCurrentPositionAsync({});
    let { latitude, longitude } = location.coords;

    //create region based on user location
    const initialRegion = {
      latitude,
      longitude,
      latitudeDelta: 0.002,
      longitudeDelta: 0.001,
    };

    //get geocoded address and fetch potholes
    this.setState({ initialRegion }, async () => {
      const address = await this.props.getAddress(
        this.state.initialRegion.latitude,
        this.state.initialRegion.longitude
      );
      this.setState({
        streetAddress: address.slice(0, 2).join(' '),
        zipcode: address[2],
      });
      this._getPotholesAsync(latitude, longitude);
    });
  };

  _getPotholesAsync = async (lat, lon) => {
    await this.props.getPotholes(lat, lon);
  };

  handleNext = () => {
    const location = {
      streetAddress: this.state.streetAddress,
      zip: this.state.zipcode,
      latitude: this.state.initialRegion.latitude,
      longitude: this.state.initialRegion.longitude,
    };
    this.props.updateLocation(location);
    this.props.navigation.navigate('Camera');
  };

  render() {
    const potholes = this.props.potholes ? this.props.potholes : [];

    return (
      <Container>
        <Content>
          <MapView
            ref={map => (this.map = map)}
            style={{ width: Dimensions.width(), Dimentions.height: mapHeight, zIndex: 0 }}
            region={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Components.MapView.Marker
              key={'i29'}
              draggable
              onDragEnd={this.onUserPinDragEnd.bind(this)}
              title={'You are here'}
              coordinate={{
                latitude: this.state.userLocation.coords.latitude,
                longitude: this.state.userLocation.coords.longitude,
              }}
            />
          </Components.MapView>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: ScreenHeight / 1.75,
  },
  text: {
    padding: 10,
  },
  button: {
    left: 105,
  },
});

const mapStateToProps = state => {
  return {
    potholes: state.potholes.potholes,
    address: state.potholes.address,
    userId: state.user.id,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPotholes: (lat, lon) => dispatch(fetchPotholes(lat, lon)),
    getAddress: (lat, lon) => dispatch(getGeocodedAddress(lat, lon)),
    updateLocation: location => dispatch(createUpdateLocationAction(location)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPotholeLocation);
