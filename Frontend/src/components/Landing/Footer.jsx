import { MessageSquare } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">ChatApp</span>
          </div>

          {/* Links */}
          <div className="flex gap-8 text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="/login" className="hover:text-white transition-colors">Login</a>
            <a href="/register" className="hover:text-white transition-colors">Register</a>
          </div>

          {/* Copyright */}
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} ChatApp. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
