import React, { useRef, useState } from 'react';

const GlareHover = ({
  children,
  glareColor = "#ffffff",
  glareOpacity = 0.3,
  glareAngle = -30,
  glareSize = 300,
  transitionDuration = 800,
  playOnce = false
}) => {
  const elementRef = useRef(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  const handleMouseMove = (e) => {
    if (playOnce && hasPlayed) return;

    const element = elementRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate glare position based on mouse position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;

    // Apply glare effect
    const glareX = 50 + deltaX * 50;
    const glareY = 50 + deltaY * 50;

    element.style.setProperty('--glare-x', `${glareX}%`);
    element.style.setProperty('--glare-y', `${glareY}%`);
    element.style.setProperty('--glare-opacity', glareOpacity);
  };

  const handleMouseEnter = () => {
    if (playOnce && hasPlayed) return;

    const element = elementRef.current;
    if (!element) return;

    element.style.setProperty('--glare-opacity', glareOpacity);
    if (playOnce) setHasPlayed(true);
  };

  const handleMouseLeave = () => {
    if (playOnce && hasPlayed) return;

    const element = elementRef.current;
    if (!element) return;

    element.style.setProperty('--glare-opacity', '0');
  };

  return (
    <div
      ref={elementRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        overflow: 'hidden',
        '--glare-color': glareColor,
        '--glare-size': `${glareSize}px`,
        '--glare-angle': `${glareAngle}deg`,
        '--glare-x': '50%',
        '--glare-y': '50%',
        '--glare-opacity': '0',
        '--transition-duration': `${transitionDuration}ms`,
      }}
      className="glare-hover-container"
    >
      {children}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle var(--glare-size) at var(--glare-x) var(--glare-y), var(--glare-color) 0%, transparent 70%)`,
          opacity: 'var(--glare-opacity)',
          transition: `opacity var(--transition-duration)ms ease-out`,
          pointerEvents: 'none',
          transform: `rotate(var(--glare-angle))`,
          transformOrigin: 'center center',
        }}
      />
    </div>
  );
};

export default GlareHover;