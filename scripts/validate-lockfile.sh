#!/bin/bash

# ============================================
# Validate package-lock.json for deployment
# ============================================
# This script:
# 1. Exits if package-lock.json is missing
# 2. Validates lockfileVersion is 1
# 3. Warns if Node version mismatches Vercel (18.x)
# ============================================

set -e

LOCKFILE="package-lock.json"
EXPECTED_LOCKFILE_VERSION=1
VERCEL_NODE_MAJOR="18"

# Check if package-lock.json exists
if [ ! -f "$LOCKFILE" ]; then
    echo "Error: $LOCKFILE is missing." >&2
    exit 1
fi

# Extract lockfileVersion from package-lock.json
LOCKFILE_VERSION=$(grep -m1 '"lockfileVersion"' "$LOCKFILE" | grep -oE '[0-9]+' | head -1)

if [ -z "$LOCKFILE_VERSION" ]; then
    echo "Error: Could not determine lockfileVersion from $LOCKFILE." >&2
    exit 1
fi

if [ "$LOCKFILE_VERSION" != "$EXPECTED_LOCKFILE_VERSION" ]; then
    echo "Error: lockfileVersion is $LOCKFILE_VERSION, expected $EXPECTED_LOCKFILE_VERSION." >&2
    exit 1
fi

echo "OK: lockfileVersion is $LOCKFILE_VERSION."

# Check Node version
NODE_VERSION=$(node --version 2>/dev/null || echo "")
if [ -z "$NODE_VERSION" ]; then
    echo "Warning: Could not determine Node version." >&2
else
    # Extract major version (e.g., v18.17.0 -> 18)
    NODE_MAJOR=$(echo "$NODE_VERSION" | sed 's/^v//' | cut -d. -f1)
    if [ "$NODE_MAJOR" != "$VERCEL_NODE_MAJOR" ]; then
        echo "Warning: Node version is $NODE_VERSION, but Vercel expects ${VERCEL_NODE_MAJOR}.x." >&2
    else
        echo "OK: Node version $NODE_VERSION matches Vercel (${VERCEL_NODE_MAJOR}.x)."
    fi
fi
