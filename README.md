# GEMA — Grupo de Estudos em Melhoramento Animal

Site institucional do **GEMA** (Grupo de Estudos em Melhoramento Animal, Genética Quantitativa e Genômica Aplicada) — EMEVZ · UFBA · Salvador, Bahia.

**🌐 Site:** https://glebstrauss.github.io/gema-site/

## Stack

- [Jekyll 4](https://jekyllrb.com/) — gerador de site estático
- [Sveltia CMS](https://github.com/sveltia/sveltia-cms) — painel de edição em `/admin/` (login por token, sem servidor OAuth; otimiza imagens automaticamente)
- [GitHub Pages](https://pages.github.com/) — build automático do Jekyll a cada push em `master`

## Páginas

| Página | Conteúdo |
|---|---|
| `index.html` | Hero, linhas de pesquisa, navegação rápida |
| `professores.html` | Docentes e estudantes de pós-graduação |
| `publicacoes.html` | Artigos com busca, filtro Qualis e navegação por ano |
| `premios.html` | Prêmios e distinções por ano |
| `noticias.html` | Notícias do grupo |
| `posteres.html` | Catálogo de pôsteres de raças nativas brasileiras (com lightbox) |
| `manual-edicao.html` | Guia para a equipe editar o site pelo painel |

## Desenvolvimento local

```bash
bundle install
bundle exec jekyll serve --baseurl "" --livereload
# http://localhost:4000
```

## Edição de conteúdo

**Para a equipe (sem GitHub):** acesse `/admin/`, entre com token e edite pelo painel — passo a passo em `/manual-edicao.html`. Fotos enviadas pelo painel são convertidas para WebP e redimensionadas automaticamente.

Para quem prefere editar os arquivos YAML/Markdown diretamente:

- `_data/publicacoes.yml` — publicações científicas
- `_data/premios.yml` — prêmios
- `_data/noticias.yml` — notícias
- `_data/posteres.yml` — catálogo de pôsteres
- `_professores/*.md` — um arquivo por membro da equipe

## Recursos

- Tema claro/escuro com persistência e respeito a `prefers-color-scheme`
- Acessibilidade: skip link, focus trap no menu mobile, `prefers-reduced-motion`, `prefers-contrast`
- SEO: sitemap, JSON-LD, Open Graph (imagem por página), canonical
- Feed RSS de notícias em `/feed.xml`
- Fontes auto-hospedadas (sem requisições a terceiros)
- Layout responsivo (breakpoints 900px / 600px / 380px) e estilos de impressão
