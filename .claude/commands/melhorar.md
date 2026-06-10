---
description: "Ciclo de melhorias iterativas no site GEMA: analisa o estado atual, implementa 3–5 melhorias concretas de UX/acessibilidade/performance/CSS, commita e faz push."
---

Execute um ciclo de melhoria iterativa no site GEMA (site estático Jekyll em `/Users/glebstrauss/Developer/site_gema/`).

## Passos obrigatórios

### 1. Análise (leia antes de editar)
Leia os arquivos principais e identifique melhorias ainda não implementadas:
- `_layouts/default.html` — layout base
- `assets/css/style.css` — CSS completo
- As páginas relevantes ao que será melhorado

### 2. Seleção de melhorias
Escolha 3–5 melhorias concretas, priorizando por **impacto × esforço**. Prefira melhorias visíveis ao usuário sobre refatorações internas.

### 3. Implementação
Execute cada melhoria, respeitando as regras em `.claude/CLAUDE.md`. Não peça confirmação — implemente diretamente.

### 4. Commit + Push
```bash
git add <arquivos modificados>
git commit -m "mensagem descritiva em português"
git push origin master
```

---

## Catálogo de melhorias por categoria

### Acessibilidade
- `role`, `aria-label`, `aria-describedby` em componentes interativos
- Skip links e focus traps no menu mobile
- Contraste mínimo WCAG AA (4.5:1 para texto normal, 3:1 para texto grande)
- `alt` text descritivo em todas as imagens
- Ordem lógica de headings (h1→h2→h3 sem saltos)

### Performance
- `loading="lazy"` em imagens abaixo do fold
- `fetchpriority="high"` na imagem hero
- `decoding="async"` em imagens não-críticas
- `width` e `height` explícitos para evitar layout shift (CLS)
- `rel="preload"` para fontes críticas

### UX / Visual
- Estados hover/focus mais evidentes
- Micro-animações em botões (scale, color shift)
- Empty states: mensagem quando não há dados
- Feedback visual instantâneo em interações
- Tipografia: `text-wrap: balance` em headings, `line-height` generoso no corpo
- Consistência visual entre seções (espaçamentos, bordas, raios)

### SEO / Meta
- `<meta name="description">` específico por página
- Open Graph `og:image` com imagem real (não apenas o SVG)
- JSON-LD mais detalhado (membros da equipe, publicações)
- `<link rel="alternate" hreflang>` se houver versão em outro idioma

### Código / Manutenção
- Extrair padrões repetidos para `_includes/`
- Consolidar regras CSS duplicadas
- Remover CSS morto (classes sem uso)
- Comentários de seção no CSS para navegação
- Substituir `!important` por especificidade adequada

---

## Restrições
- Não alterar dados em `_data/*.yml` (use `/publicacao`, `/professor`, `/noticia`)
- Manter compatibilidade mobile (testar mentalmente nos breakpoints 900px / 600px)
- Sempre `| relative_url` em links internos
- Sempre `!= ""` para checar campos opcionais em Liquid
- Não usar `--no-verify` no commit
