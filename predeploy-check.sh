#!/bin/bash
echo "🔍 Checking lockfile and Node version..."
if [ ! -f package-lock.json ]; then
  echo "❌ Missing package-lock.json"
  exit 1
fi
REQUIRED_NODE="18"
CURRENT_NODE=$(node -v | cut -d. -f1 | tr -d "v")
if [ "$CURRENT_NODE" -lt "$REQUIRED_NODE" ]; then
  echo "❌ Node version too low: $CURRENT_NODE"
  exit 1
fi
echo "✅ Predeploy checks passed"
