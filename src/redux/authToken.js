// src/redux/authToken.js

// 1. THESE KEYS MUST MATCH YOUR BROWSER SCREENSHOT
const TOKEN_KEY = "token";
const USER_KEY = "user";

// 2. SAVE (Used by Login)
export const setAuthToken = (data) => {
  if (!data) return;

  // Handle if data is just the token string
  if (typeof data === "string") {
    localStorage.setItem(TOKEN_KEY, data);
  } 
  // Handle if data is the full object (token + user details)
  else if (typeof data === "object") {
    const { token, ...user } = data;
    
    // Save Token
    if (token) localStorage.setItem(TOKEN_KEY, token);
    
    // Save User Details
    if (user && Object.keys(user).length > 0) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }
};

// 3. GET (Used by Axios)
export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// 4. CLEAR (Used by Logout)
export const clearAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

// 5. GET USER (Used by Sidebar to show name)
export const getUserDetails = () => {
  const userStr = localStorage.getItem(USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
};