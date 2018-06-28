import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, H1, H3, List, ListItem, Left, Right, Text, Icon } from 'native-base'
import moment from 'moment'

const SingleOrderHistory = (props) => {
  const order = props.navigation.state.params.order
  const { navigate } = props.navigation

  return (
    <Container style={styles.container}>
      <H1>Work Order: {''+order.id}</H1>
      <H3>Potholes Filled: {''+order.potholes.length}</H3>
      <Content>
        {!!order.dateCompleted && <Text>Date Completed: {moment(order.dateCompleted).format('MM/DD/YY')}</Text>}
        <List>
        { !!order.id && order.potholes.map(pothole => (
          <ListItem key={pothole.id} onPress={() => navigate('IndividualPothole', {
            id: pothole.id,
            canUpvote: false,
          })}>
            <Left>
              <Text>{pothole.streetAddress}</Text>
            </Left>
            <Right>
              <Icon style={{color: "skyblue"}} name="arrow-forward" />
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
  }
})

export default SingleOrderHistory
