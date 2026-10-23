import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import JSZip from 'jszip';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const zipOutputPath = path.resolve(rootDir, 'hostinger-public_html.zip');

async function createHostingerZip() {
  console.log('📦 Starting Hostinger deployment zip generation...\n');

  if (!fs.existsSync(distDir)) {
    console.error('❌ dist/ directory not found! Run npm run build first.');
    process.exit(1);
  }

  // Ensure .htaccess exists
  const htaccessDist = path.resolve(distDir, '.htaccess');
  const htaccessPublic = path.resolve(rootDir, 'public', '.htaccess');
  if (!fs.existsSync(htaccessDist) && fs.existsSync(htaccessPublic)) {
    fs.copyFileSync(htaccessPublic, htaccessDist);
    console.log('  ✓ Copied .htaccess to dist/');
  }

  const zip = new JSZip();
  let fileCount = 0;

  function addFolderToZip(currentDir, zipFolder) {
    const items = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.resolve(currentDir, item.name);
      
      if (item.isDirectory()) {
        const subZip = zipFolder.folder(item.name);
        addFolderToZip(fullPath, subZip);
      } else if (item.isFile()) {
        const content = fs.readFileSync(fullPath);
        zipFolder.file(item.name, content);
        fileCount++;
      }
    }
  }

  console.log('  Adding all files and directories from dist/ to zip...');
  addFolderToZip(distDir, zip);

  console.log(`  Packaging ${fileCount} files into compression buffer...`);
  const content = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  if (fs.existsSync(zipOutputPath)) {
    fs.unlinkSync(zipOutputPath);
  }

  fs.writeFileSync(zipOutputPath, content);
  const sizeMb = (fs.statSync(zipOutputPath).size / (1024 * 1024)).toFixed(2);

  console.log(`\n🎉 SUCCESS! Generated ready-to-deploy Hostinger zip:`);
  console.log(`   📁 File: ${zipOutputPath}`);
  console.log(`   📊 Total Files Packaged: ${fileCount}`);
  console.log(`   💾 Zip Size: ${sizeMb} MB`);
  console.log(`   ⚙️ Includes .htaccess: ${zip.file('.htaccess') ? 'YES ✅' : 'NO ❌'}`);
  console.log(`   📄 Includes index.html: ${zip.file('index.html') ? 'YES ✅' : 'NO ❌'}`);
  console.log(`   📜 Includes sitemap.xml: ${zip.file('sitemap.xml') ? 'YES ✅' : 'NO ❌'}`);
  console.log(`   🎓 Includes certifications/index.html: ${zip.file('certifications/index.html') ? 'YES ✅' : 'NO ❌'}`);
}

createHostingerZip().catch(err => {
  console.error('Failed to create zip:', err);
  process.exit(1);
});
