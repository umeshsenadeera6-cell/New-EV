# Setup Instructions (Restructured for Vercel)

To get the EV Charging Station Management System running on your local machine or deploy it to Vercel, follow these steps:

## Prerequisites
- Node.js (v18+)
- npm or yarn
- MongoDB (Local or Atlas)

## Project Structure
- `/`: Frontend (Next.js)
- `/server`: Backend (Node.js/Express)

## Running Locally

### Backend Setup
1. Open a terminal and navigate to the server directory:
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
4. Start the server:
   ```bash
   node server.js
   ```

### Frontend Setup
1. Open a **second** terminal and stay in the root directory:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000).

## Vercel Deployment
1. Connect your GitHub repository to Vercel.
2. Vercel will auto-detect the Next.js application in the root.
3. No manual "Root Directory" settings are needed anymore.
4. **Environment Variables**: Add your backend API URL in Vercel if it's deployed separately.
