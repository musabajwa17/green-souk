# Quick NextAuth Guide

## ✅ Current Status: FULLY IMPLEMENTED

NextAuth.js is **already set up and working** in your application!

## What's Working

- ✅ Email/Password authentication
- ✅ User registration
- ✅ User login
- ✅ Session management (JWT)
- ✅ Protected routes
- ✅ User-specific data (each user sees only their songs)

## Quick Test

1. **Start the server:**
   ```bash
   npm run dev
   ```

2. **Register a user:**
   - Go to `http://localhost:3000/login`
   - Click "Sign Up" tab
   - Fill in: Name, Email, Phone, Password
   - Submit

3. **Login:**
   - Use the email/password you just created
   - You'll be redirected to the homepage

4. **Check session:**
   - Your email/name should appear in the header
   - Access `/favorites` to see your songs

## Environment Variables Required

Make sure `.env` has:

```env
NEXTAUTH_SECRET="generate-a-random-32-character-string"
NEXTAUTH_URL="http://localhost:3000"
DATABASE_URL="mongodb://localhost:27017/greensouq"
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

## Files Involved

- `lib/auth.ts` - NextAuth configuration
- `auth.ts` - NextAuth instance
- `app/api/auth/[...nextauth]/route.ts` - API route handler
- `app/login/page.tsx` - Login/Register UI
- `components/SessionProvider.tsx` - Session wrapper

## How to Use in Your Code

### Check if user is logged in:
```typescript
"use client"
import { useSession } from "next-auth/react"

const { data: session, status } = useSession()
if (session) {
  // User is logged in
  console.log(session.user.email)
}
```

### Protect API routes:
```typescript
import { auth } from "@/auth"

const session = await auth()
if (!session) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}
```

### Logout:
```typescript
import { signOut } from "next-auth/react"
signOut()
```

## That's It!

Your authentication is ready to use. See `NEXTAUTH_SETUP.md` for advanced configuration.

