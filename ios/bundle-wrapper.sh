#!/bin/bash

# Wrapper script to handle bundle creation with sandbox permissions

set -e

BUNDLE_PATH="$CONFIGURATION_BUILD_DIR/$UNLOCALIZED_RESOURCES_FOLDER_PATH/main.jsbundle"

# Try to copy from project root first
if [ -f "$SRCROOT/../main.jsbundle" ]; then
    echo "✅ Using pre-bundled React Native bundle from project root"
    cp "$SRCROOT/../main.jsbundle" "$BUNDLE_PATH"
    
    # Copy assets if they exist
    if [ -d "$SRCROOT/../assets" ]; then
        cp -R "$SRCROOT/../assets/" "$CONFIGURATION_BUILD_DIR/$UNLOCALIZED_RESOURCES_FOLDER_PATH/"
    fi
    
    echo "📦 Bundle copied successfully"
    exit 0
fi

# Fallback to standard React Native bundling
echo "📦 Creating bundle via React Native scripts"
WITH_ENVIRONMENT="$REACT_NATIVE_PATH/scripts/xcode/with-environment.sh"
REACT_NATIVE_XCODE="$REACT_NATIVE_PATH/scripts/react-native-xcode.sh"
/bin/sh -c "$WITH_ENVIRONMENT $REACT_NATIVE_XCODE"
