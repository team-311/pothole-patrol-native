import React from 'react';
import {StyleSheet} from 'react-native';
import { MapView} from 'expo';
import {
  getGeocodedAddress,
  fetchPotholes,
  upvotePotholeInDB,
} from '../../store/potholes';
import {
  Container,
  Text,
  Button,
} from 'native-base';

const UpvotePothole = props => {
  viewPothole = () => {
    props.navigation.navigate('ViewPothole', { id: props.potholeId, myPotholes: false })
  };

  return (
    <MapView.Callout onPress={this.viewPothole} >
      <Container style={styles.container}>
        <Text style={styles.header}>Is this your pothole?</Text>
          <Button style={styles.button} small success>
            <Text>View Pothole</Text>
          </Button>
      </Container>
    </MapView.Callout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 170,
    height: 70,
  },
  header: {
    fontWeight: 'bold',
    padding: 5,
  },
  button: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
  },
});

export default UpvotePothole;
