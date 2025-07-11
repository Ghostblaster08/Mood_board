import React, { useEffect, useRef, useState } from 'react';

const QuoteCard = ({ quote, onClose }) => {
  const quoteRef = useRef(null);
  const overlayRef = useRef(null);
  const textRef = useRef(null);
  const moodRef = useRef(null);
  const closeButtonRef = useRef(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Immediate fallback: make everything visible first
    if (overlayRef.current) overlayRef.current.style.opacity = '1';
    if (quoteRef.current) {
      quoteRef.current.style.opacity = '1';
      quoteRef.current.style.transform = 'scale(1) translateY(0)';
    }
    if (textRef.current) textRef.current.style.opacity = '1';
    if (moodRef.current) moodRef.current.style.opacity = '1';
    if (closeButtonRef.current) closeButtonRef.current.style.opacity = '1';

    setTimeout(() => {
      import('animejs')
        .then((animeModule) => {
          const anime = animeModule.default || animeModule;

          if (typeof anime === 'function' && quoteRef.current && overlayRef.current) {
            // Reset for animations
            if (overlayRef.current) overlayRef.current.style.opacity = '0';
            if (quoteRef.current) quoteRef.current.style.opacity = '0';
            if (textRef.current) textRef.current.style.opacity = '0';
            if (moodRef.current) moodRef.current.style.opacity = '0';
            if (closeButtonRef.current) closeButtonRef.current.style.opacity = '0';

            // Complex entrance animation sequence
            const tl = anime.timeline({
              easing: 'easeOutExpo',
              duration: 750
            });

            // 1. Overlay fade with elastic effect
            tl.add({
              targets: overlayRef.current,
              opacity: [0, 1],
              duration: 600,
              easing: 'easeOutQuint'
            })
            // 2. Card entrance with multiple transforms
            .add({
              targets: quoteRef.current,
              opacity: [0, 1],
              scale: [0.3, 1],
              rotateY: [-90, 0],
              translateY: [100, 0],
              duration: 800,
              easing: 'easeOutElastic(1, .8)'
            }, '-=400')
            // 3. Text typing effect
            .add({
              targets: textRef.current,
              opacity: [0, 1],
              translateX: [-50, 0],
              duration: 600,
              easing: 'easeOutBack(1.7)'
            }, '-=200')
            // 4. Mood tag bounce
            .add({
              targets: moodRef.current,
              opacity: [0, 1],
              scale: [0, 1],
              rotate: [180, 0],
              duration: 500,
              easing: 'easeOutBounce'
            }, '-=300')
            // 5. Close button spring
            .add({
              targets: closeButtonRef.current,
              opacity: [0, 1],
              scale: [0, 1],
              rotate: [360, 0],
              duration: 400,
              easing: 'easeOutBack(1.7)',
              complete: () => setAnimationComplete(true)
            }, '-=200');

            // Continuous floating animation after entrance
            setTimeout(() => {
              anime({
                targets: quoteRef.current,
                translateY: [-5, 5],
                duration: 3000,
                direction: 'alternate',
                loop: true,
                easing: 'easeInOutSine'
              });

              // Text shimmer effect
              anime({
                targets: textRef.current,
                color: ['#374151', '#8B5CF6', '#374151'],
                duration: 4000,
                direction: 'alternate',
                loop: true,
                easing: 'easeInOutQuad'
              });
            }, 1000);

          } else {
            console.log('QuoteCard - Anime not available, using fallback');
            setAnimationComplete(true);
          }
        })
        .catch((err) => {
          console.error('QuoteCard - Failed to load anime.js', err);
          setAnimationComplete(true);
        });
    }, 50);
  }, [quote]);

  const handleClose = () => {
    import('animejs').then((animeModule) => {
      const anime = animeModule.default || animeModule;

      if (typeof anime === 'function') {
        // Complex exit animation
        const tl = anime.timeline({
          complete: () => onClose && onClose()
        });

        tl.add({
          targets: textRef.current,
          opacity: 0,
          translateX: 50,
          duration: 300,
          easing: 'easeInBack(1.7)'
        })
        .add({
          targets: moodRef.current,
          opacity: 0,
          scale: 0,
          rotate: -180,
          duration: 300,
          easing: 'easeInBack(1.7)'
        }, '-=200')
        .add({
          targets: quoteRef.current,
          opacity: 0,
          scale: 0.3,
          rotateY: 90,
          translateY: -100,
          duration: 600,
          easing: 'easeInBack(1.7)'
        }, '-=100')
        .add({
          targets: overlayRef.current,
          opacity: 0,
          duration: 400,
          easing: 'easeInQuint'
        }, '-=300');
      } else {
        onClose && onClose();
      }
    }).catch(() => {
      onClose && onClose();
    });
  };

  const handleCloseButtonHover = () => {
    if (!animationComplete) return;
    
    import('animejs').then((animeModule) => {
      const anime = animeModule.default || animeModule;
      
      if (typeof anime === 'function') {
        anime({
          targets: closeButtonRef.current,
          scale: [1, 1.3],
          rotate: [0, 180],
          color: ['#6B7280', '#EF4444'],
          duration: 300,
          easing: 'easeOutBack(1.7)'
        });
      }
    });
  };

  const handleCloseButtonLeave = () => {
    if (!animationComplete) return;
    
    import('animejs').then((animeModule) => {
      const anime = animeModule.default || animeModule;
      
      if (typeof anime === 'function') {
        anime({
          targets: closeButtonRef.current,
          scale: [1.3, 1],
          rotate: [180, 0],
          color: ['#EF4444', '#6B7280'],
          duration: 300,
          easing: 'easeOutBack(1.7)'
        });
      }
    });
  };

  const handleCardClick = () => {
    if (!animationComplete) return;
    
    import('animejs').then((animeModule) => {
      const anime = animeModule.default || animeModule;
      
      if (typeof anime === 'function') {
        // Pulse effect
        anime({
          targets: quoteRef.current,
          scale: [1, 1.05, 1],
          duration: 400,
          easing: 'easeInOutQuad'
        });
      }
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!quote) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        opacity: 1, // Start visible
        pointerEvents: 'auto',
        cursor: 'pointer',
      }}
    >
      <div
        ref={quoteRef}
        onClick={(e) => {
          e.stopPropagation();
          handleCardClick();
        }}
        style={{
          backgroundColor: 'white',
          padding: '2.5rem',
          borderRadius: '1rem',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          textAlign: 'center',
          maxWidth: '28rem',
          minHeight: '120px',
          cursor: 'pointer',
          position: 'relative',
          opacity: 1, // Start visible
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          border: '1px solid rgba(139, 92, 246, 0.1)'
        }}
      >
        <button
          ref={closeButtonRef}
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          onMouseEnter={handleCloseButtonHover}
          onMouseLeave={handleCloseButtonLeave}
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#6B7280',
            opacity: 1, // Start visible
            fontWeight: 'bold'
          }}
        >
          ×
        </button>

        <h2
          ref={textRef}
          style={{
            fontSize: '1.375rem',
            fontWeight: '600',
            fontStyle: 'italic',
            color: '#374151',
            marginBottom: '1rem',
            lineHeight: '1.6',
            opacity: 1 // Start visible
          }}
        >
          "{quote.text}"
        </h2>
        
        <p
          ref={moodRef}
          style={{
            fontSize: '0.875rem',
            color: '#8B5CF6',
            marginTop: '0.5rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            opacity: 1, // Start visible
            padding: '0.25rem 0.75rem',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            borderRadius: '1rem',
            display: 'inline-block'
          }}
        >
          {quote.mood}
        </p>
      </div>
    </div>
  );
};

export default QuoteCard;
