---
description: "Adiciona uma nova publicação científica ao _data/publicacoes.yml do site GEMA. Passe os dados como argumento ou descreva a publicação."
---

Adicione uma nova publicação científica ao arquivo `_data/publicacoes.yml` do site GEMA.

## Estrutura do registro

```yaml
- titulo: "Título completo do artigo"
  autores: "Sobrenome A, Sobrenome B, Sobrenome C"
  periodico: "Nome do Periódico"
  ano: 2025
  qualis: "Q1"                                     # Q1 | Q2 | Q3 | Q4 | "" (sem classificação)
  doi: "https://doi.org/10.xxxx/xxxxx"             # URL completa ou "" se sem DOI
```

## Dados a adicionar
$ARGUMENTS

## Passos

1. Leia `_data/publicacoes.yml` para ver o formato atual e a posição certa de inserção
2. Insira a nova publicação na **posição correta cronologicamente** (mais recente primeiro)
3. Valide: indentação de 2 espaços, aspas em strings com caracteres especiais, `doi` como URL completa ou `""`
4. Faça commit: `"Adiciona publicação: [título abreviado até 60 chars]"`
5. Faça push para `master`

## Validações obrigatórias
- `qualis` deve ser exatamente `"Q1"`, `"Q2"`, `"Q3"`, `"Q4"` ou `""` — nenhum outro valor
- `doi` deve começar com `https://doi.org/` ou ser `""`
- `ano` deve ser um inteiro (sem aspas)
- `autores` no formato "Sobrenome Iniciais, Sobrenome2 Iniciais2" (padrão ABNT simplificado)

## Se os dados não forem fornecidos
Pergunte ao usuário os campos obrigatórios: título, autores, periódico, ano. Qualis e DOI são opcionais (use `""`).
