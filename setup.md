# Setup Instructions

To get the EV Charging Station Management System running on your local machine, follow these steps:

## Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB (Local or Atlas)

## Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env`:
   ```bash
   PORT=5001
   MONGODB_URI=mongodb://localhost:27017/ev_charging_system
   JWT_SECRET=your_secret_key
   ```
4. (Optional) Seed the database with sample stations:
   ```bash
   node seed.js
   ```
5. Start the server:
   ```bash
   node server.js
   ```

## Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Default Admin Credentials
For testing purposes, you can create an admin user via the registration page or by modifying the `User` model role in the database.
