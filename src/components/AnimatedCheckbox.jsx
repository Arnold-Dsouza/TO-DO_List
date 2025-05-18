import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';

const AnimatedCheckbox = ({ checked, onChange, className = '' }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    // Check initial dark mode status
    setIsDarkMode(document.documentElement.classList.contains('dark'));
    
    // Create an observer to watch for changes to the dark mode class
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });
    
    // Start observing
    observer.observe(document.documentElement, { attributes: true });
    
    // Cleanup
    return () => observer.disconnect();
  }, []);
  
  const checkboxAnimationProps = useSpring({
    transform: checked ? 'scale(1.1)' : 'scale(1)',
    backgroundColor: checked 
      ? '#3B82F6'  // blue-500 when checked
      : isDarkMode ? '#1F2937' : '#ffffff', // dark bg in dark mode, white in light mode
    borderColor: checked 
      ? '#3B82F6'  // blue-500 when checked
      : isDarkMode ? '#4B5563' : '#D1D5DB', // gray-600 in dark mode, gray-300 in light mode
    config: { tension: 300, friction: 10 }
  });

  const checkmarkAnimationProps = useSpring({
    opacity: checked ? 1 : 0,
    transform: checked ? 'scale(1)' : 'scale(0.5)',
    config: { tension: 400, friction: 15 }
  });

  return (
    <div className={`relative ${className}`} onClick={onChange}>
      <animated.div
        style={{
          ...checkboxAnimationProps,
          borderWidth: '2px',
          borderStyle: 'solid',
        }}
        className="h-5 w-5 rounded transition cursor-pointer dark:bg-gray-700 dark:border-gray-600"
      >
        <animated.svg
          style={checkmarkAnimationProps}
          className="h-full w-full text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </animated.svg>
      </animated.div>
    </div>
  );
};

export default AnimatedCheckbox;
