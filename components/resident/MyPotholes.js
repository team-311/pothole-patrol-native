import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import {
  createGetResidentReportsThunk,
  getUserUpvotesThunkCreator,
} from '../../store/resident-reports';
import {
  Container,
  ListItem,
  List,
  Text,
  Content,
  H3,
  Card,
  Separator,
  CardItem
} from 'native-base';
import PotholeListItem from './PotholeListItem';

class MyPotholes extends React.Component {
  componentDidMount() {
    this.props.getReports(this.props.user.id);
    this.props.getUpvotes(this.props.user.id);
  }

  _handlePress = (potholeId, navigationFunc) => {
    navigationFunc('ViewSinglePothole', {
      id: potholeId,
      canUpvote: false,
    });
  };

  render() {
    const navigate = this.props.navigate || this.props.navigation.navigate;
    let { user, openPotholes, upvotedPotholes } = this.props;
    const text =
      openPotholes.length || upvotedPotholes.length
        ? ''
        : `Let's get patrolling!...`;
    const hashMap = openPotholes.reduce((acc, curr) => {
      return { [curr.id]: 1 };
    }, {});
    upvotedPotholes = upvotedPotholes.filter(pothole => {
      return !hashMap[pothole.id];
    });

    return (
      <Container style={styles.container}>
        <Content>
          <View>
            <View>
              {openPotholes && openPotholes.length > 0 ? (
                <View>
                  <List>
                  <ListItem itemDivider>
                        <Text style={{fontWeight: 'bold'}}>Potholes You Reported</Text>
                        </ListItem>
                    {openPotholes.map(pothole => (
                      <PotholeListItem
                        key={pothole.id}
                        pothole={pothole}
                        handlePress={this._handlePress}
                        navigation={navigate}
                      />
                    ))}
                  </List>
                </View>
              ) : (
                <Text>{text}</Text>
              )}
              <View>
                {upvotedPotholes &&
                  upvotedPotholes.length > 0 && (
                    <View>
                      <List>
                        <ListItem itemDivider>
                        <Text style={{fontWeight: 'bold'}}>Potholes You Upvoted</Text>
                        </ListItem>
                        {upvotedPotholes.map(pothole => (
                          <PotholeListItem
                            key={pothole.id}
                            pothole={pothole}
                            handlePress={this._handlePress}
                            navigation={navigate}
                          />
                        ))}
                      </List>
                    </View>
                  )}
              </View>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff'
  },
  button: {
    backgroundColor: '#B3DDF2',
    width: 200,
    height: 93,
    resizeMode: Image.resizeMode.contain,
  },
  openPotholes: {
    margin: 20,
    width: 250,
    height: 100,
  },
  text: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    openPotholes: state.residentReports.potholes.filter(
      report => report.status.toLowerCase() === 'open'
    ),
    user: state.user,
    upvotedPotholes: state.residentReports.upvotedPotholes.filter(
      report => report.status.toLowerCase() === 'open'
    ),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getReports: id => dispatch(createGetResidentReportsThunk(id)),
    getUpvotes: id => dispatch(getUserUpvotesThunkCreator(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPotholes);
