import React from 'react';

const PriorityTag = ({ priority }) => {
  // Define priority levels and their properties
  const priorities = {
    1: { color: 'bg-green-100 text-green-800', label: 'Low' },
    2: { color: 'bg-blue-100 text-blue-800', label: 'Normal' },
    3: { color: 'bg-yellow-100 text-yellow-800', label: 'Medium' },
    4: { color: 'bg-orange-100 text-orange-800', label: 'High' },
    5: { color: 'bg-red-100 text-red-800', label: 'Urgent' },
  };

  const { color, label } = priorities[priority] || priorities[1];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  );
};

export default PriorityTag;
