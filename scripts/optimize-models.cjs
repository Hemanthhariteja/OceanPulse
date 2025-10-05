const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const outDir = path.join(root, 'optimized');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

// Find all glb files in repo root and immediate subfolders
function findGLBs(dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findGLBs(full));
    } else if (entry.isFile() && path.extname(entry.name).toLowerCase() === '.glb') {
      results.push(full);
    }
  }
  return results;
}

const glbs = findGLBs(root).filter(p => !p.includes('node_modules') && !p.includes('dist') && !p.includes('optimized'));
if (glbs.length === 0) {
  console.log('No .glb files found to optimize');
  process.exit(0);
}

for (const src of glbs) {
  const rel = path.relative(root, src);
  const dest = path.join(outDir, rel.replace(/\\/g, '/'));
  const destDir = path.dirname(dest);
  fs.mkdirSync(destDir, { recursive: true });

  console.log(`Optimizing ${rel} -> ${path.relative(root, dest)}`);
  try {
  // Use gltf-transform CLI to compress with Draco. Quantization flags differ across versions,
  // so we skip an explicit quantize step to maintain compatibility with the installed CLI.
  execSync(`npx gltf-transform draco "${src}" "${dest}" --encode-speed 5 --decode-speed 5`, { stdio: 'inherit' });
  } catch (err) {
    console.error('Optimization failed for', src, err);
  }
}

console.log('Model optimization complete. Optimized files are in optimized/');
