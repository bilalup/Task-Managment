import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
const serverApi = import.meta.env.VITE_SERVER_API;

axios.defaults.withCredentials = true; // send cookies with requests

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // track auth loading state
  const navigate = useNavigate();

  // Check if user is authenticated on app start
  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await axios.get(`${serverApi}/api/auth/check-auth`);
        setUser(data.user);
        // eslint-disable-next-line
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${serverApi}/api/auth/login`, { email, password });
      setUser(data.user);
      navigate('/');
    } catch (error) {
      // if email or password show alert
      alert(error.response.data.message);
    }
  };

  const register = async (username, email, password) => {
    try {
      const { data } = await axios.post(`${serverApi}/api/auth/register`, { username, email, password });
      setUser(data.user);
      navigate('/');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${serverApi}/api/auth/logout`); // Optional: create this route to clear cookie server-side
    } catch {null}
    setUser(null);
    navigate('/login');
  };

  if (loading) {
    // Render loading spinner or blank page while auth check runs
    return <h1 className="flex items-center justify-center h-screen font-extrabold text-2xl">Loading...</h1>;
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
  
};

// eslint-disable-next-line
export const useAuth = () => useContext(AuthContext);
