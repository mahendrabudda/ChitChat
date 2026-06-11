# MariGo 💬

A full-stack real-time chat application built with the MERN stack. MariGo enables users to chat instantly, share images, manage friend requests, and authenticate securely using Google OAuth or email/password.

🌐 **Live Demo:** https://marigo.onrender.com

## Features

* ⚡ Real-time messaging with Socket.io
* 🔐 JWT authentication with HTTP-only cookies
* 🔑 Google OAuth login and signup
* 👥 Friend request system
* 🖼️ Image sharing using Cloudinary
* 📧 Password reset with email OTP
* 🟢 Online/offline status indicators
* 🔔 Sound notifications with toggle option
* 🧑 Profile picture upload
* 🛡️ Rate limiting and bot protection using Arcjet
* 📱 Fully responsive design

## Tech Stack

### Frontend

* React 18
* Vite
* Tailwind CSS
* DaisyUI
* Zustand
* Socket.io Client
* Framer Motion
* Axios
* React Router DOM

### Backend

* Node.js
* Express.js
* MongoDB & Mongoose
* Socket.io
* Passport.js (Google OAuth)
* JWT
* Bcrypt.js
* Cloudinary
* Nodemailer
* Arcjet

## Installation

Clone the repository:

```bash
git clone https://github.com/mahendrabudda/ChitChat.git
cd ChitChat
```

Install dependencies:

```bash
npm run build
```

Create a `.env` file inside `backend/` and add the required environment variables.

Start the application:

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

## Screenshots

Add screenshots or GIFs here to showcase:

* Landing Page
* Authentication Page
* Chat Interface
* Friend Requests
* Mobile View

## License

MIT License.
