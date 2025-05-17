import React from 'react';

const Avatar = ({ name, size = 'md' }) => {
  // Generate a consistent color based on the name
  const stringToColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  };

  // Get initials from name (up to 2 characters)
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const bgColor = stringToColor(name || 'Unknown');
  const initials = getInitials(name);

  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-10 h-10 text-base',
  };

  return (
    <div 
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center text-white font-medium`}
      style={{ backgroundColor: bgColor }}
      title={name}
    >
      {initials}
    </div>
  );
};

export default Avatar;
