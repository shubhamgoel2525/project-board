import { GET_ERRORS } from "../actions/types";

const initialState = {};

// TODO: Fix any type
function errorReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;

    default:
      return state;
  }
}

export default errorReducer;
