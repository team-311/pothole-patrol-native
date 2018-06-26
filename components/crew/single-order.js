import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Container, Content, ListItem, CheckBox, Text, Body, Spinner, Button } from 'native-base';
import { createGetSingleOrderThunk } from '../../store';

class SingleOrder extends Component {

  componentDidMount() {
    this.props.getOrder(2, 5)
  }

  render() {
    const { order, isFetching, error, navigation } = this.props
    if (isFetching) return <Spinner />
    if (error) return <Text>Sorry, an error occurred: {error}</Text>

    return (
      <Container>
        <Content>
          {
            order.id && order.potholes.map(pothole => (
              <ListItem key={pothole.id}>
                <Body>
                  <Text>{pothole.streetAddress}</Text>
                  <Button small bordered onPress={() => navigation.navigate('Directions', {
                    latitude: pothole.latitude,
                    longitude: pothole.longitude,
                  })}>
                    <Text>View Directions</Text>
                  </Button>
                </Body>
                <CheckBox checked={pothole.completionDate} disabled={order.dateCompleted} />
              </ListItem>
            ))
          }
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    order: state.singleOrder.order,
    error: state.singleOrder.error,
    isFetching: state.singleOrder.isFetching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrder: (crewId, orderId) => dispatch(createGetSingleOrderThunk(crewId, orderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
