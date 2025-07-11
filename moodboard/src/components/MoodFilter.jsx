// src/components/MoodFilter.jsx
import React, { useRef, useEffect } from 'react';

const MoodFilter = ({ moods, activeMood, setMood }) => {
  const containerRef = useRef(null);
  const buttonRefs = useRef([]);

  useEffect(() => {
    // Make sure buttons are visible first
    buttonRefs.current.forEach(button => {
      if (button) {
        button.style.opacity = '1';
      }
    });

    // Then try to enhance with animations
    import('animejs').then((animeModule) => {
      const anime = animeModule.default || animeModule;
      
      console.log('MoodFilter - Anime loaded:', anime); // Debug log
      
      if (typeof anime === 'function') {
        // Staggered entrance animation
        anime({
          targets: buttonRefs.current,
          opacity: [0, 1],
          scale: [0, 1],
          translateY: [20, 0],
          rotate: [180, 0],
          delay: anime.stagger(100),
          duration: 600,
          easing: 'easeOutElastic(1, .8)'
        });
      } else {
        console.log('MoodFilter - Anime not available, buttons already visible');
      }
    }).catch(err => {
      console.error('MoodFilter - Failed to load anime.js:', err);
      // Buttons are already visible from the fallback above
    });
  }, []);

  const handleMoodClick = (mood, index) => {
    import('animejs').then((animeModule) => {
      const anime = animeModule.default || animeModule;
      
      if (typeof anime === 'function') {
        // Simple click animation
        anime({
          targets: buttonRefs.current[index],
          scale: [1, 1.1, 1],
          duration: 300,
          easing: 'easeOutBack(1.7)'
        });
      }
    }).catch(err => {
      console.log('Click animation failed:', err);
    });
    
    setMood(mood);
  };

  return (
    <div 
      ref={containerRef}
      className="flex flex-wrap gap-3 justify-center"
    >
      {moods.map((mood, index) => (
        <button
          key={mood}
          ref={el => buttonRefs.current[index] = el}
          onClick={() => handleMoodClick(mood, index)}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '2rem',
            border: '2px solid',
            borderColor: activeMood === mood ? '#8B5CF6' : '#E5E7EB',
            backgroundColor: activeMood === mood ? '#8B5CF6' : 'white',
            color: activeMood === mood ? 'white' : '#374151',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            boxShadow: activeMood === mood 
              ? '0 10px 15px -3px rgba(139, 92, 246, 0.3)'
              : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.2s ease',
            opacity: 1, // Start visible
            transform: 'scale(1)', // Start at normal size
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05) translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1) translateY(0)';
          }}
        >
          {mood}
        </button>
      ))}
    </div>
  );
};

export default MoodFilter;
