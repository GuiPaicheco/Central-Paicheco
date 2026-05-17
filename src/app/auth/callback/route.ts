import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { createSupabaseAdminClient } from "@/lib/supabase/admin"
import { getAdminEmails, getSiteUrl } from "@/lib/env"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const origin = getSiteUrl()

  if (code) {
    const supabase = await createSupabaseServerClient()
    const { data } = supabase
      ? await supabase.auth.exchangeCodeForSession(code)
      : { data: { user: null } }

    const user = data.user
    if (user) {
      const admin = createSupabaseAdminClient()
      const email = user.email?.toLowerCase() || ""
      const role = getAdminEmails().includes(email) ? "admin" : "user"

      await admin?.from("profiles").upsert({
        id: user.id,
        email,
        name:
          user.user_metadata?.full_name ||
          user.user_metadata?.name ||
          email.split("@")[0],
        avatar_url: user.user_metadata?.avatar_url || null,
        role,
      })
    }
  }

  return NextResponse.redirect(`${origin}/account`)
}
