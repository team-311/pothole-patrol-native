import React from 'react';
import { StyleSheet, Dimensions, Image, View, Alert } from 'react-native';
import { MapView } from 'expo';
const { Marker, Callout } = MapView;
import { connect } from 'react-redux';
import { getSinglePotholeServer, upvotePotholeInDB } from '../store/potholes';
import { getUserUpvotesThunkCreator } from '../store/resident-reports';
import Comments from './comments';
import moment from 'moment';
import {
  Container,
  Header,
  Content,
  Text,
  Button,
  Card,
  CardItem,
  Body,
  Separator,
  ListItem,
} from 'native-base';
import { createGetCommentsThunk } from '../store/comments';

const ScreenHeight = Dimensions.get('window').height;

class IndividualPothole extends React.Component {
  constructor() {
    super();
    this.state = {
      upvotes: 0,
      disableUpvote: false,
      comments: '',
    };
  }

  async componentDidMount() {
    await this.props.getSinglePothole(this._getId());
    this._getComments(this.props.singlePothole.id);
    this.setState({
      upvotes: this.props.singlePothole.upvoters.length,
      disableUpvote: !!this.props.upvoters.find(
        upvoter => upvoter.id === this.props.userId
      ),
    });
  }

  _getComments = async potholeId => {
    await this.props.getAllComments(potholeId);
    let commentString = '';
    if (this.props.allComments.length < 1) {
      commentString = 'No Comments Yet';
    }
    for (let i = 0; i < this.props.allComments.length; i++) {
      commentString +=
        this.props.allComments[i].text +
        '\nBy ' +
        this.props.allComments[i].user.firstName +
        '\n \n';
    }
    this.setState({
      comments: commentString,
    });
  };

  _getId = () => {
    let id = 1;
    if (this.props.navigation.state.params) {
      id = this.props.navigation.state.params.id;
    }
    return id;
  };

  _handleUpvote = async () => {
    this.setState({ disableUpvote: true });
    await this.props.upvotePothole(
      this.props.singlePothole.id,
      this.props.userId
    );
    Alert.alert('Thanks for upvoting!', null, [
      {
        text: 'View my potholes',
        onPress: () => this.props.navigation.navigate('MyPotholes'),
      },
      { text: 'Back to map', onPress: () => this.props.navigation.goBack() },
    ]);
    //reset state after upvoting
    this.props.getUserUpvotes(this.props.userId);
    this.setState({
      upVotes: this.props.singlePothole.upVotes,
    });
  };

  render() {
    const pothole = this.props.singlePothole;

    if (!pothole) return <View />;

    let region = {
      latitude: Number(pothole.latitude),
      longitude: Number(pothole.longitude),
      latitudeDelta: 0.0005,
      longitudeDelta: 0.0,
    };

    if (!pothole.id) return <View />;
    return (
      <Container>
        <Content>
          <View>
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
                image="https://s3.us-east-2.amazonaws.com/soundandcolor/traffic-cone+(2).png"
              >
                <Callout>
                  <View style={styles.container}>
                    {pothole.imageUrl && (
                      <Image
                        style={{ width: 90, height: 70 }}
                        source={{
                          uri: `${pothole.imageUrl}`,
                        }}
                      />
                    )}
                    <Text style={{fontSize: 14}}>{`\nStatus: ${pothole.status} \nAddress: ${
                      pothole.streetAddress
                    }`}</Text>
                  </View>
                </Callout>
              </Marker>
            </MapView>
            {this.props.navigation.state.params.canUpvote ? (
              <View style={styles.buttonCard}>
                <Button
                  success
                  onPress={this._handleUpvote}
                  disabled={this.state.disableUpvote}
                  style={{backgroundColor: '#FC4C02', alignSelf: 'flex-end', left: 15, top: 200}}
                >
                  <Text>Upvote</Text>
                </Button>
              </View>
            ) : (
              <View />
            )}
          </View>
        </Content>
        <Content style={styles.detailsCard}>
          <Card transparent>
            <CardItem bordered>
              <Text style={styles.potholeDetails}>Pothole Details</Text>
            </CardItem>
            <CardItem>
              <Text style={{fontSize: 14}}>{`Upvotes: ${
                this.props.singlePothole.upVotes
              } \nService Number: ${
                pothole.serviceNumber
              }\nDate Created: ${moment(pothole.createdAt).format(
                'MM/DD/YY'
              )}`}</Text>
            </CardItem>
          </Card>
          <Card transparent>
            <CardItem bordered>
              <Text style={styles.potholeDetails}>Comments</Text>
            </CardItem>
            <CardItem>
              <Text style={{fontSize: 14}}>{this.state.comments}</Text>
            </CardItem>
          </Card>
          <Comments
            user={this.props.user}
            pothole={this.props.singlePothole}
            getComments={this._getComments}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
    height: ScreenHeight * 0.7,
    paddingBottom: 4
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
  cardHeader: {
    fontWeight: 'bold',
  },
  potholeDetails: {
    fontWeight: 'bold',
    paddingTop: 5,
    paddingLeft: 5,
  },
  buttonCard: {
    flex: 1,
    width: '93%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 3
  },
  detailsCard: {
    width: '95%',
    alignSelf: 'center',
  }
});

const mapState = state => {
  return {
    singlePothole: state.singlePothole.pothole,
    userId: state.user.id,
    user: state.user,
    upvoters: state.singlePothole.upvoters,
    allComments: state.comments.allComments,
  };
};

const mapDispatch = dispatch => {
  return {
    getSinglePothole: id => dispatch(getSinglePotholeServer(id)),
    upvotePothole: (potholeId, userId) =>
      dispatch(upvotePotholeInDB(potholeId, userId)),
    getAllComments: id => dispatch(createGetCommentsThunk(id)),
    getUserUpvotes: userId => dispatch(getUserUpvotesThunkCreator(userId)),
  };
};

export default connect(
  mapState,
  mapDispatch
)(IndividualPothole);
