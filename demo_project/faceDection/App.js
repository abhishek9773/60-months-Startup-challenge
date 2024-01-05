import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";

function App() {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);

  const [detectedFaces, SetDetectedFces] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const handleFaceDetected = ({ faces }) => {
    if (faces.length > 0) {
      console.log("Face is dtected:", faces.length);
      SetDetectedFces(false);
    } else {
      console.log("there is no face detected right-now!!");
    }
  };

  const toggleFaceDetection = async () => {
    if (isDetecting) {
      if (cameraRef.current) {
        await cameraRef.current.pausePreview();
      } else {
        if (cameraRef.current) {
          await cameraRef.current.resumePreview();
        }
      }
      setIsDetecting((prev) => !prev);
    }
  };

  const rennderfaceBoxes = () => {
    return detectedFaces.map((face, index) => (
      <View
        key={index}
        style={[
          styles.container,
          {
            left: face.bounds.origin.x,
            top: face.bounds.origin.y,
            width: face.bounds.size.width,
            height: face.bounds.size.height,
          },
        ]}
      />
    ))
  };

  if(hasPermission === null){
    return <View style = {styles.container} />
  }
  
  if(hasPermission === false){
    <View style = {styles.container}>
      <Text> There is now assess of camera</Text>
    </View>
  }

   return (
    <View style = {styles.container}>
      <Veiw style = {styles.cameraContainer}>
        {isDetecting && (
          <Camera 
          style = {styles.camera}
          type = {Camera.Containers.Type.front}
          onFocesDeteced = {headleFaceDetected}
          faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.fast,
            dtecetLandmarks: 
          }}
        )
      }
      </Veiw>

    </View>
   )
}

const styles = StyleSheet.create({
  container: {
    flux: 1,
    color: "red",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default App;
