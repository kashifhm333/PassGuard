# 🛡️ PassGuard - Full-Stack Password Manager

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-Supported-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-k8s-326CE5?logo=kubernetes&logoColor=white)](https://kubernetes.io/)

PassGuard is a modern, responsive, full-stack password manager application designed for seamless local credential management. Built with a React & Vite frontend, Express API backend, and MongoDB database, PassGuard supports full CRUD functionality (Create, Read, Update, Delete) with interactive copy-to-clipboard actions and animated UI components. The application is production-ready with multi-stage Docker builds and Kubernetes deployment manifests.

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Folder Structure](#-folder-structure)
- [Local Development (Node Server)](#-local-development-node-server)
  - [Prerequisites](#prerequisites)
  - [1. Backend Setup](#1-backend-setup)
  - [2. Frontend Setup](#2-frontend-setup)
- [API Reference](#-api-reference)
- [Docker & Containerization](#-docker--containerization)
- [Kubernetes Deployment](#-kubernetes-deployment)
- [License](#-license)

---

## 🔒 Project Overview

**PassGuard** delivers a streamlined password management interface allowing users to securely add, view, update, delete, and copy site credentials (URLs, usernames, passwords).

### Core Features
- ⚡ **Lightning Fast React UI**: Powered by Vite 8 and React 19 with instant Hot Module Replacement (HMR).
- 🎨 **Modern Styling**: Tailwind CSS v4 styling with responsive layouts, dark aesthetics, and animated icons via LordIcon.
- 🔄 **Full CRUD Persistence**: Express.js REST API with Mongoose schema validation connected to a MongoDB database.
- 🐳 **Enterprise DevOps Ready**:
  - **Frontend Dockerfile**: Multi-stage build (Node.js compilation -> Alpine Nginx web server).
  - **Backend Dockerfile**: Multi-stage build targeting Google Distroless (`gcr.io/distroless/nodejs20-debian12`) for minimal attack surface.
  - **Kubernetes Ready**: Manifests organized under `k8s/` for namespace isolation, deployment, and NodePort exposure.

---

## ⚙️ Architecture & Tech Stack

```
   ┌─────────────────────────────────────────────────────────────┐
   │                      Browser / Client                       │
   └──────────────────────────────┬──────────────────────────────┘
                                  │
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │             React 19 + Vite Frontend (Port 5173 / 80)       │
   └──────────────────────────────┬──────────────────────────────┘
                                  │  REST API (HTTP / JSON)
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │             Express.js Node Backend (Port 3000)             │
   └──────────────────────────────┬──────────────────────────────┘
                                  │  Mongoose Connection
                                  ▼
   ┌─────────────────────────────────────────────────────────────┐
   │                 MongoDB Database (Port 27017)               │
   └──────────────────────────────┬──────────────────────────────┘
```

| Layer | Technology / Tools | Description |
| :--- | :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS v4, LordIcon | Single Page Application providing interactive credential UI |
| **Backend** | Node.js v20, Express 5, Mongoose, dotenv, cors | RESTful API server handling business logic & database queries |
| **Database** | MongoDB 7.x | NoSQL database storing credential records |
| **DevOps / Infra** | Docker, Nginx, Kubernetes, Distroless | Multi-stage containerization & orchestration manifests |

---

## 📁 Folder Structure

Here is a detailed breakdown of the PassGuard codebase directory tree:

```
Password Manager/
├── backend/                        # Node.js / Express backend service
│   ├── .env                        # Backend environment configuration (PORT, MONGO_URI)
│   ├── Dockerfile                  # Multi-stage Docker build targeting Google Distroless runtime
│   ├── package.json                # Node dependencies for server (express, mongoose, cors, dotenv)
│   ├── package-lock.json           # Locked backend dependency tree
│   └── server.js                   # Express server entry point & MongoDB CRUD endpoints
│
├── k8s/                            # Kubernetes deployment manifests
│   ├── namespace.yaml              # Creates isolated 'passguard' namespace
│   ├── mongo.yaml                  # Deployment & ClusterIP service for MongoDB (Port 27017)
│   ├── backend.yaml                # Deployment & NodePort service for Express API (Port 3000 -> 30300)
│   └── frontend.yaml               # Deployment & NodePort service for Nginx Frontend (Port 80 -> 30080)
│
├── public/                         # Static assets served directly by Vite / Nginx
│   └── favicon.png                 # Application browser icon
│
├── src/                            # React frontend source code
│   ├── assets/                     # UI graphics and static icons
│   ├── components/                 # Reusable React components
│   │   ├── Navbar.jsx              # Application navigation header with brand logo & GitHub link
│   │   ├── Manager.jsx             # Main password management dashboard (Form + Data Table + Actions)
│   │   └── Footer.jsx              # Footer component with branding and credits
│   ├── App.css                     # Global custom styles and overrides
│   ├── App.jsx                     # Core application layout wrapper
│   ├── index.css                   # Tailwind CSS imports & global directives
│   └── main.jsx                    # React DOM render entry point
│
├── .gitignore                      # Git exclusion file (node_modules, dist, env files)
├── Dockerfile                      # Multi-stage build for React frontend (Vite build -> Nginx Alpine)
├── eslint.config.js                # ESLint configuration for code quality rules
├── index.html                      # Single Page Application HTML entry point
├── nginx.conf                      # Nginx reverse proxy server configuration for production / k8s
├── package.json                    # Frontend Node dependencies (React, Vite, Tailwind CSS)
├── package-lock.json               # Locked frontend dependency tree
├── README.md                       # Project documentation
└── vite.config.js                  # Vite build configuration & plugins
```

---

## 🚀 Local Development (Node Server)

Follow these step-by-step instructions to set up and run the project on your local machine using Node.js.

### Prerequisites

Ensure you have the following installed on your system:
- **Node.js** (v18.x or v20.x recommended): [Download Node.js](https://nodejs.org/)
- **npm** (v9.x or higher, usually comes with Node.js)
- **MongoDB**: A running MongoDB instance locally (port `27017`) or a MongoDB Atlas URI connection string.

---

### 1. Backend Setup

1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Create or verify the `.env` configuration file in the `backend/` directory with the following variables:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/PassGuard
   ```

4. Start the backend Node server:
   ```bash
   node server.js
   ```
   *Output:*
   ```text
   Server is running on port 3000
   Connected to MongoDB Successfully
   ```

---

### 2. Frontend Setup

1. Open a **new terminal tab/window** and navigate to the project root directory:
   ```bash
   cd "Password Manager"
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server using:
   ```bash
   npm run dev
   ```

4. Access the web application in your browser at:
   ```text
   http://localhost:5173
   ```

---

## 📡 API Reference

The backend exposes a REST API at `http://localhost:3000/` for managing password credentials:

| Method | Endpoint | Description | Request Body Example |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | Fetch all saved passwords | *None* |
| **POST** | `/` | Save a new password entry | `{ "id": "uuid", "site": "example.com", "username": "user", "password": "pass" }` |
| **PUT** | `/` | Update an existing password entry | `{ "id": "uuid", "site": "example.com", "username": "user", "password": "newpass" }` |
| **DELETE** | `/` | Delete a password entry by ID | `{ "id": "uuid" }` |

---

## 🐳 Docker & Containerization

### Building & Running with Docker

#### Frontend Container
```bash
# Build Frontend Image
docker build -t passguard-frontend:latest .

# Run Frontend Container on port 80
docker run -d -p 80:80 --name passguard-frontend passguard-frontend:latest
```

#### Backend Container
```bash
# Build Backend Image (Google Distroless runtime)
cd backend
docker build -t passguard-backend:latest .

# Run Backend Container on port 3000
docker run -d -p 3000:3000 --env MONGO_URI="mongodb://host.docker.internal:27017/PassGuard" --name passguard-backend passguard-backend:latest
```

---

## ☸️ Kubernetes Deployment

Deploy the full application stack into a Kubernetes cluster (e.g., KIND, Minikube, or Cloud K8s):

1. **Apply Namespace and Manifests**:
   ```bash
   kubectl apply -f k8s/namespace.yaml
   kubectl apply -f k8s/mongo.yaml
   kubectl apply -f k8s/backend.yaml
   kubectl apply -f k8s/frontend.yaml
   ```

2. **Verify Resources**:
   ```bash
   kubectl get pods -n passguard
   kubectl get svc -n passguard
   ```

3. **Access Services**:
   - **Frontend Service**: Available via NodePort `30080` (`http://localhost:30080`)
   - **Backend Service**: Available via NodePort `30300` (`http://localhost:30300`)

---

## 📝 License

This project is open-source and available under the [ISC License](LICENSE).
