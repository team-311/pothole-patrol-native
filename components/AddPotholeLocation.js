import React from 'react';
import { connect } from 'react-redux';
import { Platform, StyleSheet, Dimensions } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
const { Marker } = MapView;
import { getGeocodedAddress, fetchPotholes } from '../store/potholes';
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
    this.setState({ initialRegion }, () => {
      this.props.geocodeLocation(
        this.state.initialRegion.latitude,
        this.state.initialRegion.longitude
      );
    });
  };

  submitAddress = () => {
    console.log('thanks for submitting your address!');
  };

  _getPotholesAsync = async (lat, lon) => {
    await this.props.getPotholes(lat, lon)
  }

  render() {
    const streetAddress = this.props.address.slice(0, 2).join(' ');
    const zipcode = this.props.address[4];
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.initialRegion) {
      text = JSON.stringify(this.state.initialRegion);
    }
    return (
      <Container>
        <Content>
          <MapView
            style={styles.map}
            region={this.state.initialRegion}
            provider={MapView.PROVIDER_GOOGLE}
          >
            {this.props.potholes.map(marker => {
              return (
                <Marker
                  key={marker.latitude}
                  coordinate={{
                    latitude: Number(marker.latitude),
                    longitude: Number(marker.longitude),
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
              onDragEnd={e =>
                this.setState({
                  x: e.nativeEvent.coordinate,
                })
              }
              coordinate={{
                latitude: this.state.initialRegion.latitude,
                longitude: this.state.initialRegion.longitude,
              }}
              title={text}
            />
          </MapView>
          <Text style={styles.text}>Confirm Pothole Address</Text>
          <Container>
            <Card>
              <Form>
                <Item>
                  <Input
                    placeholder="Street Address"
                    defaultValue={`${streetAddress}`}
                    onChangeText={text => {
                      this.setState({ streetAddress: text });
                    }}
                  />
                </Item>
                <Item last>
                  <Input
                    placeholder="Zipcode"
                    defaultValue={`${zipcode}`}
                    onChangeText={text => this.setState({ zipCode: text })}
                  />
                </Item>
                <Button
                  style={styles.button}
                  primary
                  onPress={this.submitAddress}
                >
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPotholes: (lat, lon) =>
      dispatch(fetchLocalPotholes(lat, lon)),
    geocodeLocation: (lat, lon) => dispatch(getGeocodedAddress(lat, lon)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPotholeLocation);
