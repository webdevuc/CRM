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
  
    const profile = useSelector(state=> state?.profile?.data?.data?.user_data)
  
    reactotron.log("get data from useSelector----->",profile)
  
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
  
    const getProfile = async () => {
      const res = await dispatch(profileData(token,UserID));
  
      // const userData = res?.data?.user_data;
      if (profile) {
        const {first_name, middle_name, last_name} = profile;
        const name = `${first_name} ${middle_name} ${last_name}`;
  
        setName(name);
        setCompanyId(profile.employee_id);
        setEmail(profile.email);
        setAddress(profile.address);
        setPhoneNo(profile.phone);
        setDesignation(profile.designation);
        setFormDate(new Date(profile.birth_date));
        setRole(profile.role);
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
            <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('../Assets/logo.png')}
            style={styles.profilePic}
          />
          <Text style={styles.username}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
        </View>
        <View style={styles.infoSection}>
          <TouchableOpacity style={styles.infoItem}>
            <Text style={styles.infoLabel}>Posts</Text>
            <Text style={styles.infoValue}>320</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoItem}>
            <Text style={styles.infoLabel}>Followers</Text>
            <Text style={styles.infoValue}>5.2k</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoItem}>
            <Text style={styles.infoLabel}>Following</Text>
            <Text style={styles.infoValue}>489</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bio}>
          <Text style={styles.bioText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed venenatis
            ligula eu nisi venenatis, vel gravida ligula hendrerit.
          </Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
            </Surface>
          </ThemeProvider>
        </ScrollView>
      </Provider>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      alignItems: 'center',
      marginTop: 40,
    },
    profilePic: {
      width: 120,
      height: 120,
      borderRadius: 60,
    },
    username: {
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 10,
    },
    email: {
      fontSize: 16,
      color: '#888',
      marginTop: 5,
    },
    infoSection: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
    },
    infoItem: {
      alignItems: 'center',
    },
    infoLabel: {
      fontSize: 16,
      color: '#888',
    },
    infoValue: {
      fontSize: 20,
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
      marginTop: 20,
    },
    editButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  export default Profile;
  