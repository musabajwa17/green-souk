"use client"

import { Suspense } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import LoginForm from "@/components/LoginForm"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-6 sm:py-8 lg:py-12 px-3 sm:px-4 bg-gray-50">
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <LoginForm />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}
