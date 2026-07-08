# Full-Stack MERN Expense Tracker

A full-stack web application designed to help users track daily expenses and manage categorical budgets. Built utilizing the MERN stack (MongoDB, Express.js, React, Node.js) with a focus on secure authentication, RESTful architecture, and a responsive user interface.

## Core Features
* **Secure User Authentication:** Implemented user registration and login utilizing hashed passwords (Bcrypt.js) and JSON Web Tokens (JWT).
* **Protected Routes:** Engineered frontend and backend route protection to ensure data privacy, restricting data access and modification to the authenticated owner.
* **RESTful API:** Developed a robust Express backend with full CRUD operations for Expenses and Categories.
* **Relational Database Design:** Structured Mongoose schemas linking Expenses to specific Users and Categories.
* **Dynamic Frontend Dashboard:** Built a Single Page Application (SPA) with React (Vite) and React Router for seamless navigation.
* **State Management:** Enabled real-time UI updates upon data mutation without page reloads using React Hooks and Axios.

## Technologies Used
* **Frontend:** React.js, Vite, React Router, Axios, CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas, Mongoose (ODM)
* **Security & Auth:** JSON Web Tokens (JWT), Bcrypt.js, CORS