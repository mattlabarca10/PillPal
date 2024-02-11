// CustomHeader.jsx
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Make sure you have installed this library

const CustomHeader = ({ onSettingsPress, isLoggedIn }) => {
    const [menuVisible, setMenuVisible] = useState(false);

    const renderMenu = () => {
        if (!menuVisible) return null;

        const menuItems = isLoggedIn
            ? [{ text: 'Saved', onPress: () => {/* navigate to Saved */ } },
            { text: 'Logout', onPress: () => {/* handle logout */ } }]
            : [{ text: 'Sign In', onPress: () => {/* navigate to Sign In */ } },
            { text: 'Sign Up', onPress: () => {/* navigate to Sign Up */ } }];

        return (
            <View style={styles.menu}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.menuItem} onPress={item.onPress}>
                        <Text style={styles.menuItemText}>{item.text}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} style={styles.iconButton}>
                    <Icon name="settings-outline" size={25} color="#000" />
                </TouchableOpacity>
            </View>
            {renderMenu()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // Add styling if needed
    },
    header: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 10,
    },
    iconButton: {
        padding: 10,
    },
    menu: {
        position: 'absolute',
        top: 50, // Adjust this value to move the menu below the header
        right: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        // Add shadow or elevation based on your app design
    },
    menuItem: {
        padding: 10,
        // Add styling for your menu items
    },
    menuItemText: {
        // Add text styling for your menu items
    },
});

export default CustomHeader;
