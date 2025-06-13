import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../config';

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) return setIsValid(false);

      try {
        const response = await axios.post(`${BACKEND_BASE_URL}/api/auth/verify-token`, {
          token: token,
        });

        if (response.data.valid) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        setIsValid(false);
      }
    };

    verifyToken();
  }, []);

  if (isValid === null) {
    return <div className="text-center mt-10 text-lg">🔒 Checking access...</div>;
  }

  return isValid ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
