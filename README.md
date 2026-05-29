# Expense Tracker

Full-stack expense tracking application built for CSC 202 Group Project.

---

# Tech Stack

## Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS

## Backend
- Node.js
- Express
- Prisma ORM
- PostgreSQL (Neon Database)

---

# Project Structure

```plaintext
expense-tracker/
│
├── app/                    → Frontend pages (Next.js App Router)
├── app/api                 → Frontend API routes (if needed)
├── components/             → Reusable UI components
├── lib/                    → Utility/helper functions
├── public/                 → Static assets
├── styles/                 → Global styles
│
├── backend/
│   ├── prisma/             → Prisma schema + migrations
│   ├── src/
│   │   ├── controllers/    → Business logic
│   │   ├── routes/         → API routes
│   │   ├── middleware/     → Validation/error middleware
│   │   ├── config/         → DB and environment config
│   │   ├── services/       → Shared backend services
│   │   ├── utils/          → Utility functions
│   │   ├── app.ts          → Express app setup
│   │   └── server.ts       → Server entry point
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
└── README.md
```

---

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/adeferanmi/Expense-Tracker.git
cd expense-tracker
```

---

# Frontend Setup

## Install frontend dependencies

```bash
npm install
```

## Run frontend

```bash
npm run dev
```

Frontend runs at:

```plaintext
http://localhost:3000
```

---

# Backend Setup

## Navigate into backend

```bash
cd backend
```

---

## Install backend dependencies

```bash
npm install
```

---

# Prisma Setup

## Initialize Prisma

```bash
npx prisma init
```

---

# Environment Variables

Create a `.env` file inside `/backend`

Example:

```env
DATABASE_URL="your_neon_database_url"
PORT=5000
```

---

# Neon Database

We are using PostgreSQL through Neon.

Official Website:
https://neon.tech

---

# Prisma Migration

After editing `schema.prisma`:

```bash
npx prisma migrate dev --name init
```

---

# Generate Prisma Client

```bash
npx prisma generate
```

---

# Run Backend Development Server

```bash
npm run dev
```

Expected backend server:

```plaintext
http://localhost:5000
```

---

# Git Branch Strategy

```plaintext
main → stable production version
dev → active development branch
feature/* → individual feature branches
```

Examples:

```plaintext
feature/expense-core
feature/analytics
feature/middleware-validation
```

---

# Git Workflow Rules

- Do NOT push directly to `main`
- Create feature branches for all work
- Open Pull Requests into `dev`
- Pull latest `dev` before creating new branches

---

# Development Workflow

## Before starting work

```bash
git checkout dev
git pull origin dev
```

---

## Create feature branch

```bash
git checkout -b feature/your-feature-name
```

---

## Commit changes frequently

Good examples:

```plaintext
Setup Prisma configuration
Add expense routes
Implement create expense controller
Add validation middleware
```

---

## Push feature branch

```bash
git push -u origin feature/your-feature-name
```

---

# Important Rules

- Do NOT commit `node_modules`
- Do NOT commit `.env`
- Run `npm install` after cloning
- Keep commits small and meaningful
- Test endpoints before opening PRs

---

# Contribution Requirements

Each member should:
- Make regular commits
- Use Pull Requests
- Work on assigned branches
- Keep contribution history visible
