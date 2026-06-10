#!/usr/bin/env bash
# Guardrail: inspeciona comandos Bash antes de executar

INPUT=$(cat)
CMD=$(echo "$INPUT" | jq -r '.tool_input.command // ""' 2>/dev/null)

if [ -z "$CMD" ]; then
  exit 0
fi

# ── Bloqueia operações destrutivas ─────────────────────────────────────────
# Regex: só detecta rm -rf como comando real (início, após ; && || |) — ignora menções em strings/heredocs
if echo "$CMD" | grep -qP '(^|;\s*|&&\s*|\|\|\s*|\|\s*)rm\s+-rf'; then
  echo "⛔ Bloqueado: 'rm -rf' não é permitido neste projeto." >&2
  echo "   Se necessário, solicite confirmação explícita antes de executar." >&2
  exit 2
fi

if echo "$CMD" | grep -qP '(^|;\s*|&&\s*)git\s+push\s+[^#]*--force|(^|;\s*|&&\s*)git\s+push\s+[^#]*\s-f\b'; then
  echo "⛔ Bloqueado: 'git push --force' pode apagar histórico no GitHub Pages." >&2
  echo "   Use apenas se o usuário confirmar explicitamente." >&2
  exit 2
fi

if echo "$CMD" | grep -qP '(^|;\s*|&&\s*)git\s+reset\s+--hard'; then
  echo "⛔ Bloqueado: 'git reset --hard' descarta trabalho irreversivelmente." >&2
  echo "   Solicite confirmação explícita do usuário antes de prosseguir." >&2
  exit 2
fi

# ── Bloqueia exclusão de arquivos críticos do site ─────────────────────────
if echo "$CMD" | grep -qP '(^|;\s*|&&\s*)rm\s+[^#]*(_data/|_professores/|_layouts/|assets/css/|admin/config)'; then
  echo "⛔ Bloqueado: tentativa de remover arquivos críticos do site GEMA." >&2
  echo "   Arquivos protegidos: _data/, _professores/, _layouts/, assets/css/, admin/config.yml" >&2
  exit 2
fi

exit 0
