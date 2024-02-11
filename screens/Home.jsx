import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Welcome to the App!</Text>
                <Image
                    source={{ uri: 'https://via.placeholder.com/150' }}
                    style={styles.image}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => console.log('Button Pressed')}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
    },
});

export default HomeScreen;
