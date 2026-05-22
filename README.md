#DevPulse

## Issue Tracker API

A RESTful Issue Tracking API built with TypeScript, Express.js, PostgreSQL, and JWT authentication.
The project follows a modular architecture pattern for scalability and maintainability.

---

## Live URL

```txt id="6p9x9v"

```

---

# Features

* User Authentication with JWT
* Access & Refresh Token support
* Password hashing using bcryptjs
* Role-based authorization
* Create, Update, Delete, and Fetch Issues
* Maintainer & Contributor permission system
* Query filtering and sorting
* Modular project architecture
* PostgreSQL database integration
* Custom response utility
* Global middleware support
* Global Error handler support

---

# Tech Stack

## Backend

* TypeScript
* Node.js
* Express.js

## Database

* PostgreSQL
* pg

## Authentication

* JWT (jsonwebtoken)
* bcryptjs

## Development Tools

* ts-node-dev
* dotenv
* ESLint

---

# Project Structure

```txt id="c04h9r"
src/
│
├── app.ts
├── server.ts
│
├── config/
│   └── index.ts
│
├── db/
│   └── index.ts
│
├── middleware/
│   ├── auth.ts
│   ├── globalErrorHandler.ts
│   └── index.d.ts
│
├── modules/
│   │
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.route.ts
│   │   └── auth.interface.ts
│   │
│   ├── issue/
│       ├── issue.controller.ts
│       ├── issue.service.ts
│       ├── issue.route.ts
│       └── issue.interface.ts
│   
│
├── types/
│   └── index.ts
│
└── utility/
    └── index.ts

```

---

# Installation & Setup

## 1. Clone Repository

```bash id="r4on0y"
git clone <https://github.com/tamanna-hash/dev-pulse>
```

---

## 2. Install Dependencies

```bash id="29tx2f"
npm install
```

---

## 3. Create Environment Variables

Create a `.env` file in the root directory:

```env id="24sl5k"
PORT=5000

DATABASE_URL=your_database_url

SECRET_KEY=your_access_secret
REFRESH_SECRET_KEY=your_refresh_secret
```

---

## 4. Run Development Server

```bash id="txm9oi"
npm run dev
```

---

# API Endpoints

## Auth Routes

| Method | Endpoint           | Description   |
| ------ | ------------------ | ------------- |
| POST   | `/api/auth/signup` | Register user |
| POST   | `/api/auth/login`  | Login user    |

---

## Issue Routes

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| POST   | `/api/issues`     | Create issue     |
| GET    | `/api/issues`     | Get all issues   |
| GET    | `/api/issues/:id` | Get single issue |
| PATCH  | `/api/issues/:id` | Update issue     |
| DELETE | `/api/issues/:id` | Delete issue     |

---

# Query Parameters

## Get Issues

| Param  | Values                      |
| ------ | --------------------------- |
| sort   | newest, oldest              |
| type   | bug, feature_request        |
| status | open, in_progress, resolved |

Example:

```txt id="lkn2vc"
GET /api/issues?type=bug&status=open&sort=newest
```

---

# Authentication & Authorization

## Roles

### Contributor

* Create issues
* Update own issue only if status is `open`

### Maintainer

* Manage all issues
* Delete any issue
* Update any issue

---

# Database Schema Summary

## Users Table

| Column     | Type               |
| ---------- | ------------------ |
| id         | SERIAL PRIMARY KEY |
| name       | VARCHAR            |
| email      | VARCHAR UNIQUE     |
| password   | TEXT               |
| role       | VARCHAR            |
| created_at | TIMESTAMP          |
| updated_at | TIMESTAMP          |

---

## Issues Table

| Column      | Type               |
| ----------- | ------------------ |
| id          | SERIAL PRIMARY KEY |
| title       | VARCHAR(150)       |
| description | TEXT               |
| type        | TEXT               |
| status      | VARCHAR            |
| reporter_id | INT                |
| created_at  | TIMESTAMP          |
| updated_at  | TIMESTAMP          |

---

# Sample Login Response

```json id="5rjlwm"
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "your_access_token",
    "refreshToken": "your_refresh_token"
  }
}
```

---

# Author

TW
