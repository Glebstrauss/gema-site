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

## Quarta rodada — publicações e robustez (jun/2026)

- ✅ Badges e filtro **Qualis** restaurados em Publicações como melhoria progressiva: aparecem automaticamente quando o campo for preenchido pelo painel (hoje, com todos vazios, nenhuma UI morta é exibida)
- ✅ Condicionais nil-safe em todo conteúdo gerenciado pelo painel (padrão Liquid `if campo and campo != ""`, sem aceitar nil): DOI, links de notícia, preço/link de pôster, foto/Lattes/e-mail de professor — o Sveltia pode omitir campos opcionais e `nil != ""` é verdadeiro no Liquid
- ✅ Contato de pedidos de pôster trocado para o e-mail institucional do grupo (gerencia.gemaufba@gmail.com), o mesmo da seção "Faça parte"
- ✅ `width/height` corretos (88px) nas fotos dos cards de professor

## Incidente de deploy — 10–11/jun/2026 (resolvido)

O deploy do commit da quarta rodada ficou 14 h travado. Causa-raiz: o builder clássico do
GitHub Pages ativa o plugin `jekyll-optional-front-matter`, que processa arquivos Markdown
**sem** front matter — algo que o Jekyll 4 local não faz. Este arquivo continha, como texto
de documentação, um trecho literal de tag Liquid de abertura sem fechamento, e o parser do
builder falhava com o genérico "Page build failed." (duas falhas e um build zumbi de 14 h).
Diagnóstico por bissecção de branches (`estavel` no último commit bom + reaplicação de
arquivos um a um). Correções: trecho reescrito sem delimitadores Liquid e exclusão de
`README.md`/`PLANO_DE_MELHORIA.md` do build no `_config.yml` — mesmo motivo pelo qual
`IMPLEMENTACAO.md` já estava excluído. **Lição: nunca escrever delimitadores Liquid
literais em Markdown versionado fora de `.claude/`.**

## Quinta rodada — internacionalização (jun/2026)

Versão em inglês sem plugins (o builder do Pages não permite jekyll-polyglot):

- ✅ Subárvore `/en/` com 6 páginas (home, team, publications, awards, news, posters) e slugs em inglês
- ✅ Strings de interface centralizadas em `_data/i18n.yml` (pt/en); `_layouts/default.html` parametrizado por `page.lang` — nav, rodapé, aria-labels e rótulos de JS (tema, menu) traduzidos
- ✅ Alternador de idioma PT/EN na nav, ligando cada página ao seu par via `alt_url`; volta para a home do outro idioma quando não há par
- ✅ SEO: `hreflang` recíproco, `og:locale`/`og:locale:alternate`, `<html lang>` correto; `/en/` entra no sitemap automaticamente
- ✅ Dados (notícias, prêmios, pôsteres, professores) reaproveitados com campos opcionais `_en` (`titulo_en`, `texto_en`, `descricao_en`, `cargo_en`, `nome_en`, `grupo_en`) e **fallback honesto** ao português quando vazios
- ✅ Campos `_en` adicionados ao painel Sveltia, todos opcionais
- ✅ Corrige de quebra um campo `qualis` duplicado que havia no CMS

## Próximos passos sugeridos

- Traduzir o conteúdo dos dados para inglês preenchendo os campos `_en` no painel (hoje caem no fallback PT)
- Traduzir o manual de edição (`/en/manual…`) se a equipe internacional for editar
- Definir preços reais dos pôsteres em `_data/posteres.yml` (campo `preco`) — editável pelo painel
- Adicionar chave PIX real na página de pôsteres quando o processo de venda for definido
- Convidar os professores como colaboradores do repositório (Settings → Collaborators) para o painel funcionar para eles
- Opcional: gateway OAuth (Cloudflare Worker do Sveltia) para login em 1 clique, sem token
- Domínio próprio (ex.: `gema.ufba.br`) via CNAME
- Formulário de contato (Formspree/Web3Forms) e analytics leve (GoatCounter/Plausible) — ambos exigem criar conta
