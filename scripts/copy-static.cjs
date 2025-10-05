const fs = require('fs')
const path = require('path')

// Folders at repo root to copy into dist for static hosting
const STATIC_FOLDERS = ['ocean', 'textures', 'Satellite', 'shark', 'Solar system']

const root = process.cwd()
const dist = path.join(root, 'dist')

function copyFolder(src, dest) {
  if (!fs.existsSync(src)) return
  fs.mkdirSync(dest, { recursive: true })
  const entries = fs.readdirSync(src, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) copyFolder(srcPath, destPath)
    else fs.copyFileSync(srcPath, destPath)
  }
}

for (const folder of STATIC_FOLDERS) {
  const src = path.join(root, folder)
  const dest = path.join(dist, folder)
  copyFolder(src, dest)
  console.log(`Copied ${src} -> ${dest}`)
}

// If optimized models exist, overwrite the copied glb files with optimized versions
const optimizedRoot = path.join(root, 'optimized')
if (fs.existsSync(optimizedRoot)) {
  const optimizedFiles = []
  function findOptimized(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) findOptimized(full)
      else if (path.extname(entry.name).toLowerCase() === '.glb') optimizedFiles.push(full)
    }
  }
  findOptimized(optimizedRoot)
  for (const opt of optimizedFiles) {
    const rel = path.relative(optimizedRoot, opt)
    const target = path.join(dist, rel)
    const targetDir = path.dirname(target)
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true })
    fs.copyFileSync(opt, target)
    console.log(`Overwrote with optimized model: ${target}`)
  }
}

// Also copy top-level static files (mp3, glb, jpg) used by the site
const STATIC_EXTS = ['.mp3', '.glb', '.jpg', '.png', '.fbx']
const rootEntries = fs.readdirSync(root, { withFileTypes: true })
for (const entry of rootEntries) {
  if (entry.isFile()) {
    const ext = path.extname(entry.name).toLowerCase()
    if (STATIC_EXTS.includes(ext)) {
      fs.copyFileSync(path.join(root, entry.name), path.join(dist, entry.name))
      console.log(`Copied file ${entry.name} to dist`)
    }
  }
}

console.log('Static assets copied to dist')
