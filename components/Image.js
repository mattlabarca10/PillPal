import React, { useState } from 'react';
import {
  Button,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import RNPickerSelect from 'react-native-picker-select'; // Import the picker
import SoundComponent from './sound.js';

const ImageUploadComponent = () => {
  const [jsonData, setJsonData] = useState(null);
  const [imageSource, setImageSource] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sound, setSound] = useState(null);
  const [language, setLanguage] = useState('english'); // Language state

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

    launchImageLibrary(options, response => {
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

  const uploadImage = async base64Image => {
    setLoading(true);
    try {
      const response = await fetch(
        'http://localhost:3007/vision/analyze-image',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: base64Image,
            language: language,
          }),
        },
      );

      const json = await response.json();
      console.log('Response from server:', json);
      setSound(json.sound);
      setJsonData(json);

      if (json.message) {
        alert('Image processed: ' + json.message);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image: ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.scrollView}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Analyzing Image...</Text>
          </View>
        )}
        {!loading && (
          <>
            <RNPickerSelect
              onValueChange={(value) => setLanguage(value)}
              items={[
                { label: 'English', value: 'english' },
                { label: 'Spanish', value: 'spanish' },
                { label: 'Vietnamese', value: 'vietnamese' },
                { label: 'Russian', value: 'russian' },
                { label: 'Bengali', value: 'bengali' }

              ]}
              style={pickerSelectStyles}
              placeholder={{ label: 'Select a language...', value: null }}
            />
            <TouchableOpacity onPress={selectImage} style={styles.button}>
              <Text style={styles.buttonText}>Select Image</Text>
            </TouchableOpacity>
          </>
        )}
        {jsonData && (
          <>
            <Text style={styles.ai}>{jsonData.data}</Text>
            {sound && <SoundComponent sound={sound} />}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    // If you have other styles for padding, etc., keep them here
  },
  button: {
    backgroundColor: '#007bff', // Ensure this is a color that contrasts well with white
    padding: 15,
    borderRadius: 5,
    margin: 20,
    // Make sure the button is big enough to hold your text
    justifyContent: 'center', // This centers the text vertically
    alignItems: 'center', // This centers the text horizontally
  },
  buttonText: {
    color: '#fff', // White color for the text, make sure it contrasts with button color
    fontSize: 20, // Adjust font size as needed
    textAlign: 'center', // Center text - though this is redundant if alignItems is set to 'center'
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default ImageUploadComponent;
