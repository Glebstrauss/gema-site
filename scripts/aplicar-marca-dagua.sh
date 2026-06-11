#!/usr/bin/env bash
# Aplica a marca d'água padrão do GEMA (diagonal "GEMA · UFBA", azul 17%)
# num preview de pôster e regenera o .webp correspondente.
#
# Uso:   scripts/aplicar-marca-dagua.sh assets/img/posteres/<id>.jpg [...]
# Requer: imagemagick (brew install imagemagick) e cwebp (brew install webp)
#
# ⚠ Aplique UMA única vez por imagem (rodar duas vezes duplica a marca).
#   Os originais limpos ficam no histórico do git e nos PDFs-fonte do grupo.
set -euo pipefail

FONTE="/System/Library/Fonts/HelveticaNeue.ttc"
TMP=$(mktemp -d); trap 'rm -rf "$TMP"' EXIT

# Sprite rotacionado auto-dimensionado + célula 360x240 com 2 marcas escalonadas
magick -background none -fill "rgba(28,78,221,0.17)" -font "$FONTE" \
  -pointsize 22 label:"GEMA · UFBA" -rotate -30 "$TMP/sprite.png"
magick -size 360x240 xc:none \
  "$TMP/sprite.png" -geometry +18+12  -composite \
  "$TMP/sprite.png" -geometry +195+128 -composite "$TMP/tile.png"

for IMG in "$@"; do
  W=$(magick identify -format %w "$IMG")
  H=$(magick identify -format %h "$IMG")
  magick "$IMG" \( -size "${W}x${H}" tile:"$TMP/tile.png" \) -composite -quality 88 "$IMG"
  cwebp -quiet -q 80 "$IMG" -o "${IMG%.jpg}.webp"
  echo "✓ marca d'água: $IMG (+ .webp regenerado)"
done
