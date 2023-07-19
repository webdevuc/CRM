/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */

import React, {useEffect, useCallback, useState} from 'react';
import {
  View,
  ScrollView,
  Row,
  Col,
  Text,
  StyleSheet,
  Image,
  Alert,
  BackHandler,
} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Divider,
  DataTable,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetByFetch from '../Helper/GetByFetch';
import reactotron from 'reactotron-react-native';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { dashboradData } from '../actions/UserActions';

// const EmployeeID = useSelector(state => state?.user?.data?._j?.data?.user?.employee_id);

function Dashboard({navigation}) {

  dispatch = useDispatch()

  const token = useSelector(state => state?.user?.data?.data?.token);

  const EmployeeID = useSelector(
    state => state?.user?.data?.data?.user?.employee_id,
  );

  const [dashboardData, setDashboardData] = useState([
    {
      billableHrs: 0,
      availableHrs: 0,
    },
  ]);
  const [pendingLeave, setPendingLeave] = useState([]);

  const resData = async () =>{
    const response = await dispatch(dashboradData(token,EmployeeID))
    setDashboardData(response?.data)
    setPendingLeave(response?.data?.pendingLeave);
  }


  useEffect(() =>  {
    resData();
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
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
        <Text
          style={{
            fontSize: 20,
            marginVertical: 15,
            fontWeight: 'bold',
            color: '#f67e16',
          }}>
          Welcome to Dashboard
        </Text>
        <Image
          resizeMode="contain"
          style={[styles.logoImage, {marginBottom: 20}]}
          source={require('../Assets/title-divider.png')}
        />
      </View>
      <View style={styles.cardstyle}>
        <View style={[styles.leftCardSection, {backgroundColor: '#5D9CEC'}]}>
          <FontAwesome name="money" size={40} color="white" />
        </View>
        <View style={[styles.rightCardSection, {backgroundColor: '#2F80E7'}]}>
          <Title style={styles.title}>{dashboardData?.billableHrs}</Title>
          <Title style={styles.ContentText}>Billable Hours</Title>
        </View>
      </View>
      <View style={styles.cardstyle}>
        <View style={[styles.leftCardSection, {backgroundColor: '#37BC9B'}]}>
          <MaterialIcons name="event-available" size={60} color="white" />
        </View>
        <View style={[styles.rightCardSection, {backgroundColor: '#2B957A'}]}>
          <Title style={styles.title}>{dashboardData?.availableHrs}</Title>
          <Title style={styles.ContentText}>Available Hours</Title>
        </View>
      </View>
      <View style={styles.cardstyle}>
        {pendingLeave?.length > 0 && (
          <>
            <View
              style={[styles.leftCardSection, {backgroundColor: '#D9AF30'}]}>
              <MaterialIcons name="pending-actions" size={50} color="white" />
            </View>
            <View
              style={[styles.rightCardSection, {backgroundColor: '#B08D2A'}]}>
              <Title style={styles.title}>{pendingLeave[0].pendingCount}</Title>
              <Title style={styles.ContentText}>Pending Leaves</Title>
            </View>
          </>
        )}
      </View>
 
    </View>
  );
}

export default Dashboard;

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 30,
  },
  cardstyle: {
    flexDirection: 'row',
    margin: 10,
  },
  ContentText: {
    color: 'white',
    fontSize: 20,
  },
  leftCardSection: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 25,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  rightCardSection: {
    width: '70%',
    paddingLeft: 20,
    paddingVertical: 25,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
});
