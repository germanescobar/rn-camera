import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { Camera, Permissions } from 'expo';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Camera',
  };

  constructor(props) {
    super(props);

    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      image: null,
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    return (
      <View style={styles.container}>
        { this.state.image ? this.renderImage() : this.renderCamera() }
      </View>
    );
  }

  renderImage() {
    return (
      <View style={{ flex: 1 }}>
        <Image style={{ flex: 1 }} source={{ uri: this.state.image }} />
      </View>
    );
  }

  renderCamera() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type} ref={ref => { this.camera = ref; }}>
            <View style={styles.camera}>
              <View style={styles.buttons}>
                <TouchableOpacity style={styles.flip} onPress={this.onFlipPressed.bind(this)}>
                  <Text
                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                    {' '}Flip{' '}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.take} onPress={this.onTakePressed.bind(this)}>
                  <Text
                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                    {' '}Take{' '}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Camera>
        </View>
      );
    }
  }

  async onTakePressed() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const photo = await this.camera.takePictureAsync(options);
      console.log(photo.uri);
      this.setState({ image: photo.uri });
    }
  }

  onFlipPressed() {
    this.setState({
      type: this.state.type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back,
    });
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  buttons: {
    flex: 1,
    alignSelf: 'flex-end',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  flip: {
    padding: 15
  },
  take: {
    padding: 15
  }
});
