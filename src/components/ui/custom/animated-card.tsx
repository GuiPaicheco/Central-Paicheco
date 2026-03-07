"use client"

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion"
import { cn } from "@/lib/utils"
import { useRef } from "react"

interface AnimatedCardProps {
  title: string
  description: string
  children?: React.ReactNode
  className?: string
}

export function AnimatedCard({
  title,
  description,
  children,
  className,
}: AnimatedCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const smoothX = useSpring(rotateX, { stiffness: 150, damping: 18 })
  const smoothY = useSpring(rotateY, { stiffness: 150, damping: 18 })

  const lightX = useSpring(mouseX, { stiffness: 300, damping: 30 })
  const lightY = useSpring(mouseY, { stiffness: 300, damping: 30 })

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    rotateX.set(((y - centerY) / centerY) * -6)
    rotateY.set(((x - centerX) / centerX) * 6)

    mouseX.set(x)
    mouseY.set(y)
  }

  function handleLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      style={{
        transform: "perspective(1200px)",
        rotateX: smoothX,
        rotateY: smoothY,
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className={cn("relative group rounded-2xl", className)}
    >
      {/* Glow animado da borda */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-purple-500/40 via-cyan-500/30 to-purple-500/40 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100" />

      {/* Card base */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/70 p-6 backdrop-blur-sm transition-colors duration-300 group-hover:border-zinc-600">

        {/* Spotlight que segue o mouse */}
        <motion.div
          style={{
            background: useTransform(
              [lightX, lightY],
              ([latestX, latestY]) =>
                `radial-gradient(250px circle at ${latestX}px ${latestY}px, rgba(255,255,255,0.08), transparent 70%)`
            ),
          }}
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="relative z-10 space-y-3">
          <h3 className="text-xl font-semibold text-white">
            {title}
          </h3>

          <p className="text-sm text-zinc-400">
            {description}
          </p>

          {children}
        </div>
      </div>
    </motion.div>
  )
}