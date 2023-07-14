import React, {useEffect, useState, useCallback} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Alert,
  Dimensions,
  // Button,
  BackHandler,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Avatar,
  Card,
  Title,
  Paragraph,
  Divider,
  DataTable,
  Button,
  Searchbar,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import SearchIcon from '../Assets/Search.png';
import {DatePickerModal} from 'react-native-paper-dates';
import moment from 'moment';
import GetByFetch from '../Helper/GetByFetch';
import reactotron from 'reactotron-react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

function Leaves({navigation}) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [formDate, setFormDate] = useState(new Date());
  const [formopen, setFormOpen] = useState(false);


  const [leave,setLeave] = useState([]);

  const onChangeSearch = query => setSearchQuery(query);
  const onPressLearnMore = () => {
    navigation.navigate('AddLeave');
  };

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onFormDismiss = useCallback(() => {
    setFormOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    params => {
      setDate(params.date);
      setOpen(false);
    },
    [setOpen, setDate],
  );

  const onFormConfirm = useCallback(params => {
    setFormOpen(false);
    // setFormDate(params.dates);
    setFormDate(params.date);
    console.log('[on-change-multi]', params);
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

  const getLeaveApi = async () => {
 
    const currentUserID = await AsyncStorage.getItem('user_id');
    const token = await AsyncStorage.getItem('user_token');
    const resToken = JSON.parse(token)
    const resposone = await axios.get(
      `http://staging.walstartechnologies.com/api/Getleaves/${currentUserID}`,
      {
        headers: {
          Authorization: `Bearer ${resToken}`,
        },
      },
    );
    reactotron.log("resposone---------->",resposone?.data?.leave)
    setLeave(resposone?.data?.leave)

  };

  useEffect(() => {
    getLeaveApi();
  }, []);

  const leavesArray = [
    {
      id: 1,
      leaveType: 'Medical leave',
      date: '23/07/2023',
      days: 1,
    },
    {
      id: 2,
      leaveType: 'Causual leave',
      date: '12/07/2023',
      days: 1,
    },
    {
      id: 3,
      leaveType: 'Causual leave',
      date: '13/07/2023',
      days: 1,
    },
    {
      id: 4,
      leaveType: 'Sick leave',
      date: '18/08/2023',
      days: 1,
    },
  ];

  return (
    <View style={{height: '100%'}}>
      <View style={{flexDirection: 'row', alignSelf: 'flex-end', margin: 10}}>
        <View style={styles.searchBarView}>
          <View style={styles.centerStyles}>
            <Image source={SearchIcon} style={styles.searchIcon} />
          </View>

          <TextInput
            returnKeyType="done"
            // value={search}
            onChangeText={text => setSearch(text)}
            placeholder={'Search'}
            style={styles.searchInput}
          />
        </View>

        <View style={{marginTop: 10}}>
          <FontAwesome
            name={'plus-circle'}
            size={40}
            color={'#F58E5E'}
            onPress={onPressLearnMore}
          />
        </View>
      </View>
      <ScrollView>
        <View style={{paddingHorizontal: 20}}>
          <Title style={styles.titletext}>My Leaves</Title>
          <Divider style={styles.divider} />

          {leave.map((item, index) => (
            <Card style={styles.cardDesign} key={index}>
              <View style={styles.cardContent}>
                <Paragraph style={styles.subtext}>ID : </Paragraph>
                <Text style={styles.cardText}>{item.id}</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Paragraph style={styles.subtext}>Leave Type : </Paragraph>
                <Text style={styles.cardText}>{item.leaveType}</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Paragraph style={styles.subtext}>Leave Duration : </Paragraph>
                <Text style={styles.cardText}>{item.date}</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Paragraph style={styles.subtext}>No of Days : </Paragraph>
                <Text style={styles.cardText}>{item.totaltypecount}</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Paragraph style={styles.subtext}>Applied on : </Paragraph>
                <Text style={styles.cardText}></Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Paragraph style={styles.subtext}>Action: </Paragraph>
                <Text style={styles.cardText}></Text>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.cardButton}>
                <Title style={styles.pendingtext}>Pending</Title>
                <DatePickerModal
                  locale="en"
                  mode="single"
                  visible={open}
                  onDismiss={onDismissSingle}
                  date={date}
                  onConfirm={onConfirmSingle}
                />

                <DatePickerModal
                  locale="en"
                  mode="single"
                  visible={formopen}
                  onDismiss={onFormDismiss}
                  dates={formDate}
                  onConfirm={onFormConfirm}
                />
                {/* <Text style={styles.calendarimg2}><Icon name="calendar" size={30} color="black" /></Text> */}
              </View>

              {/* <TouchableOpacity
                   style={{
                     flexDirection: 'row',
                     justifyContent: 'space-between',
                     alignItems: 'center',
                     borderWidth: 1,
                     borderColor: 'black',
                     padding: 10,
                     borderRadius: 5,
                   }}
                   onPress={() => setFormOpen(true)}>
                   <Text>{moment(formDate).format('DD/MM/YYYY')}</Text>
                   <Icon
                     name="calendar"
                     size={25}
                     color="black"
                     style={{alignSelf: 'center'}}
                   />
              </TouchableOpacity> */}
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
export default Leaves;

const styles = StyleSheet.create({
  searchBarView: {
    marginHorizontal: 5,
    width: '85%',
    height: RFValue(40),
    borderWidth: 1,
    paddingHorizontal: RFValue(8),
    borderColor: 'grey',
    borderRadius: 5,
    marginVertical: RFValue(10),
    flexDirection: 'row',
  },

  centerStyles: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchIcon: {
    height: RFValue(14),
    tintColor: 'grey',
    width: RFValue(14),
  },

  searchbardiv: {
    marginRight: 10,
    width: width / 1.25,
    borderRadius: 30,
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  titletext: {
    fontSize: 20,
    color: '#191A48',
    fontWeight: '500',
  },
  subtext: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  pendingtext: {
    backgroundColor: '#FFC000',
    fontSize: 15,
    color: '#fff',
    paddingHorizontal: 25,
    paddingVertical: 1,
    borderRadius: 20,
  },
  buttonStyle: {
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: '#E87717',
    borderColor: '#626ed4',
  },

  cardDesign: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 15,
  },

  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  cardText: {
    textAlign: 'center',
    fontSize: 15,
    color: 'black',
  },
  cardButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },

  // calendarimg2: {
  //   marginTop: 20,
  //   marginLeft: 120

  // },
  // titletext: {
  //   fontSize: 20,
  // },

  // btnstyle: {
  //   width: '50%',
  //   height: '100%',
  // },
  // addBtn: {
  //   borderRadius: 5,
  //   height: 40,
  //   alignSelf: 'flex-end',
  //   width: '20%',
  //   textAlign: 'center',
  //   // justifyContent: 'center',
  //   // alignItems: 'center',
  //   // paddingTop: 10,
  //   // marginTop: 20,
  //   backgroundColor: '#008080',
  //   marginRight: 16,
  //   marginBottom: 20,

  // },
  // addText: {
  //   color: 'white',
  //   textAlign: 'right',
  //   fontWeight: 'bold',
  // },
  // searchbardiv: {
  //   height: 40,
  //   fontSize: 20,
  //   alignContent: 'flex-end',
  //   marginTop: 20,
  //   marginLeft: 180,
  //   marginRight: 10,
  //   borderColor: '1px solid green'
  // },
  // divider: {
  //   borderBottomColor: "black",
  //   borderBottomWidth: 1,
  //   marginTop: 10,
  //   marginBottom: 10,
  // },
});
