import React, {useState, useEffect, useRef} from 'react';
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
const Sound = require('react-native-sound');

const SoundComponent = ({sound}) => {
  const audio = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const newSound = 'https://backend-9b1x.onrender.com/' + sound;
    audio.current = new Sound(newSound, null, error => {
      console.log(sound);
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully

      console.log(
        'duration in seconds: ' +
          audio.current.getDuration() +
          'number of channels: ' +
          audio.current.getNumberOfChannels(),
      );
    });

    return () => {
      audio.current.release();
    };
  }, [sound]);

  const playPause = () => {
    if (audio.current.isPlaying()) {
      audio.current.pause();
      setPlaying(false);
    } else {
      audio.current.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
        setPlaying(true);
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={playPause}>
          <Image
            source={require('../assets/speakerIcon.png')}
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'transparent',
    width: 50,
    height: 50,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  buttonIcon: {
    width: 70, // or the size you want
    height: 70, // or the size you want
    // other styles you want to apply to the image
  },
});
// ... rest of your code

export default SoundComponent;
