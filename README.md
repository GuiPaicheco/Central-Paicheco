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

---

## Guia rápido do repositório

Hub de ferramentas e projetos com Next.js, autenticação e integrações para produtividade.

**Contexto:** Projeto pessoal.

### Ambiente de desenvolvimento

Requer Node.js e npm. Instale as dependências e inicie o ambiente de desenvolvimento:

```bash
git clone https://github.com/GuiPaicheco/Central-Paicheco.git
cd Central-Paicheco
npm install
npm run dev
```

Consulte o endereço informado pelo servidor no terminal.

| Script | Comando configurado |
| --- | --- |
| `npm run dev` | `next dev` |
| `npm run build` | `next build` |
| `npm run start` | `next start` |
| `npm run lint` | `eslint` |

Se o projeto usar serviços externos, configure suas próprias variáveis de ambiente antes de executar os fluxos integrados. A instalação das dependências não configura banco, autenticação ou serviços remotos.

Consulte os requisitos e as limitações nas seções acima antes de usar o sistema. Esta atualização revisa a documentação; não representa uma nova validação de execução ou de segurança.
