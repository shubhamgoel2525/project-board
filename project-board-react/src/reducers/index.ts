import { combineReducers } from "redux";

import errorsReducer from "./errorsReducer";
import projectTasksReducer from "./projectTasksReducer";

export default combineReducers({
  errors: errorsReducer,
  projectTask: projectTasksReducer,
});
