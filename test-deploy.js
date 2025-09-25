#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Testing Aether Residences deployment setup...\n');

// Check required files
const requiredFiles = [
  'index.html',
  'package.json',
  'netlify.toml',
  'vercel.json'
];

let allGood = true;

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} - Found`);
  } else {
    console.log(`❌ ${file} - Missing`);
    allGood = false;
  }
});

// Check index.html content
if (fs.existsSync('index.html')) {
  const content = fs.readFileSync('index.html', 'utf8');
  
  if (content.includes('Aether Residences')) {
    console.log('✅ index.html - Contains correct content');
  } else {
    console.log('❌ index.html - Missing main content');
    allGood = false;
  }
  
  if (content.includes('data-netlify="true"')) {
    console.log('✅ Form - Netlify forms configured');
  } else {
    console.log('⚠️  Form - Netlify forms not found');
  }
}

// Check package.json
if (fs.existsSync('package.json')) {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  if (pkg.scripts && pkg.scripts.start) {
    console.log('✅ package.json - Start script found');
  } else {
    console.log('❌ package.json - Missing start script');
    allGood = false;
  }
}

console.log('\n' + '='.repeat(50));

if (allGood) {
  console.log('🎉 All checks passed! Your site is ready to deploy.');
  console.log('\nQuick deploy options:');
  console.log('1. GitHub Pages: Upload to GitHub repo → Enable Pages');
  console.log('2. Netlify: Drag folder to netlify.com');
  console.log('3. Vercel: Drag folder to vercel.com');
  console.log('4. Local test: npm run dev');
} else {
  console.log('❌ Some issues found. Please fix them before deploying.');
}

console.log('\nFor detailed instructions, see deploy.md');
