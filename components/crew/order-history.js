import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet } from 'react-native'
import { createGetCompletedOrdersThunk } from '../../store';
import { Spinner, View, Text, Container, Content, List, ListItem, Left, Right, Icon, Separator, H3, Body, Card, CardItem } from 'native-base'
import moment from 'moment'

class OrderHistory extends Component {

  componentDidMount() {
    this.props.getOrders(this.props.crewId)
  }

  render() {
    if (this.props.isFetching) return <Spinner />
    if (this.props.error) return <View><Text>Something went wrong: {this.props.error}</Text></View>
    const { thisWeeksOrders, previousOrders, total, totalPotholesPrevious, totalPotholesThisWeek } = this.props
    const { navigate } = this.props.navigation
    return (
      <Container style={styles.container}>
        <Content>
          <View style={styles.headerContainer}>
            <View style={styles.headerFlex}>
              <Text style={styles.header}>Crew:</Text>
              <Text style={styles.header}>{this.props.crew}</Text>
            </View>
            <View style={styles.headerFlex}>
              <Text style={styles.header}>Total Potholes Repaired: </Text>
              <Text style={styles.header}>{totalPotholesPrevious + totalPotholesThisWeek}</Text>
            </View>
          </View>
          <Separator bordered style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontWeight: 'bold'}}>This week</Text>
            <Text style={{marginRight: 10, fontWeight: 'bold'}}>{totalPotholesThisWeek} potholes</Text>
          </Separator>
          {thisWeeksOrders.length > 0 ? (
            <List>
              {thisWeeksOrders.map(order => (
                  <ListItem key={order.id} onPress={() => navigate('SingleOrderHistory', {
                    order,
                  })}>
                    <Left>
                      {!!order.dateCompleted && <Text style={styles.orderText}>{moment(order.dateCompleted).format('ddd')}</Text> }
                      <Text style={{marginLeft: 40, fontSize: 14}}>{order.potholes.length === 1 ? '1 pothole' : `${order.potholes.length} potholes`}</Text>
                    </Left>
                    <Right>
                      <Icon style={{color: "#FC4C02"}} name="arrow-forward" />
                    </Right>
                  </ListItem>
                ))}
            </List>
          )
          : <Text style={styles.noOrdersText}>No orders to display for this week</Text>
          }
          <Separator bordered style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontWeight: 'bold'}}>Previous</Text>
            <Text style={{marginRight: 10, fontWeight: 'bold'}}>{totalPotholesPrevious} potholes</Text>
          </Separator>
          {previousOrders.length > 0 ? (
            <View>
              <List>
                {previousOrders.map(order => (
                  <ListItem key={order.id} onPress={() => navigate('SingleOrderHistory', {
                    order,
                  })}>
                    <Left>
                      {!!order.dateCompleted && <Text style={styles.orderText}>{moment(order.dateCompleted).format('MMM DD, YYYY')}</Text> }
                      <Text style={{marginLeft: 40, fontSize: 14}}>{order.potholes.length === 1 ? '1 pothole' : `${order.potholes.length} potholes`}</Text>
                    </Left>
                    <Right>
                      <Icon style={{color: "#FC4C02"}} name="arrow-forward" />
                    </Right>
                  </ListItem>
                ))}
              </List>
              </View>)
          : <Text style={styles.noOrdersText}>No orders to display</Text>
          }
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  header: {
    margin: 5,
    color: "#36454f",
    fontSize: 14,
    fontWeight: 'bold',
  },
  headerFlex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  noOrdersText: {
    margin: 10,
    fontSize: 14,
  },
  orderText: {
    fontSize: 14,
  }
})

const mapStateToProps = (state) => {
  return {
    previousOrders: state.orderHistory.previousOrders,
    totalPotholesPrevious: state.orderHistory.totalPotholesPrevious,
    thisWeeksOrders: state.orderHistory.thisWeeksOrders,
    totalPotholesThisWeek: state.orderHistory.totalPotholesThisWeek,
    isFetching: state.orderHistory.isFetching,
    error: state.orderHistory.error,
    total: state.orderHistory.total,
    crewId: state.user.crewId,
    crew: state.orderHistory.crew,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOrders: (crewId) => dispatch(createGetCompletedOrdersThunk(crewId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
