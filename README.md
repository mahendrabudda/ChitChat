# MariGo — Real-Time Chat Platform

![MariGo](https://img.shields.io/badge/MariGo-Real--Time%20Chat-blue?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-20+-green?style=for-the-badge&logo=node.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)
![Socket.io](https://img.shields.io/badge/Socket.io-Real--Time-black?style=for-the-badge&logo=socket.io)
![Deployed](https://img.shields.io/badge/Deployed-Render-purple?style=for-the-badge&logo=render)

A full-stack real-time chat application built with the MERN stack, Socket.io, and Cloudinary. Features Google OAuth, friend requests, image sharing, sound notifications, and a fully responsive UI.

🌐 **Live:** [https://marigo.onrender.com](https://marigo.onrender.com)

---

## Features

- **Real-time messaging** via WebSocket (Socket.io)
- **Google OAuth** sign-in and sign-up
- **JWT authentication** with secure HTTP-only cookies
- **Friend request system** — search users, send/accept/reject requests
- **Image sharing** — upload and send photos via Cloudinary CDN
- **Password reset** via email OTP (Nodemailer + Brevo SMTP)
- **Online presence** — live online/offline status indicators
- **Sound notifications** — keystroke and message sounds with toggle
- **Profile picture upload** — change avatar with Cloudinary
- **Welcome emails** — HTML email on signup
- **Rate limiting + bot protection** via Arcjet
- **Fully responsive** — works on mobile and desktop
- **Landing pages** — Home, About, Features, Contact

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 + Vite | UI framework and build tool |
| Tailwind CSS + DaisyUI | Styling |
| Zustand | Global state management |
| Socket.io Client | Real-time communication |
| Framer Motion | Animated page transitions |
| Axios | HTTP requests |
| React Router DOM | Client-side routing |
| Lucide React | Icons |
| React Hot Toast | Toast notifications |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | Server framework |
| MongoDB + Mongoose | Database |
| Socket.io | WebSocket server |
| Passport.js | Google OAuth strategy |
| JWT | Authentication tokens |
| Bcrypt.js | Password hashing |
| Cloudinary | Image storage and CDN |
| Nodemailer | Email delivery (Brevo SMTP) |
| Arcjet | Rate limiting and bot protection |

---

## Project Structure

```
BOOM/
├── backend/
│   └── src/
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   ├── message.controller.js
│       │   └── friendRequest.controller.js
│       ├── models/
│       │   ├── user.model.js
│       │   ├── message.js
│       │   └── friendRequest.model.js
│       ├── routes/
│       │   ├── auth.route.js
│       │   ├── message.route.js
│       │   └── friendRequest.route.js
│       ├── middleware/
│       │   ├── auth.middleware.js
│       │   └── arcjet.middleware.js
│       ├── lib/
│       │   ├── db.js
│       │   ├── socket.js
│       │   ├── cloudinary.js
│       │   ├── nodemailer.js
│       │   ├── passport.js
│       │   └── utils.js
│       ├── Emails/
│       │   ├── EmailHandlers.js
│       │   └── EmailTemplates.js
│       └── server.js
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── ChatContainer.jsx
│       │   ├── ChatHeader.jsx
│       │   ├── ChatsList.jsx
│       │   ├── ContactList.jsx
│       │   ├── MessageInput.jsx
│       │   ├── ProfileHeader.jsx
│       │   ├── ActiveTabSwitch.jsx
│       │   ├── FriendRequestsPanel.jsx
│       │   └── ...skeletons and placeholders
│       ├── pages/
│       │   ├── intro.jsx
│       │   ├── AuthPage.jsx
│       │   ├── HomePage.jsx
│       │   ├── AboutPage.jsx
│       │   ├── FeaturesPage.jsx
│       │   └── ContactPage.jsx
│       ├── store/
│       │   ├── useAuthStore.js
│       │   ├── useChatStore.js
│       │   └── useFriendStore.js
│       └── hooks/
│           └── useKeyboardSound.js
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB Atlas account
- Cloudinary account
- Google Cloud Console project with OAuth 2.0 credentials
- Brevo (formerly Sendinblue) SMTP credentials

### Installation

Clone the repository:

```bash
git clone https://github.com/mahendrabudda/ChitChat.git
cd ChitChat
```

Install all dependencies:

```bash
npm run build
```

This installs backend dependencies, frontend dependencies, and builds the frontend.

### Environment Variables

Create `backend/.env`:

```env
PORT=3000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/marigo

# JWT
JWT_SECRET=your_jwt_secret_here

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLIENT_URL=http://localhost:5173

# Nodemailer (Brevo SMTP)
SMTP_USER=your_brevo_smtp_user
SMTP_PASS=your_brevo_smtp_password
SENDER_EMAIL=your_verified_sender@example.com

# Arcjet
ARCJET_KEY=your_arcjet_key
```

### Running Locally

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend (in a separate terminal):

```bash
cd frontend
npm run dev
```

Frontend runs on `http://localhost:5173`, backend on `http://localhost:3000`.

---

## API Routes

### Auth `/api/auth`

| Method | Route | Description | Protected |
|---|---|---|---|
| POST | `/sign-up` | Register new user | No |
| POST | `/login` | Login with email/password | No |
| POST | `/logout` | Logout and clear cookie | No |
| GET | `/check` | Verify auth status | Yes |
| PUT | `/update-profile` | Update profile picture | Yes |
| POST | `/send-reset-otp` | Send password reset OTP | No |
| POST | `/reset-password` | Reset password with OTP | No |
| GET | `/google` | Initiate Google OAuth | No |
| GET | `/google/callback` | Google OAuth callback | No |

### Messages `/api/message`

| Method | Route | Description | Protected |
|---|---|---|---|
| GET | `/contacts` | Get all users except self | Yes |
| GET | `/chats` | Get users I've chatted with | Yes |
| GET | `/:id` | Get messages with a user | Yes |
| POST | `/send/:id` | Send a message | Yes |

### Friends `/api/friends`

| Method | Route | Description | Protected |
|---|---|---|---|
| GET | `/search?query=` | Search users by name | Yes |
| GET | `/incoming` | Get pending friend requests | Yes |
| GET | `/friends` | Get accepted friends | Yes |
| POST | `/send/:receiverId` | Send friend request | Yes |
| PUT | `/respond/:requestId` | Accept or reject request | Yes |

---

## Deployment

The app is deployed as a single service on Render.

**Build Command:**
```
npm install --prefix backend && npm install --prefix frontend --include=dev && npm run build --prefix frontend
```

**Start Command:**
```
npm run start --prefix backend
```

**Environment Variables:** Set all variables from the `.env` section above in the Render dashboard. Make sure:

- `NODE_ENV=production`
- `CLIENT_URL=https://marigo.onrender.com`
- No `PORT` variable — Render assigns this automatically

**Google OAuth:** Add `https://marigo.onrender.com/api/auth/google/callback` as an authorised redirect URI in Google Cloud Console.

---

## Screenshots

| Page | Description |
|---|---|
| Landing Page | Hero section with stats and CTA |
| Auth Page | Login / Signup / Forgot Password with animated transitions |
| Home Page | Sidebar with chats/contacts + real-time chat panel |
| About Page | Team, mission, and values |
| Features Page | Feature grid and comparison checklist |
| Contact Page | Social links and support hours |

---

## Contributing

Pull requests are welcome. For major changes please open an issue first.

---

## License

MIT © 2026 MariGo
