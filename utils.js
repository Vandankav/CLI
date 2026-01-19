const fs = require("fs");
const path = require("path");

// Recursively calculate folder size
function getFolderSize(folderPath) {
  let totalSize = 0;

  const items = fs.readdirSync(folderPath, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(folderPath, item.name);

    try {
      if (item.isDirectory()) {
        totalSize += getFolderSize(fullPath);
      } else {
        const stats = fs.statSync(fullPath);
        totalSize += stats.size;
      }
    } catch (err) {
      console.error(`Error accessing ${fullPath}: ${err.message}`);
    }
  }

  return totalSize;
}

// Convert bytes to human readable format
function formatSize(bytes) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let index = 0;

  while (bytes >= 1024 && index < units.length - 1) {
    bytes /= 1024;
    index++;
  }

  return `${bytes.toFixed(2)} ${units[index]}`;
}

// Classify folder based on name/path
function classifyFolder(name) {
  const lower = name.toLowerCase();

  if (lower.includes("node_modules")) return "Dev Dependency (Rebuildable)";

  if (lower.includes("cache") || lower.includes("temp"))
    return "Cache / Temporary Data";

  if (lower.includes("android")) return "SDK / Emulator Data";

  if (lower.includes("google")) return "User Application Data";

  if (lower.includes("microsoft") || lower.includes("windows"))
    return "System / OS Related";

  if (lower.includes("program")) return "Installed Applications";

  return "User / Unknown Data";
}

// Decide risk level based on category
function getRiskLevel(category) {
  if (category.includes("Cache") || category.includes("Dev Dependency"))
    return "Low Risk";

  if (category.includes("User") || category.includes("SDK"))
    return "Medium Risk";

  if (category.includes("System")) return "High Risk";

  return "Unknown Risk";
}

module.exports = {
  getFolderSize,
  formatSize,
  classifyFolder,
  getRiskLevel,
};
