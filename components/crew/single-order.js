import React, {Component} from 'react'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Location, Permissions } from 'expo'
import { Container, Content, H1, List, ListItem, CheckBox, Text, Body, Spinner, Button, View } from 'native-base';
import { createGetSingleOrderThunk, createUpdateSingleOrderPotholeThunk, createGetNextPotholeThunk } from '../../store';

class SingleOrder extends Component {
  constructor() {
    super()
      this.state = {
        region: { // default to City Hall
          latitude: 41.8838677,
          longitude: -87.6319365,
        },
        errorMsg: '',
      }
  }

  componentWillMount() {
    this.getLocationAsync()
  }

  componentDidMount() {
    this.props.getOrder(this.props.crewId, this.props.navigation.state.params.orderId)
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
    }

    this.setState({region})
  }

  render() {
    const { order, isFetching, error, navigation, crewId } = this.props
    if (isFetching) return <Spinner />
    if (error || this.state.errorMsg) return <Text>Sorry, an error occurred: {error || this.state.errorMsg}</Text>

    const isReadyForNext = order.potholes && order.potholes.every((pothole) => !!pothole.completionDate)
    return (
      <Container style={styles.container}>
          <H1>Work Order: {''+order.id}</H1>
        <Content>
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <View>
              <List>
              {
                order.id && order.potholes.map(pothole => (
                  <ListItem key={pothole.id}>
                    <Body>
                      <Text>{pothole.streetAddress}</Text>
                      <Button small transparent onPress={() => navigation.navigate('Directions', {
                        latitude: pothole.latitude,
                        longitude: pothole.longitude,
                        currLatitude: this.state.region.latitude,
                        currLongitude: this.state.region.longitude,
                      })}>
                        <Text>View Directions</Text>
                      </Button>
                    </Body>
                    <CheckBox large color="green"
                      checked={!!pothole.completionDate}
                      disabled={!!pothole.completionDate}
                      onPress={() => this.props.updateOrder(crewId, pothole.id)}
                    />
                  </ListItem>
                ))
              }
              </List>
              { isReadyForNext && (
                  <Button block warning
                    style={styles.button}
                    onPress={() => this.props.getNext(crewId, order.id, this.state.region.latitude, this.state.region.longitude)}
                  >
                    <Text style={styles.buttonText}>Request Next Pothole</Text>
                  </Button>
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button block success style={styles.button}>
                <Text style={styles.buttonText}>Complete Work Order</Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
  },
  buttonText: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginBottom: 50,
  },
  button: {
    marginTop: 30
  },
})

const mapStateToProps = (state) => {
  return {
    order: state.singleOrder.order,
    error: state.singleOrder.error,
    isFetching: state.singleOrder.isFetching,
    crewId: state.user.crewId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrder: (crewId, orderId) => dispatch(createGetSingleOrderThunk(crewId, orderId)),
    updateOrder: (crewId, potholeId) => dispatch(createUpdateSingleOrderPotholeThunk(crewId, potholeId)),
    getNext: (crewId, orderId, lat, lon) => dispatch(createGetNextPotholeThunk(crewId, orderId, lat, lon)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
