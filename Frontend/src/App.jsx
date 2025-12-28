import { useState, useEffect } from 'react';
import Auth from './components/Auth/Auth';
import Chat from './components/Chat/Chat';
import { getAuthToken, removeAuthToken } from './utils/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Auto-logout on page reload - clear authentication
    const handleBeforeUnload = () => {
      removeAuthToken();
      localStorage.removeItem('userName');
    };

    // Clear auth on page load/reload
    removeAuthToken();
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
    setUserName('');
    setToken('');

    // Also clear on page unload (reload/navigation)
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
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

