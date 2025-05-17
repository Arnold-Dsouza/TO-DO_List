import React from 'react';
import Avatar from './Avatar';

const TaskFilter = ({ 
  priorities,
  teamMembers,
  selectedPriorities,
  selectedMembers,
  showCompleted,
  onPriorityChange,
  onMemberChange,
  onCompletedChange
}) => {
  
  const handlePriorityToggle = (priority) => {
    if (selectedPriorities.includes(priority)) {
      onPriorityChange(selectedPriorities.filter(p => p !== priority));
    } else {
      onPriorityChange([...selectedPriorities, priority]);
    }
  };
  
  const handleMemberToggle = (memberId) => {
    if (selectedMembers.includes(memberId)) {
      onMemberChange(selectedMembers.filter(id => id !== memberId));
    } else {
      onMemberChange([...selectedMembers, memberId]);
    }
  };
  
  // Priority color mapping
  const priorityColors = {
    1: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300', label: 'Low' },
    2: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300', label: 'Normal' },
    3: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300', label: 'Medium' },
    4: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300', label: 'High' },
    5: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300', label: 'Urgent' }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
      <div className="flex flex-wrap justify-between items-center gap-2">
        {/* Priority filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Priority:</span>
          {priorities.map(priority => (
            <button
              key={priority}
              type="button"
              onClick={() => handlePriorityToggle(priority)}
              className={`
                px-3 py-1 rounded-md text-xs font-medium transition-all duration-200
                ${selectedPriorities.includes(priority) 
                  ? `${priorityColors[priority].bg} ${priorityColors[priority].text} border-2 ${priorityColors[priority].border} scale-105` 
                  : 'bg-gray-100 text-gray-600 border-2 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 hover:scale-105'}
              `}
            >
              {priorityColors[priority].label}
            </button>
          ))}
          {selectedPriorities.length > 0 && (
            <button
              type="button"
              onClick={() => onPriorityChange([])}
              className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors ml-1"
            >
              Clear
            </button>
          )}
        </div>
        
        {/* Show completed toggle */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="show-completed"
            checked={showCompleted}
            onChange={e => onCompletedChange(e.target.checked)}
            className="h-4 w-4 text-blue-500 focus:ring-blue-400"
          />
          <label htmlFor="show-completed" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
            Show completed
          </label>
        </div>
      </div>
      
      {/* Team member filters */}
      {teamMembers && teamMembers.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Assignees:</span>
            {teamMembers.map(member => {
              const isSelected = selectedMembers.includes(member.id);

              return (
                <button
                  key={member.id}
                  type="button"
                  onClick={() => handleMemberToggle(member.id)}
                  style={{
                    transform: isSelected ? 'scale(1.05)' : 'scale(1)'
                  }}
                  className={`
                    flex items-center gap-1 px-2 py-1 rounded-full text-xs
                    transition-all duration-200 hover:shadow-md
                    ${isSelected 
                      ? 'bg-blue-100 text-blue-800 border-2 border-blue-300 dark:bg-blue-800 dark:text-blue-100 dark:border-blue-600' 
                      : 'bg-gray-100 text-gray-600 border border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600'}
                  `}
                >
                  <Avatar name={member.name} size="sm" />
                  <span>{member.name}</span>
                </button>
              );
            })}
            {selectedMembers.length > 0 && (
              <button
                type="button"
                onClick={() => onMemberChange([])}
                className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors ml-1"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskFilter;
