# Home Rescue OS 🛠️

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=flat&logo=json-web-tokens&logoColor=white)](https://jwt.io/)
[![Cloudinary](https://img.shields.io/badge/Storage-Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white)](https://cloudinary.com/)

**Home Rescue OS** is an enterprise-grade, full-stack MERN on-demand home maintenance and emergency service platform. It bridges homeowners with verified local professionals (plumbers, electricians, AC technicians, carpenters, painters, and more) through real-time booking, status tracking, multi-role security, and cloud media handling.

---

## 📑 Table of Contents

- [Features](#-features)
  - [1. User (Homeowner) Experience](#1-user-homeowner-experience)
  - [2. Worker (Technician) Experience](#2-worker-technician-experience)
  - [3. Admin Control Panel](#3-admin-control-panel)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [REST API Endpoints](#-rest-api-endpoints)
- [Getting Started (Local Setup)](#-getting-started-local-setup)
  - [Prerequisites](#prerequisites)
  - [1. Clone and Install](#1-clone-and-install)
  - [2. Environment Variables Setup](#2-environment-variables-setup)
  - [3. Database Seeding](#3-database-seeding)
  - [4. Running Development Servers](#4-running-development-servers)
- [Default Master Credentials](#-default-master-credentials)
- [Deployment Guide](#-deployment-guide)
- [License](#-license)

---

## 🚀 Features

### 1. User (Homeowner) Experience
- **Smart Search & Filters**: Search technicians by category, city, minimum rating, and keywords.
- **Booking Engine**: Select date slots, describe problems, upload issue photos, and track booking states (`pending`, `accepted`, `in_progress`, `completed`, `cancelled`).
- **Profile & Cloud Avatar Upload**: Live photo upload via Cloudinary with dynamic initials fallback.
- **Reviews & Ratings**: Submit transparent star ratings and reviews for completed services.
- **Favourites & Notifications**: Bookmark top workers and receive in-app status notifications.

### 2. Worker (Technician) Experience
- **Streamlined Onboarding**: Simple worker registration with skill categories, hourly rates, and working city.
- **Job Requests Management**: Accept or decline incoming customer repair requests in real time.
- **Schedule & Availability**: Set active working days, shift hours, and toggle immediate availability status.
- **Earnings & Reviews Overview**: Track finished jobs, total revenue, customer reviews, and feedback.
- **Worker Profile Customization**: Update skills, bio, service categories, and portfolio pictures.

### 3. Admin Control Panel
- **Analytics Dashboard**: High-level platform statistics (total users, active workers, completed bookings, revenue).
- **Worker Verification**: Review worker applications, approve profiles, and manage verification badges.
- **Service Categories CRUD**: Create, edit, activate/deactivate categories (with icon and starting price controls).
- **Bookings & Reviews Moderation**: Audit platform bookings and customer reviews.
- **Contact Inquiries**: Review and respond to user and visitor contact form inquiries.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Glassmorphic UI theme, Dark/Light Mode toggle
- **Routing & State**: React Router v6, Context API (Auth & Theme), Protected Route Guards
- **Forms & Animations**: React Hook Form, Framer Motion, Lucide Icons, React Hot Toast
- **HTTP Client**: Axios (with Auth Interceptors & automatic token injection)

### Backend
- **Runtime**: Node.js & Express.js (Modular MVC Pattern)
- **Database & ODM**: MongoDB & Mongoose
- **Authentication**: JWT (JSON Web Tokens) with `bcryptjs` password hashing & role-based middleware
- **File Uploads**: Multer & Multer-Storage-Cloudinary for cloud image hosting
- **Validation**: Express-Validator request validation pipelines
- **Logging & Utilities**: Morgan HTTP logger, CORS, Async Handler, standardized API Response helper

---

## 📂 Project Architecture

```
home-rescue-os/
├── backend/
│   ├── src/
│   │   ├── config/          # Database (Mongoose) & Cloudinary configuration
│   │   ├── controllers/     # Business logic for auth, bookings, categories, workers, admin, upload
│   │   ├── middlewares/     # JWT Auth, Role-based guard, Multer upload, Validation, Error handler
│   │   ├── models/          # Mongoose Schemas (User, Worker, Admin, Booking, Category, Review, etc.)
│   │   ├── routes/          # Express REST API routes
│   │   ├── utils/           # ApiResponse, AsyncHandler, JWT generator
│   │   ├── validators/      # Express-validator schemas
│   │   ├── app.js           # Express app setup & middleware configuration
│   │   └── seed.js          # Database seeder (Categories & Default Admin)
│   ├── .env.example         # Environment variable template
│   ├── package.json
│   └── server.js            # Server entry point
│
├── frontend/
│   ├── public/              # Static assets & Netlify _redirects
│   ├── src/
│   │   ├── components/      # UI components, Layouts, Modals, Navbar, Cards
│   │   ├── context/         # AuthContext & ThemeContext
│   │   ├── hooks/           # Custom React hooks (useAuth, useTheme)
│   │   ├── layouts/         # PublicLayout, AuthLayout, DashboardLayout, ProtectedRoute
│   │   ├── pages/           # Public pages, User Dashboard, Worker Panel, Admin Dashboard
│   │   ├── routes/          # AppRoutes configuration
│   │   ├── services/        # Axios API services (auth, user, worker, booking, upload, category)
│   │   ├── types/           # TypeScript interfaces & types
│   │   └── utils/           # Helpers, formatters, cn utility
│   ├── vercel.json          # SPA routing configuration for Vercel
│   ├── package.json
│   └── vite.config.ts
│
└── readme.md
```

---

## 🌐 REST API Endpoints

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | API Health Check | Public |
| `POST` | `/api/auth/user/register` | Register new customer | Public |
| `POST` | `/api/auth/user/login` | Customer login | Public |
| `POST` | `/api/auth/worker/register` | Register new worker | Public |
| `POST` | `/api/auth/worker/login` | Worker login | Public |
| `POST` | `/api/auth/admin/login` | Admin login | Public |
| `GET` | `/api/auth/me` | Get current authenticated user profile | Private (JWT) |
| `GET` | `/api/categories` | Get all active service categories | Public |
| `POST` | `/api/categories` | Create new category | Admin only |
| `GET` | `/api/workers` | Get verified workers (with filters & search) | Public |
| `GET` | `/api/workers/:id` | Get worker details & reviews | Public |
| `PUT` | `/api/workers/profile` | Update worker profile & skills | Worker only |
| `PUT` | `/api/users/profile` | Update user profile & avatar | User only |
| `POST` | `/api/bookings` | Create new service booking | User only |
| `GET` | `/api/bookings/my-bookings` | Get user booking history | User only |
| `GET` | `/api/bookings/worker-bookings` | Get worker job requests | Worker only |
| `PATCH` | `/api/bookings/:id/status` | Update booking status | Worker / Admin |
| `POST` | `/api/upload` | Upload image to Cloudinary | Private (JWT) |
| `GET` | `/api/admin/stats` | Get admin dashboard analytics | Admin only |
| `POST` | `/api/contact` | Submit contact inquiry message | Public |

---

## ⚙️ Getting Started (Local Setup)

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **MongoDB**: Local MongoDB instance running on port `27017` or MongoDB Atlas URI
- **NPM** or **Yarn**

---

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/your-username/home-rescue-os.git
cd home-rescue-os

# Install Backend Dependencies
cd backend
npm install

# Install Frontend Dependencies
cd ../frontend
npm install
```

---

### 2. Environment Variables Setup

#### Backend (`backend/.env`)
Create a `.env` file in the `backend/` directory:

```env
PORT=5000
NODE_ENV=development

# Database Connection
MONGO_URI=mongodb://127.0.0.1:27017/home-rescue-os

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Cloudinary Storage
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# CORS Allowed Origin
CLIENT_URL=http://localhost:5173
```

#### Frontend (`frontend/.env`)
Create a `.env` file in the `frontend/` directory (optional for local dev):

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

### 3. Database Seeding
Populate the database with the initial 10 service categories and master admin account:

```bash
cd backend
npm run seed
```

---

### 4. Running Development Servers

Open two terminal instances:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
# Server will run on http://localhost:5000
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
# Frontend will run on http://localhost:5173
```

Visit **`http://localhost:5173`** in your browser.

---

## 🔑 Default Master Credentials

After running `npm run seed`, you can immediately log into the **Admin Panel**:

- **Admin Login URL**: `http://localhost:5173/admin/login`
- **Email**: `shivanibatra978@gmail.com`
- **Password**: `Shivani@123`

---

## 🚀 Deployment Guide

### 1. Cloud Database (MongoDB Atlas)
1. Create a free shared cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Add a Database User and whitelist `0.0.0.0/0` under Network Access.
3. Copy the connection string (`mongodb+srv://...`).

### 2. Backend Deployment (Render / Railway)
1. Connect your repository to [Render.com](https://render.com) and create a **Web Service**.
2. Set **Root Directory** to `backend`.
3. Set **Build Command** to `npm install` and **Start Command** to `node server.js`.
4. Add all environment variables from `backend/.env`.

### 3. Frontend Deployment (Vercel / Netlify)
1. Import your repository into [Vercel](https://vercel.com).
2. Set **Root Directory** to `frontend` and **Framework Preset** to `Vite`.
3. Set Environment Variable: `VITE_API_BASE_URL=https://your-backend-service.onrender.com/api`.
4. Deploy! (`vercel.json` will automatically handle SPA client-side routing).

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).