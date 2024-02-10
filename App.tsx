import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, View, Image } from 'react-native';
import { fetchData } from './api/GeminiAPI';
import ImageUploadComponent from './components/Image';


const App = () => {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');

  const handleFetchData = async () => {
    const responseText = await fetchData(inputText);
    setResponse(responseText);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter text"
        value={inputText}
        onChangeText={setInputText}
      />
      <Button title="Fetch Data" onPress={handleFetchData} />
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
});

export default App;
