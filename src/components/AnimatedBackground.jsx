import React, { useState, useEffect, useMemo } from 'react';
import { useSpring, animated, config } from '@react-spring/web';

const AnimatedBackground = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Monitor theme changes
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    // Initial check
    checkDarkMode();

    // Set up a mutation observer to track class changes on the documentElement
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'class') {
          checkDarkMode();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Generate random shapes for the background
  const shapes = useMemo(() => {
    const shapesArray = [];
    const shapesCount = 25; // Increased shape count for better effect

    for (let i = 0; i < shapesCount; i++) {
      const shape = {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 3 + Math.random() * 15,
        opacity: 0.05 + Math.random() * 0.15,
        rotation: Math.random() * 360,
        shape: Math.random() > 0.6 ? 'circle' : Math.random() > 0.5 ? 'square' : 'triangle',
        depth: Math.random() * 100,
        speed: 0.5 + Math.random() * 2,
      };
      shapesArray.push(shape);
    }
    return shapesArray;
  }, []);

  // Animation for the shapes
  const shapesProps = useSpring({
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
    config: { mass: 5, tension: 350, friction: 40 }
  });

  // Theme transition animation
  const themeTransition = useSpring({
    config: { duration: 800 },
    opacity: 1,
    from: { opacity: 0 },
    reset: true,
    color: isDarkMode ? 'rgba(30, 58, 138, 0.7)' : 'rgba(219, 234, 254, 0.7)'
  });

  // Mouse parallax effect
  const handleMouseMove = (e) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: (e.clientY / window.innerHeight) * 2 - 1
    });
  };

  // Subtle floating animation for all elements
  const floatingAnimation = useSpring({
    from: { transform: 'translate3d(0px, 0px, 0px)' },
    to: async (next) => {
      while (true) {
        await next({ transform: 'translate3d(0px, 10px, 0px)' });
        await next({ transform: 'translate3d(0px, 0px, 0px)' });
        await next({ transform: 'translate3d(0px, -10px, 0px)' });
        await next({ transform: 'translate3d(0px, 0px, 0px)' });
      }
    },
    config: { duration: 10000, tension: 120, friction: 14 }
  });

  // Background animation
  const backgroundProps = useSpring({
    background: isDarkMode 
      ? 'linear-gradient(135deg, rgba(15, 23, 42, 0), rgba(30, 58, 138, 0.1))'
      : 'linear-gradient(135deg, rgba(255, 255, 255, 0), rgba(147, 197, 253, 0.1))',
    config: { duration: 800 }
  });
  return (
    <animated.div 
      className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] perspective-1000"
      onMouseMove={handleMouseMove}
      style={{...backgroundProps, opacity: 1}}
    >
      {/* Central gradient glow */}      <animated.div
        style={{
          ...themeTransition,
          boxShadow: isDarkMode 
            ? '0 0 200px 100px rgba(30, 64, 175, 0.4)'
            : '0 0 200px 100px rgba(191, 219, 254, 0.4)',
          position: 'absolute',
          left: '50%',
          top: '30%',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(10px)',
          zIndex: -5
        }}
      />

      {/* 3D Grid (subtle) */}      <animated.div 
        className="absolute inset-0" 
        style={{
          backgroundImage: isDarkMode
            ? 'linear-gradient(rgba(30, 58, 138, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(30, 58, 138, 0.15) 1px, transparent 1px)'
            : 'linear-gradient(rgba(147, 197, 253, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(147, 197, 253, 0.2) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          perspective: '1000px',
          transformStyle: 'preserve-3d',
          transform: mousePosition.x 
            ? `rotateX(60deg) rotateY(${mousePosition.x * 2}deg) scale(2.5)` 
            : 'rotateX(60deg) scale(2.5)',
          opacity: 0.7,
          zIndex: -10,
          ...floatingAnimation
        }}
      />

      {/* Random shapes */}      {shapes.map((shape, index) => {
        // Calculate parallax movement based on mouse position and shape depth
        const translateX = mousePosition.x * (shape.depth / 20);
        const translateY = mousePosition.y * (shape.depth / 20);
        const translateZ = shape.depth;
        
        // Depth-based sizing and opacity
        const scaleFactor = 1 - (shape.depth / 200);
        // Increased base opacity for better visibility
        const depthOpacity = Math.min(0.85, (shape.opacity + 0.4) * (1 - (shape.depth / 200)));
        
        return (
          <animated.div
            key={shape.id}
            style={{
              opacity: shapesProps.opacity.to(o => o * depthOpacity),
              transform: shapesProps.scale.to(s => 
                `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) 
                 rotate(${shape.rotation}deg) 
                 scale(${s * scaleFactor})`
              ),
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              position: 'absolute',
              width: `${shape.size}rem`,
              height: `${shape.size}rem`,              background: isDarkMode
                ? shape.shape === 'circle' 
                  ? `radial-gradient(circle, rgba(59, 130, 246, ${depthOpacity * 2.5}), rgba(30, 64, 175, ${depthOpacity * 1.5}) 60%, transparent 80%)`
                  : `conic-gradient(at 50% 50%, rgba(79, 70, 229, ${depthOpacity * 2}), rgba(30, 64, 175, ${depthOpacity * 1.5}), rgba(59, 130, 246, ${depthOpacity * 1.7}), rgba(79, 70, 229, ${depthOpacity * 2}))`
                : shape.shape === 'circle'
                  ? `radial-gradient(circle, rgba(147, 197, 253, ${depthOpacity * 2.5}), rgba(191, 219, 254, ${depthOpacity * 1.5}) 60%, transparent 80%)`
                  : `conic-gradient(at 50% 50%, rgba(191, 219, 254, ${depthOpacity * 2}), rgba(147, 197, 253, ${depthOpacity * 1.5}), rgba(96, 165, 250, ${depthOpacity * 1.7}), rgba(191, 219, 254, ${depthOpacity * 2}))`,
              borderRadius: shape.shape === 'circle' 
                ? '50%' 
                : shape.shape === 'triangle'
                  ? '0 50% 50% 50%'
                  : (Math.random() > 0.5 ? '30%' : '15%'),              boxShadow: isDarkMode
                ? `0 0 ${12 + shape.depth / 8}px rgba(30, 64, 175, ${depthOpacity * 1.2})`
                : `0 0 ${12 + shape.depth / 8}px rgba(147, 197, 253, ${depthOpacity * 1.2})`,
              filter: `blur(${Math.max(0.5, (shape.depth / 50) * 2)}px)`,
              animationDuration: `${30 + shape.speed * 20}s`,
              zIndex: Math.round(-10 - (shape.depth / 10)),
              transformStyle: 'preserve-3d',
            }}
          />
        );
      })}
      
      {/* Color gradient overlay */}      <animated.div 
        className="absolute inset-0 transition-colors duration-500"
        style={{
          background: isDarkMode 
            ? 'radial-gradient(circle at 50% 30%, rgba(30, 58, 138, 0.25) 0%, rgba(15, 23, 42, 0) 70%)'
            : 'radial-gradient(circle at 50% 30%, rgba(219, 234, 254, 0.3) 0%, rgba(255, 255, 255, 0) 70%)',
          backdropFilter: 'blur(1px)'
        }}
      />

      {/* Floating orbs with 3D depth */}      {[0, 1, 2, 3, 4].map(index => {
        const size = 10 + Math.random() * 20;
        const depth = 50 + index * 30;
        const xPos = 20 + (index * 15) % 60;
        const yPos = 10 + (index * 25) % 80;
        const xOffset = mousePosition.x * (depth / 15);
        const yOffset = mousePosition.y * (depth / 15);
        
        return (
          <animated.div
            key={`orb-${index}`}
            style={{
              position: 'absolute',
              left: `${xPos}%`,
              top: `${yPos}%`,
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              transform: `translate3d(${xOffset}px, ${yOffset}px, ${-depth}px)`,
              background: isDarkMode
                ? `radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.4), rgba(30, 64, 175, 0.15) 70%, transparent)`
                : `radial-gradient(circle at 30% 30%, rgba(191, 219, 254, 0.4), rgba(96, 165, 250, 0.15) 70%, transparent)`,
              boxShadow: isDarkMode
                ? 'inset 0 0 20px rgba(30, 64, 175, 0.5), 0 0 30px rgba(59, 130, 246, 0.4)'
                : 'inset 0 0 20px rgba(191, 219, 254, 0.5), 0 0 30px rgba(147, 197, 253, 0.4)',
              opacity: 0.9 - (depth / 300),
              filter: `blur(${depth / 80}px)`,
              zIndex: -15,
            }}
          />
        );
      })}

      {/* SVG Particles */}
      <svg width="100%" height="100%" className="absolute inset-0 z-[-8] opacity-60 pointer-events-none">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {[...Array(15)].map((_, i) => {
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const size = 1 + Math.random() * 3;
          const opacity = 0.3 + Math.random() * 0.4;
          
          const animClass = i % 3 === 0 
            ? 'float-animation' 
            : i % 3 === 1 
              ? 'float-animation-slow' 
              : 'float-animation-reverse';
              
          return (
            <circle 
              key={`svg-particle-${i}`}
              cx={`${x}%`} 
              cy={`${y}%`} 
              r={size}
              fill={isDarkMode ? 'rgba(59, 130, 246, 0.8)' : 'rgba(147, 197, 253, 0.8)'}
              filter="url(#glow)"
              opacity={opacity}
              className={animClass}
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          );
        })}
      </svg>
    </animated.div>  );
};

export default AnimatedBackground;
