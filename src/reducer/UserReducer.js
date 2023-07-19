import {
    CLEAR_STORE,

    GET_DASHBOARD_ERROR,
    GET_DASHBOARD_REQUEST,
    GET_DASHBOARD_SUCCESS,

    GET_LEAVE_ERROR,
    GET_LEAVE_REQUEST,
    GET_LEAVE_SUCCESS,

    GET_PROFILE_ERROR,
    GET_PROFILE_REQUEST,
    GET_PROFILE_SUCCESS,

    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
  } from '../constants/UserConstants';
  
  export const userLoginReducer = (
    state = {
      loading: false,
      data: {},
    },
    {payload, type},
  ) => {
    switch (type) {
      case USER_LOGIN_REQUEST:
        return {...state, loading: true};
      case USER_LOGIN_SUCCESS:
        return {...state, loading: false, data: payload};
      case USER_LOGIN_FAIL:
        return {...state, loading: false};
  
      case CLEAR_STORE:
        return {
          ...state,
          data: {},
        };
  
      default:
        return state;
    }
  };


  export const dashboardReducer = (
    state = {
      loading:false,
      data:{},
    },
    {payload, type}
  ) => {
    switch(type){
      case GET_DASHBOARD_REQUEST:
        return {...state, loading:true};
      case GET_DASHBOARD_SUCCESS:
        return {...state, loading:false, data:payload};
      case GET_DASHBOARD_ERROR:
        return {...state, loading:false}  
        
        default:
          return state;
    }
  }


  export const getLeaveReducer = (
    state = {
      loading:false,
      data:{},
    },
    {payload, type}
  ) => {
    switch(type){
      case GET_LEAVE_REQUEST:
        return {...state, loading:true};
      case GET_LEAVE_SUCCESS:
        return {...state, loading:false, data:payload};
      case GET_LEAVE_ERROR:
        return {...state, loading:false}  
        
        default:
          return state;
    }
  }


  export const getProfileReducer = (
    state = {
      loading:false,
      data:{},
    },
    {payload, type}
  ) => {
    switch(type){
      case GET_PROFILE_REQUEST:
        return {...state, loading:true};
      case GET_PROFILE_SUCCESS:
        return {...state, loading:false, data:payload};
      case GET_PROFILE_ERROR:
        return {...state, loading:false}  
        
        default:
          return state;
    }
  }