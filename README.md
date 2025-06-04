# Hjort Restaurant CMS

This is the internal content management system for Hjort Restaurant. It allows administrators to manage course and drink menus, as well as view and handle reservations.

## ✨ Features

- 🔐 Login-based access control (token-authenticated)
- 📅 View all table reservations
- 🔢 Edit course and drink menus
- 📊 UI feedback for validation and error handling
- 📱 Fully responsive layout for both desktop and mobile use

## 🛠 Tech Stack

- **TypeScript**
- **SCSS**
- **HTML (multi-page, no frontend framework)**
- **Vite** (bundler)

## 🧱 Project Structure

```plaintext
src/
├── pages/                 # HTML pages: login, menus, reservations
├── ts/                    # TypeScript modules
│   ├── edit_menu/         # Logic for rendering/editing menus
│   ├── reservations/      # Logic for rendering reservations
│   ├── login/             # Login logic
│   ├── utils/             # Shared helpers (API, DOM, errors, UI)
│   └── types/             # Shared type definitions
├── styles/                # SCSS styles
└── assets/                # Icons and illustrations
```

## 🧪 Running Locally

### 🧰 Prerequisites

- [Node.js](https://nodejs.org/)
- Git

### 🔧 Step 1: Clone the project

```bash
git clone https://github.com/RobinHawiz/hjort-cms.git
cd hjort-cms
```

### 🚀 Step 2: Run the application

```bash
npm install
npm run dev
```

The CMS now runs locally on [http://localhost:5173](http://localhost:5173) via Vite.

> 🔐 **Note:** The CMS expects an active backend API running separately on `localhost:4000`.  
> You can find the backend repository here: [hjort-backend](https://github.com/RobinHawiz/hjort-backend).
> To access all CMS functionalities, teachers and reviewers must request login credentials directly from the developer.
> However, if running the project locally, it is also possible to create an admin account by executing `node registerAdminUser.js` from the backend root.
