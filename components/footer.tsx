import Link from "next/link"
import { Code } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-16 md:py-24 border-t border-border">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <img src="/images/hously-logo.svg" alt="Hously" width={120} height={32} className="w-auto h-6" />
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              We design spaces that elevate living. A refined architectural experience where form, light, and intention
              meet.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">Studio</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="#projects" className="hover:text-foreground transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-foreground transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4">Connect</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="mailto:hello@hously.com" className="hover:text-foreground transition-colors">
                  hello@hously.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="hover:text-foreground transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>&copy; 2025 Hously. All rights reserved.</p>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex gap-6">
              <Link href="#" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="#" className="hover:text-foreground transition-colors">
                Terms
              </Link>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Code className="h-4 w-4 text-red-500" />
              <span>Developed by</span>
              <a
                href="https://codeverseke.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 bg-gradient-to-r from-red-600 to-blue-500 bg-clip-text font-bold text-transparent transition-opacity hover:opacity-80"
              >
                CodeVerse
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
