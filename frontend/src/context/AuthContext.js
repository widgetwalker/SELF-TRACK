import React from 'react';

const AuthContext = React.createContext({
  auth: null,
  setAuth: () => {},
  handleLogin: () => {},
  handleLogout: () => {}
});

export default AuthContext;
