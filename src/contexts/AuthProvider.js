
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

// Create a provider component
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);

  // Effect hook to check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth(true);
    }
  }, []);

  // Function to handle authentication changes
  const onAuth = (checked, token) => {
    setAuth(checked);
    if (checked) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  };

  // Context value
  const contextValue = {
    auth,
    onAuth,
  };

  // Provide the context value to the components in the tree
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// hook to use useContext
const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth };
