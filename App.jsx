import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
//import { fetchData } from './api/GeminiAPI';
import ImageUploadComponent from './components/Image';
import CustomHeader from './components/CustomHeader';

const Sound = require('react-native-sound');

const App = () => {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');

  /*
  const handleFetchData = async () => {
    const responseText = await fetchData(inputText);
    setResponse(responseText);
  };
  */

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader onSettingsPress={() => alert('Settings Pressed')} />
      <Text style={styles.response}>{response}</Text>
      <ImageUploadComponent />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#45D6B6',
    marginTop: 0,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
    borderColor: 'gray',
    borderRadius: 5,
  },
  response: {
    marginTop: 20,
    padding: 10,
    color: 'black',
  },
  /* 
    image: {
      marginTop: 20,
      width: 200, // Set the width and height as needed
      height: 200,
      resizeMode: 'cover', // Adjust the resize mode as needed
    },
     */
  playBtn: {
    padding: 20,
  },
});

export default App;
