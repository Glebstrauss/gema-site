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

## Segunda rodada — executada em jun/2026

| Melhoria | Detalhe |
|---|---|
| ✅ Painel para não-técnicos | Sveltia CMS no `/admin/` com login por **token** (sem servidor OAuth); config do Decap reaproveitada; bug do `cms-config-url` com baseurl antigo corrigido |
| ✅ Manual de edição | `/manual-edicao.html` — passo a passo em português para os professores (link no rodapé) |
| ✅ Otimização de uploads futuros | Sveltia converte fotos enviadas para WebP ≤1200px automaticamente |
| ✅ Fotos da equipe | 6,5 MB → 460 KB (480px JPEG, nomes por slug); 2 imagens órfãs removidas |
| ✅ `/admin/` fora dos buscadores | `Disallow` no robots.txt, `noindex` e exclusão do sitemap |
| ✅ Lightbox nos pôsteres | `<dialog>` nativo: Esc fecha, foco retorna, backdrop com blur |
| ✅ og:image por página | Pôsteres compartilham com imagem de pôster; demais usam o card padrão |
| ✅ Feed RSS | `/feed.xml` com as notícias + `rel=alternate` no head |
| ✅ Fontes auto-hospedadas | 3 woff2 variáveis (~90 KB) substituem Google Fonts; `preload` + `font-display: swap` |
| ✅ `theme-color` dinâmico | Barra do navegador acompanha o botão de tema |

## Terceira rodada — notícias (jun/2026)

- ✅ Modal convertido para `<dialog>` nativo (focus trap de verdade, Esc, backdrop, foco retorna ao card)
- ✅ Deep links: cada notícia tem `#slug` próprio; abrir a URL abre o modal direto; botão **Copiar link** no modal (com fallback `execCommand`)
- ✅ Corrigido bug latente do `| limit: 3` (não é filtro Liquid — virou `limit` no `for`); destaque tem fallback para a primeira notícia
- ✅ Contraste do tema escuro nos elementos da página (hint, data do modal, focus rings)
- ✅ Link "Assinar via RSS" na hero; estados vazios para quando não houver notícias

## Próximos passos sugeridos

- Definir preços reais dos pôsteres em `_data/posteres.yml` (campo `preco`) — editável pelo painel
- Adicionar chave PIX real na página de pôsteres quando o processo de venda for definido
- Convidar os professores como colaboradores do repositório (Settings → Collaborators) para o painel funcionar para eles
- Opcional: gateway OAuth (Cloudflare Worker do Sveltia) para login em 1 clique, sem token
- Domínio próprio (ex.: `gema.ufba.br`) via CNAME
- Formulário de contato (Formspree/Web3Forms) e analytics leve (GoatCounter/Plausible) — ambos exigem criar conta
