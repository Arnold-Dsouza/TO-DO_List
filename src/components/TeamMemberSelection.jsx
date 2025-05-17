import React from 'react';
import Avatar from './Avatar';

const TeamMemberSelection = ({ teamMembers, selectedMembers, onChange, onManageMembers }) => {
  const toggleMember = (member) => {
    if (selectedMembers.some(m => m.id === member.id)) {
      onChange(selectedMembers.filter(m => m.id !== member.id));
    } else {
      onChange([...selectedMembers, member]);
    }
  };

  return (
    <div>      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Assign team members:
        </label>
      </div>
      <div className="flex flex-wrap gap-2">
        {teamMembers.map(member => {
          const isSelected = selectedMembers.some(m => m.id === member.id);

          return (
            <div 
              key={member.id}
              onClick={() => toggleMember(member)}
              style={{
                transform: isSelected ? 'scale(1.05)' : 'scale(1)',
              }}
              className={`
                flex items-center gap-2 px-3 py-1 rounded-full cursor-pointer transition-all duration-200 hover:shadow-md
                ${isSelected 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'}
              `}
            >
              <Avatar name={member.name} size="sm" />
              <span className="text-sm">{member.name}</span>
            </div>
          );
        })}        {teamMembers.length === 0 && (
          <p className="text-sm text-gray-500">No team members available.</p>
        )}
      </div>
    </div>
  );
};

export default TeamMemberSelection;
