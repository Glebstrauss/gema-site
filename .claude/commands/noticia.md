---
description: "Adiciona uma nova notícia ao _data/noticias.yml do site GEMA. Pode definir como destaque principal ou notícia secundária."
---

Adicione uma nova notícia ao arquivo `_data/noticias.yml` do site GEMA.

## Dados da notícia
$ARGUMENTS

## Estrutura do registro

```yaml
- titulo: "Título da Notícia"
  data: "Mai 2026"          # Mês abreviado em português + ano (Jan, Fev, Mar, Abr, Mai, Jun, Jul, Ago, Set, Out, Nov, Dez)
  texto: "Texto resumido da notícia em 1 a 3 frases. Deve ser informativo e objetivo."
  link: "https://..."       # URL da notícia completa, publicação ou evento — ou "" se não houver
  destaque: false           # true = aparece no card grande; apenas 1 item pode ser true por vez
```

## Passos

1. Leia `_data/noticias.yml` para ver o formato e identificar o item atual com `destaque: true`
2. Se a nova notícia for destaque (`destaque: true`), mude a notícia atual de destaque para `destaque: false`
3. Insira a nova notícia no **topo da lista** (mais recente primeiro)
4. Faça commit: `"Adiciona notícia: [título abreviado]"`
5. Faça push para `master`

## Regras de destaque
- Apenas **1 notícia** pode ter `destaque: true` por vez
- A notícia em destaque aparece em card grande tanto na home quanto em `noticias.html`
- Notícias secundárias aparecem nos mini-cards ao lado

## Se os dados não forem fornecidos
Pergunte: título, texto resumido, data e se deve ser destaque. O link é opcional.
