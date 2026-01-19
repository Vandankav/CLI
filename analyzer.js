const fs = require("fs");
const path = require("path");
const {
  getFolderSize,
  formatSize,
  classifyFolder,
  getRiskLevel,
} = require("./utils");

// Parse CLI arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = { top: 5 };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--path") options.path = args[i + 1];
    if (args[i] === "--top") options.top = parseInt(args[i + 1]);
  }

  return options;
}

function analyzeDisk(targetPath, topN) {
  if (!fs.existsSync(targetPath)) {
    console.log("❌ Invalid path provided.");
    return;
  }

  const results = [];
  const items = fs.readdirSync(targetPath, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory()) {
      const folderPath = path.join(targetPath, item.name);

      try {
        const size = getFolderSize(folderPath);
        const category = classifyFolder(item.name);
        const risk = getRiskLevel(category);

        results.push({
          name: item.name,
          size,
          category,
          risk,
        });
      } catch (err) {
        console.log(`Skipping ${item.name} (Permission Denied)`);
      }
    }
  }

  results.sort((a, b) => b.size - a.size);

  console.log("\n📊 Disk Space Usage (With Classification & Risk):\n");

  results.slice(0, topN).forEach((item) => {
    const riskIcon =
      item.risk === "High Risk"
        ? "❌"
        : item.risk === "Medium Risk"
          ? "⚠"
          : "✅";

    console.log(
      `${item.name.padEnd(30)} ${formatSize(item.size).padEnd(10)} ` +
        `[${item.category}]  ${riskIcon} ${item.risk}`,
    );
  });
}

const { path: scanPath, top } = parseArgs();

if (!scanPath) {
  console.log("Usage: node analyzer.js --path <directory> --top <number>");
} else {
  analyzeDisk(scanPath, top);
}
