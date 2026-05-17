"use client"

function getSessionId() {
  const key = "central-paicheco-session"
  const current = window.localStorage.getItem(key)
  if (current) return current

  const next = crypto.randomUUID()
  window.localStorage.setItem(key, next)
  return next
}

export async function trackEvent(input: {
  type: "page" | "tool"
  path?: string
  tool?: string
  status?: "success" | "error"
  metadata?: Record<string, unknown>
}) {
  try {
    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...input,
        sessionId: getSessionId(),
        path: input.path || window.location.pathname,
      }),
    })
  } catch {
    // Tracking must never interrupt the tools.
  }
}
