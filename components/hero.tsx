"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowDown } from "lucide-react"

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [animationProgress, setAnimationProgress] = useState(0)
  const [animationComplete, setAnimationComplete] = useState(false)
  const accumulatedScrollRef = useRef(0)
  const displayedProgressRef = useRef(0)
  const targetProgressRef = useRef(0)
  const frameRef = useRef<number | null>(null)
  const touchStartY = useRef<number>(0)
  const lastTouchY = useRef<number>(0)

  useEffect(() => {
    const applyTransform = (progress: number) => {
      if (!contentRef.current) return

      const easedProgress = 1 - Math.pow(1 - progress, 1.6)
      const translateY = easedProgress * 220
      const rotationX = easedProgress * 22
      const scale = 1 - easedProgress * 0.18

      contentRef.current.style.transform = `translate3d(0, ${translateY}px, 0) rotateX(${rotationX}deg) scale(${scale})`
    }

    const animateToTarget = () => {
      const delta = targetProgressRef.current - displayedProgressRef.current
      const nextProgress = Math.abs(delta) < 0.001 ? targetProgressRef.current : displayedProgressRef.current + delta * 0.12

      displayedProgressRef.current = nextProgress
      setAnimationProgress(nextProgress)
      setAnimationComplete(targetProgressRef.current >= 1 && nextProgress >= 0.995)
      applyTransform(nextProgress)

      if (Math.abs(targetProgressRef.current - nextProgress) >= 0.001) {
        frameRef.current = window.requestAnimationFrame(animateToTarget)
      } else {
        frameRef.current = null
      }
    }

    const scheduleAnimation = () => {
      if (frameRef.current !== null) return
      frameRef.current = window.requestAnimationFrame(animateToTarget)
    }

    const updateProgress = (delta: number) => {
      accumulatedScrollRef.current = Math.max(0, Math.min(700, accumulatedScrollRef.current + delta))
      targetProgressRef.current = Math.max(0, Math.min(1, accumulatedScrollRef.current / 700))
      scheduleAnimation()
    }

    const handleWheel = (e: WheelEvent) => {
      const atTopOfPage = window.scrollY <= 0

      if (atTopOfPage && (targetProgressRef.current < 1 || e.deltaY < 0)) {
        e.preventDefault()
        updateProgress(e.deltaY)
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      lastTouchY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      const atTopOfPage = window.scrollY <= 0
      const currentTouchY = e.touches[0].clientY
      const deltaY = lastTouchY.current - currentTouchY

      if (atTopOfPage && (targetProgressRef.current < 1 || deltaY < 0)) {
        e.preventDefault()
        updateProgress(deltaY * 2.2)
      }

      lastTouchY.current = currentTouchY
    }

    applyTransform(0)

    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("touchstart", handleTouchStart, { passive: false })
    window.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  return (
    <section id="hero" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/images/hously-background.png"
          alt="Minimalist architectural interior"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div
        ref={contentRef}
        className="container mx-auto relative z-10 px-5 pb-0 pt-20 sm:px-6 md:px-12 md:pt-8 lg:pt-0"
        style={{
          willChange: "transform",
          transform: "translateY(0px)",
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="mb-44 sm:mb-56 md:mb-60 lg:mb-80">
          <p className="mb-3 text-center text-[10px] uppercase tracking-[0.3em] text-white/88 drop-shadow-[0_1px_10px_rgba(0,0,0,0.45)] sm:text-xs">
            {"Architecture Studio"}
          </p>

          <h1
            ref={titleRef}
            className="mx-auto max-w-[12ch] text-center text-4xl font-medium leading-[0.92] tracking-tight text-white text-balance sm:text-5xl md:text-6xl lg:max-w-none lg:text-8xl"
          >
            {"We design spaces"}
            <br />
            <span className="text-orange-200">{"that elevate living"}</span>
          </h1>
        </div>
      </div>

      <div className="absolute inset-0 z-20 pointer-events-none">
        <img
          src="/assets/images/hously-foreground.png"
          alt="Marble kitchen island detail"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {animationComplete && (
        <div className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 animate-bounce sm:bottom-12">
          <ArrowDown className="w-5 h-5 text-muted-foreground" />
        </div>
      )}
    </section>
  )
}
