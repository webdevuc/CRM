import React, { useState, useEffect ,useCallback} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';


import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  ScrollView,
  PermissionsAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userLogout } from '../actions/UserActions';
import { useDispatch, useSelector } from 'react-redux';

export const MENU_INDIVIDUAL = [
  {
    id: 1,
    title: 'Dashboard',
    icon:"dashboard",
    onPressScreen: 'Dashboard'
  },
  {
    id: 2,
    title: 'Profile',
    icon:"person",
    onPressScreen: 'Profile'
  },
  {
    id: 3,
    title: 'Leaves',
    icon:"pending-actions",
    onPressScreen: 'Leaves'
  },
  {
    id: 4,
    title: 'Monthy Salary Slip',
    icon:"file-download",
    onPressScreen: 'Profile'
  },
  {
    id: 5,
    title: 'Employee Status',
    icon:"insert-drive-file",
    onPressScreen: 'Leaves'
  },
  {
    id: 4,
    title: 'Logout',
    icon:"exit-to-app",
    onPressScreen: 'Logout'
  }
]
export default function SideMenu({ navigation }) {

  const token = useSelector(state => state?.user?.data?.data?.token);

  const dispatch = useDispatch();
  const [name,setName]=useState('')
  const getUserName = useCallback(async() => {
    try {
   const currentUserName =await AsyncStorage.getItem('user_name')
   setName(currentUserName)
 } catch(e) {
   // save error
   console.log('SideMenu e.',e)
 }  
}, []);

useEffect(() => { 
 getUserName();
}, []);


  const handleClick = async source => {
    if (source.onPressScreen === 'Logout') {   
        dispatch(userLogout(navigation))
    } else {
      navigation.navigate(source.onPressScreen);
    }
  };

  const renderItem = (source, index) => {
    return (
      <TouchableOpacity
        key={source.id}
        style={styles.rowView}
        onPress={() => handleClick(source)}>
  
        {source.icon==='person'?
         <MaterialIcons 
          name={source.icon} 
          size={30} 
          color={source.onPressScreen == 'Logout' ? '#F58E5E':"#191A48"} 
          style={{ textAlign: 'left' }} 
         />
        :       
         <MaterialIcons 
            name={source.icon} 
            size={30} 
            color={source.onPressScreen == 'Logout' ? '#F58E5E':"#191A48"} 
            style={{ textAlign: 'left' }} 
         />
        }
        <Text
          style={[
            styles.txtTitle,
            source.onPressScreen == 'Logout' ? { color: '#F58E5E' } : {color:'#191A48'},
          ]}>
          {source.title}
        </Text>
        {source.title == 'Notifications' && (
          <View style={styles.notificationView}>
            <Text>
              {NDate ? NDate.length : 0}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../Assets/bg.png')}
        resizeMode={'stretch'}
        style={styles.imageBackground}
      />
      <SafeAreaView />
      <View style={styles.profilePicView}>
        <Image
          style={styles.profileImage}
          source={require('../Assets/logo.png')}
          defaultSource={require('../Assets/logo.png')}
        />
      </View>
      <Text style={styles.empName}>{name}</Text>
      <ScrollView>
        {MENU_INDIVIDUAL.map((source, index) => {
          return renderItem(source, index);
        })}
      </ScrollView>
    </View>
  )
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
  },
  empName:{
    fontSize:23,textAlign:'center',margin:10,fontWeight:'700',color:'#191A48',
    marginVertical:15
  },
  imageBackground: {
    width: '100%',
    height: '50%',
  },
  profileImage: {
    height: 95,
    width: 95,
    borderRadius: 50,
  },
  profilePicView: {
    borderRadius: (50),
    borderWidth: 3,
    borderColor: '#E87717',
    alignSelf: 'center',
    marginTop: '-80%',
  },
  rowView: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 12,
    alignItems: 'center',
  },
  txtTitle: {
    fontSize:17,
    fontWeight:'bold',
    marginStart:20,
  }
})