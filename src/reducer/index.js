

import { combineReducers } from "redux";
import { dashboardReducer, getLeaveReducer, getProfileReducer, userLoginReducer } from "./UserReducer";


export const rootReducer = combineReducers({
    user : userLoginReducer,
    dash : dashboardReducer,
    leave: getLeaveReducer,
    profile:getProfileReducer
})