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
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
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
import { profileData, updateProfileData } from '../actions/UserActions';

function Profile({navigation}) {
  const token = useSelector(state => state?.user?.data?.data?.token);

  const UserID = useSelector(state => state?.user?.data?.data?.user?.id);

  const [nightMode, setNightmode] = useState(false);

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

  // useEffect(() => {
  //   getProfileData();
  // }, []);

  // const getProfileData = async () => {
  //   try {
  //     const res = await axios.get(`${baseURL}GetUserData/${UserID}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     reactotron.log('get profile data------>', res?.data?.user_data);

  //     const userData = res?.data?.user_data;
  //     if (userData) {
  //       const {first_name, middle_name, last_name} = userData;
  //       const name = `${first_name} ${middle_name} ${last_name}`;

  //       setName(name);
  //       setCompanyId(userData.employee_id);
  //       setEmail(userData.email);
  //       setAddress(userData.address);
  //       setPhoneNo(userData.phone);
  //       setDesignation(userData.designation);
  //       setFormDate(new Date(userData.birth_date));
  //       setRole(userData.role);
  //     }
  //   } catch (error) {
  //     // Handle any errors
  //   }
  // };

  const getProfile = async () => {
    const res = await dispatch(profileData(token,UserID));

    const userData = res?.data?.user_data;
    if (userData) {
      const {first_name, middle_name, last_name} = userData;
      const name = `${first_name} ${middle_name} ${last_name}`;

      setName(name);
      setCompanyId(userData.employee_id);
      setEmail(userData.email);
      setAddress(userData.address);
      setPhoneNo(userData.phone);
      setDesignation(userData.designation);
      setFormDate(new Date(userData.birth_date));
      setRole(userData.role);
    }

  }

  useEffect(()=>{
    getProfile();
  },[])

  const onFormDismiss = useCallback(() => {
    setFormOpen(false);
  }, [setOpen]);

  const onFormConfirm = React.useCallback(
    params => {
      console.log('fdfsdfsdfdsfs:-    ' + JSON.stringify(params));
      setFormOpen(false);
      setFormDate(params.date);
      // setRange({ startDate, endDate });
    },
    [setFormOpen, setFormDate],
  );

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

    const resposone = await dispatch(updateProfileData(token,UserID,payload))
    RNToasty.Success({
      title: resposone.data.message,
      position: 'bottom',
      duration:1
    });
    navigation.navigate('Dashboard');
  };

  return (
    <Provider theme={nightMode ? DarkTheme : DefaultTheme}>
      <ScrollView>
        <ThemeProvider theme={nightMode ? DarkTheme : DefaultTheme}>
          <Surface style={styles.containerStyle}>
            <SafeAreaView style={styles.safeContainerStyle}>
              <Text style={[styles.labelStyle, {marginTop: 10}]}>Name </Text>
              <TextInput
                // mode="flat"
                mode="outlined"
                size="small"
                label=""
                style={styles.inputStyle}
                value={name}
                onChangeText={value => setName(value)}
              />
              <View style={styles.spacerStyle} />
              <Text style={[styles.labelStyle]}>Designation </Text>
              <TextInput
                // mode="flat"
                mode="outlined"
                label=""
                style={styles.inputStyle}
                value={designation}
                onChangeText={value => setDesignation(value)}
              />
              <View style={styles.spacerStyle} />
              <Text style={[styles.labelStyle]}>Company Id </Text>
              <TextInput
                // mode="flat"
                mode="outlined"
                label=""
                style={styles.inputStyle}
                value={companyId}
                onChangeText={value => setCompanyId(value)}
              />
              <View style={styles.spacerStyle} />
              <Text style={[styles.labelStyle]}>Company Mail </Text>
              <TextInput
                // mode="flat"
                mode="outlined"
                label=""
                style={styles.inputStyle}
                value={email}
                onChangeText={value => setEmail(value)}
              />
              <View style={styles.spacerStyle} />
              <Text style={[styles.labelStyle]}>Phone Number </Text>
              <TextInput
                // mode="flat"
                mode="outlined"
                label=""
                phoneNumber={true}
                style={styles.inputStyle}
                value={phoneNo}
                onChangeText={value => setPhoneNo(value)}
              />

              <View style={styles.spacerStyle} />
              <Text style={[styles.labelStyle, {marginBottom: 10}]}>
                Date Of Birth{' '}
              </Text>
              <TouchableOpacity
                style={styles.datePickerStyle}
                onPress={() => setFormOpen(true)}>
                <Text style={{color: '#000'}}>
                  {moment(Dateofbirth).format('DD/MM/YYYY')}
                </Text>
                <Calendar
                  name="calendar"
                  size={25}
                  color="#626ed4"
                  style={{textAlign: 'left'}}
                />
              </TouchableOpacity>

              <Text style={[styles.labelStyle, {marginTop: 15}]}>Address </Text>
              <TextInput
                multiline
                // mode="flat"
                mode="outlined"
                label=""
                numberOfLines={5}
                style={{backgroundColor: 'white'}}
                value={address}
                onChangeText={value => setAddress(value)}
              />
              <View style={styles.buttonSection}>
                {/* <Button style={styles.closeButtonStyle} mode="contained" onPress={() => navigation.goBack()}>
                  <Text style={{ color: '#212529' }}>Close</Text>
                </Button> */}
                <Button
                  style={styles.addButtonStyle}
                  mode="contained"
                  onPress={updateProfile}>
                  Update
                </Button>
              </View>

              <DatePickerModal
                locale="en"
                mode="single"
                visible={formopen}
                onDismiss={onFormDismiss}
                dates={Dateofbirth}
                onConfirm={onFormConfirm}
              />
            </SafeAreaView>
          </Surface>
        </ThemeProvider>
      </ScrollView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  spacerStyle: {
    marginBottom: 20,
  },
  safeContainerStyle: {
    flex: 1,
    margin: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  addButtonStyle: {
    borderRadius: 20,
    backgroundColor: '#F58E5E',
    paddingHorizontal: 30,
    borderColor: '#F58E5E',
  },
  closeButtonStyle: {
    borderRadius: 5,
    backgroundColor: '#e9ecef',
    borderColor: '#e9ecef',
    marginRight: 15,
  },
  labelStyle: {
    fontSize: 18,
    color: '#5b626b',
    fontWeight: '400',
  },
  inputStyle: {
    // height:40,
    backgroundColor: 'transparent',
    color: '#5b626b',
  },
  datePickerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
  },
});
export default Profile;
