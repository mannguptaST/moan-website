# Luxe Digital Landing Page

A world-class premium landing page for web development agencies. Built with cutting-edge technologies and featuring smooth, cinematic animations.

## ✨ Features

### Premium Effects
- **Cinematic Preloader** — Animated logo with loading bar for first impression
- **Per-Character Text Animation** — Staggered letter-by-letter reveal effect
- **Morphing Background Shapes** — Animated blob shapes that follow mouse movement
- **Horizontal Scroll Gallery** — Immersive portfolio showcase with CSS scroll-snap
- **Infinite Tech Marquee** — Auto-scrolling technology logos
- **Magnetic Buttons** — Interactive buttons that follow cursor on hover
- **Image Distortion** — CSS-based skew and scale effects on hover
- **Glassmorphism** — Frosted glass effect on navbar and cards
- **Spotlight Hover** — Gradient that follows cursor on service cards

### Sections
- Navbar with glassmorphism and scroll detection
- Hero with animated text and morphing background
- Tech Stack infinite marquee
- Services bento grid layout
- Portfolio horizontal scroll gallery
- Testimonials carousel with auto-play
- Call-to-action with shimmer effect
- Footer with multi-column layout

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 | React framework with App Router |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Declarative animations |
| Lenis | Smooth scroll |
| Lucide React | Icon library |

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Pusri27/luxe-digital-landing.git

# Navigate to project directory
cd luxe-digital-landing

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css      # Design system & animations
│   ├── layout.tsx       # Root layout with providers
│   └── page.tsx         # Main landing page
├── components/
│   ├── effects/         # Animation components
│   │   ├── MorphingBlob.tsx
│   │   ├── Preloader.tsx
│   │   ├── SmoothScroll.tsx
│   │   ├── SplitText.tsx
│   │   └── Marquee.tsx
│   ├── sections/        # Page sections
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Testimonials.tsx
│   │   ├── CTA.tsx
│   │   └── Footer.tsx
│   └── ui/              # Reusable UI components
│       └── MagneticButton.tsx
```

## ⚡ Performance

- All animations use CSS transforms (GPU accelerated)
- Lightweight bundle with minimal dependencies
- Static page generation for fast initial load
- Smooth 60fps animations

## 🎨 Design Highlights

- **Color Palette**: Dark luxury theme with gold (#d4af37) and copper (#b87333) accents
- **Typography**: Inter for body, Playfair Display for quotes
- **Aesthetic**: Premium, elegant, modern, clean

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Pusri**

- GitHub: [@Pusri27](https://github.com/Pusri27)
