# Greensouq E-commerce Application

A modern Next.js e-commerce application with user authentication and favorites functionality.

## Features

- 🏠 **Homepage** - Product listings with hover effects
- 🛍️ **Product Page** - Dynamic image gallery with thumbnail navigation
- 🔐 **Authentication** - User registration and login with NextAuth.js
- ❤️ **Favorites** - Save and manage favorite songs
- 📱 **Responsive Design** - Mobile-friendly UI with TailwindCSS

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js v5
- **Styling**: TailwindCSS
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd greensouq
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
DATABASE_URL="mongodb://localhost:27017/greensouq"
# OR for MongoDB Atlas:
# DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/greensouq"

NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

4. Test MongoDB connection:
```bash
npm run db:test
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
greensouq/
├── app/                 # Next.js app router pages
│   ├── api/            # API routes
│   ├── favorites/      # Favorites page
│   ├── login/          # Login/Register page
│   └── product/        # Product detail page
├── components/         # React components
├── lib/                # Utility functions
│   ├── auth.ts        # NextAuth configuration
│   └── mongodb.ts     # MongoDB connection
├── models/             # Mongoose models
│   ├── User.ts
│   └── FavoriteSong.ts
└── public/             # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:test` - Test MongoDB connection

## Features Overview

### Authentication
- User registration with email, password, name, and phone
- Secure login with NextAuth.js
- JWT-based session management
- Protected routes

### Favorites
- Add favorite songs
- View all favorites
- Delete favorites
- User-specific favorites

## License

MIT
