"use client"

import React, { createContext, useContext, useState } from "react"

type MobileMenuContextType = {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (v: boolean) => void
}

const MobileMenuContext = createContext<MobileMenuContextType | undefined>(undefined)

export function MobileMenuProvider({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <MobileMenuContext.Provider value={{ mobileMenuOpen, setMobileMenuOpen }}>
      {children}
    </MobileMenuContext.Provider>
  )
}

export function useMobileMenu() {
  const ctx = useContext(MobileMenuContext)
  if (ctx) return ctx

  // Fallback when provider isn't present: local state so Header still works standalone
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return { mobileMenuOpen, setMobileMenuOpen }
}

export default MobileMenuContext
