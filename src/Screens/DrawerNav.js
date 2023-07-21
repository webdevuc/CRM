import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
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
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Profile from './Profile';
import Leaves from './Leaves';
import Dashboard from './Dashboard';
import SideMenu from './SideMenu';
import { globalColors } from '../theme/globalColors';

const Drawer = createDrawerNavigator();

function DrawerNav() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerRight: () => (
          <Image
            style={{
              width: 40,
              height: 30,
              marginRight: 10,
            }}
            source={require('../Assets/WalstarLogo-01.png')}
          />
        ),
      }}
      initialRouteName="Dashboard"
      drawerContent={props => <SideMenu {...props} />}>
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          drawerLabel: 'Dashboard',
          headerTintColor: globalColors.white,
          headerStyle: {
            backgroundColor:globalColors.drawerColor,
          },
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerLabel: 'Profile',
          headerTintColor: globalColors.white,
          headerStyle: {
            backgroundColor: globalColors.drawerColor,
          },
        }}
      />

      <Drawer.Screen
        name="Leaves"
        component={Leaves}
        options={{
          drawerLabel: 'Leaves',
          headerTintColor: globalColors.white,
          headerStyle: {
            backgroundColor: globalColors.drawerColor,
          },
        }}
      />
    </Drawer.Navigator>
  );
}
export default DrawerNav;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //borderRadius: moderateScale(40),
  },
  imageBackground: {
    width: '100%',
    //height: moderateScale(98),
  },
  profilePicView: {
    // borderRadius: moderateScale(50),
    // borderWidth: moderateScale(4),
    borderColor: 'white',
    alignSelf: 'center',
    //marginTop: moderateScale(-45.5),
  },
  profileImage: {
    // height: moderateScale(90),
    // width: moderateScale(95),
    // borderRadius:
    //   Platform.OS == 'ios' ? moderateScale(45.5) : moderateScale(91),
    // resizeMode: 'contain',
  },
  menuCamera: {
    // height: moderateScale(34),
    // width: moderateScale(34),
    resizeMode: 'contain',
    position: 'absolute',
    top: 0,
    // right: moderateScale(-10),
  },
  nameStyles: {
    textAlign: 'center',
    // fontSize: moderateScale(18),
    // marginBottom: moderateScale(20),
  },
  rowView: {
    flexDirection: 'row',
    // marginHorizontal: moderateScale(20),
    // marginVertical: moderateScale(10),
    alignItems: 'center',
  },
  icon: {
    // height: moderateScale(20),
    // width: moderateScale(20),
    resizeMode: 'contain',
    //tintColor: colors.FONT_COLOR,
  },
  notificationView: {
    // backgroundColor: colors.PRIMARY,
    // borderRadius: moderateScale(11),
    // marginLeft: moderateScale(10),
  },
  notificationText: {
    // fontSize: moderateScale(12),
    // color: 'white',
    // padding: moderateScale(2),
  },
  txtTitle: {
    // fontSize: moderateScale(15),
    // marginStart: moderateScale(20),
  },
});
