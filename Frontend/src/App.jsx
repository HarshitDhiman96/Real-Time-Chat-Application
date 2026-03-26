import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <div className="relative min-h-screen bg-deep-space overflow-x-hidden">
      {/* Global Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Deep Space Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background-primary via-background-secondary to-background-tertiary" />
        
        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 240, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 240, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0'
          }}
        />
        
        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent-cyan/5 rounded-full filter blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-magenta/5 rounded-full filter blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10">
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;

