# Mini CRM Application – Full Stack Web Development

## 📌 Project Overview

This project is a **Mini CRM (Customer Relationship Management) system** built as part of the **Full Stack Web Development Internship (FS Track)**.

The application simulates a **real-world business workflow** where:
- Public users submit inquiries through a website contact form
- Admin users securely log in
- Admins manage, track, update, and analyze incoming leads via a dashboard

This project demonstrates **real client data handling**, **authentication**, **CRUD operations**, and **data visualization**, similar to production CRM systems used by service-based companies.

---

## 🚀 Key Features

### 🌐 Public Side
- Contact form for potential clients
- Fields: Name, Email, Phone (optional), Message, Source
- Lead stored in database with default status `new`

### 🔐 Admin Side
- Secure admin login (JWT-based authentication)
- Dashboard to manage all leads
- View lead details
- Update lead status (`new → contacted → converted`)
- Add follow-up notes (history preserved)
- Delete leads with confirmation
- Real-time dashboard updates (no page reload)

### 📊 Dashboard Analytics
- Total leads count
- New / Contacted / Converted leads
- Pie chart for lead status distribution
- Line chart showing leads over the last 7 days
- All charts update instantly after create/delete actions

---

## 🧠 What This CRM Is For

This CRM is designed for a **Web Development / Software Services Company** to:

- Collect inquiries from clients
- Track follow-ups
- Manage sales progress
- Analyze lead performance
> “I built this system to manage real clients.”

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios
- Recharts (charts & analytics)
- react-hot-toast (notifications)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- RESTful APIs


## 🔄 Application Flow

Public Contact Form
↓
Backend API
↓
Database (MongoDB)
↓
Admin Dashboard


---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Surajkumavat437/FUTURE_FS_02
2️⃣ Backend Setup
cd backend
npm install
Create .env file:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Run backend:

npm run dev
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
🔑 Authentication Details
Admin accounts are managed from the backend

No public signup (intentional for security)

Only authenticated admins can access dashboard & APIs

Contact Form

Admin Login

Dashboard

Lead Table

Charts & Analytics

📈 Learning Outcomes
Built a full-stack application with real-world use case

Implemented JWT authentication and protected routes

Designed REST APIs and MongoDB schemas

Managed complex React state updates

Implemented real-time UI updates without page reload

Created professional dashboard analytics

🔗 Links
GitHub Repository: https://github.com/Surajkumavat437/FUTURE_FS_02

Live Demo : https://your-live-url.com

🏷 Internship Details
Track: Full Stack Web Development (FS)

Internship Organization: Future Interns

LinkedIn: https://www.linkedin.com/company/future-interns/
