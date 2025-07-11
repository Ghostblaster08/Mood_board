import React, { useState, useEffect, useRef } from 'react';
import QuoteCard from './components/QuoteCard';
import MoodFilter from './components/MoodFilter';
import GlareHover from './components/GlareHover';
import Waves from './blocks/Backgrounds/Waves/Waves';
import { quotes } from './utils/quoteData';

function App() {
  const [mood, setMood] = useState(null);
  const [showQuote, setShowQuote] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(null);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const titleRef = useRef(null);
  const containerRef = useRef(null);
  const backgroundRef = useRef(null);
  const rippleRef = useRef(null);
  const wavesRef = useRef(null);

  // Array of beautiful colors for waves
  const waveColors = [
    '#667eea', // Purple-blue
    '#f093fb', // Pink
    '#4facfe', // Light blue
    '#43e97b', // Green
    '#fa709a', // Pink-orange
    '#a8edea', // Mint
    '#ff9a9e', // Coral
    '#764ba2'  // Deep purple
  ];

  // Array of beautiful gradient backgrounds for fallback
  const backgroundGradients = [
    'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(225deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(315deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(45deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(225deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(315deg, #667eea 0%, #764ba2 100%)'
  ];

  useEffect(() => {
    // Fallback: Show content immediately, then enhance with animations
    if (containerRef.current) {
      containerRef.current.style.opacity = '1';
    }

    // Complex page entrance animation
    import('animejs').then((animeModule) => {
      const anime = animeModule.default || animeModule;
      
      console.log('Anime loaded:', anime);
      
      if (typeof anime === 'function') {
        // Auto-changing wave colors
        anime({
          targets: wavesRef.current,
          '--wave-color': waveColors,
          duration: 8000,
          direction: 'alternate',
          loop: true,
          easing: 'easeInOutQuad',
          update: function() {
            // Update CSS custom property for wave color
            if (wavesRef.current) {
              const currentColor = waveColors[backgroundIndex];
              wavesRef.current.style.setProperty('--wave-color', currentColor);
            }
          }
        });

        // Title entrance with typewriter effect
        if (titleRef.current) {
          const titleText = titleRef.current.textContent;
          titleRef.current.innerHTML = '';
          
          for (let i = 0; i < titleText.length; i++) {
            const span = document.createElement('span');
            span.textContent = titleText[i];
            span.style.opacity = '0';
            titleRef.current.appendChild(span);
          }

          anime({
            targets: titleRef.current.children,
            opacity: [0, 1],
            translateY: [20, 0],
            rotateX: [90, 0],
            delay: anime.stagger(100),
            duration: 600,
            easing: 'easeOutBack(1.7)',
            complete: () => {
              // After typewriter, add floating animation
              anime({
                targets: titleRef.current,
                translateY: [0, -10, 0],
                rotateZ: [0, 1, 0, -1, 0],
                duration: 4000,
                loop: true,
                easing: 'easeInOutSine'
              });
            }
          });
        }

        // Container entrance
        if (containerRef.current) {
          anime({
            targets: containerRef.current,
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 1000,
            delay: 500,
            easing: 'easeOutElastic(1, .8)'
          });
        }
      } else {
        console.log('Anime not available, using fallback');
        if (containerRef.current) containerRef.current.style.opacity = '1';
        if (titleRef.current) titleRef.current.style.opacity = '1';
      }
    }).catch((err) => {
      console.error('Failed to load anime.js:', err);
      if (containerRef.current) containerRef.current.style.opacity = '1';
      if (titleRef.current) titleRef.current.style.opacity = '1';
    });
  }, []);

  // Generate a new quote when mood changes
  useEffect(() => {
    if (mood) {
      const filteredQuotes = quotes.filter((q) => q.mood === mood);
      
      if (filteredQuotes.length > 0) {
        const randomQuote = filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
        setCurrentQuote(randomQuote);
        setShowQuote(true);

        // Change waves color based on mood
        const moodColors = {
          happy: '#FFE066',
          focused: '#667eea',
          relaxed: '#a8edea',
          motivated: '#ff9a9e'
        };

        if (wavesRef.current && moodColors[mood]) {
          import('animejs').then((animeModule) => {
            const anime = animeModule.default || animeModule;
            
            if (typeof anime === 'function') {
              anime({
                targets: wavesRef.current,
                duration: 1000,
                easing: 'easeOutQuad',
                update: function() {
                  wavesRef.current.style.setProperty('--wave-color', moodColors[mood]);
                }
              });
            }
          });
        }
      }
    }
  }, [mood]);

  const handleTitleClick = (e) => {
    // Get click position relative to the title element
    const rect = titleRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Cycle to next background
    const nextIndex = (backgroundIndex + 1) % waveColors.length;
    setBackgroundIndex(nextIndex);

    import('animejs').then((animeModule) => {
      const anime = animeModule.default || animeModule;
      
      if (typeof anime === 'function') {
        // Create ripple effect
        if (rippleRef.current) {
          // Position ripple at click location
          rippleRef.current.style.left = x + 'px';
          rippleRef.current.style.top = y + 'px';
          rippleRef.current.style.display = 'block';

          // Animate ripple expansion
          anime({
            targets: rippleRef.current,
            scale: [0, 8],
            opacity: [0.8, 0],
            duration: 1000,
            easing: 'easeOutQuart',
            complete: () => {
              rippleRef.current.style.display = 'none';
              rippleRef.current.style.scale = '0';
            }
          });
        }

        // Smooth wave color transition
        if (wavesRef.current) {
          anime({
            targets: wavesRef.current,
            duration: 1200,
            easing: 'easeOutQuart',
            update: function() {
              wavesRef.current.style.setProperty('--wave-color', waveColors[nextIndex]);
            }
          });
        }

        // Title bounce effect
        anime({
          targets: titleRef.current,
          scale: [1, 1.1, 1],
          rotateZ: [0, 5, -5, 0],
          duration: 600,
          easing: 'easeOutElastic(1, .8)'
        });

        // Color wave effect through title letters
        if (titleRef.current.children.length > 0) {
          anime({
            targets: titleRef.current.children,
            color: [
              '#ffffff',
              '#FFE066',
              '#FF6B6B',
              '#4ECDC4',
              '#45B7D1',
              '#96CEB4',
              '#FFEAA7',
              '#DDA0DD',
              '#ffffff'
            ],
            delay: anime.stagger(100),
            duration: 1500,
            easing: 'easeOutQuart'
          });
        }
      }
    }).catch(err => {
      console.error('Animation failed:', err);
    });
  };

  const handleQuoteClose = () => {
    setShowQuote(false);
    setMood(null);
    
    // Reset waves to default color
    if (wavesRef.current) {
      import('animejs').then((animeModule) => {
        const anime = animeModule.default || animeModule;
        
        if (typeof anime === 'function') {
          anime({
            targets: wavesRef.current,
            duration: 800,
            easing: 'easeOutQuad',
            update: function() {
              wavesRef.current.style.setProperty('--wave-color', waveColors[backgroundIndex]);
            }
          });
        }
      });
    }
  };

  return (
    <div 
      ref={backgroundRef}
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: backgroundGradients[backgroundIndex], // Fallback gradient
        padding: '1rem',
        boxSizing: 'border-box',
        position: 'absolute',
        left: 0,
        top: 0,
        overflow: 'hidden'
      }}
    >
      {/* Waves Background Component */}
      <div 
        ref={wavesRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          '--wave-color': waveColors[backgroundIndex]
        }}
      >
        <Waves 
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </div>

      <div 
        ref={containerRef}
        style={{
          width: '100%',
          maxWidth: '500px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: 1,
          position: 'relative',
          zIndex: 10 // Above the waves
        }}
      >
        <GlareHover
          glareColor="#ffffff"
          glareOpacity={0.4}
          glareAngle={-20}
          glareSize={400}
          transitionDuration={600}
          playOnce={false}
        >
          <h1 
            ref={titleRef}
            onClick={handleTitleClick}
            style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              marginBottom: '2rem',
              textAlign: 'center',
              width: '100%',
              color: 'white',
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              cursor: 'pointer',
              position: 'relative',
              userSelect: 'none',
              transition: 'transform 0.1s ease',
              padding: '1rem 2rem',
              borderRadius: '1rem'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
          >
            MoodBoard 🧘‍♀️
            {/* Ripple effect element */}
            <div
              ref={rippleRef}
              style={{
                position: 'absolute',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 100%)',
                transform: 'scale(0)',
                pointerEvents: 'none',
                display: 'none',
                zIndex: -1
              }}
            />
          </h1>
        </GlareHover>
        
        <div style={{ 
          width: '100%', 
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '1.5rem'
        }}>
          <MoodFilter
            moods={['happy', 'focused', 'relaxed', 'motivated']}
            activeMood={mood}
            setMood={setMood}
          />
        </div>
      </div>
      
      {showQuote && currentQuote && (
        <QuoteCard 
          quote={currentQuote} 
          onClose={handleQuoteClose}
        />
      )}
    </div>
  );
}

export default App;
