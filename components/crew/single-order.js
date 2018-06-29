import React from 'react'
import { StyleSheet, Linking } from 'react-native'
import { Container, Content, List, ListItem, CheckBox, Text, Body, Button, View, Icon, Left, Right, Separator } from 'native-base'

const SingleOrder = (props) => {
  const { order, navigate, crewId, region, completeJob } = props
  const isReadyForNext = order.potholes && order.potholes.every((pothole) => !!pothole.completionDate)
  return (
    <Container style={styles.container}>
      <Content>
        <View style={{flex: 1, justifyContent: 'flex-end', flexDirection: 'column'}}>
          <List>
            <ListItem itemDivider>
              <Body>
                <Text style={styles.header}>Pothole(s)</Text>
              </Body>
              <Right>
                <Text style={styles.header}>Done</Text>
              </Right>
            </ListItem>
          {
          !!order.id && order.potholes.map(pothole => (
            <ListItem key={pothole.id}>
              <Body>
                <Text>{pothole.streetAddress}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Button
                    small
                    transparent
                    onPress={() => navigate('IndividualPothole', {
                      id: pothole.id,
                      canUpvote: false,
                    })}
                  >
                    <Text>View Details</Text>
                  </Button>
                  <Button small transparent onPress={() => navigate('Directions', {
                    latitude: pothole.latitude,
                    longitude: pothole.longitude,
                    currLatitude: region.latitude,
                    currLongitude: region.longitude,
                  })}>
                    <Text>View Directions</Text>
                  </Button>
                </View>
              </Body>
              <CheckBox large color="green"
                checked={!!pothole.completionDate}
                disabled={!!pothole.completionDate}
                onPress={() => props.completePothole(crewId, pothole.id)}
              />
            </ListItem>
          ))
        }
        </List>
        { isReadyForNext && (
          <View style={styles.actions}>
            <Button
              iconLeft
              style={styles.button}
              onPress={() => props.getNext(crewId, order.id, region.latitude, region.longitude)}
            >
              <Icon name="shovel" type="MaterialCommunityIcons" />
              <Text style={styles.buttonText}>Work on another pothole</Text>
            </Button>
            <Text style={styles.orText}>OR</Text>
            <Button block success
              iconLeft
              style={styles.button}
              onPress={completeJob}
            >
              <Icon name="clipboard-check" type="MaterialCommunityIcons" />
              <Text style={styles.buttonText}>Finish today's assignment</Text>
            </Button>
          </View>
        )}
        <View style={styles.contact}>
          <Button
            iconLeft
            small
            info
            onPress={() => Linking.openURL(`tel:${order.contactNumber}`).catch(console.log)}
            >
            <Icon name="phone" type="FontAwesome" />
            <Text>Contact CDOT</Text>
          </Button>
        </View>
        </View>
      </Content>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    width: '80%',
    alignSelf: 'center',
  },
  contact: {
    alignSelf: 'center',
    marginTop: 40
  },
  orText: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    margin: 10
  },
  header: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  actions: {
    marginTop: 30
  }
})

export default SingleOrder
