import React from 'react';
import Avatar from './Avatar';

const AvatarGroup = ({ members, max = 3 }) => {
  if (!members || members.length === 0) {
    return null;
  }

  // Limit the number of displayed avatars
  const displayMembers = members.slice(0, max);
  const extraCount = members.length > max ? members.length - max : 0;

  return (
    <div className="flex -space-x-2">
      {displayMembers.map((member, index) => (
        <div key={member.id} className="relative">
          <Avatar name={member.name} size="sm" />
        </div>
      ))}
      
      {extraCount > 0 && (
        <div 
          className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 font-medium"
          title={`${extraCount} more team members`}
        >
          +{extraCount}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
