# Honestly — frontend

React + Vite + React Router, plain JavaScript. Talks to the backend at
http://localhost:3000. Runs on http://localhost:5173.

## Run it

```bash
npm install
npm run dev
```

The backend must allow credentials from http://localhost:5173, i.e. CORS with
`origin: "http://localhost:5173"` and `credentials: true`. Without that the
browser will refuse to store or send the `access_token` cookie.

## Routes

| Route | Page |
| --- | --- |
| /register | Create an account |
| /verify-otp | Verify the emailed code |
| /login | Log in |
| /forgot-password | Request a reset code |
| /reset-password | Set a new password |
| /u/:username | Public profile + send a message |
| /messages | Inbox and replies |
