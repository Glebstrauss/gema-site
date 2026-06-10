# Plano de Implementação — Jekyll + Decap CMS
**Projeto:** site_gema  
**Objetivo:** Permitir edição visual do site sem código  
**Última atualização:** 2026-05-10

---

## Status Geral

```
[x] ETAPA 1 — Estrutura Jekyll
[x] ETAPA 2 — Templates e Dados
[x] ETAPA 3 — Decap CMS Admin
[x] ETAPA 4 — GitHub Actions (build)
[x] ETAPA 5 — OAuth App
[x] ETAPA 6 — Testes finais
```

---

## ETAPA 1 — Estrutura Jekyll
**Tempo estimado: 30 min**

- [x] 1.1 Criar `Gemfile` na raiz
- [x] 1.2 Criar `_config.yml` com configurações do site
- [x] 1.3 Criar pasta `_layouts/`
- [x] 1.4 Criar `_layouts/default.html` (nav + footer compartilhados)
- [x] 1.5 Criar `_layouts/page.html` (páginas internas)
- [x] 1.6 Criar pasta `_professores/` (coleção Jekyll)
- [x] 1.7 Criar pasta `_data/` (publicações, prêmios, notícias em YAML)
- [x] 1.8 Criar pasta `assets/img/professores/`
- [x] 1.9 Mover `style.css` para `assets/css/style.css`
- [x] 1.10 Atualizar `.gitignore` (adicionar `_site/`, `.jekyll-cache/`, `.bundle/`)

---

## ETAPA 2 — Templates e Dados
**Tempo estimado: 1h 30 min**

- [x] 2.1 Converter `index.html` para usar layout Jekyll
- [x] 2.2 Converter `professores.html` → renderiza a coleção `_professores/` via Liquid
- [x] 2.3 Converter `publicacoes.html` → lê `_data/publicacoes.yml`
- [x] 2.4 Converter `premios.html` → lê `_data/premios.yml`
- [x] 2.5 Converter `noticias.html` → lê `_data/noticias.yml`
- [x] 2.6 Criar 1 arquivo `.md` por professor atual em `_professores/`
- [x] 2.7 Popular `_data/publicacoes.yml` com as publicações atuais
- [x] 2.8 Popular `_data/premios.yml` com os prêmios atuais
- [x] 2.9 Popular `_data/noticias.yml` com as notícias atuais
- [x] 2.10 Testar build local: `bundle exec jekyll serve`

---

## ETAPA 3 — Decap CMS Admin
**Tempo estimado: 30 min**

- [x] 3.1 Criar pasta `admin/`
- [x] 3.2 Criar `admin/index.html` (carrega o painel Decap CMS)
- [x] 3.3 Criar `admin/config.yml` com todas as coleções:
  - [x] 3.3a Coleção `professores` (campos: nome, cargo, foto, avatar, descrição, tags, lattes, email, ordem)
  - [x] 3.3b Arquivo `publicacoes` (lista editável de publicações)
  - [x] 3.3c Arquivo `premios` (lista editável de prêmios)
  - [x] 3.3d Arquivo `noticias` (lista editável de notícias)
- [x] 3.4 Configurar media_folder para `assets/img/professores`
- [x] 3.5 Configurar locale para `pt`

---

## ETAPA 4 — GitHub Actions (build automático)
**Tempo estimado: 15 min**

- [x] 4.1 Criar `.github/workflows/deploy.yml`
- [x] 4.2 Configurar trigger em push no branch `master`
- [x] 4.3 Configurar steps: checkout → setup-ruby → bundle → jekyll build → deploy
- [x] 4.4 Ajustar GitHub Pages para usar branch `gh-pages` (gerado pelo Actions)
  - Settings → Pages → Source → `gh-pages` branch

---

## ETAPA 5 — OAuth App (autenticação do CMS)
**Tempo estimado: 15 min** *(feito pelo Gleb manualmente)*

- [x] 5.1 Acessar: github.com → Settings → Developer settings → OAuth Apps → New OAuth App
- [x] 5.2 Preencher:
  - Application name: `GEMA CMS`
  - Homepage URL: `https://glebstrauss.github.io/site_gema`
  - Authorization callback URL: `https://glebstrauss.github.io/site_gema/`
- [x] 5.3 Copiar o **Client ID** gerado
- [x] 5.4 Colar o Client ID no campo `app_id` do arquivo `admin/config.yml`
- [x] 5.5 Fazer commit e push

---

## ETAPA 6 — Testes Finais
**Tempo estimado: 30 min**

- [x] 6.1 Verificar build no GitHub Actions (aba Actions do repositório)
- [x] 6.2 Acessar `glebstrauss.github.io/site_gema/admin`
- [x] 6.3 Fazer login com conta GitHub
- [x] 6.4 Testar: adicionar professor fictício com foto
- [x] 6.5 Verificar se apareceu no site após ~2 min
- [x] 6.6 Testar: editar publicação existente
- [x] 6.7 Verificar visual do site (comparar com versão atual)
- [x] 6.8 Remover professor fictício do teste
- [x] 6.9 Confirmar com Gleb que tudo funciona

---

## Notas Importantes

### O que NÃO muda visualmente
- Cores, fontes e layout permanecem idênticos
- URLs das páginas permanecem as mesmas
- Logo e todas as imagens existentes são preservados

### O que muda tecnicamente
- `style.css` passa para `assets/css/style.css`
- HTML das páginas usa tags Liquid `{{ }}` para conteúdo dinâmico
- GitHub Pages passa a fazer build via GitHub Actions (em vez de build direto)
- Novo branch `gh-pages` serve o site (o `master` passa a ser só o código-fonte)

### Dependências externas (todas gratuitas)
- Jekyll 4.3 (gerador de site estático)
- Decap CMS 3.x (painel de edição)
- GitHub OAuth App (autenticação — criado pelo Gleb na Etapa 5)

---

## Rollback (se algo der errado)
O branch `master` com o site atual permanece intacto até a Etapa 4.  
Para voltar ao estado atual basta reconfigurar GitHub Pages para usar `master` em vez de `gh-pages`.
