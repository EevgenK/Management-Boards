# Management Boards

**Management Boards** is a responsive, modern and minimalistic task board management application inspired by Kanban which allows create, edit, and organize boards and cards within columns using drag-and-drop.

## ✨ Features

- 🗃 Create and manage boards
- 📝 Create, edit, and delete cards
- 🔀 Drag and drop cards between columns
- ✅ Persistent Redux state
- 🔐 Input validation and user feedback
- 📱 Responsive layout (basic)

## ⚙️ Tech Stack

### 🔵 Frontend (/client)

- React 19, React Router v7
- Redux Toolkit & redux-persist
- Drag & Drop with @hello-pangea/dnd
- Yup for form validation
- Axios for API requests
- React Toastify for notifications
- Built with Vite

### 🔴 Backend (/server)

- Express.js v5
- MongoDB with Mongoose
- Joi for validation
- Pino for structured logging
- TypeScript + Esbuild
- .env for environment variables

## 📁 Project Structure

```bash
root/
├── client/   → Frontend (React + Vite + Redux Toolkit)
├── server/   → Backend (Express.js + MongoDB)
├── share/    → Common files
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- MongoDB instance (local or remote)
- Vercel CLI (optional for deployment)

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/EevgenK/Management-Boards
cd management-boards
```

2. Setup the backend:

```bash
cd server
npm install
cp .env.example .env  # create your environment variables
npm run dev
```

3. Setup the frontend:

```bash
cd ../client
npm install
npm run dev
```

### 📦 Build & Deployment

1. Frontend (/client):

```bash
npm run build       # or npm run vercel-build for Vercel
npm run preview     # optional, to preview the production build locally
```

2. Backend (/server):

```bash
npm run build
npm start           # runs compiled code from /dist
```

### 🧪 Linting

Run ESLint on both frontend and backend:

```bash
# frontend
cd client
npm run lint

# backend
cd ../server
npm run lint
```

## 👤 Author

Evgen Kulbachenko

👉 [More works and contact info](https://portfolio-react-gamma-orcin.vercel.app/)
