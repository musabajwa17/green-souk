# NextAuth.js Setup Guide

This application uses NextAuth.js v5 for authentication. The setup is already configured and working!

## Current Implementation

### ✅ What's Already Set Up

1. **Credentials Provider** - Email/Password authentication
2. **JWT Sessions** - Secure token-based sessions
3. **MongoDB Integration** - User data stored in MongoDB
4. **Password Hashing** - Using bcryptjs
5. **Protected Routes** - Pages require authentication
6. **Session Management** - 30-day session expiration

### 📁 File Structure

```
greensouq/
├── lib/
│   └── auth.ts              # NextAuth configuration
├── auth.ts                  # NextAuth instance export
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts # NextAuth API route
│   └── login/
│       └── page.tsx         # Login/Register page
├── components/
│   └── SessionProvider.tsx  # Session provider wrapper
└── types/
    └── next-auth.d.ts       # TypeScript type definitions
```

## Environment Variables

Make sure your `.env` file has:

```env
# Required
NEXTAUTH_SECRET="your-secret-key-here-generate-a-random-string"
NEXTAUTH_URL="http://localhost:3000"

# Database
DATABASE_URL="mongodb://localhost:27017/greensouq"

# Optional: Google OAuth (if you want to add Google login)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### Generate NEXTAUTH_SECRET

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Or use an online generator: https://generate-secret.vercel.app/32

## How It Works

### 1. Authentication Flow

1. User enters email/password on `/login`
2. Form submits to NextAuth's `signIn()` function
3. NextAuth calls the `authorize()` function in `lib/auth.ts`
4. User is verified against MongoDB
5. JWT token is created and stored
6. User is redirected to homepage

### 2. Session Management

- Sessions use JWT (JSON Web Tokens)
- Stored in HTTP-only cookies
- Valid for 30 days
- Automatically refreshed on activity

### 3. Protected Routes

Pages check authentication using:
```typescript
const { data: session, status } = useSession()

if (status === "unauthenticated") {
  router.push("/login")
}
```

## Adding OAuth Providers (Optional)

### Google OAuth Setup

1. **Create Google OAuth Credentials:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

2. **Add to `.env`:**
   ```env
   GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
   GOOGLE_CLIENT_SECRET="your-client-secret"
   ```

3. **Restart the server** - Google login will automatically appear!

### Other OAuth Providers

You can add more providers in `lib/auth.ts`:

```typescript
import GitHub from "next-auth/providers/github"
import Facebook from "next-auth/providers/facebook"

providers: [
  // ... existing providers
  GitHub({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  }),
  // ... more providers
]
```

## API Usage

### Server-Side (API Routes)

```typescript
import { auth } from "@/auth"

export async function GET() {
  const session = await auth()
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
  // Access user data
  const userId = session.user.id
  const userEmail = session.user.email
}
```

### Client-Side (Components)

```typescript
"use client"
import { useSession, signIn, signOut } from "next-auth/react"

export default function MyComponent() {
  const { data: session, status } = useSession()
  
  if (status === "loading") return <p>Loading...</p>
  if (status === "unauthenticated") return <p>Not logged in</p>
  
  return (
    <div>
      <p>Logged in as {session?.user?.email}</p>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  )
}
```

## Testing Authentication

1. **Register a new user:**
   - Go to `/login`
   - Click "Sign Up" tab
   - Fill in name, email, phone, password
   - Submit form

2. **Login:**
   - Go to `/login`
   - Enter email and password
   - Click "Login"

3. **Check session:**
   - After login, you should see your name/email in the header
   - Access `/favorites` (protected route)

4. **Logout:**
   - Click "Logout" in the header
   - You'll be redirected to login

## Troubleshooting

### "Invalid email or password"
- Check if user exists in database
- Verify password is hashed correctly
- Check MongoDB connection

### Session not persisting
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Clear browser cookies and try again

### OAuth not working
- Verify OAuth credentials are correct
- Check redirect URI matches exactly
- Ensure environment variables are loaded

## Security Best Practices

1. ✅ **Never commit `.env` file** - Already in `.gitignore`
2. ✅ **Use strong NEXTAUTH_SECRET** - Generate random 32+ character string
3. ✅ **HTTPS in production** - Always use HTTPS for production
4. ✅ **Password hashing** - Passwords are hashed with bcrypt
5. ✅ **JWT tokens** - Secure token-based sessions
6. ✅ **Input validation** - Email and password validation in place

## Next Steps

The authentication is fully functional! You can:

1. **Add more OAuth providers** (GitHub, Facebook, etc.)
2. **Customize session duration** - Edit `maxAge` in `lib/auth.ts`
3. **Add email verification** - Implement email verification flow
4. **Add password reset** - Create password reset functionality
5. **Add 2FA** - Implement two-factor authentication

## Need Help?

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [NextAuth.js v5 Migration Guide](https://authjs.dev/getting-started/migrating-to-v5)
- Check the console for error messages
- Verify all environment variables are set correctly

