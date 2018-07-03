import React, { Component } from 'react';
import {StyleSheet} from 'react-native'
import { ListItem, Thumbnail, Text, Body, Right, Icon } from 'native-base';

const PotholeListItem = props => {
  return (
    <ListItem>
    <Thumbnail style={styles.thumbnail} source={{ uri: `${props.pothole.imageUrl}` }} />
    <Body>
      <Text>{props.pothole.streetAddress}</Text>
      <Text note>Status: {props.pothole.status}</Text>
    </Body>
    <Right>
      <Icon onPress={() => props.handlePress(props.pothole.id, props.navigation)}type='Entypo' name='chevron-right'/>
      </Right>
  </ListItem>
  )
}

const styles = StyleSheet.create({
  thumbnail: {
    height: 80,
    width: 100
  }
})


export default PotholeListItem
