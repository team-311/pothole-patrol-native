import React from 'react'
import { StyleSheet, Linking, Alert } from 'react-native'
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
                    <Text style={styles.actionText}>View Details</Text>
                  </Button>
                  <Button small transparent onPress={() => navigate('Directions', {
                    latitude: pothole.latitude,
                    longitude: pothole.longitude,
                    currLatitude: region.latitude,
                    currLongitude: region.longitude,
                  })}>
                    <Text style={styles.actionText}>View Directions</Text>
                  </Button>
                </View>
              </Body>
              <CheckBox large color="#FC4C02"
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
              style={styles.buttonPothole}
              onPress={() => props.getNext(crewId, order.id, region.latitude, region.longitude)}
            >
              <Icon name="shovel" type="MaterialCommunityIcons" />
              <Text style={styles.buttonText}>Work on another pothole</Text>
            </Button>
            <Text style={styles.orText}>OR</Text>
            <Button block success
              iconLeft
              style={styles.button}
              onPress={() => {
                Alert.alert('Are you sure?', 'Please confirm your crew is done working for today',
                  [
                    {text: 'Cancel', onPress: null, style: 'cancel'},
                    {text: 'OK', onPress: () => completeJob()}
                  ],
                {cancelable: false})
              }}
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
            style={styles.buttonContact}
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
    backgroundColor: "#36454f",
    width: '80%',
    alignSelf: 'center',
  },
  buttonPothole: {
    backgroundColor: "#FC4C02",
    width: '80%',
    alignSelf: 'center',
  },
  buttonContact: {
    backgroundColor: "rgba(54, 69, 69, 0.5)"
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
  },
  actionText: {
    color: "#FC4C02"
  }
})

export default SingleOrder
