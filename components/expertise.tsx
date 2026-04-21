"use client"

import { useEffect, useRef, useState } from "react"
import { Home, Building, Armchair, Trees } from "lucide-react"
import { HighlightedText } from "./highlighted-text"

const expertiseAreas = [
  {
    title: "Residential Design",
    description: "Creating homes that balance beauty with livability, where every space serves both form and function.",
    icon: Home,
  },
  {
    title: "Commercial Architecture",
    description:
      "Designing workspaces that inspire productivity and reflect the values of forward-thinking organizations.",
    icon: Building,
  },
  {
    title: "Interior Architecture",
    description:
      "Curating interiors that harmonize with their architectural shells, creating cohesive spatial experiences.",
    icon: Armchair,
  },
  {
    title: "Urban Planning",
    description:
      "Shaping communities through thoughtful integration of public spaces, structures, and natural elements.",
    icon: Trees,
  },
]

export function Expertise() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
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
      { threshold: 0.2 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-20 sm:py-24 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-14 max-w-3xl sm:mb-20">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">What We Do</p>
          <h2 className="mb-6 text-4xl font-medium leading-[1.08] tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-8xl">
            <HighlightedText>Expertise</HighlightedText> refined
            <br />
            through practice
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            Every project draws from decades of collective experience, resulting in architecture that is both innovative
            and timeless.
          </p>
        </div>

        <div className="grid gap-x-12 gap-y-10 sm:gap-y-12 md:grid-cols-2 md:gap-y-16">
          {expertiseAreas.map((area, index) => {
            const Icon = area.icon
            return (
              <div
                key={area.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`relative border-l border-border pl-6 transition-all duration-700 sm:pl-8 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div
                  className={`transition-all duration-1000 ${
                    visibleItems.includes(index) ? "animate-draw-stroke" : ""
                  }`}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <Icon className="mb-4 h-9 w-9 text-foreground sm:h-10 sm:w-10" strokeWidth={1.25} />
                </div>
                <h3 className="mb-4 text-lg font-medium sm:text-xl">{area.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{area.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
