---
description: "Auditoria completa do site GEMA: verifica Liquid, acessibilidade, dark mode, CSS, performance e consistência dos dados. Gera relatório e corrige issues encontrados."
---

Realize uma auditoria completa do site GEMA e corrija os problemas encontrados.

## Escopo da revisão

### 1. Liquid / Jekyll
Leia cada arquivo `.html` na raiz e verifique:
- [ ] Todos os `{% if campo %}` sobre strings usam `{% if campo != "" %}`?
- [ ] Todos os links internos usam `| relative_url`?
- [ ] Nenhum link com `href="#"` ou `href=""` sem propósito?
- [ ] Todos os YAML em `_data/` têm wrapper `items:` no topo?
- [ ] Loops Liquid usam `assign` correto antes de `where`?

### 2. Acessibilidade (WCAG 2.1 AA)
- [ ] Todas as imagens têm `alt` text não-vazio (exceto decorativas com `alt=""` + `aria-hidden="true"`)?
- [ ] Botões e links têm texto legível ou `aria-label`?
- [ ] `aria-current="page"` presente no link de nav ativo?
- [ ] `<main id="conteudo">` presente no layout?
- [ ] Skip link `#conteudo` funcional no layout?
- [ ] Hierarquia de headings correta (h1→h2→h3 sem saltar)?
- [ ] Campos de formulário (busca) têm `label` ou `aria-label`?

### 3. Tema Escuro
- [ ] Todas as seções com `style="background:var(--preto)"` estão listadas no bloco `html.dark` do CSS?
- [ ] Texto branco em seções escuras está protegido com `!important`?
- [ ] Cards (`.prof-card`, `.linha-card`, `.noticia-mini`, `.noticia-card`) têm override no dark?
- [ ] Nav e nav mobile overlay têm background correto no dark?
- [ ] Badges Q1/Q2/Q3 têm contraste adequado no dark?

### 4. Performance
- [ ] Imagens abaixo do fold têm `loading="lazy"`?
- [ ] Imagem hero tem `fetchpriority="high" decoding="async"`?
- [ ] Logo no footer tem `loading="lazy"`?
- [ ] Fontes Google carregam com `display=swap`?
- [ ] Imagens têm `width` e `height` explícitos?

### 5. CSS
- [ ] Nenhuma regra duplicada no `style.css`?
- [ ] Nenhuma classe CSS sem uso nos HTMLs?
- [ ] `@media print` cobre todos os elementos de UI (nav, filtros, botões)?
- [ ] Breakpoints 900px e 600px cobrem todos os grids?

### 6. Dados
- [ ] `publicacoes.yml` — todos os `qualis` são Q1/Q2/Q3/Q4 ou `""`?
- [ ] `publicacoes.yml` — todos os `doi` começam com `https://doi.org/` ou são `""`?
- [ ] `noticias.yml` — exatamente 1 item com `destaque: true`?
- [ ] `_professores/` — nenhum arquivo com `ordem` repetida?
- [ ] `_professores/` — nenhum arquivo placeholder (nome como "Nome Sobrenome")?

## Como reportar e agir

1. Para cada categoria, liste apenas os **problemas reais encontrados**
2. Para cada problema: informe arquivo, linha (se aplicável), descrição e ação corretiva
3. **Corrija automaticamente** os problemas simples (typos, missing attrs, ordering)
4. **Pergunte antes** de corrigir problemas que mudem comportamento significativamente
5. Ao final, faça commit único com todas as correções aplicadas

## Saída esperada
```
## Relatório de Auditoria — GEMA Site

### ✅ Sem issues: [categorias limpas]

### ⚠️ Issues encontrados:
[categoria]
- arquivo.html:42 — descrição do problema → correção aplicada
...

### 🔧 Correções aplicadas: N
### ❓ Requer atenção manual: N
```
