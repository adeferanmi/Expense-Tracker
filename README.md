# Expense Tracker 

---

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Node.js (via Next.js API routes)
- Tailwind CSS (if enabled)

---

## Project Structure

/app              → UI pages (App Router)
/app/api          → Backend API routes
/components       → Reusable UI components
/lib              → Utility functions (helpers, db, etc)
/public           → Static assets
/styles           → Global styles (if used)

---

##  Installation

### 1. Clone repository

git clone https://github.com/adeferanmi/Expense-Tracker.git
cd expense-tracker

### 2. Install dependencies
npm install

###3. Run development server
npm run dev

App runs at:
http://localhost:3000

## Git Branch Strategy
main → stable production version
dev → development branch

### Important
Do NOT commit node_modules
Always ignore .env files
Run npm install after cloning
