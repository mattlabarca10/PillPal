import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
//import { fetchData } from './api/GeminiAPI';
import UploadComponent from '../components/camera';
//import CustomHeader from './components/CustomHeader.jsx';

const HomeScreen = ({ navigation }) => {
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
            {/*<CustomHeader onSettingsPress={() => alert('Settings Pressed')} />*/}
            <Text style={styles.response}>{response}</Text>
            <UploadComponent />
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('SignIn')}
                >
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('SignUp')}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#45D6B6',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttonContainer: {
        marginTop: 20,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        margin: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
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

export default HomeScreen;
