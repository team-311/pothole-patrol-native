import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { createGetResidentReportsThunk, getUserUpvotesThunkCreator } from '../../store/resident-reports';
import { Container, ListItem, List, Text, Content, H3 } from 'native-base';

class MyPotholes extends React.Component {
  componentDidMount() {
    this.props.getReports(this.props.user.id);
    this.props.getUpvotes(this.props.user.id);
  }

  render() {
    const navigate = this.props.navigate || this.props.navigation.navigate;
    let { user, openPotholes, upvotedPotholes } = this.props;
    const text = openPotholes.length || upvotedPotholes.length ? '' : `Let's get patrolling!...`
    const hashMap = openPotholes.reduce((acc, curr) => {
      return {[curr.id]: 1}
    }, {})
    upvotedPotholes = upvotedPotholes.filter(pothole => {
      return !hashMap[pothole.id]
    })
    return (
      <View style={styles.openPotholes}>
        <View>
          {openPotholes && openPotholes.length > 0 ? (
            <View>
              <H3>Your Reported Potholes:</H3>
              <List>
                {openPotholes.map(pothole => (
                  <ListItem key={pothole.id}>
                    <TouchableOpacity
                      onPress={() =>
                        navigate('ViewSinglePothole', {
                          id: pothole.id,
                          canUpvote: false,
                        })
                      }
                    >
                      <Text>
                        {pothole.streetAddress} -- {pothole.status}
                      </Text>
                    </TouchableOpacity>
                  </ListItem>
                ))}
              </List>
            </View>
          ) : (
            <Text>{text}</Text>
          )}
          <View>
            {upvotedPotholes && upvotedPotholes.length > 0 && (
              <View>
                <H3>Your Upvoted Potholes:</H3>
                <List>
                  {upvotedPotholes.map(pothole => (
                    <ListItem key={pothole.id}>
                      <TouchableOpacity
                        onPress={() =>
                          navigate('ViewSinglePothole', {
                            id: pothole.id,
                            canUpvote: false,
                          })
                        }
                      >
                        <Text>
                          {pothole.streetAddress} -- {pothole.status}
                        </Text>
                      </TouchableOpacity>
                    </ListItem>
                  ))}
                </List>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    getUpvotes: (id) => dispatch(getUserUpvotesThunkCreator(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPotholes);
