import { useState, useEffect } from 'react';
import Auth from './components/Auth/Auth';
import Chat from './components/Chat/Chat';
import { getAuthToken, removeAuthToken } from './utils/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Check if user is already authenticated
    const storedToken = getAuthToken();
    if (storedToken) {
      // In a real app, you'd verify the token with the backend
      // For now, we'll check if there's a stored username
      const storedUserName = localStorage.getItem('userName');
      if (storedUserName) {
        setUserName(storedUserName);
        setToken(storedToken);
        setIsAuthenticated(true);
      }
    }
  }, []);

  const handleLoginSuccess = (name, authToken) => {
    setUserName(name);
    setToken(authToken);
    setIsAuthenticated(true);
    localStorage.setItem('userName', name);
  };

  const handleLogout = () => {
    removeAuthToken();
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
    setUserName('');
    setToken('');
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <Chat userName={userName} token={token} onLogout={handleLogout} />
      ) : (
        <Auth onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;

