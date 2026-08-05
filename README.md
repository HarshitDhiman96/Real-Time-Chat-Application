# FluxChat

FluxChat is a full-stack, shared real-time chat room. It combines a React/Vite client with an Express, MongoDB, and Socket.IO server for account management, live room presence, messages, and typing updates.

## Contents

- [Architecture](#architecture)
- [Features](#features)
- [Application flow](#application-flow)
- [Socket.IO events](#socketio-events)
- [Routes and API](#routes-and-api)
- [Local setup](#local-setup)
- [Project structure](#project-structure)
- [Deployment](#deployment)
- [Current behavior and limitations](#current-behavior-and-limitations)

## Architecture

```text
React + Vite client                         Node.js server
-------------------                         ---------------------------
Landing, auth, chat, profile    HTTP        Express authentication routes
Axios ------------------------------->      bcryptjs + JWT
Socket.IO client -------------------->      Socket.IO event handlers
                                                     |
                                                     v
                                              MongoDB through Mongoose
                                              (user records only)
```

The application consists of two independently deployed packages:

- `Frontend/` is a React 18 single-page application built with Vite.
- `Backend/` is a CommonJS Express server. `Backend/src/server.js` is the active entry point and creates the HTTP and Socket.IO servers.
- MongoDB stores registered users. Live messages, typing state, and online users are held in server memory for the active process.

## Features

### Landing page

- Responsive landing page with links to registration and login.
- Animated hero headline: the final word types, pauses, erases, and alternates between `everywhere` and `every time`.
- Floating mobile chat preview built from the same FluxChat visual language.
- Scroll-driven feature panels for the three implemented room capabilities: real-time sync, typing status, and online users.
- Three-step onboarding section covering account creation, room entry, and messaging.
- Responsive navigation and light/dark theme preference stored in `localStorage`.

### Accounts and authentication

- Registration accepts a username, email address, and password.
- The server checks for an existing username or email before creating a user.
- Passwords are salted and hashed with `bcryptjs`; plaintext passwords are not stored.
- Login returns a JWT with a 30-minute lifetime.
- The client stores the access token and username in `localStorage`, adds the token to Axios authorization headers, and sends authenticated users to `/chat`.
- The chat page redirects to `/login` when its required local token or username is missing.
- Users can change their password from the chat interface or profile page. The endpoint requires an `Authorization: Bearer <token>` header.
- Logout clears the stored token and username before returning to the login page.

### Shared chat room

- Socket.IO connects each authenticated client to the shared room experience.
- Messages are broadcast instantly to all connected clients.
- A live online-user list updates when a username joins or leaves.
- Join, leave, and welcome messages are rendered as client-side system messages.
- Typing and stop-typing events show active typers to other participants.
- The message composer supports sending with the button or with `Enter`; `Shift+Enter` does not submit.
- The chat layout includes a responsive sidebar, mobile sidebar controls, user status, profile navigation, logout, and a persisted theme toggle.

### Fun Zone canvas

The login and registration pages show a desktop-only Fun Zone beside the form.

- Draw directly on the canvas with a mouse.
- Reset the current drawing.
- Export the canvas as `funzone-creativity.png`.
- The canvas is intentionally local to the browser: drawings are not shared through Socket.IO or stored on the server.

## Application flow

### Sign up and sign in

1. A visitor opens `/register` and submits a username, email, and password.
2. The frontend calls `POST /chatapp/register`.
3. Express checks uniqueness, hashes the password, and creates the MongoDB user record.
4. The visitor logs in through `/login`.
5. `POST /chatapp/login` verifies the password and returns a JWT.
6. The browser stores the token and username, plays the login transition, and navigates to `/chat`.

### Join and chat

1. `ChatPage` loads the stored token and username.
2. `Chat` opens a Socket.IO connection and emits `join` with the username.
3. The server adds the username to its in-memory `Set` and broadcasts the latest `userList`.
4. The client displays the welcome message and current participant list.
5. Sending a message emits `chatMessage`; the server broadcasts it to every connected client.
6. Input changes emit `typing` or `stopTyping`, which are broadcast to everyone except the sender.
7. Disconnecting removes the username from the in-memory list and broadcasts `userLeft` plus the refreshed `userList`.

### Change password

1. The user opens the password form from the sidebar or `/profile`.
2. The client checks that the new password is at least six characters and matches its confirmation.
3. The client calls `POST /chatapp/changepassword` with the JWT authorization header.
4. The server verifies the JWT, prevents reuse of the current password, hashes the new password, and saves it to MongoDB.

## Socket.IO events

| Direction | Event | Payload | Result |
| --- | --- | --- | --- |
| Client -> server | `join` | `userName` | Registers the username in the active room. |
| Client -> server | `chatMessage` | `{ userName, text, timestamp }` | Broadcasts the message to all clients. |
| Client -> server | `typing` | `{ userName }` | Notifies other clients that the user is typing. |
| Client -> server | `stopTyping` | `{ userName }` | Notifies other clients that typing stopped. |
| Server -> client | `userList` | `string[]` | Sends the current online usernames. |
| Server -> client | `userJoined` | `userName` | Announces a newly joined user. |
| Server -> client | `userLeft` | `userName` | Announces a disconnected user. |
| Server -> client | `chatMessage` | message object | Delivers a chat message. |
| Server -> client | `userTyping` | `{ userName }` | Updates remote typing state. |
| Server -> client | `userStopTyping` | `{ userName }` | Removes a remote typing state. |

## Routes and API

### Frontend routes

| Route | Page | Purpose |
| --- | --- | --- |
| `/` | Landing page | Product overview, animated hero, and feature sections. |
| `/login` | Login | Authenticates an existing user. |
| `/register` | Register | Creates a new account. |
| `/chat` | Chat page | Shared real-time room; requires stored login data. |
| `/profile` | Profile | Displays local profile data and changes the password. |

### HTTP API

| Method | Endpoint | Request body | Authentication |
| --- | --- | --- | --- |
| `POST` | `/chatapp/register` | `{ "name", "email", "password" }` | None |
| `POST` | `/chatapp/login` | `{ "name", "password" }` | None |
| `POST` | `/chatapp/changepassword` | `{ "name", "newpassword" }` | Bearer JWT |

## Local setup

### Prerequisites

- Node.js 18 or newer
- npm
- A MongoDB database, local or hosted

### 1. Configure and run the backend

```bash
cd Backend
npm ci
```

Create `Backend/.env`:

```env
PORT=3000
mongooseurl=mongodb+srv://<user>:<password>@<cluster>/<database>
jwtkey=replace-with-a-long-random-secret
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

Start the server:

```bash
npm run dev
```

For a production-style local start, use `npm start`. The API and Socket.IO server listen on `http://localhost:3000` by default.

### 2. Configure and run the frontend

In a second terminal:

```bash
cd Frontend
npm ci
```

Create `Frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3000
```

Start Vite:

```bash
npm run dev
```

Open `http://localhost:5173`.

### Production build

```bash
cd Frontend
npm run build
```

Vite writes the deployable static files to `Frontend/dist/`. The directory is generated and intentionally ignored by Git.

## Project structure

```text
Chat App/
+-- Backend/
|   +-- package.json
|   `-- src/
|       +-- controllers/auth-controller.js   # Register, login, password change
|       +-- database/db.js                   # MongoDB connection
|       +-- middleware/changpswd.js          # JWT verification middleware
|       +-- models/user.js                   # Mongoose user model
|       +-- routes/auth-routes.js            # /chatapp API routes
|       +-- public/                          # Legacy static HTML pages
|       `-- server.js                        # Active Express + Socket.IO entry point
+-- Frontend/
|   +-- public/                              # Logo, notification sound, landing imagery
|   +-- src/
|   |   +-- components/
|   |   |   +-- Auth/                        # Fun Zone canvas and login animation
|   |   |   +-- Chat/                        # Room, sidebar, messages, navigation
|   |   |   +-- Landing/                     # Hero, features, onboarding, navigation
|   |   |   `-- ui/                          # Shared display components
|   |   +-- hooks/                           # Sound and interaction hooks
|   |   +-- pages/                           # Landing, login, register, chat, profile
|   |   +-- utils/api.js                     # Axios client and auth helpers
|   |   +-- App.jsx                          # Route definitions
|   |   `-- main.jsx                         # React entry point
|   +-- package.json
|   `-- vite.config.js
+-- .gitignore
`-- README.md
```

## Technology stack

| Area | Technology |
| --- | --- |
| Frontend | React 18, Vite, React Router, Tailwind CSS |
| Motion and UI | Framer Motion, GSAP, Lucide React |
| HTTP client | Axios |
| Realtime | Socket.IO client and server |
| Backend | Node.js, Express 5, CORS, dotenv |
| Data and security | MongoDB, Mongoose, bcryptjs, JSON Web Tokens |

## Deployment

The client and server can be deployed separately.

- Build and host `Frontend/dist/` on a static host such as Netlify or Vercel.
- Host `Backend/` on a Node.js platform such as Render.
- Set `VITE_API_URL` and `VITE_SOCKET_URL` to the deployed backend URL.
- Set `FRONTEND_URL` on the backend to the exact deployed frontend origin so the CORS allow-list permits it.
- Set `mongooseurl`, `jwtkey`, and `PORT` in the backend environment. Do not commit `.env` files.

## Current behavior and limitations

- The room is a single shared space. It does not currently support rooms, private messages, or direct messages.
- Messages, typing state, and online users are in memory. They reset when the backend restarts and are not persisted to MongoDB.
- Socket.IO receives a token from the client, but the current server event handlers do not validate the token or associate socket events with its JWT identity. Production hardening should add Socket.IO authentication middleware and server-side identity checks.
- The attachment and emoji buttons are present in the message composer but do not yet upload files or open an emoji picker.
- The Fun Zone supports mouse drawing on large screens. Touch drawing and shared whiteboards are not implemented.
- The profile email is currently a local placeholder when no email value exists in browser storage; the profile does not fetch account details from the API.
- `Backend/src/index.js` is a legacy Express-only entry point. Use `Backend/src/server.js`, which is what the package scripts run.

## License

ISC
