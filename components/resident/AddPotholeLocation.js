import React from 'react';
import { connect } from 'react-redux';
import { Platform, StyleSheet, Dimensions, View } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
import {
  getGeocodedAddress,
  fetchPotholes,
  updateUserLatLonThunkCreator,
  updateAddressActionCreator,
  updateUserLatLonAction,
} from '../../store/potholes';
import { createUpdateLocationAction } from '../../store/report';
import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  Right,
  Icon,
  Button,
} from 'native-base';
import UpvotePothole from './UpvotePothole.js';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const { Marker } = MapView;
const defaultRegion = {
  latitude: 41.8781,
  longitude: -87.6298,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const ScreenHeight = Dimensions.get('window').height;

class AddPotholeLocation extends React.Component {
  constructor() {
    super();
    this.state = {
      showCallout: true,
      streetAddress: '',
      zipcode: '',
      initialRegion: defaultRegion,
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

    //create region and place marker based on user location
    const initialRegion = {
      latitude,
      longitude,
      latitudeDelta: 0.0005,
      longitudeDelta: 0.0005,
    };

    const userLocation = {
      latitude,
      longitude,
    };

    //get geocoded address and fetch potholes
    this.setState({ initialRegion, userLocation }, async () => {
      this._getAddressAsync(userLocation.latitude, userLocation.longitude);
      this.props.updateUserLatLonDirect({ latitude, longitude });
      this._getPotholesAsync(latitude, longitude);
    });
  };

  _getAddressAsync = async (latitude, longitude) => {
    const address = await this.props.getAddress(latitude, longitude);
    this.setState(
      {
        streetAddress: address.slice(0, 2).join(' '),
        zipcode: address[2],
      },
      () => {
        this.locationRef.setAddressText(this.state.streetAddress);
      }
    );
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
    const currentLatDelta = this.state.initialRegion.latitudeDelta;
    const currentLonDelta = this.state.initialRegion.longitudeDelta;
    this.setState(
      {
        userLocation: {
          longitude: event.nativeEvent.coordinate.longitude,
          latitude: event.nativeEvent.coordinate.latitude,
        },
        initialRegion: {
          longitude: event.nativeEvent.coordinate.longitude,
          latitude: event.nativeEvent.coordinate.latitude,
          latitudeDelta: currentLatDelta,
          longitudeDelta: currentLonDelta,
        },
      },
      () => {
        this._getAddressAsync(
          this.state.userLocation.latitude,
          this.state.userLocation.longitude
        );
        this._getPotholesAsync(
          this.state.userLocation.latitude,
          this.state.userLocation.longitude
        );
      }
    );
  };

  _handleLocationSearch = async details => {
    await this.props.updateUserLatLon(details.address_components);
    await this.props.updateAddress(details.address_components);
    await this._getPotholesAsync(
      this.props.userLatLon.latitude,
      this.props.userLatLon.longitude
    );
    const streetAddress =
      details.address_components[0].long_name +
      ' ' +
      details.address_components[1].short_name;
    const zipcode = details.address_components[7].long_name;
    this.setState({
      streetAddress,
      zipcode,
      userLocation: this.props.userLatLon,
      initialRegion: {
        latitude: this.props.userLatLon.latitude,
        longitude: this.props.userLatLon.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
    });
  };

  render() {
    const potholes = this.props.potholes ? this.props.potholes : [];

    return (
      <Container>
        <Content>
          <View style={styles.mapView}>
            <MapView
              ref={map => (this.map = map)}
              style={styles.map}
              region={this.state.initialRegion}
              provider={MapView.PROVIDER_GOOGLE}
              onRegionChangeComplete={region => {
                if (region.logitudeDelta > 1) this._getLocationAsync();
              }}
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
                    image="https://s3.us-east-2.amazonaws.com/soundandcolor/traffic-cone+(2).png"
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
            {this.state.showCallout && (
              <Card style={styles.card}>
                <CardItem>
                  <Icon
                    type="Entypo"
                    active
                    name="traffic-cone"
                    style={{
                      color: 'orange',
                    }}
                  />
                  <Text>
                    These are potholes. If you see yours, you can click to view
                    and upvote.
                  </Text>
                </CardItem>
                <CardItem>
                  <Text style={{ alignSelf: 'center' }}>
                    If not, you can start a new report by confirming its
                    address.
                  </Text>
                </CardItem>
                <Right style={{ alignSelf: 'flex-end' }}>
                  <Button small bordered style={{margin: 3}}
                    onPress={() =>
                      this.setState({
                        showCallout: false,
                      })
                    }
                  >
                    <Text>Got it!</Text>
                  </Button>
                </Right>
              </Card>
            )}
          </View>
          <Text style={styles.text}>Confirm Pothole Address</Text>
          <GooglePlacesAutocomplete
            ref={instance => {
              this.locationRef = instance;
            }}
            placeholder="Search"
            minLength={3}
            autoFocus={false}
            returnKeyType={'search'}
            listViewDisplayed="auto"
            fetchDetails={true}
            renderDescription={row => row.description}
            onPress={(data, details = null) => {
              this._handleLocationSearch(details);
            }}
            getDefaultValue={() => this.state.streetAddress}
            query={{
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
          <Button block style={styles.button} primary onPress={this.handleNext}>
            <Text>Next</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 0,
    height: 175,
    width: '90%',
    alignSelf: 'center',
  },
  mapView: {
    height: ScreenHeight / 1.6,
  },
  map: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: ScreenHeight / 1.6,
  },
  text: {
    padding: 10,
  },
  button: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
  },
});

const mapStateToProps = state => {
  return {
    potholes: state.potholes.potholes,
    address: state.potholes.address,
    userLatLon: state.potholes.userLatLon,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPotholes: (lat, lon) => dispatch(fetchPotholes(lat, lon)),
    getAddress: (lat, lon) => dispatch(getGeocodedAddress(lat, lon)),
    updateLocation: location => dispatch(createUpdateLocationAction(location)),
    updateUserLatLon: address =>
      dispatch(updateUserLatLonThunkCreator(address)),
    updateAddress: address => dispatch(updateAddressActionCreator(address)),
    updateUserLatLonDirect: latLon => dispatch(updateUserLatLonAction(latLon)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPotholeLocation);
