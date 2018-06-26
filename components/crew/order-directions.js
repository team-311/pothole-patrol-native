import React, { Component } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { Container, Content, Text, Spinner, List, ListItem, Body, Separator } from 'native-base'
import { MapView, Permissions, Location } from 'expo'
import axios from 'axios'

class OrderDirections extends Component {
  constructor() {
    super()
    this.state = {
      isFetching: true,
      region: {
        latitude: 41.895266,
        longitude: -87.639035,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      errorMsg: '',
      coords: [],
      steps: []
    }
  }

  componentWillMount() {
    this.getLocationAsync()
  }

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      this.setState({
        errorMsg: 'Permission to access location was denied'
      })
    }

    const location = await Location.getCurrentPositionAsync({})
    const { latitude, longitude } = location.coords
    const region = {
      latitude,
      longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    }

    this.setState({region}, async () => {
      const { latitude: destLat, longitude: destLon } = this.props.navigation.state.params
      const routeOptions = {
        startLat: this.state.region.latitude,
        startLon: this.state.region.longitude,
        destLat,
        destLon,
      }
      try {
        const { data } = await axios.post(`${process.env.SERVER_URL}/api/crews/potholes/directions`, routeOptions)
        this.setState({ isFetching: false, coords: data.coords, steps: data.steps || [] })
      } catch (error) {
        this.setState({isFetching: false, errorMsg: error.message})
      }
    })
  }

  render() {
    if (this.state.isFetching) return <Spinner />
    if (this.state.errorMsg) return <Text>{this.state.errorMsg}</Text>

    const { latitude: destLat, longitude: destLon } = this.props.navigation.state.params
    return (
      <Container>
        <Content>
          <MapView style={styles.map}
            ref={(ref) => {this.mapRef = ref}}
            onLayout={() => this.mapRef.fitToCoordinates(this.state.coords, {
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
              coordinate={{
                latitude: this.state.region.latitude,
                longitude: this.state.region.longitude,
              }}
              title="Start"
            />
            <MapView.Marker
              coordinate={{
                latitude: Number(destLat),
                longitude: Number(destLon),
              }}
              title="Next Pothole"
            />
            <MapView.Polyline
              coordinates={this.state.coords}
              strokeWidth={2}
              strokeColor="red" />
          </MapView>
          <List style={styles.list}>
            <Separator bordered>
              <Text>Directions</Text>
            </Separator>
            {
              (this.state.steps.length > 0) && this.state.steps.map(step => (
                <ListItem key={step.start_location.lat}>
                  <Body>
                    <Text>{step.instructions}</Text>
                    <View style={styles.details}>
                      <Text><Text style={styles.emphasis}>Distance:</Text> {step.distance.text}</Text>
                      <Text><Text style={styles.emphasis}>Duration:</Text> {step.duration.text}</Text>
                    </View>
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
  }
})

export default OrderDirections
