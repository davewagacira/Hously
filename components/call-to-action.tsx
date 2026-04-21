"use client"

import { ArrowRight } from "lucide-react"
import { HighlightedText } from "./highlighted-text"

export function CallToAction() {
  return (
    <section
      id="contact"
      className="bg-[color:color-mix(in_oklch,var(--foreground)_92%,black_8%)] py-20 text-primary-foreground sm:py-24 md:py-29 dark:bg-[color:color-mix(in_oklch,var(--background)_70%,black_30%)]"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="mb-8 text-sm uppercase tracking-[0.3em] text-white/60">Start a Project</p>

          <h2 className="mb-8 text-3xl font-medium leading-[1.06] tracking-tight text-balance text-white sm:text-4xl lg:text-6xl">
            Ready to create
            <br />
            something <HighlightedText>extraordinary</HighlightedText>?
          </h2>

          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/72 sm:mb-12 sm:text-lg md:text-xl">
            Let's discuss how we can bring your vision to life. Every great space begins with a conversation.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="mailto:hello@hously.com"
              className="group inline-flex items-center justify-center gap-3 bg-primary-foreground px-6 py-4 text-sm tracking-wide text-foreground transition-colors duration-300 hover:bg-primary-foreground/90 sm:px-8"
            >
              Begin the conversation
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="tel:+1234567890"
              className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 px-6 py-4 text-sm tracking-wide transition-colors duration-300 hover:bg-primary-foreground/10 sm:px-8"
            >
              Schedule a call
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
