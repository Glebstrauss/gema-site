# Plano de Melhoria — Site GEMA

Auditoria e plano executados em **junho/2026** sobre o site original (`site_gema`), resultando neste repositório como projeto separado.

## Diagnóstico

| # | Problema encontrado | Gravidade |
|---|---|---|
| 1 | `color-scheme: light dark` no CSS **sem nenhum estilo escuro** — usuários com SO em modo escuro recebiam controles de formulário escuros numa página clara; `<meta name="color-scheme" content="light">` contradizia o CSS | Alta |
| 2 | Tema escuro documentado no CLAUDE.md e referenciado em 17 comentários órfãos no CSS (com notas de contraste WCAG), mas **nunca implementado** | Alta |
| 3 | Página de pôsteres inacabada: placeholders `<!-- INSERIR E-MAIL -->` dentro de atributos `href` (HTML inválido), sem link na navegação, coleção ausente no CMS | Alta |
| 4 | `og:image`/`twitter:image` apontando para SVG — WhatsApp, Twitter/X e Facebook não renderizam SVG em cards de compartilhamento | Média |
| 5 | `robots.txt` com URL de sitemap desatualizada (`site_gema` em vez do repositório real) | Média |
| 6 | Identidade do repositório inconsistente entre `_config.yml`, `admin/config.yml`, JSON-LD e CLAUDE.md | Média |
| 7 | Projeto sem `README.md` | Baixa |

## Plano executado

### Fase 1 — Projeto separado
- [x] Novo repositório `Glebstrauss/gema-site`, independente do original
- [x] `_config.yml`: `url`/`baseurl` corretos para o novo endereço
- [x] `admin/config.yml`: backend do Decap CMS apontando para o novo repo
- [x] `robots.txt` e JSON-LD `sameAs` atualizados
- [x] `README.md` criado

### Fase 2 — Página de pôsteres finalizada
- [x] Placeholders substituídos por contato real (`gleb.strauss@ufba.br`)
- [x] Link "Pôsteres" na navegação principal, no rodapé e na grade "Conheça o GEMA" da home
- [x] Coleção `posteres` registrada no Decap CMS
- [x] Estilos compatíveis com o tema escuro

### Fase 3 — Tema escuro completo
- [x] Script inline no `<head>` (evita FOUC) com fallback para `prefers-color-scheme`
- [x] Botão de alternância na nav (`#nav-theme-btn`) com `aria-pressed` e rótulo dinâmico
- [x] Persistência em `localStorage` (`gema-theme`)
- [x] Bloco `html.dark` no CSS seguindo as notas de contraste WCAG AA já anotadas no código (`--azul` → `--azul-mid` sobre fundos escuros, etc.)
- [x] `theme-color` com variantes claro/escuro; `meta color-scheme` corrigida

### Fase 4 — SEO
- [x] `og:image` e `twitter:image` em PNG

### Fase 5 — Publicação
- [x] Build Jekyll verificado localmente
- [x] Deploy via GitHub Pages (build nativo do Jekyll a cada push em `master`)

## Próximos passos sugeridos

- Definir preços reais dos pôsteres em `_data/posteres.yml` (campo `preco`)
- Adicionar chave PIX real na página de pôsteres quando o processo de venda for definido
- Fotos individuais para os membros que ainda usam avatar de iniciais
- Domínio próprio (ex.: `gema.ufba.br`) via CNAME
