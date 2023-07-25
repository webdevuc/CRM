// import {
//   Appbar,
//   DarkTheme,
//   DefaultTheme,
//   Provider,
//   Surface,
//   ThemeProvider,
// } from 'react-native-paper';
// import React, {useState, useCallback, useEffect} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   BackHandler,
//   Alert,
// } from 'react-native';
// import {Button, TextInput} from 'react-native-paper';
// import {DatePickerModal} from 'react-native-paper-dates';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import 'intl';
// import 'intl/locale-data/jsonp/en';
// import moment from 'moment';
// import GetByFetch from '../Helper/GetByFetch';
// import reactotron from 'reactotron-react-native';
// import Calendar from 'react-native-vector-icons/FontAwesome';
// import PostByFetch from '../Helper/PostByFetch';
// import axios from 'axios';
// import {RNToasty} from 'react-native-toasty';
// import {useSelector} from 'react-redux';
// import {baseURL} from '../utils/Api';
// import { profileData, updateProfileData } from '../actions/UserActions';

// function Profile({navigation}) {
//   const token = useSelector(state => state?.user?.data?.data?.token);

//   const UserID = useSelector(state => state?.user?.data?.data?.user?.id);

//   const profile = useSelector(state=> state?.profile?.data?.data?.user_data)

//   reactotron.log("get data from useSelector----->",profile)

//   const [nightMode, setNightmode] = useState(false);

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [companyId, setCompanyId] = useState('');
//   const [phoneNo, setPhoneNo] = useState('');
//   const [address, setAddress] = useState('');
//   const [designation, setDesignation] = useState('');

//   const [role, setRole] = useState('');

//   const [open, setOpen] = useState(false);
//   const [Dateofbirth, setFormDate] = useState(new Date());
//   const [formopen, setFormOpen] = useState(false);

//   useEffect(() => {
//     const backAction = () => {
//       Alert.alert('', 'Do you want to Exit from App?', [
//         {
//           text: 'Cancel',
//           onPress: () => null,
//           style: 'cancel',
//         },
//         {text: 'YES', onPress: () => BackHandler.exitApp()},
//       ]);
//       return true;
//     };

//     const backHandler = BackHandler.addEventListener(
//       'hardwareBackPress',
//       backAction,
//     );

//     return () => backHandler.remove();
//   }, []);

//   const getProfile = async () => {
//     const res = await dispatch(profileData(token,UserID));

//     // const userData = res?.data?.user_data;
//     if (profile) {
//       const {first_name, middle_name, last_name} = profile;
//       const name = `${first_name} ${middle_name} ${last_name}`;

//       setName(name);
//       setCompanyId(profile.employee_id);
//       setEmail(profile.email);
//       setAddress(profile.address);
//       setPhoneNo(profile.phone);
//       setDesignation(profile.designation);
//       setFormDate(new Date(profile.birth_date));
//       setRole(profile.role);
//     }

//   }

//   useEffect(()=>{
//     getProfile();
//   },[])

//   const onFormDismiss = useCallback(() => {
//     setFormOpen(false);
//   }, [setOpen]);

//   const onFormConfirm = React.useCallback(
//     params => {
//       console.log('fdfsdfsdfdsfs:-    ' + JSON.stringify(params));
//       setFormOpen(false);
//       setFormDate(params.date);
//       // setRange({ startDate, endDate });
//     },
//     [setFormOpen, setFormDate],
//   );

//   const updateProfile = async () => {
//     const fullName = name;
//     const nameArray = fullName?.split(' ');
//     const first_name = nameArray[0];
//     const middle_name = nameArray[1];
//     const last_name = nameArray[2];

//     const payload = {
//       first_name,
//       middle_name,
//       last_name,
//       designation: designation,
//       companyId: companyId,
//       email: email,
//       phoneNo: phoneNo,
//       Dateofbirth: Dateofbirth,
//       address: address,
//       role: role,
//     };

//     const resposone = await dispatch(updateProfileData(token,UserID,payload))
//     RNToasty.Success({
//       title: resposone.data.message,
//       position: 'bottom',
//       duration:1
//     });
//     navigation.navigate('Dashboard');
//   };

//   return (
//     <Provider theme={nightMode ? DarkTheme : DefaultTheme}>
//       <ScrollView>
//         <ThemeProvider theme={nightMode ? DarkTheme : DefaultTheme}>
//           <Surface style={styles.containerStyle}>
//             <SafeAreaView style={styles.safeContainerStyle}>
//               <Text style={[styles.labelStyle, {marginTop: 10}]}>Name </Text>
//               <TextInput
//                 // mode="flat"
//                 mode="outlined"
//                 size="small"
//                 label=""
//                 style={styles.inputStyle}
//                 value={name}
//                 onChangeText={value => setName(value)}
//               />
//               <View style={styles.spacerStyle} />
//               <Text style={[styles.labelStyle]}>Designation </Text>
//               <TextInput
//                 // mode="flat"
//                 mode="outlined"
//                 label=""
//                 style={styles.inputStyle}
//                 value={designation}
//                 onChangeText={value => setDesignation(value)}
//               />
//               <View style={styles.spacerStyle} />
//               <Text style={[styles.labelStyle]}>Company Id </Text>
//               <TextInput
//                 // mode="flat"
//                 mode="outlined"
//                 label=""
//                 style={styles.inputStyle}
//                 value={companyId}
//                 onChangeText={value => setCompanyId(value)}
//               />
//               <View style={styles.spacerStyle} />
//               <Text style={[styles.labelStyle]}>Company Mail </Text>
//               <TextInput
//                 // mode="flat"
//                 mode="outlined"
//                 label=""
//                 style={styles.inputStyle}
//                 value={email}
//                 onChangeText={value => setEmail(value)}
//               />
//               <View style={styles.spacerStyle} />
//               <Text style={[styles.labelStyle]}>Phone Number </Text>
//               <TextInput
//                 // mode="flat"
//                 mode="outlined"
//                 label=""
//                 phoneNumber={true}
//                 style={styles.inputStyle}
//                 value={phoneNo}
//                 onChangeText={value => setPhoneNo(value)}
//               />

//               <View style={styles.spacerStyle} />
//               <Text style={[styles.labelStyle, {marginBottom: 10}]}>
//                 Date Of Birth{' '}
//               </Text>
//               <TouchableOpacity
//                 style={styles.datePickerStyle}
//                 onPress={() => setFormOpen(true)}>
//                 <Text style={{color: '#000'}}>
//                   {moment(Dateofbirth).format('DD/MM/YYYY')}
//                 </Text>
//                 <Calendar
//                   name="calendar"
//                   size={25}
//                   color="#626ed4"
//                   style={{textAlign: 'left'}}
//                 />
//               </TouchableOpacity>

//               <Text style={[styles.labelStyle, {marginTop: 15}]}>Address </Text>
//               <TextInput
//                 multiline
//                 // mode="flat"
//                 mode="outlined"
//                 label=""
//                 numberOfLines={5}
//                 style={{backgroundColor: 'white'}}
//                 value={address}
//                 onChangeText={value => setAddress(value)}
//               />
//               <View style={styles.buttonSection}>
//                 {/* <Button style={styles.closeButtonStyle} mode="contained" onPress={() => navigation.goBack()}>
//                   <Text style={{ color: '#212529' }}>Close</Text>
//                 </Button> */}
//                 <Button
//                   style={styles.addButtonStyle}
//                   mode="contained"
//                   onPress={updateProfile}>
//                   Update
//                 </Button>
//               </View>

//               <DatePickerModal
//                 locale="en"
//                 mode="single"
//                 visible={formopen}
//                 onDismiss={onFormDismiss}
//                 dates={Dateofbirth}
//                 onConfirm={onFormConfirm}
//               />
//             </SafeAreaView>
//           </Surface>
//         </ThemeProvider>
//       </ScrollView>
//     </Provider>
//   );
// }

// const styles = StyleSheet.create({
//   containerStyle: {
//     flex: 1,
//   },
//   spacerStyle: {
//     marginBottom: 20,
//   },
//   safeContainerStyle: {
//     flex: 1,
//     margin: 20,
//   },
//   radioButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   buttonSection: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 30,
//   },
//   addButtonStyle: {
//     borderRadius: 20,
//     backgroundColor: '#F58E5E',
//     paddingHorizontal: 30,
//     borderColor: '#F58E5E',
//   },
//   closeButtonStyle: {
//     borderRadius: 5,
//     backgroundColor: '#e9ecef',
//     borderColor: '#e9ecef',
//     marginRight: 15,
//   },
//   labelStyle: {
//     fontSize: 18,
//     color: '#5b626b',
//     fontWeight: '400',
//   },
//   inputStyle: {
//     // height:40,
//     backgroundColor: 'transparent',
//     color: '#5b626b',
//   },
//   datePickerStyle: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'gray',
//     padding: 10,
//     borderRadius: 5,
//   },
// });
// export default Profile;

import {
  Appbar,
  DarkTheme,
  DefaultTheme,
  Provider,
  Surface,
  ThemeProvider,
} from 'react-native-paper';
import React, {useState, useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  Alert,
  Image,
  TextInput,
} from 'react-native';
import {Button} from 'react-native-paper';
import {DatePickerModal} from 'react-native-paper-dates';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import GetByFetch from '../Helper/GetByFetch';
import reactotron from 'reactotron-react-native';
import Calendar from 'react-native-vector-icons/FontAwesome';
import PostByFetch from '../Helper/PostByFetch';
import axios from 'axios';
import {RNToasty} from 'react-native-toasty';
import {useSelector} from 'react-redux';
import {baseURL} from '../utils/Api';
import {profileData, updateProfileData} from '../actions/UserActions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {globalColors} from '../theme/globalColors';
import {useIsFocused} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';

function Profile({navigation}) {
  const token = useSelector(state => state?.user?.data?.data?.token);

  const UserID = useSelector(state => state?.user?.data?.data?.user?.id);

  const profile = useSelector(state => state?.profile?.data?.data?.data);

  reactotron.log("profile",profile)

  const isFocused = useIsFocused();
  const [nightMode, setNightmode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [pic, setPic] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [imgUri, setImgUri] = useState(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [address, setAddress] = useState('');
  const [designation, setDesignation] = useState('');

  const [role, setRole] = useState('');

  const [open, setOpen] = useState(false);
  const [Dateofbirth, setFormDate] = useState(new Date());
  const [formopen, setFormOpen] = useState(false);


  const [isErrorEmail, setIsErrorEmail] = useState(false);

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

  const getProfile = async () => {
    const res = await dispatch(profileData(token, UserID));

    // const userData = res?.data?.user_data;
    if (profile) {
      const {first_name, middle_name, last_name} = profile;
      const name = `${first_name} ${middle_name} ${last_name}`;

      setName(name);
      setCompanyId(profile.employee_id);
      setEmail(profile.email);
      setAddress(profile?.user_otherdetails.address);
      setPhoneNo(profile?.user_otherdetails?.alternative_phone);
      setDesignation(profile?.user_otherdetails?.name);
      setFormDate(new Date(profile.birth_date));
      setRole(profile.role);
      setImgUri(profile?.avatar);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getProfile();
    }
  }, [isFocused]);

  const onFormDismiss = useCallback(() => {
    setFormOpen(false);
  }, [setOpen]);

  const onFormConfirm = React.useCallback(
    params => {
      reactotron.log('fdfsdfsdfdsfs:-    ' + JSON.stringify(params));
      setFormOpen(false);
      setFormDate(params.date);
      // setRange({ startDate, endDate });
    },
    [setFormOpen, setFormDate],
  );

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const updateProfile = async () => {
    const fullName = name;
    const nameArray = fullName?.split(' ');
    const first_name = nameArray[0];
    const middle_name = nameArray[1];
    const last_name = nameArray[2];

    const payload = {
      first_name,
      middle_name,
      last_name,
      designation: designation,
      companyId: companyId,
      email: email,
      phoneNo: phoneNo,
      Dateofbirth: Dateofbirth,
      address: address,
      role: role,
    };

    if (pic) {
      formData.append('image', {
        uri: pic && pic.assets && pic.assets[0] && pic.assets[0].uri,
        name: pic && pic.assets && pic.assets[0] && pic.assets[0].fileName,
        type: pic && pic.assets && pic.assets[0] && pic.assets[0].type,
      });
    }

    const resposone = await dispatch(updateProfileData(token, UserID, payload));
    RNToasty.Success({
      title: resposone.data.message,
      position: 'bottom',
      duration: 1,
    });
    navigation.navigate('Profile');
  };

  const handleSelectImage = () => {
    const options = {quality: 0.1};
    launchImageLibrary(options, res => {
      setPic(res);
      setPhoto(res && res.assets && res.assets[0] && res.assets[0].uri);
    });
  };

  const handleEmail = text => {
    const trimmedText = text.trimStart();

    setEmail(trimmedText);

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;

    if (emailRegex.test(trimmedText)) {
      if (trimmedText.split('.com').length - 1 > 1) {
        setIsErrorEmail(true);
      } else {
        setIsErrorEmail(false);
      }
    } else {
      setIsErrorEmail(true);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          {/* <Image
            source={require('../Assets/logo.png')}
            style={styles.profilePic}
          />     */}
          {photo?.length > 1 ? (
            <Image
              style={styles.image}
              source={require('../Assets/logo.png')}
            />
          ) : imgUri?.length > 1 ? (
            <Image
              style={styles.image}
              source={require('../Assets/WalstarLogo-01.png')}
            />
          ) : (
            // <MaterialIcons  name="person" size={40} color="red" />
            <Image
              style={styles.image}
              source={require('../Assets/logo.png')}
            />
          )}

          {isEditing && (
            <View style={styles.uploadBtnContainer}>
              <TouchableOpacity
                onPress={handleSelectImage}
                style={styles.uploadBtn}>
                <MaterialIcons
                  name="edit"
                  size={20}
                  color={globalColors.black}
                />
              </TouchableOpacity>
            </View>
          )}

          <View>
            {isEditing ? (
              <TextInput
                style={
                  isEditing
                    ? [styles.infoValue]
                    : styles.name
                }
                value={name}
                onChangeText={setName}
              />
            ) : (
              <Text style={styles.username}>{name}</Text>
            )}
          </View>
          <Text style={styles.infoValue}>EmpId : {profile?.employee_id}</Text>
          <Text style={styles.infoValue}>{profile?.user_role?.name}</Text>
        </View>
        <View style={styles.infoSection}>
          <TouchableOpacity style={styles.infoItem}>
            <View>
              <MaterialIcons
                name="date-range"
                size={22}
                color={globalColors.skyBlue}
              />
            </View>
            <View>
              <Text style={styles.infoLabel}>Joining Date</Text>
              <Text style={styles.infoValue}>{profile?.joining_date}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoItem}>
            <View>
              <MaterialIcons
                name="email"
                size={22}
                color={globalColors.skyBlue}
              />
            </View>
            <View>
              <Text style={styles.infoLabel}>Company Mail</Text>
              {isEditing ? (
                <TextInput
                  style={
                    isEditing
                      ? [styles.infoValue]
                      : styles.infoValue
                  }
                  value={email}
                  // onChangeText={setEmail}
                  onChangeText={handleEmail}
                />
              ) : (
                <Text style={styles.infoValue}>{profile?.email}</Text>
              )}
            </View>
          </TouchableOpacity>
          {isErrorEmail && (
              <Text style={[{color: 'red', marginLeft: 20}]}>
                Please enter a valid Email address
              </Text>
            )}
          <TouchableOpacity style={styles.infoItem}>
            <View>
              <MaterialIcons
                name="local-phone"
                size={22}
                color={globalColors.skyBlue}
              />
            </View>
            <View>
              <Text style={styles.infoLabel}>Mobile</Text>
              {isEditing ? (
                <TextInput
                  style={
                    isEditing
                      ? [styles.infoValue]
                      : styles.infoValue
                  }
                  value={phoneNo}
                  maxLength={10}
                  keyboardType="number-pad"
                  onChangeText={setPhoneNo}
                />
              ) : (
                <Text style={styles.infoValue}>{profile?.user_otherdetails?.alternative_phone}</Text>
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoItem}>
            <View>
              <FontAwesome
                name="birthday-cake"
                size={22}
                color={globalColors.skyBlue}
              />
            </View>
            <View>
              <Text style={styles.infoLabel}>Date of Birth</Text>

              {isEditing ? (
                <TouchableOpacity
                  style={[
                    styles.datePickerStyle,
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    },
                  ]}
                  onPress={() => setFormOpen(true)}>
                  <Text style={{color: '#000'}}>
                    {moment(Dateofbirth).format('DD/MM/YYYY')}
                  </Text>
                  <Calendar
                    name="calendar"
                    size={25}
                    color="#626ed4"
                   
                  />
                </TouchableOpacity>
              ) : (
                <Text style={styles.infoValue}>{profile?.birth_date}</Text>
              )}
            </View>

            <DatePickerModal
              locale="en"
              mode="single"
              visible={formopen}
              onDismiss={onFormDismiss}
              dates={Dateofbirth}
              onConfirm={onFormConfirm}
            />

            {/* <Text style={styles.infoValue}>{profile.birth_date}</Text> */}
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoItem}>
            <View>
              <FontAwesome
                name="address-card"
                size={22}
                color={globalColors.skyBlue}
              />
            </View>
            <View>
              <Text style={styles.infoLabel}>Address</Text>
              {isEditing ? (
                <TextInput
                  style={
                    isEditing
                      ? [styles.infoValue,{marginRight:5}]
                      : styles.infoValue
                  }
                  value={address}
                  onChangeText={setAddress}
                  multiline={true}
                />
              ) : (
                <Text style={[styles.infoValue,{marginRight:5}]}>{profile?.user_otherdetails?.address}</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>

        {isEditing ? (
          <TouchableOpacity style={styles.editButton} onPress={updateProfile}>
            <Text style={styles.editButtonText}>Update Profile</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditProfile}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
    borderRadius: 60,
    backgroundColor: globalColors.Orange,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: globalColors.darkBlue,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 18,
    color: '#888',
    marginTop: 5,
  },
  infoSection: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  infoItem: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 15,
    marginTop: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: globalColors.grey,
    marginHorizontal:10
  },
  infoLabel: {
    fontSize: 16,
    color: '#888',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bio: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  },
  editButton: {
    backgroundColor: '#3498db',
    marginHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  datePickerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
  },
});
export default Profile;
