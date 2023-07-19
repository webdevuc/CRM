import React from 'react';
import {StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './src/Screens/LoginScreen';
import Dashboard from './src/Screens/Dashboard';
import DrawerNav from './src/Screens/DrawerNav';
import AddLeave from './src/Screens/AddLeave';
import SplashScreen from './src/Screens/SplashScreen';
import {Provider as StoreProvider} from 'react-redux';
import { persistor, store } from './src/store/store';
import {PersistGate} from 'redux-persist/integration/react';



const StackApp = createNativeStackNavigator();
const navOptionHandler = () => ({
  headerShown: false,
});

function App() {
  return (
    <StoreProvider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <StackApp.Navigator initialRouteName="SplashScreen">
            <StackApp.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={navOptionHandler}
            />

            <StackApp.Screen
              name="Login"
              component={LoginScreen}
              options={navOptionHandler}
            />

            <StackApp.Screen
              name="Dashboard"
              component={Dashboard}
              options={navOptionHandler}
            />
            <StackApp.Screen
              name="DrawerNav"
              component={DrawerNav}
              options={navOptionHandler}
            />
            <StackApp.Screen
              name="AddLeave"
              component={AddLeave}
              options={{
                headerStyle: {
                  backgroundColor: '#191A48',
                },
                headerTintColor: '#fff',
              }}
            />
          </StackApp.Navigator>
        </NavigationContainer>
      </PersistGate>
    </StoreProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  space: {
    marginTop: 60,
  },
  titile: {
    color: 'white',
    textAlign: 'center',
  },
  leftContent: {
    flexDirection: 'column',
    color: 'white',
  },
});
