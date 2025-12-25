# 💬 Real-Time Chat Application

A modern, full-stack real-time chat application built with React and Node.js, featuring instant messaging, user authentication, and live typing indicators.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)
![Socket.io](https://img.shields.io/badge/Socket.io-4.8.1-010101?logo=socket.io)
![MongoDB](https://img.shields.io/badge/MongoDB-9.0.0-47A248?logo=mongodb)

## ✨ Features

- 🔐 **User Authentication** - Secure login and registration with JWT tokens
- 💬 **Real-Time Messaging** - Instant message delivery using Socket.io
- 👥 **Online Users** - See all users currently online in the chat room
- ⌨️ **Typing Indicators** - Know when someone is typing in real-time
- 🎨 **Modern UI/UX** - Clean, professional, and responsive design
- 🔔 **System Notifications** - Get notified when users join or leave
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP client for API requests
- **CSS3** - Custom styling with animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.io** - WebSocket library for real-time features
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
Chat App/
│
├── Backend/
│   └── src/
│       ├── controllers/
│       │   └── auth-controller.js    # Authentication logic
│       ├── database/
│       │   └── db.js                 # MongoDB connection
│       ├── middleware/
│       │   └── changpswd.js         # Password change middleware
│       ├── models/
│       │   └── user.js              # User schema/model
│       ├── routes/
│       │   └── auth-routes.js       # Authentication routes
│       ├── public/                  # Static HTML files
│       ├── server.js                # Main server file with Socket.io
│       └── package.json
│
├── Frontend/
│   └── src/
│       ├── components/
│       │   ├── Auth/
│       │   │   ├── Auth.jsx         # Login/Register component
│       │   │   └── Auth.css         # Auth styles
│       │   └── Chat/
│       │       ├── Chat.jsx         # Main chat component
│       │       ├── MessageList.jsx  # Message display
│       │       ├── MessageInput.jsx # Message input field
│       │       ├── UserList.jsx     # Online users sidebar
│       │       └── Chat.css         # Chat styles
│       ├── utils/
│       │   └── api.js               # API utility functions
│       ├── App.jsx                  # Main app component
│       ├── main.jsx                 # Entry point
│       └── index.css                # Global styles
│
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd Backend/src
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in `Backend/src/`:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
jwtkey=your_jwt_secret_key
```

4. Start the server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
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

## 📖 Usage

1. **Register/Login**: 
   - Create a new account or login with existing credentials
   - JWT token is automatically stored for session management

2. **Join Chat Room**:
   - After authentication, you'll automatically join the chat room
   - See a welcome message and current online users

3. **Send Messages**:
   - Type your message in the input field
   - Press Enter or click the send button
   - Messages appear instantly for all users

4. **View Online Users**:
   - Check the sidebar to see all online users
   - Your name appears at the top with a "You" badge

5. **Typing Indicators**:
   - See when other users are typing
   - Multiple users typing shows as "X users are typing..."

## 🔌 API Endpoints

### Authentication

- `POST /chatapp/register` - Register a new user
  ```json
  {
    "name": "username",
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- `POST /chatapp/login` - Login user
  ```json
  {
    "name": "username",
    "password": "password123"
  }
  ```

- `POST /chatapp/changepassword` - Change password (requires auth token)
  ```json
  {
    "name": "username",
    "newpassword": "newpassword123"
  }
  ```

## 🔄 Socket.io Events

### Client → Server
- `join` - Join the chat room with username
- `chatMessage` - Send a chat message
- `typing` - User started typing
- `stopTyping` - User stopped typing

### Server → Client
- `userList` - Updated list of online users
- `userJoined` - A new user joined the chat
- `userLeft` - A user left the chat
- `chatMessage` - New message received
- `userTyping` - A user is typing
- `userStopTyping` - A user stopped typing

## 🎨 Features in Detail

### Authentication System
- Secure password hashing with bcryptjs
- JWT token-based authentication
- 30-minute token expiration
- Protected routes with middleware

### Real-Time Features
- Instant message broadcasting
- Live user list updates
- Real-time typing indicators
- System notifications for user join/leave

### User Interface
- Modern gradient design
- Smooth animations and transitions
- Responsive layout
- Intuitive user experience

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token authentication
- CORS configuration
- Input validation
- Secure session management

## 🚧 Future Enhancements

- [ ] Private messaging between users
- [ ] Message history persistence
- [ ] File/image sharing
- [ ] Emoji support
- [ ] User profiles and avatars
- [ ] Message search functionality
- [ ] Dark mode theme
- [ ] Push notifications

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Built with ❤️ for real-time communication

---

**Note**: Make sure MongoDB is running and the connection string in `.env` is correct before starting the backend server.

