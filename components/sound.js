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
    audio.current = new Sound(sound, null, error => {
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
      setPlaying(true);
      audio.current.play(success => {
        if (success) {
          setPlaying(false);
          console.log('successfully finished playing');
        } else {
          setPlaying(false);
          console.log('playback failed due to audio decoding errors');
        }
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={playPause}>
          <Text style={styles.buttonText}>
            {playing ? 'Pause Sound' : 'Play Sound'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    margin: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
});
// ... rest of your code

export default SoundComponent;
