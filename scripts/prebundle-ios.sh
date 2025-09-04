#!/bin/bash

# Pre-bundle script for iOS Release builds
# This creates the bundle before Xcode build to avoid permission issues

set -e

echo "🚀 Pre-bundling React Native for iOS..."

# Check if we're building for Release
if [ "$1" != "Release" ]; then
    echo "⚠️  Skipping pre-bundle for non-Release build"
    exit 0
fi

# Set working directory
cd "$(dirname "$0")/.."

# Clean previous bundle
rm -f main.jsbundle
rm -rf assets

# Create bundle
echo "📦 Creating React Native bundle..."
npx react-native bundle \
    --platform ios \
    --dev false \
    --entry-file index.js \
    --bundle-output main.jsbundle \
    --assets-dest assets \
    --reset-cache

echo "✅ Pre-bundle completed successfully!"
echo "📍 Bundle location: main.jsbundle"
ls -lh main.jsbundle
