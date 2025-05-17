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
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Assign team members:
        </label>
        {onManageMembers && (
          <button 
            onClick={onManageMembers}
            className="text-sm text-blue-500 hover:text-blue-700"
            type="button"
          >
            Manage Team Members
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {teamMembers.map(member => (
          <div 
            key={member.id}
            onClick={() => toggleMember(member)}
            className={`flex items-center gap-2 px-3 py-1 rounded-full cursor-pointer transition-colors ${
              selectedMembers.some(m => m.id === member.id) 
                ? 'bg-blue-100 dark:bg-blue-800' 
                : 'bg-gray-100 dark:bg-gray-700'
            }`}
          >
            <Avatar name={member.name} size="sm" />
            <span className="text-sm">{member.name}</span>
          </div>
        ))}
        {teamMembers.length === 0 && (
          <p className="text-sm text-gray-500">No team members available. Click "Manage Team Members" to add some.</p>
        )}
      </div>
    </div>
  );
};

export default TeamMemberSelection;
