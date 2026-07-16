# abhay.creative - Premium Design Portfolio

A modern, premium static portfolio website built with React 19, Vite, Tailwind CSS, and Framer Motion. Designed to convert visitors into paying clients.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠 Tech Stack

- **React 19** - Latest React with concurrent features
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling with custom design system
- **Framer Motion** - Production-ready animations
- **React Icons** - Icon library (Feather Icons)

## 📁 Project Structure

```
my-portfolio/
├── public/
│   ├── Designs/
│   │   ├── Posters/         # Portfolio poster images
│   │   └── Thumbnails/      # Portfolio thumbnail images
│   └── favicon.svg
├── src/
│   ├── assets/              # Static assets used by components
│   │   └── .gitkeep
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ScrollReveal.jsx
│   │   ├── MouseGlow.jsx
│   │   ├── TiltCard.jsx
│   │   └── Modal.jsx
│   ├── pages/               # Page components (currently single-page)
│   │   └── .gitkeep
│   ├── sections/            # Page sections
│   │   ├── HeroSection.jsx
│   │   ├── PortfolioSection.jsx
│   │   ├── ServicesSection.jsx
│   │   ├── WhyChooseMeSection.jsx
│   │   ├── AboutSection.jsx
│   │   ├── TestimonialsSection.jsx
│   │   └── ContactSection.jsx
│   ├── styles/
│   │   └── index.css        # Global styles & Tailwind imports
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Design System

### Colors
| Name | Hex | Usage |
|------|-----|-------|
| Background | `#09090B` | Page background |
| Card | `#111113` | Card/component backgrounds |
| Primary | `#7C3AED` | Primary actions, accents |
| Secondary | `#3B82F6` | Secondary actions, gradients |
| Text | `#FFFFFF` | Primary text |
| Muted | `#A1A1AA` | Secondary text |

### Animations
- Fade In / Slide Up / Blur Reveal (ScrollReveal)
- Hover Lift & Glow (cards, buttons)
- 3D Tilt Effect (portfolio cards)
- Animated Gradient Orbs (background)
- Subtle Mouse Glow (hero section)
- Floating Elements

## 📸 Portfolio Images

Add your work to:
- `public/Designs/Posters/` - Social media posters, event posters, marketing graphics
- `public/Designs/Thumbnails/` - YouTube thumbnails

Update `src/sections/PortfolioSection.jsx` with your project metadata (title, category, description).

## 🔧 Customization

### Update Personal Info
Edit the following files:
- `src/components/Navbar.jsx` - Logo, navigation, social links
- `src/components/Footer.jsx` - Copyright, social links
- `src/sections/HeroSection.jsx` - Headline, subtitle
- `src/sections/AboutSection.jsx` - Bio, skills, personal details
- `src/sections/ContactSection.jsx` - Contact methods, email address

> **Note:** Contact details are configured for Abhay Hegde. Update them in `src/components/Navbar.jsx`, `src/components/Footer.jsx`, and `src/sections/ContactSection.jsx` if they change.

### Colors & Theme
Modify `tailwind.config.js`:
```js
colors: {
  background: '#09090B',
  card: '#111113',
  primary: '#7C3AED',
  secondary: '#3B82F6',
  text: '#FFFFFF',
  muted: '#A1A1AA'
}
```

### Animations
Custom animations in `tailwind.config.js` under `keyframes` and `animation`.

## 📦 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy dist/ folder to Vercel
```

### Netlify
```bash
npm run build
# Deploy dist/ folder to Netlify
```

### GitHub Pages
```bash
npm run build
# Deploy dist/ folder to gh-pages branch
```

## ⚡ Performance Features

- Lazy-loaded images with `loading="lazy"`
- Optimized builds with code splitting
- Minified production output
- No unnecessary dependencies
- 95+ Lighthouse score target

> **Tip for 95+ Lighthouse:** The portfolio images in `public/Designs/` should be compressed before deploying. Use tools like TinyPNG, Squoosh, or ImageOptim to reduce file sizes without losing quality.

## 📝 License

MIT License - feel free to use for your own portfolio.

## 👨‍💻 Author

**Abhay Hegde**
- Portfolio: [abhay.creative](https://abhaycreative.com)
- Email: abhay@abhaycreative.com
- Instagram: [@abhaycreative](https://instagram.com/abhaycreative)
- LinkedIn: [Abhay Hegde](https://linkedin.com/in/abhayhegde)
- GitHub: [@abhayhegde](https://github.com/abhayhegde)

---

Built with ❤️ using React 19 + Vite + Tailwind + Framer Motion