import Credentials from "next-auth/providers/credentials"
import connectDB from "./mongodb"
import User from "@/models/User"
import bcrypt from "bcryptjs"
import type { NextAuthConfig } from "next-auth"

export const authOptions: NextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-in-production",
  providers: [
    // Credentials Provider (Email/Password)
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required")
          }

          await connectDB()

          const user = await User.findOne({ email: credentials.email as string })

          if (!user) {
            throw new Error("Invalid email or password")
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          )

          if (!isPasswordValid) {
            throw new Error("Invalid email or password")
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name || undefined,
          }
        } catch (error: any) {
          console.error("Authorization error:", error)
          throw new Error(error.message || "Authentication failed")
        }
      }
    }),
    // To add Google OAuth, install: npm install @auth/core
    // Then import: import Google from "@auth/core/providers/google"
    // And uncomment the provider below with your Google credentials
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Handle OAuth sign-in (Google, etc.)
      if (account?.provider === "google") {
        try {
          await connectDB()
          
          // Check if user exists
          let dbUser = await User.findOne({ email: user.email })
          
          if (!dbUser) {
            // Create new user from OAuth
            dbUser = await User.create({
              email: user.email!,
              name: (user.name ?? profile?.name ?? "") as string,
              password: "", // OAuth users don't need password
            })
          }
          
          // Update user ID for session
          user.id = dbUser._id.toString()
        } catch (error) {
          console.error("OAuth sign-in error:", error)
          return false
        }
      }
      return true
    },
    async jwt({ token, user, account }) {
      // Initial sign in
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      
      // Update token with account info for OAuth
      if (account) {
        token.accessToken = account.access_token
      }
      
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string | null | undefined
      }
      return session
    }
  },
  events: {
    async signIn({ user, account, isNewUser }) {
      if (isNewUser && account?.provider === "credentials") {
        console.log(`New user signed up: ${user.email}`)
      }
    },
  },
  debug: process.env.NODE_ENV === "development",
}

