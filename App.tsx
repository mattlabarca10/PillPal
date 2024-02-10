import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, View, Image } from 'react-native';
import { fetchData } from './api/GeminiAPI'; // Adjust the path as necessary
import { selectImage } from './components/Image'; // Ensure this path is correct

interface ImageSource {
  uri: string;
}

const App = () => {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');
  const [imageUri, setImageUri] = useState(null); // State to hold the image URI

  const handleFetchData = async () => {
    const responseText = await fetchData(inputText);
    setResponse(responseText);
  };

  // Function to handle image selection
  const handleSelectImage = () => {
    selectImage((source: ImageSource) => setImageUri(source));
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
      <Button title="Select Image" onPress={handleSelectImage} />
      {/* Display the selected image if available */}
      {imageUri && <Image source={imageUri} style={styles.image} />}
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
  image: {
    marginTop: 20,
    width: 200, // Set the width and height as needed
    height: 200,
    resizeMode: 'cover', // Adjust the resize mode as needed
  },
});

export default App;
