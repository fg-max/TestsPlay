#!/bin/bash
# ============================================================
# clear-reports.sh — Limpa relatórios antigos
# ============================================================

set -e

echo "🧹 Limpando relatórios..."

rm -rf playwright-report/
rm -rf allure-results/
rm -rf allure-report/
rm -rf test-results/
rm -rf reports/allure-results/*
rm -rf reports/screenshots/*

echo "✅ Relatórios limpos!"
