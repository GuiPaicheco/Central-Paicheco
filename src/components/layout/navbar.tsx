"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Menu, X, UserRound } from "lucide-react"
import { Container } from "./container"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"

const links = [
  { href: "/", label: "Início" },
  { href: "/tools", label: "Ferramentas" },
  { href: "/repositories", label: "Projetos" },
  { href: "/about", label: "Sobre" },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    try {
      const supabase = createSupabaseBrowserClient()
      supabase.auth.getSession().then(({ data }) => {
        setIsLoggedIn(Boolean(data.session))
      })

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setIsLoggedIn(Boolean(session))
      })

      return () => subscription.unsubscribe()
    } catch {
      return undefined
    }
  }, [])

  const accountHref = isLoggedIn ? "/account" : "/login"

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-black/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-lg font-semibold text-emerald-500">
            Central Paicheco
          </Link>

          <div className="hidden md:flex items-center gap-7 text-sm">
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

            <Link
              href={accountHref}
              className="inline-flex items-center gap-2 rounded-md border border-emerald-500/30 px-3 py-2 text-zinc-200 transition hover:border-emerald-500/70 hover:text-emerald-400"
            >
              <UserRound size={16} />
              {isLoggedIn ? "Conta" : "Entrar"}
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-zinc-300"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 pt-2 flex flex-col gap-4 text-sm">
            {[...links, { href: accountHref, label: isLoggedIn ? "Conta" : "Entrar" }].map(
              (link) => {
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
              }
            )}
          </div>
        )}
      </Container>
    </nav>
  )
}
