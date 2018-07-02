import React, { Component } from 'react'
import { StyleSheet, View, Dimensions, Linking } from 'react-native'
import { Container, Content, Text, Spinner, List, ListItem, Icon, Button, Body, Separator } from 'native-base'
import { MapView } from 'expo'
import axios from 'axios'

class OrderDirections extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isFetching: true,
      region: {
        latitude: props.navigation.state.params.currLatitude,
        longitude: props.navigation.state.params.currLongitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      errorMsg: '',
      directions: {
        coords: [],
        steps: [],
        startAddress: '',
        endAddress: '',
        distance: '',
        duration: '',
      }
    }
  }

  componentWillMount() {
    this.getDirections()
  }

  getDirections = async () => {
    const { latitude: destLat, longitude: destLon } = this.props.navigation.state.params
    const routeOptions = {
      startLat: this.state.region.latitude,
      startLon: this.state.region.longitude,
      destLat,
      destLon,
    }
    try {
      const { data } = await axios.post(`${process.env.SERVER_URL}/api/crews/directions`, routeOptions)
      const directions = {
        coords: data.coords,
        steps: data.steps || [],
        startAddress: data.startAddress,
        endAddress: data.endAddress,
        distance: data.distance,
        duration: data.duration,
      }
      this.setState({ isFetching: false, directions })
    } catch (error) {
      this.setState({isFetching: false, errorMsg: error.message})
    }
  }

  render() {
    if (this.state.isFetching) return <Spinner />
    if (this.state.errorMsg) return <Text>{this.state.errorMsg}</Text>

    const { latitude: destLat, longitude: destLon } = this.props.navigation.state.params
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${this.state.region.latitude},${this.state.region.longitude}&destination=${destLat},${destLon}&travelmode=driving`

    return (
      <Container>
        <Content>
          <MapView style={styles.map}
            ref={(ref) => {this.mapRef = ref}}
            onLayout={() => this.mapRef.fitToCoordinates(this.state.directions.coords, {
              edgePadding: {
                left: 50,
                right: 50,
                top: 50,
                bottom: 50,
              }
            })}
            provider={MapView.PROVIDER_GOOGLE}
          >
            <MapView.Marker
              pinColor="green"
              coordinate={{
                latitude: this.state.region.latitude,
                longitude: this.state.region.longitude,
              }}
              title="Start"
            />
            <MapView.Marker
              pinColor="red"
              coordinate={{
                latitude: Number(destLat),
                longitude: Number(destLon),
              }}
              title="Next Pothole"
            />
            <MapView.Polyline
              coordinates={this.state.directions.coords}
              strokeWidth={2}
              strokeColor="red" />
          </MapView>
          <List style={styles.list}>
            <Separator bordered>
              <Text style={styles.directionsHeader}>Directions</Text>
            </Separator>
            <ListItem>
              <View style={{flex: 1}}>
                <Icon name="directions-car" type="MaterialIcons" style={styles.directionsIcon}/>
              </View>
              <Body style={{flex: 6}}>
                <Text style={styles.emphasis}>{`${this.state.directions.duration} (${this.state.directions.distance})`}</Text>
                <Text note>{`from: ${this.state.directions.startAddress}`}</Text>
                <Text note>{`to: ${this.state.directions.endAddress}`}</Text>
              </Body>
              <View style={{flex: 2.5}}>
                <Button small transparent
                  style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}
                  onPress={() => Linking.openURL(googleMapsUrl)}
                >
                  <Text style={{textAlign: 'center', fontSize: 12, color: "#FC4C02"}}>Google Maps</Text>
                </Button>
              </View>
            </ListItem>
            {
              (this.state.directions.steps.length > 0) && this.state.directions.steps.map(step => (
                <ListItem key={step.start_location.lat}>
                  <Body>
                    <Text>{step.instructions}</Text>
                    <Text note>{step.distance.text}</Text>
                  </Body>
                </ListItem>
              ))
            }
          </List>
        </Content>
      </Container>
      )
  }
}

const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  map: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: screenHeight / 3
  },
  list: {
    backgroundColor: 'white'
  },
  emphasis: {
    fontWeight: 'bold',
  },
  details: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 5,
  },
  directionsHeader: {
    fontWeight: 'bold',
    color: 'black',
  },
  directionsIcon: {
    fontSize: 30,
  }
})

export default OrderDirections
