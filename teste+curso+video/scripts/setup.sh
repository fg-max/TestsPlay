#!/bin/bash
# ============================================================
# setup.sh — Script de setup inicial do ambiente QA
# ============================================================

set -e

echo "🎭 QA Automation — Setup Inicial"
echo "================================="

# 1. Instalar dependências
echo "📦 Instalando dependências..."
npm ci

# 2. Instalar browsers Playwright
echo "🌐 Instalando browsers..."
npx playwright install chromium firefox --with-deps

# 3. Copiar .env se não existir
if [ ! -f .env ]; then
  echo "📋 Criando .env a partir do .env.example..."
  cp .env.example .env
  echo "⚠️  Edite o arquivo .env com suas configurações!"
fi

# 4. Criar diretórios necessários
echo "📁 Criando diretórios..."
mkdir -p reports/allure-results
mkdir -p reports/screenshots

echo ""
echo "✅ Setup concluído!"
echo ""
echo "Comandos disponíveis:"
echo "  npm test           — Rodar todos os testes"
echo "  npm run test:ui    — Modo visual interativo"
echo "  npm run test:e2e   — Testes end-to-end"
echo "  npm run test:api   — Testes de API"
echo "  npm run codegen    — Gravar testes"
echo "  npm run report     — Visualizar relatório"
