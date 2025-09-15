// Production Deployment Script for Aether Residences
const fs = require('fs');
const path = require('path');

console.log('🚀 Preparing Aether Residences for production deployment...\n');

// Check if all required files exist
const requiredFiles = [
  'nextjs-public/aether.html',
  'nextjs-public/sw.js',
  'nextjs-public/site.webmanifest'
];

let allFilesExist = true;
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} - Found`);
  } else {
    console.log(`❌ ${file} - Missing`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.log('\n❌ Some required files are missing. Please check the file structure.');
  process.exit(1);
}

// Create production-ready index.html
const aetherContent = fs.readFileSync('nextjs-public/aether.html', 'utf8');
fs.writeFileSync('index.html', aetherContent);
console.log('✅ Created production index.html');

// Copy service worker to root
fs.copyFileSync('nextjs-public/sw.js', 'sw.js');
console.log('✅ Copied service worker to root');

// Copy manifest to root
fs.copyFileSync('nextjs-public/site.webmanifest', 'site.webmanifest');
console.log('✅ Copied web manifest to root');

// Create robots.txt
const robotsContent = `User-agent: *
Allow: /

Sitemap: https://aetherresidences.com/sitemap.xml`;

fs.writeFileSync('robots.txt', robotsContent);
console.log('✅ Created robots.txt');

// Create sitemap.xml
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://aetherresidences.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

fs.writeFileSync('sitemap.xml', sitemapContent);
console.log('✅ Created sitemap.xml');

console.log('\n🎉 Production deployment ready!');
console.log('\n📋 Deployment Checklist:');
console.log('1. Upload all files to your web server');
console.log('2. Ensure HTTPS is enabled');
console.log('3. Test all functionality on different devices');
console.log('4. Verify PWA installation works');
console.log('5. Check Google PageSpeed Insights');
console.log('6. Submit sitemap to Google Search Console');
console.log('\n🌐 Your website is now production-ready!');
