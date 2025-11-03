# Errand Platform

A marketplace platform that connects users who need tasks done with verified agents who can perform those errands.

## Architecture

- **Frontend**: React + Vite (deployed on Netlify)
- **Backend**: Node.js + Express (deployed on Render)
- **Database**: MongoDB Atlas
- **Real-time**: Socket.io for live updates

## Features

- Task posting and bidding system
- Agent verification
- Location-based matching
- Real-time notifications
- User and agent dashboards
- Subscription management

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Axios for API calls
- Leaflet for maps
- Socket.io-client for real-time features

### Backend
- Node.js + Express
- MongoDB with Mongoose
- Socket.io for real-time communication
- CORS for cross-origin requests

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd errand
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ..
   npm install
   cp .env.example .env
   # Edit .env with your backend URL
   npm run dev
   ```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Environment Variables

### Backend (.env)
```
NODE_ENV=development
PORT=5000
MONGODB_URL=your_mongodb_connection_string
SERVER_MESSAGE=Welcome to Errand Platform Backend!
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:5000
```

## API Endpoints

- `GET /` - Health check
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks/create` - Create new task
- `GET /api/agents` - Get all agents
- `POST /api/bids` - Place a bid

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
