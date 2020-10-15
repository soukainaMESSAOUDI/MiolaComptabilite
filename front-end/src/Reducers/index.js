import { combineReducers } from "redux";
import errorReducer from "./ErrorReducer";
import securityReducer from "./SecurityReducer";

export default combineReducers({
  errors: errorReducer,
  security: securityReducer
});