# 🌟 Fullstack Developer Assessment Solution

A complete fullstack application built with React, Node.js, MongoDB, and Redis featuring job queues, caching, and real-time data visualization.

## 🚀 Features

- **Backend**:
  - Node.js with TypeScript
  - REST API with Express
  - MongoDB with Prisma ORM
  - Redis for job queues and caching
  - Bull for job processing
  - Winston & Morgan for logging
  - Global error handling
  - CORS support

- **Frontend**:
  - React with TypeScript
  - TanStack Query for API calls
  - File-based routing
  - Recharts for data visualization
  - Tailwind CSS for styling
  - ESLint for code quality
 
  - **API Doc Link**:
  https://documenter.getpostman.com/view/26538515/2sB2x6msLB

## 📦 Installation

### Prerequisites
- Node.js v18+
- MongoDB
- Redis server (for job queues and caching)

```bash
# Clone the repository
git clone https://github.com/HaiVvolf777/Codistan.git
cd fullstack-assessment

# Install dependencies
npm run install-all

# Set up environment variables
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Start all services (dev mode)
npm run dev
⚙️ Configuration
Update these environment variables in backend/.env:

env
DATABASE_URL=""
PORT=5000
REDIS_HOST=localhost
REDIS_PORT=6379

🏗️ Project Structure
text
fullstack-assessment/
├── backend/               # Node.js backend
│   ├── src/              # Source code
│   │   ├── config/       # Configuration files
│   │   ├── controllers/  # Route controllers
│   │   ├── services/     # Business logic
│   │   ├── workers/      # Job workers
│   │   └── app.ts        # Express app
│   └── prisma/           # Database schema
├── frontend/             # React frontend
│   ├── src/              # Source code
│   │   ├── service/          # API clients
│   │   ├── components/   # UI components
│   │   ├── pages/        # Route pages
│   │   └── App.tsx       # Main app
└── package.json          # Workspace config
🧑‍💻 Development
Start all services simultaneously:

bash
npm start
Or start individually:

bash
# Backend only
npm run start-backend

# Frontend only
npm run start-frontend

# Worker only (for job processing)
npm run start-worker
🌐 API Endpoints
Method	Endpoint	Description
GET	/api/users	Get paginated users
GET	/api/users/:id	Get single user
POST	/api/users	Create new user
PUT	/api/users/:id	Update user
DELETE	/api/users/:id	Delete user
POST	/api/jobs	Create background job
GET	/api/jobs/:id	Get job status
📊 Dashboard Features
Real-time user statistics

Interactive charts with Recharts

Responsive design

Cached API calls

🔧 Troubleshooting
Redis connection issues:

bash
# Check if Redis is running
redis-cli ping

# Start Redis if not running
redis-server
