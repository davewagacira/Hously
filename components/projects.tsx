"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Villa Serena",
    category: "Residential",
    location: "Malibu, California",
    year: "2024",
    image: "/assets/images/hously-1.png",
  },
  {
    id: 2,
    title: "The Glass Pavilion",
    category: "Commercial",
    location: "Tokyo, Japan",
    year: "2023",
    image: "/assets/images/hously-2.png",
  },
  {
    id: 3,
    title: "Casa Terra",
    category: "Residential",
    location: "Lisbon, Portugal",
    year: "2023",
    image: "/assets/images/hously-3.png",
  },
  {
    id: 4,
    title: "Nordic Retreat",
    category: "Hospitality",
    location: "Oslo, Norway",
    year: "2024",
    image: "/assets/images/hously-4.png",
  },
]

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [revealedImages, setRevealedImages] = useState<Set<number>>(new Set())
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setRevealedImages((prev) => new Set(prev).add(projects[index].id))
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="bg-secondary/50 py-20 sm:py-24 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-6 text-sm uppercase tracking-[0.3em] text-muted-foreground">Selected Works</p>
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">Featured Projects</h2>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground group"
          >
            View all projects
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div ref={(el) => (imageRefs.current[index] = el)} className="relative mb-6 aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className={`h-full w-full object-cover transition-transform duration-700 ${
                    hoveredId === project.id ? "scale-105" : "scale-100"
                  }`}
                />
                <div
                  className="absolute inset-0 origin-top bg-primary"
                  style={{
                    transform: revealedImages.has(project.id) ? "scaleY(0)" : "scaleY(1)",
                    transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="mb-2 text-lg font-medium underline-offset-4 group-hover:underline sm:text-xl">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {project.category} · {project.location}
                  </p>
                </div>
                <span className="shrink-0 text-sm text-muted-foreground/60">{project.year}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
