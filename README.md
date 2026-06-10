# GEMA — Grupo de Estudos em Melhoramento Animal

Site institucional do **GEMA** (Grupo de Estudos em Melhoramento Animal, Genética Quantitativa e Genômica Aplicada) — EMEVZ · UFBA · Salvador, Bahia.

**🌐 Site:** https://glebstrauss.github.io/gema-site/

## Stack

- [Jekyll 4](https://jekyllrb.com/) — gerador de site estático
- [Decap CMS v3](https://decapcms.org/) — painel de edição em `/admin/`
- [GitHub Pages](https://pages.github.com/) — build automático do Jekyll a cada push em `master`

## Páginas

| Página | Conteúdo |
|---|---|
| `index.html` | Hero, linhas de pesquisa, navegação rápida |
| `professores.html` | Docentes e estudantes de pós-graduação |
| `publicacoes.html` | Artigos com busca, filtro Qualis e navegação por ano |
| `premios.html` | Prêmios e distinções por ano |
| `noticias.html` | Notícias do grupo |
| `posteres.html` | Catálogo de pôsteres de raças nativas brasileiras |

## Desenvolvimento local

```bash
bundle install
bundle exec jekyll serve --baseurl "" --livereload
# http://localhost:4000
```

## Edição de conteúdo

Conteúdo fica em arquivos YAML/Markdown — editável direto no GitHub ou pelo Decap CMS:

- `_data/publicacoes.yml` — publicações científicas
- `_data/premios.yml` — prêmios
- `_data/noticias.yml` — notícias
- `_data/posteres.yml` — catálogo de pôsteres
- `_professores/*.md` — um arquivo por membro da equipe

## Recursos

- Tema claro/escuro com persistência e respeito a `prefers-color-scheme`
- Acessibilidade: skip link, focus trap no menu mobile, `prefers-reduced-motion`, `prefers-contrast`
- SEO: sitemap, JSON-LD, Open Graph, canonical
- Layout responsivo (breakpoints 900px / 600px / 380px) e estilos de impressão
