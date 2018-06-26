import React from 'react';
import { StyleSheet, Dimensions, Image, View } from 'react-native';
import { MapView } from 'expo';
const { Marker } = MapView;
import { connect } from 'react-redux';
import { getSinglePotholeServer } from '../store/potholes';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
} from 'native-base';

const ScreenHeight = Dimensions.get('window').height;

class IndividualPothole extends React.Component {

  componentDidMount() {
    this.props.getSinglePothole(this.props.navigation.state.params.id)
  }

  static navigationOptions = { title: 'SinglePothole' };

  render() {
    const pothole = this.props.singlePothole
    const id = this.props.navigation.state.params.id

    if (!pothole.id) return <View />

    let region = {
      latitude: Number(pothole.latitude),
      longitude: Number(pothole.longitude),
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };

    if (!pothole.id) return <View />

    return (
      <Container>
        <Header />
        <Content>
          <MapView
            style={styles.backgroundMap}
            region={region}
            provider={MapView.PROVIDER_GOOGLE}
          >
            <Marker
              key={pothole.id}
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              title="dummymarker"
              description="dummymarker"
              image="https://s3.us-east-2.amazonaws.com/soundandcolor/poo.png"
            />
          </MapView>
        </Content>
        <Content>
          <Card>
            <CardItem>
              <Body>
                <Text>ID: {pothole.id}</Text>
              </Body>
            </CardItem>
            {!!pothole.imageUrl && (
              <CardItem>
                <Image
                  style={{ width: 100, height: 100 }}
                  source={{ uri: pothole.imageUrl }}
                />
              </CardItem>
            )}
            <CardItem>
              <Body>
                <Text>STATUS: {pothole.status}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>ADDRESS: {pothole.streetAddress}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>ZIP: {pothole.zip}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>DESCRIPTION HERE</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>SERVICE #: {pothole.serviceNumber}</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundMap: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: ScreenHeight * 0.5,
  },
  text: {
    backgroundColor: '#fff',
    height: 20,
    width: 170,
    top: 200,
    left: 80,
  },
});

const mapState = state => {
  return {
    singlePothole: state.singlePothole,
  };
};

const mapDispatch = dispatch => {
  return {
    getSinglePothole: id => dispatch(getSinglePotholeServer(id)),
  };
};

export default connect(
  mapState,
  mapDispatch
)(IndividualPothole);
