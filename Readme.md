# Finsight
## Overview
**Finsight** is a full-stack web application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js) that allows users to track expenses, manage personal finances, access dynamic calculators, and explore financial markets including **stocks** and **cryptocurrencies**. The application includes secure authentication, real-time data updates, and a responsive, user-friendly interface.

---

## Features

### 💰 Expense & Finance Tracking
- Add, view, and manage personal expenses.
- Dashboard view with detailed insights and statistics.
- Quick overview of spending patterns.

### 📊 Calculators
- Dynamic calculators for financial planning:
  - SIP Calculator
  - EMI Calculator
  - FD & RD Calculators
  - Lump Sum Calculator
- Accessible via dynamic route `/calculators/:type`.

### 📈 Financial Market Data
- Real-time **cryptocurrency** prices.
- Live **stock market** information.
- Market indices overview.

### 🔒 Authentication
- Secure login and registration using JWT.
- Protected routes for sensitive data.
- Public routes for general access (e.g., landing page, calculators).

### ⚡ UI & UX
- Responsive interface built with **React.js** and **Tailwind CSS**.
- Toast notifications for instant feedback.
- Loader component during authentication check.

---

## Tech Stack

| Layer            | Technology                                   |
|-----------------|----------------------------------------------|
| Frontend        | React.js, Tailwind CSS, React Router, Framer Motion |
| Backend         | Node.js, Express.js                           |
| Database        | MongoDB Atlas                                 |
| Authentication  | JWT (JSON Web Tokens)                         |
| Notifications   | react-hot-toast                               |
| Charts & Graphs | Recharts                                     |
| State Management| Zustand                                       |

---


---

## Installation & Setup

### Prerequisites
- Node.js >= 18.x
- npm or yarn
- MongoDB Atlas account

### Backend Setup
```bash
cd server
npm install
```

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

## Usage

- Register a new account or log in.
- Access the dashboard to manage expenses.
- Use calculators via /calculators/:type.
- Explore live crypto and stock market data.
- Visit your profile to update personal information.