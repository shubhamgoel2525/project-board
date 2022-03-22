import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

const initialState = {};
const middleware = [thunk];
const REDUX_DEV_TOOLS =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const isChromeOrFirefox =
  window.navigator.userAgent.includes("Chrome") ||
  window.navigator.userAgent.includes("Firefox");

const store = createStore(
  rootReducer,
  initialState,
  isChromeOrFirefox
    ? compose(applyMiddleware(...middleware), REDUX_DEV_TOOLS)
    : compose(applyMiddleware(...middleware))
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
