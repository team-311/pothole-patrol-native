import React from 'react';
import { connect } from 'react-redux';
import { Platform, StyleSheet, Dimensions, View } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
import {
  getGeocodedAddress,
  fetchPotholes,
  upvotePotholeInDB,
} from '../../store/potholes';
import { createUpdateLocationAction } from '../../store/report';
import {
  Container,
  Content,
  Text,
  Card,
  Form,
  Item,
  Input,
  Button,
  H3,
} from 'native-base';

const UpvotePothole = props => {
  viewPothole = () => {
    props.navigation.navigate('ViewPothole')
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
