"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

function HeaderLogo() {
  const pixel = { fontFamily: "var(--font-pixel)" } as const
  const text = "text-lg font-bold tracking-tight select-none"
  return (
    <span className="wordmark-pulse">
      <span aria-label="Mere" style={pixel} className={`${text} text-foreground`}>
        Mere
      </span>
      <span aria-hidden="true" style={pixel} className={`wordmark-pulse__fill wordmark-pulse__fill--1 ${text}`}>
        Mere
      </span>
      <span aria-hidden="true" style={pixel} className={`wordmark-pulse__fill wordmark-pulse__fill--2 ${text}`}>
        Mere
      </span>
      <span aria-hidden="true" style={pixel} className={`wordmark-pulse__fill wordmark-pulse__fill--3 ${text}`}>
        Mere
      </span>
    </span>
  )
}

const navLinks = [
  { href: "/#pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/#playbooks", label: "Playbooks" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="relative z-10 py-6">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/">
            <HeaderLogo />
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4 text-sm">
          <a href="https://app.usemere.com/login" className="text-muted-foreground hover:text-foreground transition-colors">Sign in</a>
          <Button variant="outline" className="font-bold" nativeButton={false} render={<a href="https://app.usemere.com/register" />}>
            Get started
          </Button>
        </div>

        <button
          className="md:hidden text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border/30 mt-6">
          <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-4 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors py-1"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <hr className="border-border/30" />
            <a
              href="https://app.usemere.com/login"
              className="text-muted-foreground hover:text-foreground transition-colors py-1"
            >
              Sign in
            </a>
            <Button variant="outline" className="font-bold w-full" nativeButton={false} render={<a href="https://app.usemere.com/register" />}>
              Get started
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}
