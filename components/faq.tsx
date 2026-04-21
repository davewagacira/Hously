"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Where are your projects located?",
    answer:
      "While our studio is based in San Francisco, we work on projects throughout Northern California and select locations nationwide. We believe in creating architecture that responds to its specific context and community.",
  },
  {
    question: "What is your design process timeline?",
    answer:
      "Project timelines vary based on scope and complexity. A typical residential project takes 6-12 months from initial concept to construction documentation. We work closely with clients to establish realistic timelines that allow for thoughtful design development.",
  },
  {
    question: "How do you approach sustainable design?",
    answer:
      "Sustainability is integral to our practice, not an add-on. We prioritize passive design strategies, material selection, energy efficiency, and longevity. Every project is designed to minimize environmental impact while maximizing occupant comfort and connection to nature.",
  },
  {
    question: "What services do you offer?",
    answer:
      "We provide comprehensive architectural services including master planning, schematic design, design development, construction documentation, and construction administration. We can tailor our services to meet your project's specific needs.",
  },
  {
    question: "Do you work with existing structures?",
    answer:
      "Absolutely. We enjoy the challenge of adaptive reuse and renovation projects. Whether it's a historic preservation or a modern addition, we approach existing structures with respect while bringing them into dialogue with contemporary living.",
  },
  {
    question: "How do we get started?",
    answer:
      "Begin with an initial consultation where we discuss your vision, site, budget, and timeline. This helps us understand if we're the right fit for your project. From there, we'll outline a customized scope of work and fee proposal.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-18 sm:py-22 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-12 max-w-3xl sm:mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">FAQ</p>
          <h2 className="mb-6 text-4xl font-medium leading-[1.08] tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl">
            Questions & Answers
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="group flex w-full items-start justify-between gap-4 py-5 text-left sm:gap-6 sm:py-6"
              >
                <span className="text-base font-medium text-foreground transition-colors group-hover:text-foreground/70 sm:text-lg">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="pb-6 pr-4 leading-relaxed text-muted-foreground sm:pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
