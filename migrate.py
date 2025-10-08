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
    "AbusiveLanguageBackAnsweringScreen",
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

def clean_imports_and_hooks(content: str) -> str:
    """Fix imports and remove unused stuff"""
    updated = content

    # Remove wrong t import
    updated = re.sub(r'^\s*import\s*\{\s*t\s*\}.*\n', '', updated, flags=re.M)

    # Remove SafeAreaView import
    updated = re.sub(r'^\s*import\s*\{[^}]*SafeAreaView[^}]*\}\s*from\s*"react-native-safe-area-context";\n?', '', updated, flags=re.M)

    # Remove useEffect/useState if not used
    updated = re.sub(r'import\s*\{[^}]*useEffect[^}]*\}\s*from\s*"react";\n?', 'import React from "react";\n', updated, flags=re.M)
    updated = re.sub(r'import\s*\{[^}]*useState[^}]*\}\s*from\s*"react";\n?', 'import React from "react";\n', updated, flags=re.M)

    # Ensure useLanguage import
    if "useLanguage" not in updated:
        updated = re.sub(
            r'(import\s+CustomIcon[^\n]*\n)',
            r'\1import { useLanguage } from "../../../../context/LanguageContext";\n',
            updated,
            count=1,
            flags=re.M,
        )

    # Ensure `const { t } = useLanguage();`
    if "const { t }" not in updated:
        updated = re.sub(
            r'(export default function[^{]+\{[^}]+)',
            r'\1\n  const { t } = useLanguage();',
            updated,
            count=1,
            flags=re.S,
        )

    return updated

def fix_numeric_props(content: str) -> str:
    """Wrap bare numeric JSX props like size=24 -> size={24}"""
    return re.sub(r'size\s*=\s*([0-9]+)', r'size={\1}', content)

def strip_language_polling(content: str) -> str:
    """Remove the setInterval polling block for language"""
    return re.sub(
        r'const \[currentLanguage[^\n]+\n.*?useEffect\([\s\S]+?\n\s*\},\s*\[currentLanguage\]\);\n',
        '',
        content,
        flags=re.S,
    )

def replace_expo_icons_with_custom(content: str) -> str:
    """Replace Expo Ionicons with CustomIcon component"""
    updated = content

    # Remove Ionicons imports
    updated = re.sub(
        r'^\s*import\s+\{\s*Ionicons\s*\}\s+from\s+"@expo/vector-icons".*\n',
        "",
        updated,
        flags=re.M,
    )
    updated = re.sub(
        r'^\s*import\s+Ionicons\s+from\s+"@expo/vector-icons".*\n',
        "",
        updated,
        flags=re.M,
    )

    # Ensure CustomIcon import exists
    if "components/CustomIcon" not in updated:
        updated = re.sub(
            r'(import\s+React[^\n]*\n)',
            r'\1import CustomIcon from "../../../../components/CustomIcon";\n',
            updated,
            count=1,
            flags=re.M,
        )

    # Replace <Ionicons .../> with <CustomIcon .../>
    updated = re.sub(
        r'<Ionicons\s+name="([^"]+)"\s+size=\{?(\d+)\}?\s+color="([^"]+)"\s*/>',
        r'<CustomIcon type="IO" name="\1" size={\2} color="\3" />',
        updated,
    )
    updated = re.sub(
        r'<Ionicons\s+name="([^"]+)"\s+size=\{?(\d+)\}?\s*/>',
        r'<CustomIcon type="IO" name="\1" size={\2} color="#1a1a1a" />',
        updated,
    )

    return updated

def process_issue_screens():
    """Process all .tsx files in issue screens folder"""
    for path in ISSUE_SCREENS_DIR.rglob("*.tsx"):
        try:
            original = read(path)
            updated = original

            # Apply fixes
            updated = replace_expo_icons_with_custom(updated)
            updated = fix_numeric_props(updated)
            updated = clean_imports_and_hooks(updated)
            updated = strip_language_polling(updated)

            if updated != original:
                write(path, updated)
                print(f"✓ Updated: {path}")
        except Exception as e:
            print(f"! Skipped {path}: {e}")

def main():
    print(f"DRY_RUN = {DRY_RUN} (pass --apply to write changes)")
    if not ISSUE_SCREENS_DIR.exists():
        print(f"! Issue screens directory not found: {ISSUE_SCREENS_DIR}")
        return

    # Step 1: Fix all issue screens
    process_issue_screens()

if __name__ == "__main__":
    main()
