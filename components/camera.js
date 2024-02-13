import React, {useState, useEffect} from 'react';
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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import SoundComponent from './sound.js';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {auto} from 'openai/_shims/registry.mjs';

const UploadComponent = () => {
  const [jsonData, setJsonData] = useState(null);
  const [imageSource, setImageSource] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sound, setSound] = useState(null);
  const [language, setLanguage] = useState('english');

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
        const source = {uri: response.assets[0].uri};
        setImageSource(source);
        if (response.assets[0].base64) {
          uploadImage(response.assets[0].base64);
        }
      }
    });
  };
  const takePicture = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      mediaType: 'photo',
      includeBase64: true,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const source = {uri: response.assets[0].uri};
        setImageSource(source);
        if (response.assets[0].base64) {
          uploadImage(response.assets[0].base64);
        }
      }
    });
  };

  const uploadImage = async base64Image => {
    setLoading(true);
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      token = null;
    }
    console.log('Token:', token);
    try {
      const response = await fetch(
        'https://pillpal-8x3i.onrender.com/vision/analyze-image',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: base64Image,
            language: language,
            jwt_token: await token,
          }),
        },
      );
      const json = await response.json();
      console.log('Response from server:', json);
      setImageData(json.data);
      setSound(json.sound); // this is the url i need
      setJsonData(json); // this sets the json data to the state variable jsonData and then it allows rendering of the component

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
    <View style={styles.mainContainer}>
      <ScrollView style={styles.scrollView}>
        {/* All your scrollable content goes here */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Analyzing Image...</Text>
          </View>
        )}
        {!loading && imageData && (
          <>
            <Text style={styles.buttonText}>Transcript</Text>
            {!loading && sound && <SoundComponent sound={sound} />}
            {/*<Text style={styles.headerText}>Image Analysis</Text>*/}
            <Text style={styles.ai}>{imageData}</Text>
            {/* imageSource && <Image source={imageSource} style={styles.image} /> */}
          </>
        )}
      </ScrollView>

      {!loading && (
        <>
          <RNPickerSelect
            onValueChange={value => setLanguage(value)}
            items={[
              {label: 'English', value: 'english'},
              {label: '普通话', value: 'mandarin'},
              {label: 'Русский', value: 'russian'},
              {label: 'español', value: 'spanish'},
              {label: 'Tiếng Việt', value: 'vietnamese'},
              {label: 'عربي', value: 'arabic'},
              {label: 'हिंदी', value: 'hindi'},
              {label: 'বাংলা', value: 'bengali'},
            ]}
            style={styles.pickerSelectStyles}
            placeholder={{label: 'Select a language...', value: null}}
          />
        </>
      )}

      {!loading && (
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={takePicture} style={styles.button}>
            <Image
              source={require('../assets/cameraIcon.png')}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={selectImage} style={styles.button}>
            <Image
              source={require('../assets/galleryIcon.webp')}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#98c1d9',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 10,
    fontFamily: 'Calibri',
  },
  scrollView: {
    flexDirection: 'row',
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
  },
  button: {
    backgroundColor: 'transparent', // Ensure this is a color that contrasts well with white
    padding: 15,
    borderRadius: 5,
    margin: 5,
    width: '70%', // Make sure the button is big enough to hold your text
    // Make sure the button is big enough to hold your text
    justifyContent: 'center', // This centers the text vertically
    alignItems: 'center', // This centers the text horizontally
  },
  buttonText: {
    color: 'black', // White color for the text, make sure it contrasts with button color
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
    fontSize: 20,
    fontWeight: 'normal',
    textAlign: 'left',
    margin: 15,
    marginBottom: 10,
    lineHeight: 40,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  pickerSelectStyles: {
    inputIOS: {
      backgroundColor: '#f0f0f0', // Lighter shade of gray for a softer look
      fontSize: 16,
      width: '100%', // Make sure the picker is big enough to hold your text
      paddingVertical: 12,

      borderWidth: 1,
      borderColor: '#888', // Darker gray for the border to make it stand out
      borderRadius: 8, // Increased border radius for a more rounded, modern look
      color: '#333', // Dark gray color for the text, softer than pure black
      paddingRight: 30, // to ensure the text is never behind the icon
      fontFamily: 'Arial', // Use a more readable font
    },
    inputAndroid: {
      backgroundColor: '#f0f0f0', // Lighter shade of gray for a softer look
      fontSize: 16,
      width: '100%', // Make sure the picker is big enough to hold your text
      paddingVertical: 12,

      borderWidth: 1,
      borderColor: '#888', // Darker gray for the border to make it stand out
      borderRadius: 8, // Increased border radius for a more rounded, modern look
      color: '#333', // Dark gray color for the text, softer than pure black
      paddingRight: 30, // to ensure the text is never behind the icon
      fontFamily: 'Arial', // Use a more readable font
    },
  },
  buttonIcon: {
    flexDirection: 'column',
    width: 100, // or the size you want
    height: 100, // or the size you want
    backgroundColor: 'transparent', // or the color you want
    resizeMode: 'contain',
    // other styles you want to apply to the image
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 20,
    margin: 0,
    marginLeft: 30,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: '#f0f0f0', // Lighter shade of gray for a softer look
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#888', // Darker gray for the border to make it stand out
    borderRadius: 8, // Increased border radius for a more rounded, modern look
    color: '#333', // Dark gray color for the text, softer than pure black
    paddingRight: 30, // to ensure the text is never behind the icon
    fontFamily: 'Arial', // Use a more readable font
    width: '70%', // Make sure the picker is big enough to hold your text
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

export default UploadComponent;
