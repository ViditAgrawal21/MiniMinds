#!/bin/bash

set -e

echo "Bundling React Native..."

# Get the Node binary path
if [ -z "$NODE_BINARY" ]; then
    export NODE_BINARY=$(command -v node)
fi

echo "Using Node: $NODE_BINARY"

# Set up the environment
export PROJECT_ROOT="$(dirname "$0")/.."
export ENTRY_FILE="index.js"
export PLATFORM_NAME="ios"
export CONFIGURATION="Release"

# Create output directory if it doesn't exist
mkdir -p "$CONFIGURATION_BUILD_DIR"

# Bundle the app
"$NODE_BINARY" "$PROJECT_ROOT/node_modules/react-native/cli.js" bundle \
    --entry-file "$ENTRY_FILE" \
    --platform "$PLATFORM_NAME" \
    --dev false \
    --reset-cache \
    --bundle-output "$CONFIGURATION_BUILD_DIR/main.jsbundle" \
    --assets-dest "$TARGET_BUILD_DIR/$UNLOCALIZED_RESOURCES_FOLDER_PATH" \
    --verbose

echo "React Native bundling completed successfully!"
