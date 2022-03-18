import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};
const middleware = [thunk];
const REDUX_DEV_TOOLS =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

let store;

if (
  window.navigator.userAgent.includes("Chrome") ||
  window.navigator.userAgent.includes("Firefox")
) {
  store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), REDUX_DEV_TOOLS)
  );
} else {
  store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware))
  );
}

export default store;
