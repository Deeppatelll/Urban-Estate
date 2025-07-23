# 🏙️ Urban Estate

**Urban Estate** is a full-stack real estate web application built using the **MERN (MongoDB, Express.js, React.js, Node.js)** stack. It allows users to browse, list, and manage property listings, and enables owners to connect with potential buyers/renters through features like brochure downloads, contact via email, and more.

---

## 🚀 Features

- 🔐 User Authentication (Email/Password + Google Login)
- 🏡 Create, Update, Delete Property Listings (for Owners)
- 📥 Download property brochures (PDF)
- 💬 Contact owner/landlord via email (NodeMailer)
- ❤️ Add listings to Favorites (for Buyers)
- 🔍 Filter & Search Listings
- 📸 Multiple property images using Firebase Storage
- 📄 Profile Management (User Info + Listings/Favorites)

---

## 🛠️ Tech Stack

| Technology    | Description                       |
|---------------|-----------------------------------|
| **MongoDB**   | NoSQL Database for data storage   |
| **Express.js**| Backend framework for Node.js     |
| **React.js**  | Frontend library for UI           |
| **Node.js**   | Backend runtime environment       |
| **Firebase**  | Image storage & Google Auth       |
| **TailwindCSS** | UI styling framework           |
| **NodeMailer**| Contact form mail functionality   |

---

## 📁 Project Structure


urban-estate/
├── backend/               # Express + MongoDB APIs
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   └── utils/
├── frontend/              # React application
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── assets/
│   │   └── App.jsx
├── .env                   # Environment variables
├── README.md              # Project documentation
└── package.json           # Project metadata




## 🔧 Installation

1. **Clone the repository**

git clone https://github.com/yourusername/urban-estate.git
cd urban-estate


2. **Set up the backend**

cd backend
npm install


3. **Set up the frontend**

cd ../frontend
npm install


4. **Create `.env` files** in both backend and frontend with required credentials:
- MongoDB URI
- Firebase config
- JWT Secret
- Google OAuth keys
- Email credentials (for NodeMailer)



## ▶️ Run Locally

# Start backend
cd backend
npm run dev

# In a new terminal, start frontend
cd frontend
npm start



