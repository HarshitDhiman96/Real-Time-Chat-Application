# Chat App - Frontend

A modern, real-time chat application built with React and Socket.io.

## Features

- 🔐 **Authentication**: Login and Register functionality
- 💬 **Real-time Messaging**: Instant message delivery using Socket.io
- 👥 **Online Users**: See who's currently online
- ⌨️ **Typing Indicators**: Know when someone is typing
- 🎨 **Modern UI**: Clean, professional, and responsive design

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on port 3000

### Installation

1. Navigate to the Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
Frontend/
├── src/
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── Auth.jsx       # Authentication component
│   │   │   └── Auth.css       # Auth styles
│   │   └── Chat/
│   │       ├── Chat.jsx        # Main chat component
│   │       ├── MessageList.jsx # Message display component
│   │       ├── MessageInput.jsx # Message input component
│   │       ├── UserList.jsx    # Online users component
│   │       └── Chat.css        # Chat styles
│   ├── utils/
│   │   └── api.js              # API utilities
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## Usage

1. **Register/Login**: Use the authentication page to create an account or login
2. **Join Chat**: After authentication, you'll automatically join the chat room
3. **Send Messages**: Type your message and press Enter or click the send button
4. **View Online Users**: See all online users in the sidebar
5. **Typing Indicators**: See when other users are typing

## API Endpoints

The frontend communicates with the backend at `http://localhost:3000`:

- `POST /chatapp/login` - User login
- `POST /chatapp/register` - User registration

## Socket.io Events

### Client → Server
- `join` - Join the chat room
- `chatMessage` - Send a message
- `typing` - User is typing
- `stopTyping` - User stopped typing

### Server → Client
- `userList` - Updated list of online users
- `userJoined` - A new user joined
- `chatMessage` - New message received
- `userTyping` - A user is typing
- `userStopTyping` - A user stopped typing

## Technologies Used

- React 18
- Vite
- Socket.io Client
- Axios
- CSS3

## Notes

- Make sure the backend server is running before starting the frontend
- The app uses JWT tokens for authentication
- Tokens are stored in localStorage
- The app automatically reconnects to the chat if the token is valid

