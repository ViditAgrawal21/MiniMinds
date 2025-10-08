#!/usr/bin/env python3
import os, re, shutil, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
APP_ROOT = ROOT  # adjust if script is elsewhere

# Correct paths for your repo
ISSUE_SCREENS_DIR = APP_ROOT / "src/screens/main/MindTools/Miniminds Screen"
NAV_FILE = APP_ROOT / "src/navigation/AppNavigation.js"
MINDTOOLS_FILE = APP_ROOT / "src/screens/main/MindTools/MindToolsScreen.tsx"

DRY_RUN = "--apply" not in sys.argv  # safe by default, run with --apply to commit

# List of issue screens (from your screenshot)
SCREENS = [
    "BreakupAndReboundScreen",
    "DarkWebAndOnlyFansScreen",
    "DatingSitesAndComplicationsScreen",
    "ExamStressScreen",
    "FriendshipAndRelationshipScreen",
    "GamblingAndGamingAddictionScreen",
    "InternetAddictionScreen",
    "ParentingFromChildViewScreen",
    "ParentingFromParentsViewScreen",
    "PornAddictionScreen",
    "SelfCareHygieneScreen",
    "SelfEsteemAndSelfIdentityScreen",
    "SocialMediaIssuesScreen",
    "SubstanceAddictionScreen",
    "TraumaLossAndDreamsScreen",
    "UnrealisticBeautyStandardsScreen",
]

def backup(path: Path):
    bak = path.with_suffix(path.suffix + ".bak")
    if not bak.exists():
        shutil.copy2(path, bak)

def read(path: Path) -> str:
    return path.read_text(encoding="utf-8")

def write(path: Path, content: str):
    if DRY_RUN:
        print(f"[DRY-RUN] Would write: {path}")
        return
    backup(path)
    path.write_text(content, encoding="utf-8")
    print(f"✓ Wrote: {path}")

def replace_expo_icons_with_custom(content: str) -> str:
    """Replace Expo Ionicons with CustomIcon component"""
    if "@expo/vector-icons" not in content and "Ionicons" not in content:
        return content

    updated = content

    # Remove Ionicons imports
    updated = re.sub(
        r'^\s*import\s+\{\s*Ionicons\s*\}\s+from\s+"@expo/vector-icons"\s*;\s*\n',
        "",
        updated,
        flags=re.M,
    )
    updated = re.sub(
        r'^\s*import\s+Ionicons\s+from\s+"@expo/vector-icons"\s*;\s*\n',
        "",
        updated,
        flags=re.M,
    )

    # Ensure CustomIcon import exists
    if "components/CustomIcon" not in updated:
        custom_icon_import = 'import CustomIcon from "../../../../components/CustomIcon";\n'
        updated = re.sub(
            r'(^import[^\n]*\n)+',
            lambda m: m.group(0) + custom_icon_import
            if "CustomIcon" not in m.group(0)
            else m.group(0),
            updated,
            count=1,
            flags=re.M,
        )

    # Replace <Ionicons .../> with <CustomIcon .../>
    updated = re.sub(
        r'<Ionicons\s+name="([^"]+)"\s+size=\{?(\d+)\}?\s+color="([^"]+)"\s*/>',
        r'<CustomIcon type="IO" name="\1" size=\2 color="\3" />',
        updated,
    )
    updated = re.sub(
        r'<Ionicons\s+name="([^"]+)"\s+size=\{?(\d+)\}?\s*/>',
        r'<CustomIcon type="IO" name="\1" size=\2 color="#1a1a1a" />',
        updated,
    )

    return updated

def process_issue_screens():
    """Process all .tsx files in issue screens folder"""
    for path in ISSUE_SCREENS_DIR.rglob("*.tsx"):
        try:
            original = read(path)
            updated = replace_expo_icons_with_custom(original)
            if updated != original:
                write(path, updated)
                print(f"✓ Updated icons: {path}")
        except Exception as e:
            print(f"! Skipped {path}: {e}")

def add_navigation_entry(screen_name: str):
    """Add a screen import + <Stack.Screen/> entry"""
    path = NAV_FILE
    content = read(path)

    # 1) Import line
    import_line = f"import {screen_name} from '@/screens/main/MindTools/Miniminds Screen/{screen_name}';"
    if import_line not in content:
        content = re.sub(
            r'(import .*\n)(?=[^import])',
            r'\1' + import_line + "\n",
            content,
            count=1,
            flags=re.M,
        )

    # 2) Add <Stack.Screen/>
    screen_block = f'      <Stack.Screen name="{screen_name}" component={ {screen_name} } />'
    if screen_block not in content:
        content = re.sub(
            r'(</Stack\.Navigator>)',
            screen_block + "\n\\1",
            content,
            count=1,
        )

    write(path, content)

def add_mindtools_card(title_key: str, desc_key: str, icon_name: str, press_label: str):
    """Add a category card block into MindToolsScreen"""
    path = MINDTOOLS_FILE
    content = read(path)

    card_block = f"""
            <Pressable
              style={{styles.categoryCard}}
              onPress={{() => handleCategoryPress("{press_label}")}}
            >
              <View style={{styles.taskHeader}}>
                <View style={{styles.taskIconContainer}}>
                  <CustomIcon type="IO" name="{icon_name}" size={{24}} color="#7c3aed" />
                </View>
                <CustomIcon type="IO" name="chevron-forward" size={{16}} color="#6b7280" />
              </View>
              <Text style={{styles.categoryTitle}}>
                {{t("{title_key}")}}
              </Text>
              <Text style={{styles.categoryDescription}}>
                {{t("{desc_key}")}}
              </Text>
            </Pressable>
"""

    if title_key in content or press_label in content:
        print(f"• Card already exists: {press_label}")
        return

    # Insert before closing categories container
    new_content = re.sub(
        r'(</View>\s*</View>\s*</View>)',
        card_block + r'\1',
        content,
        count=1,
    )

    if new_content != content:
        write(path, new_content)
        print(f"✓ Added MindTools card: {press_label}")
    else:
        print(f"! Could not insert card for {press_label}")

def main():
    print(f"DRY_RUN = {DRY_RUN} (pass --apply to write changes)")
    if not ISSUE_SCREENS_DIR.exists():
        print(f"! Issue screens directory not found: {ISSUE_SCREENS_DIR}")
        return
    if not NAV_FILE.exists() or not MINDTOOLS_FILE.exists():
        print("! Navigation or MindTools file missing.")
        return

    # Step 1: Fix Expo icons in issue screens
    process_issue_screens()

    # Step 2: Add navigation + cards for all screens
    for screen_name in SCREENS:
        if (ISSUE_SCREENS_DIR / f"{screen_name}.tsx").exists():
            add_navigation_entry(screen_name)
            add_mindtools_card(
                title_key=f"mindToolsScreen.categories.{screen_name.lower()}.title",
                desc_key=f"mindToolsScreen.categories.{screen_name.lower()}.description",
                icon_name="help-outline",   # 🔧 replace with correct icon
                press_label=screen_name.replace("Screen", ""),
            )
        else:
            print(f"• {screen_name}.tsx not found; skipping nav/card insertion.")

if __name__ == "__main__":
    main()
