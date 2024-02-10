// ImageUploader.js
import { launchImageLibrary } from 'react-native-image-picker';

const selectImage = (callback) => {
  launchImageLibrary({ mediaType: 'photo' }, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      const source = { uri: response.assets[0].uri };
      callback(source);
    }
  });
};

export { selectImage };
