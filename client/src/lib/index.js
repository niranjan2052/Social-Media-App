import http from "../http";

export const loginCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await http.post("auth/login", userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
};

export const inStorage = (key, value, remember = false) => {
  remember
    ? localStorage.setItem(key, value)
    : sessionStorage.setItem(key, value);
};

export const fromStorage = (key) => {
  return localStorage.getItem(key) || sessionStorage.getItem(key);
};

export const removeStorage = (key) => {
  localStorage.removeItem(key);
  sessionStorage.removeItem(key);
};
