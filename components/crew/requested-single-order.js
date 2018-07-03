import React from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content, Button, List, ListItem, View, Text, Body } from 'native-base'

const RequestedSingleOrder = (props) => {
  const { order, startJob} = props
  return (
    <Container style={styles.container}>
      <Content>
        <View>
          <View>
            <List>
              {!!order.id && order.potholes.map(pothole => (
                <ListItem key={pothole.id}>
                    {/* <Text>{pothole.streetAddress}</Text> */}
                  <Body>
                    <Text>#{pothole.serviceNumber}</Text>
                    <Text note>{pothole.streetAddress} {pothole.zip}</Text>
                  </Body>
                </ListItem>
              ))}
            </List>
          </View>
          <View>
            <Button
              block
              style={styles.button}
              onPress={startJob}
            >
              <Text>Get Started!</Text>
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
  button: {
    margin: 15,
    backgroundColor: "#FC4C02",
  }
})

export default RequestedSingleOrder
