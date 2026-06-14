const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src/pages');
const files = fs.readdirSync(dir);
for (const file of files) {
  if (file.endsWith('.tsx')) {
    const p = path.join(dir, file);
    let content = fs.readFileSync(p, 'utf-8');
    content = content.replace(/import\s+\{\s*createFileRoute\s*\}\s*from\s*['"]@tanstack\/react-router['"];?\n?/g, '');
    content = content.replace(/export\s+const\s+Route\s*=\s*createFileRoute\([^)]+\)\(\{[\s\S]*?component:\s*(\w+),?\s*\}\);\n?/g, '');
    content = content.replace(/function\s+(Dashboard|ContributorsPage|TimelinePage|SettingsPage|HallOfFamePage)\s*\(/g, 'export default function $1(');
    fs.writeFileSync(p, content);
    console.log('Fixed', file);
  }
}
