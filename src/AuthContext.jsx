import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
  
    useEffect(() => {
      const storedAccessToken = localStorage.getItem('accessToken');
  
      const checkToken = async (token) => {
        const tokenData = await isTokenValid(token);
        if (tokenData) {
          const temp = tokenData.user;
          temp.user_role = tokenData.user_role;
          setUser(temp);
          setAccessToken(storedAccessToken);
          setLoading(false); // Set loading to false after user is set
        } else {
          setLoading(false); // Set loading to false even if token is invalid
        }
      };
  
      if (storedAccessToken) {
        checkToken(storedAccessToken);
      } else {
        setLoading(false); // Set loading to false if no stored access token
      }
    }, []);
  
    const signin = async (user, accessToken) => {
      const tokenData = await isTokenValid(accessToken);
      if (tokenData) {
        const temp = tokenData.user;
        temp.user_role = tokenData.user_role;
        setUser(temp);
        setAccessToken(accessToken);
        localStorage.setItem('accessToken', accessToken);
      }
    };
  
    const signout = () => {
      setUser(null);
      setAccessToken(null);
      localStorage.removeItem('accessToken');
    };
  
    const isTokenValid = async (accessToken) => {
      if (!accessToken) {
        return null;
      }
      try {
        const tokenData = JSON.parse(atob(accessToken.split('.')[1]));
        const expirationTime = tokenData.exp * 1000;
        const currentTime = Date.now();
        if (expirationTime > currentTime) return tokenData;
      } catch (error) {
        console.error('Error decoding access token:', error);
        return null;
      }
    };
  
    return (
      <AuthContext.Provider value={{ user, accessToken, loading, signin, signout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  

export const useAuth = () => useContext(AuthContext);
