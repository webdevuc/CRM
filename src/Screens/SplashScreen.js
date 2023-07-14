import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  StatusBar,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-whc-toast';

export default function SplashScreen({navigation}) {
  const inputRef = React.useRef(null);
  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected == true) {
        AsyncStorage.getItem('user_token').then(token => {
          if (token === '' || token === null) {
            setTimeout(() => {
              navigation.navigate('Login');
            }, 5000);
          } else {
            setTimeout(() => {
              navigation.navigate('DrawerNav');
            }, 5000);
          }
        });
      } else {
        inputRef.current.showBottom('Please check your network connection');
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        style={styles.logoImage}
        source={require('../Assets/wlastar1.png')}
      />
      <Text
        style={{
          fontSize: 20,
          marginVertical: 15,
          fontWeight: 'bold',
          color: '#f67e16',
        }}>
        Most Welcome In Walstar
      </Text>
      <Image
        resizeMode="contain"
        style={{marginBottom: 20}}
        source={require('../Assets/title-divider.png')}
      />
      <Toast ref={inputRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(12, 11, 34,0.85)',
  },
  logoImage: {
    margin: 20,
  },
  imageBackground: {
    width: '100%',
    height: '65%',
  },
  profilePicView: {
    alignSelf: 'center',
  },
  image: {
    marginBottom: 20,
    width: '80%',
  },
});
