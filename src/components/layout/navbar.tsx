"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Container } from "./container"

const links = [
  { href: "/", label: "Início" },
  { href: "/tools", label: "Tools" },
  { href: "/repositories", label: "Repositories" },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-black/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="text-lg font-semibold text-emerald-500"
          >
            Central - Paicheco
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            {links.map((link) => {
              const isActive = pathname === link.href

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors ${
                    isActive
                      ? "text-emerald-500"
                      : "text-zinc-400 hover:text-emerald-500"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-zinc-300"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden pb-4 pt-2 flex flex-col gap-4 text-sm">
            {links.map((link) => {
              const isActive = pathname === link.href

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`transition-colors ${
                    isActive
                      ? "text-emerald-500"
                      : "text-zinc-400 hover:text-emerald-500"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        )}

      </Container>
    </nav>
  )
}