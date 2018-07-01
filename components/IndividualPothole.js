import React from 'react';
import { StyleSheet, Dimensions, Image, View, Alert } from 'react-native';
import { MapView } from 'expo';
const { Marker } = MapView;
import { connect } from 'react-redux';
import {
  getSinglePotholeServer,
  upvotePotholeInDB,
} from '../store/potholes';
import {
  getUserUpvotesThunkCreator
} from '../store/resident-reports'
import Comments from './comments'
import {
  Container,
  Header,
  Content,
  Text,
  Button,
  Accordion
} from 'native-base';
import { createGetCommentsThunk } from '../store/comments';

const ScreenHeight = Dimensions.get('window').height;

class IndividualPothole extends React.Component {
  constructor() {
    super();
    this.state = {
      upVotes: 0,
      disableUpvote: false
    };
  }

  async componentDidMount() {
    await this.props.getSinglePothole(this._getId());
    await this.props.getAllComments(this.props.singlePothole.id);
    this.setState({
      upVotes: this.props.singlePothole.upVotes,
      disableUpvote: !!(this.props.upvoters.find(upvoter => upvoter.id === this.props.userId))
    });
  }

  _getId = () => {
    let id = 1;
    if (this.props.navigation.state.params) {
      id = this.props.navigation.state.params.id;
    }
    return id;
  }

  _handleUpvote = async () => {
    this.setState({ disableUpvote: true })
    await this.props.upvotePothole(
      this.props.singlePothole.id,
      this.props.userId
    );
    Alert.alert('Thanks for upvoting!', null, [{text: 'View my potholes', onPress: () => this.props.navigation.navigate('MyPotholes')}, {text: 'Back to map', onPress: () => this.props.navigation.goBack()}])
    //reset state after upvoting
    this.props.getUserUpvotes(this.props.userId)
    this.setState({
      upVotes: this.props.singlePothole.upVotes,
    });
  };

  _handleCancel = () => {
    this.props.navigation.goBack(null)
  };

  static navigationOptions = { title: 'SinglePothole' };

  render() {
    const pothole = this.props.singlePothole;

    if (!pothole) return <View />

    let commentString = ''
    if (this.props.allComments.length < 1) {
      commentString = 'No Comments -- Leave Yours Here!'
    }
    for (let i = 0; i < this.props.allComments.length; i++) {
      commentString += this.props.allComments[i].text + '\nBy ' + this.props.allComments[i].user.firstName + '\n \n'
    }

    let region = {
      latitude: Number(pothole.latitude),
      longitude: Number(pothole.longitude),
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };

    let dataArray = [
      { title: "More Information", content: `ID: ${pothole.id} \nSTATUS: ${pothole.status} \nUPVOTES: ${this.state.upVotes} \nADDRESS: ${pothole.streetAddress} \nDESCRIPTION: ${pothole.description} \nSERVICE #: ${pothole.serviceNumber}` },
      { title: "Comments", content: `${commentString}` }
    ]

    if (!pothole.id) return <View />
    return (
      <Container>
        {this.props.navigation.state.params.canUpvote ? (
          <Header>
            <Button
              style={styles.button}
              small
              success
              onPress={this._handleUpvote}
              disabled={this.state.disableUpvote}
            >
              <Text>Upvote</Text>
            </Button>
            <Button
              style={styles.button}
              small
              warning
              onPress={this._handleCancel}
            >
              <Text>Back</Text>
            </Button>
          </Header>
        ) : (
            <Header />
          )}
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
              image="https://s3.us-east-2.amazonaws.com/soundandcolor/traffic-cone+(2).png"
            />
          </MapView>
        </Content>
        <Content>
          <Accordion dataArray={dataArray} />
          <Comments user={this.props.user} pothole={this.props.singlePothole} />
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
    height: ScreenHeight * 0.4,
  },
  text: {
    backgroundColor: '#fff',
    height: 20,
    width: 170,
    top: 200,
    left: 80,
  },
  button: {
    padding: 5,
    justifyContent: 'space-between',
  },
});

const mapState = state => {
  return {
    singlePothole: state.singlePothole.pothole,
    userId: state.user.id,
    user: state.user,
    upvoters: state.singlePothole.upvoters,
    allComments: state.comments
  };
};

const mapDispatch = dispatch => {
  return {
    getSinglePothole: id => dispatch(getSinglePotholeServer(id)),
    upvotePothole: (potholeId, userId) =>
      dispatch(upvotePotholeInDB(potholeId, userId)),
    getAllComments: id => dispatch(createGetCommentsThunk(id)),
    getUserUpvotes: userId => dispatch(getUserUpvotesThunkCreator(userId))
  };
};

export default connect(
  mapState,
  mapDispatch
)(IndividualPothole);
