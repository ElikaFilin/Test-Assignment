# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GrowCRM is a Real Estate Agency Management System built with:
- **Frontend**: React.js with Vite, Material UI, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB

## Commands

### Frontend (client/)
```bash
cd client
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
```

### Backend (server/)
```bash
cd server
npm install          # Install dependencies
npm run dev          # Start development server with nodemon
```

## Architecture

### Frontend Structure
- `/client/src/Pages/` - Main page components (Dashboard, Leads, Sales, etc.)
- `/client/src/Components/` - Reusable UI components
- `/client/src/ClientPanel/` - Client-facing components
- `/client/src/redux/` - Redux state management
- `/client/src/utils/` - Utility functions
- `/client/src/constant.js` - Application constants and configurations

### Backend Structure
- `/server/controllers/` - Business logic for handling requests
- `/server/models/` - MongoDB schema definitions
- `/server/routes/` - API route definitions
- `/server/middleware/` - Express middleware functions
- `/server/utils/` - Backend utilities
- `/server/uploads/` - File upload storage

### API Structure
All API routes are prefixed with `/api/v1/`:
- Auth: `/api/v1/auth/*`
- Users: `/api/v1/user/*`
- Leads: `/api/v1/lead/*`
- Sales: `/api/v1/sale/*`
- Tasks: `/api/v1/task/*`
- Projects: `/api/v1/project/*`
- Inventory: `/api/v1/inventory/*`

## Environment Setup
Both client and server require `.env` files. See `.env.example` in server directory for reference.

## Development Notes

### Key Features to Implement (from README):
1. Display time zone on top bar
2. Replace alert with form validation messages for Employee creation
3. Add client button and modal
4. Add client edit feature

### Tech Stack Details
- State Management: Redux Toolkit
- Routing: React Router v6
- Date handling: dayjs, moment, date-fns
- UI Components: MUI DataGrid, MUI Date Pickers
- PDF Generation: jspdf, react-pdf
- File uploads: Multer (backend)
- Authentication: JWT tokens