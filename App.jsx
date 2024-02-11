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
const Sound = require('react-native-sound');
import dings from './assets/ding.mp3';

var ding = new Sound(dings, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // if loaded successfully
  console.log(
    'duration in seconds: ' +
    ding.getDuration() +
    'number of channels: ' +
    ding.getNumberOfChannels(),
  );
});

const App = () => {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');

  /*
  const handleFetchData = async () => {
    const responseText = await fetchData(inputText);
    setResponse(responseText);
  };
  */

  useEffect(() => {
    ding.setVolume(1);
    return () => {
      ding.release();
    };
  }, []);
  const playPause = () => {
    ding.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/*<TextInput
        style={styles.input}
        placeholder="Enter text"
        value={inputText}
        onChangeText={setInputText}
      />*/}
      {/*<Button title="Fetch Data" onPress={handleFetchData} />*/}
      <Text style={styles.response}>{response}</Text>
      <ImageUploadComponent />

      <TouchableOpacity style={styles.playBtn} onPress={playPause}>
        <Text>Play</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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
