import React, { useState } from 'react';
import {
  Button,
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const ImageUploadComponent = () => {
  const [imageSource, setImageSource] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sound, setSound] = useState(null);

  const selectImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      mediaType: 'photo',
      includeBase64: true,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const source = { uri: response.assets[0].uri };
        setImageSource(source);
        if (response.assets[0].base64) {
          uploadImage(response.assets[0].base64);
        }
      }
    });
  };

  const uploadImage = async (base64Image) => {
    setLoading(true); 
    try {
      const response = await fetch('http://localhost:3007/vision/analyze-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64Image,
        }),
      });

      const json = await response.json();
      console.log('Response from server:', json);
      setImageData(json.data);
      setSound(json.sound);

      if (json.message) {
        alert('Image processed: ' + json.message);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image: ' + error);
    } finally {
      setLoading(false); // Stop loading irrespective of the result
    }
  };

  return (
    <View style={styles.container}>
      {!loading && (
        <TouchableOpacity onPress={selectImage} style={styles.button}>
          <Text style={styles.buttonText}>Select Image</Text>
        </TouchableOpacity>
      )}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Analyzing Image...</Text>
        </View>
      )}
      {!loading && imageData && (
        <ScrollView style={styles.scrollView}>
          <Text style={styles.headerText}>Image Analysis</Text>
          <Text style={styles.ai}>{imageData}</Text>
          {/* imageSource && <Image source={imageSource} style={styles.image} /> */}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  button: {
    backgroundColor: '#007bff', 
    padding: 15,
    borderRadius: 5,
    margin: 20,
  },
  buttonText: {
    color: '#fff', 
    fontSize: 20, 
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#0000ff', 
  },
  scrollView: {
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  ai: {
    fontSize: 40, 
    fontWeight: 'normal',
    textAlign: 'left',
    marginBottom: 20,
  },
  image: {
    width: 300, 
    height: 300, 
    resizeMode: 'contain', 
    marginBottom: 20,
  },
});

export default ImageUploadComponent;
