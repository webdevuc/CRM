import axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  CLEAR_STORE,
  GET_DASHBOARD_SUCCESS,
  GET_DASHBOARD_REQUEST,
  GET_DASHBOARD_ERROR,
  GET_LEAVE_REQUEST,
  GET_LEAVE_SUCCESS,
  GET_LEAVE_ERROR,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
} from '../constants/UserConstants';
import {baseURL} from '../utils/Api';
import {RNToasty} from 'react-native-toasty';
import reactotron from 'reactotron-react-native';



export const loginUser = (data, navigation,toast) => async dispatch =>{
  
  dispatch({type: USER_LOGIN_REQUEST});
  try {
    const res = await axios.post(`${baseURL}login`, data);
    dispatch({type: USER_LOGIN_SUCCESS, payload: res});
    toast.show("User logged in successfully");
    navigation.navigate('DrawerNav')
  } catch (e) {

    dispatch({type: USER_LOGIN_FAIL});
    toast.show("User logged in failed.");
  }
};


export const userLogout = (navigation) => async dispatch => {
    dispatch({type: CLEAR_STORE, payload: null});
    navigation.navigate('Login');
  };


export const dashboradData = (token,EmployeeID) => async dispatch => {
  dispatch({type: GET_DASHBOARD_REQUEST});
  try {
    const res = await axios.get(`${baseURL}GetDashboardData/${EmployeeID}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    dispatch({type: GET_DASHBOARD_SUCCESS, payload:res});
    return res;
  } catch (e) {
    dispatch({type: GET_DASHBOARD_ERROR, e});
  }
} 


export const leaveData = (token,UserID) => async dispatch => {
  dispatch({type: GET_LEAVE_REQUEST});
  try {
    const res = await axios.get(`${baseURL}Getleaves/${UserID}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    dispatch({type: GET_LEAVE_SUCCESS, payload:res});
    return res;
  } catch (e) {
    dispatch({type: GET_LEAVE_ERROR, e});
  }
} 


export const profileData = (token,UserID) => async dispatch => {
  dispatch({type: GET_PROFILE_REQUEST});
  try {
    const res = await axios.get(`${baseURL}GetUserData/${UserID}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    dispatch({type: GET_PROFILE_SUCCESS, payload:res});
    return res;
  } catch (e) {
    dispatch({type: GET_PROFILE_ERROR, e});
  }
} 

export const updateProfileData = (token,UserID,payload) => async dispatch => {

  dispatch({type: UPDATE_PROFILE_REQUEST});
  try {
    const res = await axios.post(`${baseURL}UpdateuserData/${UserID}`,payload ,{
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    dispatch({type: UPDATE_PROFILE_SUCCESS, payload:res});
    return res;
  } catch (e) {
    dispatch({type: UPDATE_PROFILE_ERROR, e});
  }
} 