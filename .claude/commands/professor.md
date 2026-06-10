---
description: "Adiciona ou atualiza um membro da equipe GEMA em _professores/. Pode ser docente ou estudante de pós-graduação."
---

Adicione ou atualize um membro da equipe GEMA no diretório `_professores/`.

## Dados do membro
$ARGUMENTS

## Nome do arquivo
`_professores/nome-sobrenome.md` — slug em kebab-case, sem acentos, sem espaços.  
Exemplos: `gleb-strauss.md`, `ana-paula-costa.md`, `joao-ferreira.md`

## Estrutura completa do arquivo

```yaml
---
layout: null
nome: "Prof. Dr. Nome Sobrenome"
cargo: "Professor Titular"            # ex: Professor Adjunto, Doutoranda, Mestrando
tipo: "docente"                       # docente | estudante
avatar: "NS"                          # 2 iniciais maiúsculas
foto: ""                              # "/site_gema/assets/img/professores/nome.jpg" ou ""
descricao: "Descrição da área de atuação em 1–2 frases."
tags:
  - Genética Quantitativa
  - Melhoramento Animal
lattes: "http://lattes.cnpq.br/0000000000000000"
email: "nome@ufba.br"
ordem: 6                              # número sequencial — não pode repetir
---
```

## Passos

1. Liste os arquivos em `_professores/` para verificar quais `ordem` já estão em uso
2. Crie o arquivo com nome em kebab-case, sem acentos
3. Preencha todos os campos — use `""` para campos opcionais não fornecidos (`foto`, `lattes`, `email`)
4. Verifique que `ordem` é único
5. Faça commit: `"Adiciona membro: [Nome Completo]"` ou `"Atualiza membro: [Nome]"`
6. Faça push para `master`

## Tipos e cargos sugeridos

| tipo | cargo (exemplos) |
|---|---|
| `docente` | Professor Titular, Professor Associado, Professor Adjunto |
| `estudante` | Doutorando(a), Mestrando(a), Pós-doutorando(a) |

## Se os dados não forem fornecidos
Pergunte: nome completo, cargo/tipo, descrição e tags principais. Os demais campos são opcionais.
