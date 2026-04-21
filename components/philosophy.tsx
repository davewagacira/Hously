"use client"

import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./highlighted-text"

const philosophyItems = [
  {
    title: "Minimal, not empty",
    description:
      "Every element has purpose and space to breathe. We remove the unnecessary to reveal what truly matters.",
  },
  {
    title: "Architecture-led design",
    description:
      "Layouts inspired by structure, rhythm, and materiality. Buildings that speak through proportion and light.",
  },
  {
    title: "Subtle motion",
    description:
      "Motion supports the experience, never distracts. Movement that feels natural, like light shifting through a room.",
  },
  {
    title: "Timeless aesthetic",
    description: "Elegant, calm, and enduring visual language. Designs that transcend trends and age with grace.",
  },
]

export function Philosophy() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-20 sm:py-24 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          {/* Left column - Title and image */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Our Philosophy</p>
            <h2 className="mb-6 text-4xl font-medium leading-[1.08] tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-8xl">
              Design with
              <br />
              <HighlightedText>intention</HighlightedText>
            </h2>

            <div className="relative hidden lg:block">
              <img
                src="/assets/images/exterior.png"
                alt="Architectural sketch of home office workspace"
                className="opacity-90 relative z-10 w-auto h-auto"
              />
            </div>
          </div>

          {/* Right column - Description and Philosophy items */}
          <div className="space-y-6 lg:pt-48">
            <p className="mb-10 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Architecture is more than structure — it's how we experience the world. We create spaces that nurture the
              human spirit.
            </p>

            {philosophyItems.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-4 sm:gap-6">
                  <span className="text-muted-foreground/50 text-sm font-medium">0{index + 1}</span>
                  <div>
                    <h3 className="mb-3 text-lg font-medium sm:text-xl">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
