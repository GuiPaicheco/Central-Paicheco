# Central Paicheco

Hub público de ferramentas, projetos automatizados do GitHub e área com login.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Variáveis de ambiente

Crie `.env.local` com:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_EMAILS=seu-email@exemplo.com
GITHUB_USERNAME=GuiPaicheco
GITHUB_TOKEN=
REMOVE_BG_API_KEY=
```

Use `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` para projetos novos. A variável
`NEXT_PUBLIC_SUPABASE_ANON_KEY` continua aceita por compatibilidade. `GITHUB_TOKEN`
é opcional, mas recomendado para evitar limite baixo da API.

## Supabase

Execute o SQL em `supabase/schema.sql` no editor SQL do Supabase.

Depois configure Auth:

- Email provider habilitado para magic link.
- GitHub OAuth opcional.
- Redirect URL local: `http://localhost:3000/auth/callback`.
- Redirect URL produção: `https://seu-dominio/auth/callback`.

## Segurança

A chave antiga de `REMOVE_BG_API_KEY` deve ser rotacionada. Se ela já tiver
aparecido em commit público ou deploy compartilhado, trate como comprometida.

## Scripts

```bash
npm run lint
npm run build
```
