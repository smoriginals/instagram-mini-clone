
# 📸 Instagram Medium Clone

#### 📌 Project Overiew

A full-stack Instagram-like social media web application built using the MERN stack(MongoDB, Express.js, React, Node.js).
This project demonstrates real-world features like authentication, follow/unfollow system, feed filtering, likes, comments, story, dashboard, ownershiping, email support and secure backend validation.

#### 🧪 Development Stage

This application is currently in the BETA stage, with new features being added over time.

- [Check The Latest Update](https://github.com/smoriginals/instagram-mini-clone/commits/main)


# 🚀 Features

#### 🔐 Authentication
- User signup & login
- JWT-based authentication
- Protected APIs using middleware
- Persistent sessions via localStorage

#### 🛡️ Validation (Joi)

- Server-side validation
- Signup
- Login
- Prevents invalid or malicious requests

#### 👤 User System

- Update profile
- Upload profile picture
- Follow / Unfollow users
- Role-based access (Owner protected)

#### 🖼️ Posts & Feed

- Create image posts
- Like / Unlike posts
- Comment system
- New posts appear first
- Feed updates in real-time (state based)

#### 🔍 Explore

- Discover other users
- View profile preview
- Follow users directly



# 🖼 Screenshots

![App Screenshot](https://res.cloudinary.com/smoriginals/image/upload/v1767592561/collage_ah5dfs.jpg)

![App Screenshot](https://res.cloudinary.com/smoriginals/image/upload/v1767870001/collage2_fsk1us.jpg)

![App Screenshot](https://res.cloudinary.com/smoriginals/image/upload/v1767870122/collage2_k6d2p0_nijzmb.jpg)
# 💿Project Tech Stack

**💻Client:** React + Vite, Context API, Tailwind CSS, Shadcn UI, Axios, Toast

**🖥Server:** Node.js, Express.js, MongoDB + Mongoose, JWT Authentication, Joi Validation, Multer (image uploads), Cron (Delete Story), Nodemailer, FS, Cloudinary


# 📂 Project Structure

```
Backend
 ├─ controllers/
 ├─ models/
 ├─ routes/
 ├─ middleware/
 ├─ validators/   ← Joi schemas
 └─ server.js

Frontend/
 ├─ components/
 ├─ context/
 ├─ pages/
 └─ lib/
```

# 🌐 Project Demo

#### [River (Open in Browser)](https://smoriginals-river.onrender.com)



# 📃 License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

# 🛠 Deployment

#### Frontend Deployment

```
npm run build
```
```
npm install
```

#### Backend Deployment

```
npm install
```
```
npm start
```

# ⚙️Environment Variables

To run this project, you will need the following environment variables to your .env file



#### Environment Variables
```
CONNECTION_STRING=mongoURI
CLOUDINARY_CLOUD_NAME=XYZ
CLOUDINARY_API_KEY=1234567890
CLOUDINARY_API_SECRET=dfssdfsdfsdfsd-dsfsd
JWT_SECRET_KEY=Mykey
MAIL_PASS=xyz xyz xyz xyz
MAIL_USER=xyz@gmail.com
CLIENT_URL=https://xyzfrontendurl.com
CLIENT_SERVER=https://xyzbackend.com
```


# ✔ Run Locally

#### Clone the project

```bash
  git clone https://github.com/smoriginals/instagram-mini-clone.git
```

#### Go to the project directory

```bash
  cd my-project
```

#### Install dependencies

#### Frontend
```
  cd my-project
  cd frontend
```
```
  npm install
  npm run dev
```
#### Backend
```
  cd my-project
  cd backend
```
```
  npm install
  npm start
  node server.js
```


# 🌐Explore

#### Explore My Other Projects

[Github](https://github.com/smoriginals)


# 🔷 Usage/Examples

```javascript
import Component from 'my-project'

export default function ExampleApp() {
  return (
    <>
        <Component />
    </>
  );
}
```


# 💬 FAQ

###  1. What is this project about?

This project is a mini Instagram clone built to demonstrate core social media functionalities such as posting photos, stories, user interactions, and profile management. It focuses on frontend-heavy implementation with backend integration to simulate real-world application behavior.

### 2. What features are currently implemented?

The application supports:
- Uploading posts (photos)
- Uploading stories (auto-expire after 24 hours)
- Viewing posts and stories
- Liking posts and adding comments
- Searching users
- Following and viewing followers/following
- Updating user profile and profile picture
- Deleting posts, stories, and full user profile
- Dark/Light theme toggle
- Email sending (notifications / verification)
- Secure logout functionality

### 3. How does the story expiration (24 hours) work?

Stories are time-bound using a timestamp-based logic. Each story stores a creation time, and expired stories are filtered or removed after 24 hours through backend validation and/or scheduled cleanup logic.

### 4. What technologies are used in this project?

#### Frontend
```
React.js, Vite, Tailwind CSS, shadcn/ui
```

#### Backend
```
Node.js, Express.js
```

#### Database
```
MongoDB
```

#### Other 
```
JWT authentication, email services, REST APIs
```

### 5. Is the project production-ready?

No. This is a learning and portfolio project. Features are continuously added and improved, and some functionality may occasionally break during development. Stability and performance improvements are ongoing.

### 6. Why are some features occasionally broken?

The project follows an iterative development approach. New features are added incrementally, which may temporarily affect existing functionality. Bugs are treated as learning opportunities and addressed through debugging and refactoring.

### 7. How is authentication and user security handled?

User authentication is handled using JWT-based authorization. Protected routes require valid tokens, and sensitive actions such as deleting profiles or posts are restricted to authenticated users.

### 8. Can users fully delete their data?

Yes. Users can:

Delete individual posts and stories

Delete their entire profile
Once deleted, related user data is removed from the database to maintain data consistency.

### 9. What was the main challenge while building this project?

Handling state synchronization between frontend and backend, managing file uploads, dealing with CORS and deployment issues, and ensuring smooth user experience during feature updates were the main challenges.

### 10. What are the future plans for this project?

Planned improvements include:

Better error handling and validation

Performance optimizations

Improved UI/UX consistency

Real-time features (e.g., notifications or chat)

Stronger testing and deployment stability