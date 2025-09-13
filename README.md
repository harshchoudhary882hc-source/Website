# The Aether Residences

A luxury residential property website showcasing The Aether Residences - a G+24 sky-high sanctuary in the New Tech Corridor.

## Features

- Modern, responsive design
- Interactive floor plan tabs
- Contact form with Netlify Forms integration
- SEO optimized with structured data
- Accessibility compliant
- Mobile-first approach

## Deployment Options

### Laravel 11

**Option A - Static File:**
1. Save as `public/aether.html`
2. Visit `http://localhost:8000/aether.html`

**Option B - Blade View:**
1. Save as `resources/views/aether.blade.php`
2. Add route to `routes/web.php`: `Route::view('/aether', 'aether');`
3. Visit `http://localhost:8000/aether`

### Next.js

1. Drop `aether.html` in `public/` folder
2. Visit `/aether.html`

### Quick Deploy

#### GitHub Pages
1. Create new GitHub repository
2. Upload `index.html` as the main file
3. Enable GitHub Pages in repository settings
4. Your site will be live at `https://username.github.io/repository-name`

#### Netlify
1. Drag and drop the entire folder to Netlify
2. Or connect your GitHub repository
3. Netlify will automatically deploy

#### Vercel
1. Drag and drop the entire folder to Vercel
2. Or connect your GitHub repository
3. Vercel will automatically deploy

## Customization

- Replace placeholder images with actual property photos
- Update contact information in the About section
- Modify floor plan data in the Floor Plans section
- Update RERA/Registration details
- Customize color scheme by modifying CSS variables

## Form Handling

The contact form is configured for Netlify Forms. For other platforms:
- **Laravel**: Replace form action with Laravel route
- **Next.js**: Use API routes or external form service
- **Static**: Use Netlify Forms, Formspree, or similar service

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- Progressive enhancement
- Graceful degradation for older browsers
