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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScrollView } from 'react-native-gesture-handler';

function validateEmail (emailAdress)
{
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAdress.match(regexEmail)) {
    return true; 
  } else {
    return false; 
  }
}

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordFlag, setPasswordFlag] = useState(true);
  const [emailMessage, setEmailMessage] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState(false);
  const [isLoader, setisLoader] = useState(false);
  const inputRef = React.useRef(null);

  const mergeUsers = async data => {
    console.log("data :----------- "+JSON.stringify(data))
    try {
      await AsyncStorage.setItem('user_token', JSON.stringify(data.token));
      await AsyncStorage.setItem('user_id', JSON.stringify(data.user.id));
      var name=data.user.first_name + ' '+ data.user.last_name
      await AsyncStorage.setItem('user_name', name);
      setEmail('')
      setPassword('')
      navigation.navigate('DrawerNav');
      setisLoader(false);
    } catch (e) {}
  };


  const onLoginPressed = async () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected == true) {
        let errorFlag = false;
        console.log("email-------------",email);
        console.log("pass-------------",password);
        if (email) {
          errorFlag = true;
          setEmailMessage(false);
        } else {
          errorFlag = false;
          setEmailMessage(true);
        }        
        if (password) {
          errorFlag = true;
          setPasswordMessage(false);
        } else {
          errorFlag = false;
          setPasswordMessage(true);
        }
        if (errorFlag) {
          console.log("errorFlag :- "+errorFlag)
          setisLoader(true);
          PostByFetch('login', {
            // email:'priyankap@walstartechnologies.comdasd',
            // password:'Priyanka@1234'
            email: email,
            password: password,
          }).then(async response => {
           if(response.error)
           {
            setisLoader(false);
            setEmail('')
            setPassword('')
            inputRef.current.showBottom('Please check your login credication');
           }
           else{
              mergeUsers(response);
           }
           
          });
        } else {
          
        }
      } else {
        inputRef.current.showBottom('Please check your network connection');
      }
    });

    //navigation.navigate('Dashboard')
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
  // if (isLoader) {
  //   return <SkypeIndicator color="#626ed4" size={50} />;
  // }
  return (
  <SafeAreaView style={styles.containerd}>
    <View style={styles.container}>
      <ImageBackground
        source={require('../Assets/bg.png')}
        resizeMode={'stretch'}
        style={styles.imageBackground}
      />

       <KeyboardAwareScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{flex:1}}
          keyboardShouldPersistTaps={'never'}
          showsVerticalScrollIndicator={false}>
 
   {isLoader ? (
          <SkypeIndicator color="#fff" size={50} />
        ) : (
          
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.main_Container}>     
        <Image
          resizeMode="contain"
          style={styles.logoImage}
          source={require('../Assets/wlastar1.png')}
        />
            <Text
              style={{
                fontSize: 15,
                marginVertical: 35,
                fontWeight: 'bold',
                color: '#f67e16',
              }}>
             Sign In To Continue
            </Text>
            <Image
              resizeMode="contain"
              style={[styles.logoImage, {marginBottom: 20}]}
              source={require('../Assets/title-divider.png')}
            />

            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Email"
                placeholderTextColor="#003f5c"
                returnKeyType="next"
                value={email.value}
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
            {emailMessage && (
              <View style={styles.errorMesssageView}>
                <Icon name="warning" size={20} color="#dc3545" />
                <Text style={styles.textDanger}>{'Email is required'}</Text>
              </View>
            )}
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Password"
                placeholderTextColor="#003f5c"
                secureTextEntry={passwordFlag}
                returnKeyType="done"
                value={password.value}
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
            {passwordMessage && (
              <View style={styles.errorMesssageView}>
                <Icon name="warning" size={20} color="#dc3545" />
                <Text style={styles.textDanger}>{'Password is required'}</Text>
              </View>
            )}

            <TouchableOpacity style={styles.forgot_view}>
              <MaterialIcon name="lock" size={20} color="#fff" />
              <Text style={styles.forgot_button}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn} onPress={onLoginPressed}>
              <Text style={styles.loginText} >
                Log In
              </Text>
            </TouchableOpacity>        
      
      </View>
    </ScrollView>
      )}
      </KeyboardAwareScrollView>
      <Toast ref={inputRef} 
      style = {styles.toast}
      opacity = {15}
      // position = {Toast.Position.bottom}
      positionValue = {65}
      />
    </View>
  </SafeAreaView>

  // <SafeAreaView style={styles.containerd}>
  //    <View>
  //      <Image
  //       resizeMode="contain"
  //       style={styles.logoImage}
  //       source={require('../Assets/wlastar1.png')}
  //       />
  //   </View>
  //   <View style={styles.innerContainer}>
  //       <View style={styles.main_Container}>
  //       {isLoader ? (
  //          <SkypeIndicator color="#626ed4" size={50} />
  //        ) : (
  //          <>
  //            <Text
  //              style={{
  //                fontSize: 20,
  //                marginVertical: 15,
  //                fontWeight: 'bold',
  //                color: '#f67e16',
  //              }}>
  //             Sign In To Continue
  //            </Text>
  //            <Image
  //              resizeMode="contain"
  //              style={[styles.logoImage, {marginBottom: 20}]}
  //              source={require('../Assets/title-divider.png')}
  //            />

  //            <View style={styles.inputView}>
  //              <TextInput
  //                style={styles.TextInput}
  //                placeholder="Email"
  //                placeholderTextColor="#003f5c"
  //                returnKeyType="next"
  //                value={email.value}
  //               onChangeText={text => setEmail(text)}
  //                error={!!email.error}
  //                errorText={email.error}
  //                autoCapitalize="none"
  //                autoCompleteType="email"
  //                textContentType="emailAddress"
  //                keyboardType="email-address"
  //              />
  //              <MaterialIcon name="email" size={25} color="#626ed4" />
  //            </View>
  //            {emailMessage && (
  //              <View style={styles.errorMesssageView}>
  //                <Icon name="warning" size={20} color="#dc3545" />
  //                <Text style={styles.textDanger}>{'Email is required'}</Text>
  //              </View>
  //            )}
  //            <View style={styles.inputView}>
  //              <TextInput
  //                style={styles.TextInput}
  //                placeholder="Password"
  //               placeholderTextColor="#003f5c"
  //               secureTextEntry={passwordFlag}
  //                returnKeyType="done"
  //                value={password.value}
  //                onChangeText={text => setPassword(text)}
  //                error={!!password.error}
  //              errorText={password.error}
  //              />
  //              <TouchableOpacity onPress={() => setPasswordFlag(!passwordFlag)}>
  //                {!passwordFlag ? (
  //                  <Icon name="eye" size={25} color="#626ed4" />
  //                ) : (
  //                  <Icon name="eye-slash" size={25} color="#626ed4" />
  //                )}
  //             </TouchableOpacity>
  //          </View>
  //           {passwordMessage && (
  //              <View style={styles.errorMesssageView}>
  //                <Icon name="warning" size={20} color="#dc3545" />
  //                <Text style={styles.textDanger}>{'Password is required'}</Text>
  //              </View>
  //            )}

  //            <TouchableOpacity style={styles.forgot_view}>
  //              <MaterialIcon name="lock" size={20} color="#626ed4" />
  //              <Text style={styles.forgot_button}>Forgot Password?</Text>
  //            </TouchableOpacity>

  //            <TouchableOpacity style={styles.loginBtn}>
  //              <Text style={styles.loginText} onPress={onLoginPressed}>
  //                Log In
  //              </Text>
  //            </TouchableOpacity>
  //          </>
  //        )}
  //      </View>

  //   </View>
  // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerd: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
   // backgroundColor: 'rgba(12, 11, 34,0.85)',
    backgroundColor: 'rgba(12, 11, 34,0.85)',
  },
  innerContainer:{
    height: '70%',
    width:'80%',
    borderRadius: 15,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: '#ffffff',
  },
  scrollContainer:{
    top:'20%',
  },


  container: {
    flex: 1,
  },
  empName: {
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
    fontWeight: '700',
    color: '#191A48',
    marginVertical: 15,
  },
  imageBackground: {
    width: '100%',
    height: '65%',
    position:'absolute'
  },
  profilePicView: {
    alignSelf: 'center',
    position:'relative',
    top:'10%'
    // marginTop: '-80%',    
  },

  main_Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
    position:'relative',
    //top:'10%'
  },

  image: {
    marginBottom: 20,
    width: '80%',
  },

  inputView: {
    backgroundColor: '#E8F0FE',
    borderRadius: 5,
    marginHorizontal: 25,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  TextInput: {
    flex: 1,
  },
  forgot_view: {
    alignSelf: 'flex-end',
    marginHorizontal: 30,
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
    marginHorizontal: 30,
    marginBottom: 10,
  },
  loginBtn: {
    width: '50%',
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
    color: '#fff',
    marginLeft: 5,
  },
  toast:{
    backgroundColor:"#f67e16",
  }
});
