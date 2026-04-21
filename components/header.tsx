"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const isDark = mounted ? theme !== "light" : true
  const toggleTheme = () => setTheme(isDark ? "light" : "dark")
  const navLinkClass = cn(
    "hover:text-[rgb(251,146,60)] transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 hover:after:w-full after:bg-[rgb(251,146,60)] after:transition-all after:duration-300",
    scrolled || mobileMenuOpen ? "text-foreground" : "text-white",
  )
  const mobileTextClass = cn("transition-colors duration-300", scrolled || mobileMenuOpen ? "text-foreground" : "text-white")

  return (
    <header
      className={cn(
        "fixed z-50 transition-all duration-500 my-0 py-0 rounded-none",
        scrolled || mobileMenuOpen
          ? "surface-shell py-4 top-4 left-4 right-4 rounded-2xl"
          : "bg-transparent py-4 top-0 left-0 right-0",
      )}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between md:px-12">
        <Link href="/" className="flex items-center gap-2 group" onClick={scrollToTop}>
          <img src="/images/hously-logo.svg" alt="Hously" width={120} height={32} className="w-auto h-6" />
        </Link>

        <ul className="hidden md:flex items-center gap-10 text-sm tracking-wide">
          {[
            { label: "Home", href: "#hero" },
            { label: "Philosophy", href: "#about" },
            { label: "Projects", href: "#projects" },
            { label: "What we do", href: "#services" },
            { label: "FAQ", href: "#faq" },
          ].map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={navLinkClass}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/70 text-foreground transition-all duration-300 hover:border-[rgb(251,146,60)] hover:text-[rgb(251,146,60)]"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <Link
            href="#contact"
            className={cn(
              "inline-flex items-center gap-2 rounded-full text-sm px-5 py-2.5 transition-all duration-300",
              isDark
                ? "bg-white text-black border border-white/20 hover:bg-[rgb(251,146,60)] hover:text-black"
                : "bg-foreground text-white border border-foreground/15 hover:bg-[rgb(251,146,60)] hover:text-black",
            )}
          >
            Get in touch
          </Link>
        </div>

        <button
          className={cn("md:hidden z-50 transition-colors duration-300", mobileTextClass)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </svg>
          )}
        </button>
      </nav>

      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "max-h-[600px] opacity-100 mt-8" : "max-h-0 opacity-0",
        )}
      >
        <div className="container mx-auto px-6">
          <ul className="flex flex-col gap-6 mb-8">
            {[
              { label: "Home", href: "#hero" },
              { label: "Philosophy", href: "#about" },
              { label: "Projects", href: "#projects" },
              { label: "What we do", href: "#services" },
              { label: "FAQ", href: "#faq" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "hover:text-[rgb(251,146,60)] transition-colors duration-300 text-4xl font-light block",
                    mobileTextClass,
                  )}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 mb-4">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/70 text-foreground transition-all duration-300 hover:border-[rgb(251,146,60)] hover:text-[rgb(251,146,60)]"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <Link
              href="#contact"
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-full text-sm px-5 py-2.5 transition-all duration-300",
                isDark
                  ? "bg-white text-black border border-white/20 hover:bg-[rgb(251,146,60)] hover:text-black"
                  : "bg-foreground text-white border border-foreground/15 hover:bg-[rgb(251,146,60)] hover:text-black",
              )}
              onClick={closeMobileMenu}
            >
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
