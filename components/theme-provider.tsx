"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Force initial theme application to prevent flash
  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light"
    document.documentElement.classList.toggle("dark", savedTheme === "dark")
  }, [])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
