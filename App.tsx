import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button } from 'react-native';
import { fetchData } from './api/GeminiAPI'; // Adjust the path as necessary

const App = () => {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');

  // Function to handle fetching data
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
});

export default App;
