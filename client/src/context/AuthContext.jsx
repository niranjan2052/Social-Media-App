import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import { fromStorage } from "../lib";
const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
};
const USER_IN_STORAGE = fromStorage("user");
const REAL_INITIAL_VALUE = USER_IN_STORAGE ? USER_IN_STORAGE : INITIAL_STATE;
export const AuthContext = createContext(REAL_INITIAL_VALUE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
