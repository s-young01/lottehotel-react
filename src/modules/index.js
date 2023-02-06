import { combineReducers } from "redux";
import logincheck from "./logincheck";
import special from "./special";

// 루트 리듀서
const rootReducer = combineReducers({special, logincheck});
export default rootReducer;