import React from 'react';
import { connect } from 'react-redux';
import { Platform, StyleSheet, Dimensions } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
import { getGeocodedAddress, fetchPotholes, updateUserLatLonThunkCreator, updateAddressActionCreator } from '../../store/potholes';
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
} from 'native-base';
import UpvotePothole from './UpvotePothole.js';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

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
      userLocation: {
        latitude: 41.895266,
        longitude: -87.639035,
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
      latitudeDelta: 0.0002,
      longitudeDelta: 0.0001,
    };

    const userLocation = {
      latitude,
      longitude,
    };

    //get geocoded address and fetch potholes
    this.setState({ initialRegion, userLocation }, async () => {
      this._getAddressAsync(userLocation.latitude, userLocation.longitude);
      this._getPotholesAsync(latitude, longitude);
    });
  };

  _getAddressAsync = async (latitude, longitude) => {
    const address = await this.props.getAddress(latitude, longitude);
    this.setState({
      streetAddress: address.slice(0, 2).join(' '),
      zipcode: address[2],
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

  _onUserDragEnd = event => {
    this.setState(
      {
        userLocation: {
          longitude: event.nativeEvent.coordinate.longitude,
          latitude: event.nativeEvent.coordinate.latitude,
        },
        initialRegion: {
          longitude: event.nativeEvent.coordinate.longitude,
          latitude: event.nativeEvent.coordinate.latitude,
          latitudeDelta: 0.0002,
          longitudeDelta: 0.0001,
        },
      },
      () => {
        this._getAddressAsync(
          this.state.userLocation.latitude,
          this.state.userLocation.longitude
        );
      }
    );
  };

  render() {
    const potholes = this.props.potholes ? this.props.potholes : [];
    const address = this.props.potholes.address ? this.props.potholes.address : 'hello'

    const currentLocation = { description: `${address}`, geometry: { location: { lat: this.state.userLocation.latitude, lng: this.state.userLocation.longitude } }}

    return (
      <Container>
        <Content>
          <MapView
            ref={map => (this.map = map)}
            style={styles.map}
            region={this.state.initialRegion}
            provider={MapView.PROVIDER_GOOGLE}
          >
            {potholes.map(pothole => {
              return (
                <Marker
                  key={pothole.id}
                  coordinate={{
                    latitude: Number(pothole.latitude),
                    longitude: Number(pothole.longitude),
                  }}
                  title="Open pothole"
                  image="https://s3.us-east-2.amazonaws.com/soundandcolor/button+(2).png"
                >
                  <UpvotePothole
                    potholeId={pothole.id}
                    navigation={this.props.navigation}
                  />
                </Marker>
              );
            })}
            <Marker
              draggable
              coordinate={{
                latitude: this.state.userLocation.latitude,
                longitude: this.state.userLocation.longitude,
              }}
              onDragEnd={this._onUserDragEnd}
              title="Your current location"
            />
          </MapView>
          <Text style={styles.text}>Confirm Pothole Address</Text>
          <Container>
            <Card>
              <Form>
                <Item last>
                  <GooglePlacesAutocomplete
                    predefinedPlaces={[currentLocation]}
                    placeholder="Search"
                    minLength={3}
                    autoFocus={false}
                    returnKeyType={'search'}
                    listViewDisplayed="auto" // true/false/undefined
                    fetchDetails={true}
                    renderDescription={row => row.description} // custom description render
                    onPress={(data, details = null) => {
                      //do something else here
                      this.props.updateUserLatLon(details.address_components)
                      this.props.updateAddress(details.address_components)
                      console.log('details.address_components', details.address_components);
                    }}
                    getDefaultValue={() => this.state.address || ''}
                    query={{
                      // available options: https://developers.google.com/places/web-service/autocomplete
                      key: 'AIzaSyCDyhK7JGy-x8idR46N4pHd89LtxKzbuq8',
                      language: 'en',
                      types: 'address',
                      location: '41.895266,-87.639035',
                      radius: 1000,
                    }}
                    styles={{
                      textInputContainer: {
                        width: '100%',
                      },
                      description: {
                        fontWeight: 'bold',
                      },
                      predefinedPlacesDescription: {
                        color: '#1faadb',
                      },
                    }}
                    nearbyPlacesAPI="GoogleReverseGeocoding"
                    debounce={200}
                  />
                </Item>
                <Button style={styles.button} primary onPress={this.handleNext}>
                  <Text> Next </Text>
                </Button>
              </Form>
            </Card>
          </Container>
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
    userLatLon: state.potholes.userLatLon,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPotholes: (lat, lon) => dispatch(fetchPotholes(lat, lon)),
    getAddress: (lat, lon) => dispatch(getGeocodedAddress(lat, lon)),
    updateLocation: location => dispatch(createUpdateLocationAction(location)),
    updateUserLatLon: address => dispatch(updateUserLatLonThunkCreator(address)),
    updateAddress: address => dispatch(updateAddressActionCreator(address))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPotholeLocation);
