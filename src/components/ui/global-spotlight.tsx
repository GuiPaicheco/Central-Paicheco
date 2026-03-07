"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect } from "react"

export function GlobalSpotlight() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 30 })
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 30 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])

  const background = useTransform(
    [smoothX, smoothY],
    ([x, y]) =>
      `radial-gradient(600px circle at ${x}px ${y}px, rgba(120,119,198,0.10), transparent 65%)`
  )

  return (
    <motion.div
      style={{ background }}
      className="pointer-events-none fixed inset-0 z-0"
    />
  )
}