import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, List, ListItem, CheckBox, Text, Body, Button, View } from 'native-base'

const SingleOrder = (props) => {
  const { order, navigate, crewId, region, completeJob } = props
  const isReadyForNext = order.potholes && order.potholes.every((pothole) => !!pothole.completionDate)
  return (
    <Container style={styles.container}>
      <Content>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <List>
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
              <Button block warning
                style={styles.button}
                onPress={() => props.getNext(crewId, order.id, region.latitude, region.longitude)}
              >
                <Text style={styles.buttonText}>Request Next Pothole</Text>
              </Button>
          )}
        </View>
        { isReadyForNext && (
          <View style={styles.buttonContainer}>
            <Button block success
              style={styles.button}
              onPress={completeJob}
            >
              <Text style={styles.buttonText}>Finish Work Order</Text>
            </Button>
          </View>
        )}
      </Content>
    </Container>
  )
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

export default SingleOrder
