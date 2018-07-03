import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, List, ListItem, Body, Right, Text, Icon, Separator, View } from 'native-base'
import moment from 'moment'

const SingleOrderHistory = (props) => {
  const order = props.navigation.state.params.order
  const { navigate } = props.navigation

  return (
    <Container style={styles.container}>
      <Content>
        <View style={styles.headerContainer}>
          <View style={styles.headerFlex}>
            <Text style={styles.header}>Date Completed:</Text>
            <Text style={styles.header}>{moment(order.dateCompleted).format('ddd, MMM Do YYYY')}</Text>
          </View>
        </View>
        <Separator bordered style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{fontWeight: 'bold'}}>Potholes</Text>
          <Text style={{marginRight: 10, fontWeight: 'bold'}}>{order.potholes.length}</Text>
        </Separator>
        <List>
        { !!order.id && order.potholes.map(pothole => (
          <ListItem
            key={pothole.id}
            onPress={() => navigate('IndividualPothole', {
              id: pothole.id,
              canUpvote: false,
          })}>
            <Body>
              <Text>#{pothole.serviceNumber}</Text>
              <Text note>{pothole.streetAddress} {pothole.zip}</Text>
            </Body>
            <Right>
              <Icon style={{color: "#FC4C02"}} name="arrow-forward" />
            </Right>
          </ListItem>
        ))}
        </List>
      </Content>
    </Container>
  )
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
  }
})

export default SingleOrderHistory
