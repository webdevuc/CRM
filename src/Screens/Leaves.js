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
import {useSelector} from 'react-redux';
import {leaveData} from '../actions/UserActions';
import {globalColors} from '../theme/globalColors';
import Icons from 'react-native-vector-icons/MaterialIcons';
import FilterModal from '../CommonComponents/FilterModal';

const {width, height} = Dimensions.get('window');

function Leaves({navigation}) {
  const token = useSelector(state => state?.user?.data?.data?.token);
  const UserID = useSelector(state => state?.user?.data?.data?.user?.id);

  const leave = useSelector(state => state.leave?.data?.data);

  reactotron.log('leave-------', leave);

  const [search, setSearch] = useState('');

  const [searchQuery, setSearchQuery] = React.useState('');
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [formDate, setFormDate] = useState(new Date());
  const [formopen, setFormOpen] = useState(false);
  const [filterModal, setFilterModal] = useState(false);

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
    await dispatch(leaveData(token, UserID));
  };

  useEffect(() => {
    getLeaveApi();
  }, []);

  const leavesArray = [
    {
      id: 1,
      leaveType: 'Medical leave',
      date: '23/07/2023 - 25/07/2023',
      days: 2,
      leaveStatus: 'Pending',
      reason: 'I am going out of station.',
    },
    {
      id: 2,
      leaveType: 'Causual leave',
      date: '12/07/2023',
      days: 1,
      leaveStatus: 'Approved',
      reason: 'I am going out of station.',
    },
    {
      id: 3,
      leaveType: 'Causual leave',
      date: '13/07/2023',
      days: 1,
      leaveStatus: 'Cancelled',
      reason: 'I am going out of station.',
    },
    {
      id: 4,
      leaveType: 'Sick leave',
      date: '18/08/2023',
      days: 1,
      leaveStatus: 'Approved',
      reason: 'I am going out of station.',
    },
  ];

  const results = leavesArray?.filter(post => {
    if (search === '') {
      return post;
    } else if (post.leaveType?.toLowerCase()?.includes(search?.toLowerCase())) {
      return post;
    }
  });

  reactotron.log('search result---->', results);

  const getLeaveStatusColor = status => {
    switch (status) {
      case 'Pending':
        return '#FFC000'; // Orange
      case 'Approved':
        return '#008000'; // Green
      case 'Cancelled':
      case 'Rejected':
        return '#FF0000'; // Red
      default:
        return '#000000'; // Black (Fallback color)
    }
  };


  const filterOptions = [
    {
      key: 'resource',
      rightText: 'Get Resource list',
    },
    {
      key: 'dates',
      rightText: 'Dates filter',
    },

    {
      key: 'status',
      rightText: 'Status',
    },
    {
      key: 'type',
      rightText: 'Leave type',
    },
    {
      key: 'office',
      rightText: 'office wise filter',
    },
  ];


  return (
    <View style={{height: '100%', backgroundColor: globalColors.white}}>
      <View style={{flexDirection: 'row', alignSelf: 'flex-end', margin: 10}}>
        <View style={styles.searchBarView}>
          <View style={styles.centerStyles}>
            <Image source={SearchIcon} style={styles.searchIcon} />
          </View>

          <TextInput
            returnKeyType="done"
            value={search}
            onChangeText={text => setSearch(text)}
            placeholder={'Search'}
            style={{width:'100%'}}
          />
        </View>

        <TouchableOpacity onPress={() => setFilterModal(true)}>
          <Icons
            style={styles.filterIcon}
            name="filter-list"
            size={33}
            color={globalColors.primaryTheme}
          />
        </TouchableOpacity>

        <View style={{marginTop: 10}}>
          <FontAwesome
            name={'plus-circle'}
            size={40}
            color={globalColors.Orange}
            onPress={onPressLearnMore}
          />
        </View>
      </View>
      <ScrollView>
        <View style={{paddingHorizontal: 20}}>
          <Title style={styles.titletext}>My Leaves</Title>
          <Divider style={styles.divider} />

          <View style={styles.cardstyle}>
            {results.map((item, index) => (
              <>
                <Card style={styles.cardDesign}>
                  <View style={[styles.firstRow]}>
                    <View>
                      <Text style={styles.leaveType}>{item.leaveType}</Text>
                    </View>

                    <View
                      style={[
                        styles.pendingtext,
                        {
                          backgroundColor: getLeaveStatusColor(
                            item.leaveStatus,
                          ),
                        },
                      ]}>
                      <MaterialIcons
                        name="pending-actions"
                        style={{color: globalColors.white}}
                        size={20}
                      />
                      <Text style={{color: globalColors.white}}>
                        {item.leaveStatus}
                      </Text>
                    </View>
                  </View>
                  {/* <Text>Leave Reason</Text> */}
                  <View style={[styles.secondRow]}>
                    <View style={styles.icon}>
                      <MaterialIcons
                        name="leave-bags-at-home"
                        size={20}
                        color="white"
                      />
                    </View>
                    <View style={{paddingLeft: 10}}>
                      <Text>Leave from :</Text>
                    </View>
                    <View>
                      <Text style={styles.textRight}> {item.date}</Text>
                    </View>
                  </View>
                  <View style={[styles.secondRow, {alignItems: 'center'}]}>
                    <View style={styles.icon}>
                      <MaterialIcons name="today" size={20} color="white" />
                    </View>
                    <View style={{paddingLeft: 10}}>
                      <Text>Days : {item.days}</Text>
                    </View>
                  </View>
                  <View style={{paddingVertical: 5}}>
                    <Text>{item.reason}</Text>
                  </View>
                  {/* { item.leaveStatus != 'Approved' && item.leaveStatus != 'Cancelled' ? 
                    <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Button mode="contained" style={styles.cancelButtonStyle}>
                      Cancel
                    </Button>
                    <Button
                      mode="contained"
                      style={[styles.editButtonStyle, {color: '#fff'}]}>
                      Edit
                    </Button>
                  </View> : ''
                  } */}
                </Card>
              </>
            ))}

            {results.length === 0 && search !== '' && (
              <View style={styles.noDataFoundContainer}>
                <Text style={styles.noDataFoundText}>No data found</Text>
              </View>
            )}
          </View>
          

          {/* {leavesArray.map((item, index) => (
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
              </View>
            </Card>
          ))} */}
        </View>
      </ScrollView>

      <FilterModal
        visible={filterModal}
        onRequestClose={() => setFilterModal(false)}
        filterOptions={filterOptions}
      />
      
    </View>
  );
}
export default Leaves;

const styles = StyleSheet.create({
  filterIcon: {
    paddingHorizontal: RFValue(5),
    paddingVertical: RFValue(2),
    marginTop: RFValue(12),
  },
  noDataFoundContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  noDataFoundText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
  icon: {
    backgroundColor: globalColors.darkBlue,
    borderRadius: 50,
    padding: 5,
  },
  textRight: {
    fontSize: 14,
    fontWeight: '600',
  },
  leaveType: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
  },
  cancelButtonStyle: {
    borderRadius: 5,
    backgroundColor: globalColors.Orange,
    borderColor: '#E9ECEF',
  },
  editButtonStyle: {
    backgroundColor: globalColors.skyBlue,
    borderColor: '#fff',
    borderRadius: 5,
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  secondRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginVertical: 5,
  },
  searchBarView: {
    marginHorizontal: 5,
    width: '75%',
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
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    flexDirection: 'row',
  },
  buttonStyle: {
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: '#E87717',
    borderColor: '#626ed4',
  },

  cardstyle: {
    marginBottom: 10,
  },

  cardDesign: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 15,
    elevation: 10,
    marginVertical: 5,
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
