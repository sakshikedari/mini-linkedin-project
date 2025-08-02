// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateUser = async ({ bio }) => {
  try {
    const res = await axios.patch('/users/update', { bio });
    console.log('Updated user:', res.data.user); 
    setUser(res.data.user); 
  } catch (error) {
    console.error('Bio update failed:', error);
  }
};

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await axios.get('/profile');
        setUser(res.data.user || res.data);
      } catch (err) {
        console.error('Profile fetch failed:', err);
        logout();
      }
    };

    fetchProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
