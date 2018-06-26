import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
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
    const { replace } = this.props.navigation;
    replace('ReportDescription');
  };

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            ref={ref => {
              this.camera = ref;
            }}
            style={{ flex: 1 }}
            type={this.state.type}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
            >
              <TouchableOpacity style={styles.circle} onPress={this.snap} />
            </View>
          </Camera>
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

const styles = {
  circle: {
    width: 75,
    height: 75,
    borderRadius: 75/2,
    backgroundColor: 'white',
    opacity: 0.75,
    marginBottom: 50,
  }
}
