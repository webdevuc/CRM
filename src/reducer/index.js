

import { combineReducers } from "redux";
import { dashboardReducer, getLeaveReducer, userLoginReducer } from "./UserReducer";


export const rootReducer = combineReducers({
    user : userLoginReducer,
    dash : dashboardReducer,
    leave: getLeaveReducer
})