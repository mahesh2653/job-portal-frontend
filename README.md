# 🚀 Job Portal - Frontend (React.js)

## 📌 Overview

This repository contains the **frontend** for a fully functional **Job Portal** built with **React.js**. It is part of the complete **MERN Stack Job Portal** application.

The frontend connects with the backend APIs to enable features like **authentication**, **role-based dashboards**, **job listings**, **job applications**, and more.

---

## 🔧 Tech Stack

- **React.js** (with React Router DOM)
- **Zustand** (Global state management)
- **Tailwind CSS** (UI Styling)
- **Axios** (API Requests)

---

## 🚀 Features

### ✅ Authentication

- JWT-based login & signup
- Role-Based Access Control (RBAC)
- Authenticated routing with protected routes

### 🧑‍💼 Role-Based Dashboards

- **Employer Dashboard**:

  - Post jobs
  - View & manage job listings
  - View applicants
  - View job

- **Job Seeker Dashboard**:
  - View & apply for jobs
  - Track application status
  - Manage profile and settings

### 💼 Job Listings

- Create, Read, Update, Delete (CRUD) Jobs _(Employer only)_
- Search & Filter jobs by title, location, category, and type
- Job detail view

### 📄 Applications

- Job Seekers can apply to jobs
- Employers can view applicants for each job

### 🎨 UI/UX Improvements

- Light/Dark mode toggle (with Zustand)
- Reusable components for cards, modals, buttons, etc.
- Responsive design

---

## 📦 Folder Structure

```bash
├── public
├── src
│   ├── assets
│   ├── components
│   ├── constants
│   ├── hooks
│   ├── layouts
│   ├── pages
│   ├── services
│   ├── store
│   ├── utils
│   └── App.jsx
```
