import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import PostByFetch from '../Helper/PostByFetch';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {SkypeIndicator} from 'react-native-indicators';
import Toast from 'react-native-whc-toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ScrollView} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Regex from '../utils/Validation';

// function validateEmail(emailAdress) {
//   let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   if (emailAdress.match(regexEmail)) {
//     return true;
//   } else {
//     return false;
//   }
// }

// function validatePassword(password) {
//   let regexPassword = new RegExp(
//     '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})',
//   );
//   if (password.match(regexPassword)) {
//     return false;
//   } else {
//     return true;
//   }
// }

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('sharadb@walstartechnologies.com');
  const [password, setPassword] = useState('12345');
  const [passwordFlag, setPasswordFlag] = useState(true);
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [isLoader, setisLoader] = useState(false);
  const inputRef = React.useRef(null);

  const mergeUsers = async data => {
    try {
      await AsyncStorage.setItem('user_token', JSON.stringify(data.token));
      await AsyncStorage.setItem('user_id', JSON.stringify(data.user.id));
      var name = data.user.first_name + ' ' + data.user.last_name;
      await AsyncStorage.setItem('user_name', name);
      setEmail('');
      setPassword('');
      navigation.navigate('DrawerNav');
      setisLoader(false);
    } catch (e) {}
  };

  const onLoginPressed = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected == true) {
        let errorFlag = false;
        // console.log('email-------------', email);
        // console.log('pass-------------', password);

        if (!email || !password) {
          if (!email) {
            setEmailMessage('Email is required');
          } else if (!Regex.validateEmail(email)) {
            setEmailMessage('Please enter valid email id');
          } else {
            setEmailMessage('');
          }
          if (!password) {
            setPasswordMessage('Password is required');
          } else if (!Regex.validatePassword(password)) {
            setPasswordMessage(
              'Your password must be more than 8 characters long should contain at least 1 Uppercase , 1 Lowercase , 1 Numberic and 1 special character.',
            );
          } else {
            setPasswordMessage('');
          }
        } else if (
          !Regex.validateEmail(email)
          //  || !Regex.validatePassword(password)
        ) {
          if (!Regex.validateEmail(email)) {
            setEmailMessage('Please enter valid email id');
          } else {
            setEmailMessage('');
          }
          if (!Regex.validatePassword(password)) {
            setPasswordMessage(
              'Your password must be more than 8 characters long should contain at least 1 Uppercase , 1 Lowercase , 1 Numberic and 1 special character.',
            );
          } else {
            setPasswordMessage('');
          }
        } else {
          errorFlag = true;
          setEmailMessage('');
          setPasswordMessage('');
          setisLoader(true);
          PostByFetch('login', {
            // email:'akshayb@walstartechnologies.com',
            // password:'Crm@12345'
            email: email,
            password: password,
          }).then(async response => {
            setisLoader(false);
            setEmail('');
            setPassword('');
            if (response.error) {
              inputRef.current.showBottom(
                'Please check your login credication',
              );
            } else {
              mergeUsers(response);
            }
          });
        }
      } else {
        inputRef.current.showBottom('Please check your network connection');
      }
    });

    // navigation.navigate('Dashboard')
  };
  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected == true) {
      } else {
        inputRef.current.showBottom('Please check your network connection');
      }
    });
  }, []);
  useEffect(() => {
    const backAction = () => {
      Alert.alert('', 'Do you want to Exit from App?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.container1}>
          <View style={styles.main_Container}>
            <Image
              resizeMode="contain"
              source={require('../Assets/wlastar1.png')}
            />
            <Text
              style={{
                fontSize: 15,
                marginVertical: 20,
                fontWeight: 'bold',
                color: '#f67e16',
              }}>
              Sign In To Continue
            </Text>
            <Image
              resizeMode="contain"
              source={require('../Assets/title-divider.png')}
            />
          </View>
        </View>
      </View>
      <View style={{marginHorizontal: 20}}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            returnKeyType="next"
            value={email}
            onChangeText={text => setEmail(text)}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <MaterialIcon name="email" size={25} color="#626ed4" />
        </View>
        {emailMessage !== '' && (
          <View style={styles.errorMesssageView}>
            <Icon name="warning" size={20} color="#dc3545" />
            <Text style={styles.textDanger}>{emailMessage}</Text>
          </View>
        )}
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={passwordFlag}
            returnKeyType="done"
            value={password}
            onChangeText={text => setPassword(text)}
            error={!!password.error}
            errorText={password.error}
          />
          <TouchableOpacity onPress={() => setPasswordFlag(!passwordFlag)}>
            {!passwordFlag ? (
              <Icon name="eye" size={25} color="#626ed4" />
            ) : (
              <Icon name="eye-slash" size={25} color="#626ed4" />
            )}
          </TouchableOpacity>
        </View>
        {passwordMessage !== '' && (
          <View style={styles.errorMesssageView}>
            <Icon name="warning" size={20} color="#dc3545" />
            <Text style={styles.textDanger}>{passwordMessage}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.forgot_view}>
          <MaterialIcon name="lock" size={20} color="#333" />
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn} onPress={onLoginPressed}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
      </View>
      <Toast
        ref={inputRef}
        style={styles.toast}
        opacity={15}
        positionValue={65}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: hp('40%'),
    width: wp('100%'),
    transform: [{scaleX: 2}],
    borderBottomStartRadius: 200,
    borderBottomEndRadius: 200,
    overflow: 'hidden',
  },
  container1: {
    backgroundColor: 'rgba(12, 11, 34,0.85)',
    // backgroundColor: '#191a48',
    flex: 1,
    transform: [{scaleX: 0.5}],
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicView: {
    alignSelf: 'center',
  },

  main_Container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 25,
  },
  inputView: {
    backgroundColor: '#E8F0FE',
    borderRadius: 5,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  textInput: {
    flex: 1,
    color: '#333',
  },
  forgot_view: {
    alignSelf: 'flex-end',
    // marginHorizontal: 30,
    marginTop: 5,
    flexDirection: 'row',
  },
  textDanger: {
    color: '#dc3545',
    marginHorizontal: 10,
  },
  errorMesssageView: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    // marginBottom: 10,
  },
  loginBtn: {
    width: '100%',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#626ED4',
  },
  loginText: {
    color: '#FFFF',
    fontSize: 16,
  },
  forgot_button: {
    color: '#333',
    marginLeft: 5,
  },
  toast: {
    backgroundColor: '#f67e16',
  },
});
