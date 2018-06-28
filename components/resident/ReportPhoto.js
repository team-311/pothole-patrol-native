import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera, Permissions } from 'expo';
import { getPicture } from '../../store/report';
import { connect } from 'react-redux';

class CameraView extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({
        quality: 0.25,
        base64: true,
      });
      this.props.getPicture(`data:image/jpg;base64,${photo.base64}`);
    }
    this.nextPage()
  }

  nextPage = () => {
    const { replace } = this.props.navigation
    replace('ReportDescription')
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 4 }}>
            <Camera
              ref={ref => {
                this.camera = ref;
              }}
              type={this.state.type}
            />
          </View>
          <View style={styles.cameraActions}>
            <TouchableOpacity style={styles.circle} onPress={this.snap} />
            <Text style={styles.skip} onPress={this.nextPage}>Skip</Text>
          </View>
        </View>
      );
    }
  }
}

const mapDispatch = dispatch => {
  return {
    getPicture(picture) {
      dispatch(getPicture(picture));
    },
  };
};

export default connect(
  null,
  mapDispatch
)(CameraView);

const styles = StyleSheet.create({
  cameraActions: {
    flex: 1,
    marginBottom: 50,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  circle: {
    width: 75,
    height: 75,
    borderRadius: 75/2,
    backgroundColor: 'white',
    opacity: 0.75,
    marginBottom: 20
  },
  skip: {
    textDecorationLine: 'underline',
    color: 'gray'
  }
})
