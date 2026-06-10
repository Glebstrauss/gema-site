#!/usr/bin/env bash
# Carrega contexto do projeto GEMA no início de cada sessão Claude Code

BRANCH=$(git branch --show-current 2>/dev/null || echo "desconhecido")
LAST_COMMIT=$(git log -1 --oneline 2>/dev/null || echo "sem commits")
CHANGED=$(git status --short 2>/dev/null | grep -c "" || echo "0")
TOTAL_PUBS=$(grep -c "^\s*- titulo:" _data/publicacoes.yml 2>/dev/null || echo "?")
TOTAL_PROFS=$(ls _professores/*.md 2>/dev/null | wc -l | tr -d ' ')

echo "╔══════════════════════════════════════════╗"
echo "║  GEMA Site — Contexto de sessão          ║"
echo "╠══════════════════════════════════════════╣"
echo "║  Branch   : $BRANCH"
echo "║  Commit   : $LAST_COMMIT"
echo "║  Alterados: $CHANGED arquivo(s) não commitado(s)"
echo "║  Dados    : $TOTAL_PUBS publicações · $TOTAL_PROFS professores"
echo "╚══════════════════════════════════════════╝"
echo ""
echo "Comandos disponíveis: /melhorar /publicacao /professor /noticia /revisar"
