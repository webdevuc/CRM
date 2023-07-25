import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  BackHandler,
  ScrollView,
} from 'react-native';
import {
  Title,
} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import { dashboradData } from '../actions/UserActions';
import { globalColors } from '../theme/globalColors';
import reactotron from 'reactotron-react-native';



function Dashboard() {

  dispatch = useDispatch()

  const token = useSelector(state => state?.user?.data?.data?.token);
  const dash = useSelector(state => state?.dash?.data?.data)

  const UserID = useSelector(
    state => state?.user?.data?.data?.user?.id,
  );

    reactotron.log("dash -------->",dash)

  const resData = async () =>{
   await dispatch(dashboradData(token,UserID))
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
      <ScrollView>
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
        <View style={[styles.leftCardSection, {backgroundColor:globalColors.skyBlue}]}>
          <FontAwesome name="money" size={40} color="white" />
        </View>
        <View style={[styles.rightCardSection, {backgroundColor: globalColors.darkBlue}]}>
          <Title style={styles.title}>{dash?.billable_hrs}</Title>
          <Title style={styles.ContentText}>Billable Hours</Title>
        </View>
      </View>
      <View style={styles.cardstyle}>
        {/* {dash?.pendingLeave?.length > 0 && ( */}
          <>
            <View
              style={[styles.leftCardSection, {backgroundColor: globalColors.yellowDark}]}>
              <MaterialIcons name="pending-actions" size={40} color="white" />
            </View>
            <View
              style={[styles.rightCardSection, {backgroundColor: globalColors.yellowDark1}]}>
              <Title style={styles.title}>{dash?.pending_leaves}</Title>
              <Title style={styles.ContentText}>Pending Leaves</Title>
            </View>
          </>
        {/* )} */}
      </View>

      <View style={styles.cardstyle}>
        <View style={[styles.leftCardSection, {backgroundColor: globalColors.lightGreen}]}>
          <MaterialIcons name="time-to-leave" size={40} color="white" />
        </View>
        <View style={[styles.rightCardSection, {backgroundColor: globalColors.darkGreen}]}>
          <Title style={styles.title}>{dash?.taken_leaves}</Title>
          <Title style={styles.ContentText}>Taken Leaves</Title>
        </View>
      </View>

      <View style={styles.cardstyle}>
        <View style={[styles.leftCardSection, {backgroundColor: globalColors.skyBlue}]}>
          <MaterialIcons name="cake" size={40} color="white" />
        </View>
        <View style={[styles.rightCardSection, {backgroundColor: globalColors.darkBlue}]}>
          <Title style={styles.title}>{dash?.todays_birthdays}</Title>
          <Title style={styles.ContentText}>Today's Birthday</Title>
        </View>
      </View>

      <View style={styles.cardstyle}>
        <View style={[styles.leftCardSection, {backgroundColor: globalColors.yellowDark}]}>
          <MaterialIcons name="work" size={40} color="white" />
        </View>
        <View style={[styles.rightCardSection, {backgroundColor:globalColors.yellowDark1}]}>
          <Title style={styles.title}>{dash?.todays_workanniversary}</Title>
          <Title style={styles.ContentText}>Today's Work Anniversary</Title>
        </View>
      </View>

      <View style={styles.cardstyle}>
        <View style={[styles.leftCardSection, {backgroundColor: globalColors.lightGreen}]}>
          <MaterialIcons name="time-to-leave" size={40} color="white" />
        </View>
        <View style={[styles.rightCardSection, {backgroundColor: globalColors.darkGreen}]}>
          <Title style={styles.title}>{dash?.upcoming_holidays}</Title>
          <Title style={styles.ContentText}>Upcoming Holiday's</Title>
        </View>
      </View>
      </ScrollView>
    </View>
  );
}

export default Dashboard;

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 20,
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
    paddingVertical: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  rightCardSection: {
    width: '70%',
    paddingLeft: 20,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
});
