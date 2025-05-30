import React, { useState, useEffect, useRef } from 'react';
import Avatar from './Avatar';
import { useSpring, animated } from '@react-spring/web';

const TeamMembersModal = ({ isOpen, onClose, teamMembers, onAdd, onUpdate, onDelete }) => {
  const [newMemberName, setNewMemberName] = useState('');
  const [editingMember, setEditingMember] = useState(null);
  const nameInputRef = useRef(null);

  const modalSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'scale(1)' : 'scale(0.95)',
    config: { tension: 300, friction: 20 }
  });

  useEffect(() => {
    if (isOpen && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isOpen]);

  const handleAddMember = () => {
    if (newMemberName.trim()) {
      onAdd(newMemberName);
      setNewMemberName('');
    }
  };

  const handleUpdateMember = () => {
    if (editingMember && editingMember.name.trim()) {
      onUpdate(editingMember.id, editingMember.name);
      setEditingMember(null);
    }
  };

  const handleKeyDown = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <animated.div 
        style={modalSpring}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Manage Team Members</h2>
          <button 
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4">
          {/* Add new team member */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Add New Team Member
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, handleAddMember)}
                placeholder="Enter name..."
                className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                ref={nameInputRef}
              />              <button
                onClick={handleAddMember}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Add
              </button>
            </div>
          </div>

          {/* Team members list */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Current Team Members
            </label>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {teamMembers.length > 0 ? (
                teamMembers.map((member) => {
                  const isEditing = editingMember && editingMember.id === member.id;
                  
                  return (
                    <div
                      key={member.id}
                      className={`flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-2 rounded-md ${
                        isEditing ? 'ring-2 ring-blue-400' : ''
                      }`}
                    >
                      {isEditing ? (
                        <div className="flex gap-2 flex-grow">
                          <input
                            type="text"
                            value={editingMember.name}
                            onChange={(e) =>
                              setEditingMember({
                                ...editingMember,
                                name: e.target.value,
                              })
                            }
                            onKeyDown={(e) => handleKeyDown(e, handleUpdateMember)}
                            className="px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                            autoFocus
                          />
                          <button
                            onClick={handleUpdateMember}
                            className="px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingMember(null)}
                            className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-400 transition-colors dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <>                          <div className="flex items-center gap-3">
                            <Avatar name={member.name} size="md" />
                            <span className="text-gray-800 dark:text-gray-200">{member.name}</span>
                          </div>
                          <div className="flex gap-2">                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-5 w-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-all duration-200" 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                              onClick={() => setEditingMember(member)}
                              title="Edit"
                            >
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer transition-all duration-200 ml-2" 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                              onClick={() => onDelete(member.id)}
                              title="Delete"
                            >
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-gray-500 dark:text-gray-400">No team members yet</div>
              )}
            </div>
          </div>            <div className="flex justify-center pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default TeamMembersModal;
