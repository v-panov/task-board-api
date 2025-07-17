# Task Board API

A Node.js RESTful API for a Trello-like task management application. This backend service provides endpoints for managing boards, lanes, cards, and comments with real-time updates via WebSockets.

## Features

- User authentication with JWT
- Board management (create, update, delete)
- Lane management (columns like "To Do", "In Progress", "Done")
- Card management (tasks within lanes)
- Comment functionality on cards
- Real-time updates via WebSockets
- PostgreSQL database with Sequelize ORM

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Sequelize** - ORM for database interactions
- **Socket.io** - Real-time WebSocket communication
- **JWT** - Authentication
- **Jest** - Testing framework

## Prerequisites

- Node.js (v10 or higher)
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/v-panov/task-board-api.git
   cd task-board-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the values in `.env` with your configuration

   Example `.env` file:
   ```
   NODE_ENV=development
   DATABASE_NAME=taskboard
   DATABASE_USER=postgres
   DATABASE_PASSWORD=123
   DATABASE_HOST=127.0.0.1
   DATABASE_PORT=5432
   DATABASE_DIALECT=postgres
   PORT=8081
   JWT_SECRET=your_secret_key
   ```

4. Start the development server:
   ```
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/sign-up` - Register a new user
- `POST /api/auth/sign-in` - Login and get authentication token

### Boards
- `GET /api/boards` - Get all boards
- `POST /api/boards` - Create a new board
- `PUT /api/boards` - Update a board
- `DELETE /api/boards/:id` - Delete a board

### Lanes
- `POST /api/lanes` - Create a new lane
- `PUT /api/lanes` - Update a lane
- `DELETE /api/lanes/:id` - Delete a lane

### Cards
- `POST /api/cards` - Create a new card
- `PUT /api/cards` - Update a card
- `DELETE /api/cards/:id` - Delete a card

### Comments
- `POST /api/comments` - Create a new comment
- `PUT /api/comments` - Update a comment
- `DELETE /api/comments/:id` - Delete a comment

### User
- `GET /api/user/me` - Get current user information

## Development

### Running Tests
```
npm test
```

### Docker
Build the Docker image:
```
npm run docker-build
```

Run the Docker container:
```
npm run docker-run
```
