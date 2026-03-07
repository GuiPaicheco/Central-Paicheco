"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useState } from "react"

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const smoothX = useSpring(x, { stiffness: 1200, damping: 25 })
  const smoothY = useSpring(y, { stiffness: 1200, damping: 25 })

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0

    if (isFinePointer && !isTouch) {
      setEnabled(true)
    }

    const move = (e: MouseEvent) => {
      x.set(e.clientX - 4)
      y.set(e.clientY - 4)
    }

    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])

  if (!enabled) return null

  return (
    <motion.div
      style={{ translateX: smoothX, translateY: smoothY }}
      className="pointer-events-none fixed top-0 left-0 z-[100] h-2 w-2 rounded-full bg-emerald-500"
    />
  )
}