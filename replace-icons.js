#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Common icon replacements mapping
const iconReplacements = {
  // Ionicons - most common
  'import { Ionicons } from "@expo/vector-icons";': 'import CustomIcon from "@/components/CustomIcon";',
  '<Ionicons': '<CustomIcon type="IO"',
  
  // MaterialIcons
  'import { MaterialIcons } from "@expo/vector-icons";': 'import CustomIcon from "@/components/CustomIcon";',
  '<MaterialIcons': '<CustomIcon type="MI"',
  
  // MaterialCommunityIcons
  'import { MaterialCommunityIcons } from "@expo/vector-icons";': 'import CustomIcon from "@/components/CustomIcon";',
  '<MaterialCommunityIcons': '<CustomIcon type="MCI"',
  
  // FontAwesome
  'import { FontAwesome } from "@expo/vector-icons";': 'import CustomIcon from "@/components/CustomIcon";',
  '<FontAwesome': '<CustomIcon type="FA"',
  
  // FontAwesome5
  'import { FontAwesome5 } from "@expo/vector-icons";': 'import CustomIcon from "@/components/CustomIcon";',
  '<FontAwesome5': '<CustomIcon type="FA5"',
  
  // AntDesign
  'import { AntDesign } from "@expo/vector-icons";': 'import CustomIcon from "@/components/CustomIcon";',
  '<AntDesign': '<CustomIcon type="AD"',
  
  // Feather
  'import { Feather } from "@expo/vector-icons";': 'import CustomIcon from "@/components/CustomIcon";',
  '<Feather': '<CustomIcon type="FE"',
  
  // Entypo
  'import { Entypo } from "@expo/vector-icons";': 'import CustomIcon from "@/components/CustomIcon";',
  '<Entypo': '<CustomIcon type="EN"',
};

// Multiple imports in one line
const multipleImportReplacements = {
  'import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";': 'import CustomIcon from "@/components/CustomIcon";',
  'import { MaterialCommunityIcons } from "@expo/vector-icons";': 'import CustomIcon from "@/components/CustomIcon";',
  'import { Ionicons, MaterialIcons } from "@expo/vector-icons";': 'import CustomIcon from "@/components/CustomIcon";',
};

function replaceIconsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Replace multiple imports first
    for (const [oldImport, newImport] of Object.entries(multipleImportReplacements)) {
      if (content.includes(oldImport)) {
        content = content.replace(oldImport, newImport);
        modified = true;
        console.log(`✅ Replaced import in ${filePath}`);
      }
    }
    
    // Replace single imports
    for (const [oldPattern, newPattern] of Object.entries(iconReplacements)) {
      if (content.includes(oldPattern)) {
        content = content.replace(new RegExp(oldPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newPattern);
        modified = true;
        console.log(`✅ Replaced pattern "${oldPattern}" in ${filePath}`);
      }
    }
    
    // Replace specific icon usages
    if (content.includes('MaterialIcons')) {
      content = content.replace(/<MaterialIcons/g, '<CustomIcon type="MI"');
      modified = true;
    }
    if (content.includes('MaterialCommunityIcons')) {
      content = content.replace(/<MaterialCommunityIcons/g, '<CustomIcon type="MCI"');
      modified = true;
    }
    if (content.includes('FontAwesome5')) {
      content = content.replace(/<FontAwesome5/g, '<CustomIcon type="FA5"');
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`📝 Updated ${filePath}`);
    }
    
    return modified;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  let totalModified = 0;
  
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      totalModified += processDirectory(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      if (replaceIconsInFile(fullPath)) {
        totalModified++;
      }
    }
  }
  
  return totalModified;
}

// Get the target directory from command line or use current directory
const targetDir = process.argv[2] || '.';

console.log(`🔍 Processing files in: ${targetDir}`);
const modified = processDirectory(targetDir);
console.log(`\n✨ Total files modified: ${modified}`);
