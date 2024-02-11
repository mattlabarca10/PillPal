// SignInScreen.jsx
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({ navigation }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    //
    const handleSignIn = async () => {
        try {
            const response = await axios.post('http://localhost:3007/api/auth/signin', { login, password });
            await AsyncStorage.setItem('token', response.data.token);
            // Navigate to your app's main screen or do something else
        } catch (error) {
            console.error(error);
            // Handle error, show message, etc.
        }
    };

    return (
        <View>
            <TextInput placeholder="Username or Email" value={login} onChangeText={setLogin} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <Button title="Sign In" onPress={handleSignIn} />
            <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
        </View>
    );
};

export default SignInScreen;
