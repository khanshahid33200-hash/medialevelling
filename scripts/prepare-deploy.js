import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const publicDir = path.join(rootDir, 'public');
const deployDir = path.join(rootDir, 'deploy');

// Create deploy directory if it doesn't exist
if (!fs.existsSync(deployDir)) {
  fs.mkdirSync(deployDir, { recursive: true });
}

// Copy files from dist to deploy
console.log('📦 Copying files to deploy directory...');
const copyRecursiveSync = (src, dest) => {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
};

// Copy dist files
if (fs.existsSync(distDir)) {
  copyRecursiveSync(distDir, deployDir);
}

// Copy necessary public files
const publicFilesToCopy = ['.htaccess', 'web.config', '_redirects', 'vercel.json'];
publicFilesToCopy.forEach(file => {
  const src = path.join(publicDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(deployDir, file));
  }
});

console.log('✅ Deployment package is ready in the "deploy" directory');
console.log('📁 You can now upload the contents of the "deploy" directory to your GoDaddy public_html folder');
