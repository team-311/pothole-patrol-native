import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Permissions, Location } from 'expo'
import { Container, Content, Button, Text, Spinner } from 'native-base'
import { connect } from 'react-redux'
import { createGetTodaysOrderThunk, createUpdateSingleOrderPotholeThunk, createGetNextPotholeThunk, createUpdateStatusSingleOrderThunk } from '../../store';
import SingleOrder from './single-order'
import RequestedSingleOrder from './requested-single-order'

class Home extends Component {
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

  componentDidMount() {
    this.props.getTodaysOrder(this.props.crewId)
  }

  render() {
    const { error, isFetching, order, crewId } = this.props
    const { navigate } = this.props.navigation

    if (isFetching) return <Spinner />
    if (error) return <Text>Sorry, there was an error: {error}</Text>

    if (order && order.status === 'In Progress') {
      return (
        <SingleOrder order={order}
          crewId={crewId}
          getNext={this.props.getNext}
          completePothole={this.props.completePothole}
          navigate={navigate}
          region={this.state.region}
          completeJob={() => {
            this.props.updateStatus(crewId, order.id, 'Completed')
            navigate('Finished')
          }}
        />)
    } else if (order && order.status === 'Requested') {
      return (
        <RequestedSingleOrder
          order={order}
          startJob={this.props.updateStatus.bind(this, crewId, order.id, 'In Progress')}
        />)
    } else {
      return (
        <Container>
          <Content contentContainerStyle={styles.container}>
            <Text style={styles.text}>No open orders found</Text>
            <Button
              block
              primary
              style={styles.button}
            >
              <Text>Request Job</Text>
            </Button>
          </Content>
        </Container>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 40
  },
  button: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30
  }
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
    getTodaysOrder: (crewId, orderId) => dispatch(createGetTodaysOrderThunk(crewId, orderId)),
    completePothole: (crewId, potholeId) => dispatch(createUpdateSingleOrderPotholeThunk(crewId, potholeId)),
    getNext: (crewId, orderId, lat, lon) => dispatch(createGetNextPotholeThunk(crewId, orderId, lat, lon)),
    updateStatus: (crewId, orderId, status) => dispatch(createUpdateStatusSingleOrderThunk(crewId, orderId, status))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
