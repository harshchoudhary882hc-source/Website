// Public Deployment Script for Aether Residences
const fs = require('fs');
const path = require('path');

console.log('🌐 Preparing Aether Residences for PUBLIC deployment...\n');

// Create public directory
const publicDir = 'public-deploy';
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Copy all necessary files to public directory
const filesToCopy = [
  'index.html',
  'sw.js',
  'site.webmanifest',
  'robots.txt',
  'sitemap.xml'
];

filesToCopy.forEach(file => {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(publicDir, file));
    console.log(`✅ Copied ${file} to public-deploy/`);
  } else {
    console.log(`⚠️  ${file} not found - skipping`);
  }
});

// Create a simple README for deployment
const readmeContent = `# Aether Residences - Public Website

## 🚀 Ready for Deployment!

This folder contains all files needed to make your website public.

### Quick Deploy Options:

1. **Netlify (Recommended)**
   - Go to netlify.com
   - Drag this entire folder to deploy
   - Get instant public URL

2. **Vercel**
   - Go to vercel.com
   - Upload this folder
   - Deploy in seconds

3. **GitHub Pages**
   - Upload to GitHub repository
   - Enable Pages in settings
   - Get free hosting

### Features Included:
- ✅ Custom cursor animations
- ✅ Advanced hover effects
- ✅ Pricing calculator
- ✅ Virtual tour section
- ✅ Smart chatbot
- ✅ Mobile responsive
- ✅ PWA capabilities
- ✅ SEO optimized

### Your website is production-ready! 🎉
`;

fs.writeFileSync(path.join(publicDir, 'README.md'), readmeContent);
console.log('✅ Created deployment README');

// Create .htaccess for Apache servers
const htaccessContent = `# Aether Residences - Apache Configuration

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Redirect to HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
`;

fs.writeFileSync(path.join(publicDir, '.htaccess'), htaccessContent);
console.log('✅ Created .htaccess for Apache servers');

// Create netlify.toml for Netlify deployment
const netlifyToml = `[build]
  publish = "."

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/sw.js"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"

[[headers]]
  for = "/*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000"

[[headers]]
  for = "/*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000"
`;

fs.writeFileSync(path.join(publicDir, 'netlify.toml'), netlifyToml);
console.log('✅ Created netlify.toml for Netlify');

// Create vercel.json for Vercel deployment
const vercelJson = {
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
};

fs.writeFileSync(path.join(publicDir, 'vercel.json'), JSON.stringify(vercelJson, null, 2));
console.log('✅ Created vercel.json for Vercel');

console.log('\n🎉 PUBLIC DEPLOYMENT PACKAGE READY!');
console.log(`\n📁 All files are in the '${publicDir}' folder`);
console.log('\n🚀 Quick Deploy Options:');
console.log('1. Netlify: Drag the public-deploy folder to netlify.com');
console.log('2. Vercel: Upload the public-deploy folder to vercel.com');
console.log('3. GitHub Pages: Upload to GitHub and enable Pages');
console.log('4. Any Web Host: Upload all files via FTP/cPanel');
console.log('\n✨ Your website will be live in minutes!');
console.log('\n📱 Features included:');
console.log('- Custom cursor animations');
console.log('- Advanced hover effects');
console.log('- Pricing calculator');
console.log('- Smart chatbot');
console.log('- Mobile responsive');
console.log('- PWA capabilities');
console.log('- SEO optimized');
console.log('\n🌐 Ready to go public! 🚀');
