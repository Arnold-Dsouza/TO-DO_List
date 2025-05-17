import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const PriorityTag = ({ priority }) => {
  const springProps = useSpring({
    scale: 1,
    config: { tension: 300, friction: 10 }
  });

  const priorityConfig = {
    1: {
      label: 'Low',
      icon: '📉',
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-800 dark:text-green-300',
      border: 'border-green-300 dark:border-green-700'
    },
    2: {
      label: 'Normal',
      icon: '📊',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-800 dark:text-blue-300',
      border: 'border-blue-300 dark:border-blue-700'
    },
    3: {
      label: 'Medium',
      icon: '⚠️',
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
      text: 'text-yellow-800 dark:text-yellow-300',
      border: 'border-yellow-300 dark:border-yellow-700'
    },
    4: {
      label: 'High',
      icon: '🔥',
      bg: 'bg-orange-100 dark:bg-orange-900/30',
      text: 'text-orange-800 dark:text-orange-300',
      border: 'border-orange-300 dark:border-orange-700'
    },
    5: {
      label: 'Urgent',
      icon: '🚨',
      bg: 'bg-red-100 dark:bg-red-900/30',
      text: 'text-red-800 dark:text-red-300',
      border: 'border-red-300 dark:border-red-700'
    }
  };

  const config = priorityConfig[priority] || priorityConfig[2];

  return (
    <animated.div
      style={springProps}
      className={`
        inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium
        ${config.bg} ${config.text} border ${config.border}
        transition-all duration-200 hover:scale-105
      `}
    >
      <span className="text-sm">{config.icon}</span>
      <span>{config.label}</span>
    </animated.div>
  );
};

export default PriorityTag;
