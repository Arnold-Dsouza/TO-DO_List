import React from 'react';
import Avatar from './Avatar';
import { useSpring, animated } from '@react-spring/web';

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
            className="text-sm text-blue-500 hover:text-blue-700 transition-colors"
            type="button"
          >
            Manage Team Members
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {teamMembers.map(member => {
          const isSelected = selectedMembers.some(m => m.id === member.id);
          const springProps = useSpring({
            scale: isSelected ? 1.05 : 1,
            backgroundColor: isSelected ? '#dbeafe' : '#f3f4f6',
            color: isSelected ? '#1e40af' : '#4b5563',
            config: { tension: 300, friction: 10 }
          });

          return (
            <animated.div 
              key={member.id}
              onClick={() => toggleMember(member)}
              style={{
                transform: springProps.scale.to(s => `scale(${s})`),
                backgroundColor: springProps.backgroundColor,
                color: springProps.color
              }}
              className="flex items-center gap-2 px-3 py-1 rounded-full cursor-pointer transition-all duration-200 hover:shadow-md dark:bg-gray-700 dark:text-gray-300"
            >
              <Avatar name={member.name} size="sm" />
              <span className="text-sm">{member.name}</span>
            </animated.div>
          );
        })}
        {teamMembers.length === 0 && (
          <p className="text-sm text-gray-500">No team members available. Click "Manage Team Members" to add some.</p>
        )}
      </div>
    </div>
  );
};

export default TeamMemberSelection;
