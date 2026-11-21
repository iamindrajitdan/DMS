# DMS Web Application

This is the frontend application for the Document Management System (DMS), built with [Next.js](https://nextjs.org) and React.

## Getting Started

First, make sure that the backend services (API, PostgreSQL, Redis, MinIO) are running via Docker Compose in the root directory.

Then, install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Features

- **Document Upload**: Upload and store files securely (integrated with MinIO).
- **Search**: Fast text-based search to find documents by title, description, or metadata.
- **Organization & Folders**: Organize documents efficiently.
- **Role-Based Access Control**: Secure access to documents based on user roles and permissions.

## Technologies Used

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS / Custom CSS
- **API Communication**: Next.js Server Actions / Client-side fetching

## Project Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/components`: Reusable UI components.
- `src/lib`: Utility functions and shared logic.

## Environment Variables

Copy `.env.example` to `.env` (if applicable) and configure your environment variables:
- `NEXT_PUBLIC_API_URL`: The URL for the backend API.
