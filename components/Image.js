import React, { useState } from 'react';
import { Button, Image, Text, View, StyleSheet, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const ImageUploadComponent = () => {
  const [imageSource, setImageSource] = useState(null);
  const [imageData, setImageData] = useState(null);

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

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const source = { uri: response.assets[0].uri };
        setImageSource(source);
        if (response.assets[0].base64) {
          uploadImage(response.assets[0].base64);
        }
      }
    });
  };

  const uploadImage = async (base64Image) => {
    try {
      const response = await fetch('http://localhost:3007/vision/analyze-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64Image,
        }),
      });
  
      const json = await response.json();
      console.log('Response from server:', json);
      console.log(json.data);
      setImageData(json.data);
  
      if (json.message) {
        // Do something with the response message
        alert('Image processed: ' + json.message);
      }
  
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image: ' + error);
    }
  };
  

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title="Select Image" onPress={selectImage} />
      {/*imageSource && <Image source={imageSource} style={{width: 200, height: 200}} />*/}
      <ScrollView>
      {imageData && <Text style={styles.ai}> {imageData} </Text>}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    ai: {
      fontSize: 35,
      fontWeight: 'bold',
      textAlign: 'center',
      margin: 20,
    },
});

export default ImageUploadComponent;
