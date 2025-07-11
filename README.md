\vite_exp\moodboard\README.md
# MoodBoard 🧘‍♀️

An interactive mood-based quote application with beautiful animations and dynamic backgrounds.

## Features

### 🎨 Interactive UI
- **Clickable Title**: Click "MoodBoard" to cycle through background colors with ripple effects
- **Glare Hover Effect**: Beautiful light effect that follows your mouse cursor
- **Animated Waves Background**: Dynamic wave animations that respond to interactions
- **Typewriter Animation**: Title appears with a typewriter effect on load

### 🎭 Mood System
- **4 Mood Categories**: Happy, Focused, Relaxed, Motivated
- **Mood-Responsive Colors**: Background changes based on selected mood
- **Quote Display**: Shows relevant quotes based on mood selection
- **Smooth Transitions**: All interactions feature smooth anime.js animations

### ✨ Advanced Animations
- **Anime.js Integration**: Professional-grade animations throughout
- **Staggered Animations**: Elements animate in sequence
- **3D Transforms**: Rotation, scaling, and perspective effects
- **Color Morphing**: Dynamic color transitions
- **Ripple Effects**: Click interactions create expanding ripples
- **Floating Animations**: Continuous subtle movements

## Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Anime.js** - Powerful animation library
- **CSS3** - Custom properties and advanced styling
- **JavaScript ES6+** - Modern JavaScript features

## Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd moodboard

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
moodboard/
├── src/
│   ├── components/
│   │   ├── QuoteCard.jsx      # Modal for displaying quotes
│   │   ├── MoodFilter.jsx     # Mood selection buttons
│   │   └── GlareHover.jsx     # Hover glare effect component
│   ├── blocks/
│   │   └── Backgrounds/
│   │       └── Waves/
│   │           ├── Waves.jsx   # Animated waves background
│   │           └── Waves.css   # Wave styling
│   ├── utils/
│   │   └── quoteData.js       # Quote database
│   ├── App.jsx                # Main application component
│   └── main.jsx               # Application entry point
├── package.json
└── README.md
```

## Components Overview

### App.jsx
- Main application container
- Manages state for mood, quotes, and background
- Handles all animation orchestration
- Controls color cycling and interactions

### QuoteCard.jsx
- Modal overlay for displaying quotes
- Complex entrance/exit animations
- Interactive hover effects
- Animated text and mood tags

### MoodFilter.jsx
- Mood selection interface
- Staggered button animations
- Click feedback effects
- Responsive design

### GlareHover.jsx
- Reusable hover effect component
- Mouse-following light effect
- Customizable properties
- Smooth transitions

### Waves.jsx
- Animated background component
- CSS-based wave animations
- Color-responsive design
- Performance optimized

## Animation Features

- **Timeline Animations** - Complex sequence orchestration
- **Staggered Effects** - Elements animate in waves
- **Easing Functions** - Elastic, bounce, back easing
- **3D Transforms** - Rotation and perspective
- **Color Animations** - Smooth color transitions
- **Morphing Effects** - Shape and size changes
- **Physics-based** - Realistic motion curves

## Customization

### Adding New Moods
1. Update the moods array in `App.jsx`
2. Add corresponding quotes in `utils/quoteData.js`
3. Define mood colors in the `moodColors` object

### Changing Colors
- Modify `waveColors` array for background colors
- Update `moodColors` for mood-specific colors
- Customize glare effects in `GlareHover` component

### Animation Tweaks
- Adjust timing in anime.js configurations
- Modify easing functions for different feels
- Change duration values for speed control

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Performance

- Optimized animations with `will-change`
- Efficient re-renders with React hooks
- CSS transitions for smooth performance
- Minimal bundle size with Vite

## License

MIT License - feel free to use for personal or commercial projects!
