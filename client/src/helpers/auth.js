import cookie from "js-cookie";

// import { GoogleLogout } from 'react-google-login';

export const setCookie = (key, value, rememberMe) => {
  if (window !== "undefined") {
    if (rememberMe) {
      cookie.set(key, value, {
        // 1 Day
        expires: 1,
      });
    } else {
      cookie.set(key, value);
    }
  }
};
// remove from cookie
export const removeCookie = (key) => {
  if (window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

// Get from cookie such as stored token
// Will be useful when we need to make request to server with token
export const getCookie = (key) => {
  if (window !== "undefined") {
    return cookie.get(key);
  }
};

// Set in localstorage
export const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// Remove from localstorage
export const removeLocalStorage = (key) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};

// Auth enticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, rememberMe = false) => {
  setCookie("token", response, rememberMe);
};

// Access user info from localstorage
export const isAuth = () => {
  if (window !== "undefined") {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      return true;
    } else {
      return false;
    }
  }
};

export const logout = (next) => {
  removeCookie("token");
  next();
};
