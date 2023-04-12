import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

// Initial authentication state
const initialAuthState = {
  isLoggedIn: false,
  token: null,
  username: null,
  userId: null,
};

// Create the provider
export function AuthProvider(props) {
  const [authState, setAuthState] = useState(initialAuthState);

  // For the first time the app is rendered
  // it should check whether the token exists in localStorage
  useEffect(() => {
    const storedAuthState = JSON.parse(localStorage.getItem("authState"));
    if (storedAuthState && storedAuthState.isLoggedIn) {
      setAuthState(storedAuthState);
    }
  }, []);

  // Login function, update the authState with the new token
  const login = (authState) => {
    setAuthState(authState);
    localStorage.setItem("authState", JSON.stringify(authState));
  };

  // Logout function, remove the current authState
  const logout = () => {
    setAuthState(initialAuthState);
    localStorage.removeItem("authState");
  };

  // Define the authContext
  const authContext = {
    isLoggedIn: authState.isLoggedIn,
    token: authState.token,
    username: authState.username,
    userId: authState.userId,
    login: login,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
