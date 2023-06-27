import { Camera, CameraType } from 'expo-camera';
import React, {
  useState,
  Component,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  Button,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
let { width, height } = Dimensions.get('window');

// class Child extends Component {
// export default class Child extends Component<props, ref> {
// export default class Tabs extends React.Component {

function CameraView(props, ref) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  // https://rn-master.com/react-native-camera-expo-example/
  // https://www.freecodecamp.org/news/how-to-create-a-camera-app-with-expo-and-react-native/
  takePicture = async () => {
    if (this.camera) {
      props.onPress()
      let photo = await this.camera.takePictureAsync();
      props.navigation.navigate('Ask Question', { assets: photo });
    }
  };
  
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={(r) => {
          this.camera = r;
        }}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    height,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CameraView;
