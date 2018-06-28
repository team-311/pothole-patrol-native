import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createGetOrdersThunk } from '../../store';
import { Spinner, View, Text, Container, Content, List, ListItem, Left, Right, Icon } from 'native-base'
import moment from 'moment'

class OrderHistory extends Component {

  componentDidMount() {
    this.props.getOrders(this.props.crewId)
  }

  render() {
    if (this.props.isFetching) return <Spinner />
    if (this.props.error) return <View><Text>Something went wrong: {this.props.error}</Text></View>
    const { navigate } = this.props.navigation
    return (
      <Container>
        <Content>
          {this.props.orders.length > 0 ? (
            <List>
              {this.props.orders.map(order => (
                <ListItem key={order.id} onPress={() => navigate('SingleOrderHistory', {
                  order,
                })}>
                  <Left>
                    <Text>Order {order.id}: {order.status}</Text>
                    {order.dateCompleted && <Text> on {moment(order.dateCompleted).format('MM/DD/YY')}</Text> }
                  </Left>
                  <Right>
                    <Icon style={{color: "skyblue"}} name="arrow-forward" />
                  </Right>
                </ListItem>
              ))}
            </List>)
          : <Text>No orders to display</Text>
          }
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orderHistory.orders,
    isFetching: state.orderHistory.isFetching,
    error: state.orderHistory.error,
    currentPage: state.orderHistory.currentPage,
    lastPage: state.orderHistory.lastPage,
    count: state.orderHistory.count,
    crewId: state.user.crewId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: (crewId) => dispatch(createGetOrdersThunk(crewId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
