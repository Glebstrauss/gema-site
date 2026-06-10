#!/usr/bin/env bash
# Pós-escrita: valida padrões Jekyll/Liquid em arquivos HTML e YAML

INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // ""' 2>/dev/null)

if [ -z "$FILE" ] || [ ! -f "$FILE" ]; then
  exit 0
fi

WARNINGS=()

# ── Validação para arquivos HTML / Liquid ──────────────────────────────────
if echo "$FILE" | grep -qE '\.(html)$'; then

  # Detecta {% if campo %} sem != "" (falso positivo para strings)
  if grep -qP '\{%-?\s*if\s+\w+\.\w+\s*-?%\}' "$FILE" 2>/dev/null; then
    WARNINGS+=("💡 Atenção: encontrado '{% if campo %}' sem '!= \"\"'. Em Ruby/Jekyll, strings vazias são truthy — use '{% if campo != \"\" %}' para campos opcionais.")
  fi

  # Detecta href sem relative_url (links internos hardcoded)
  if grep -qE 'href="/(site_gema|(?!http)[^"]+\.(html|css|js|svg|png|jpg))' "$FILE" 2>/dev/null; then
    WARNINGS+=("💡 Atenção: possível link interno sem '| relative_url'. O site está em subdiretório /site_gema/ — todos os links internos precisam do filtro.")
  fi
fi

# ── Validação para arquivos YAML ───────────────────────────────────────────
if echo "$FILE" | grep -qE '_data/.*\.yml$'; then

  # Verifica wrapper items:
  if ! grep -q "^items:" "$FILE" 2>/dev/null; then
    WARNINGS+=("⚠️  O arquivo YAML '$FILE' não tem wrapper 'items:' no topo. O Decap CMS e os templates Liquid esperam essa estrutura.")
  fi
fi

# ── Exibe warnings (não bloqueia — apenas avisa) ───────────────────────────
if [ ${#WARNINGS[@]} -gt 0 ]; then
  echo "── Verificação pós-escrita: $FILE ──" >&2
  for w in "${WARNINGS[@]}"; do
    echo "  $w" >&2
  done
fi

exit 0
