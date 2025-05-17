import React, { useState, useEffect, useRef } from 'react';
import Avatar from './Avatar';

const TeamMembersModal = ({ isOpen, onClose, teamMembers, onAdd, onUpdate, onDelete }) => {
  const [newMemberName, setNewMemberName] = useState('');
  const [editingMember, setEditingMember] = useState(null);
  const nameInputRef = useRef(null);

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

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Manage Team Members</h2>
          <span className="text-2xl cursor-pointer" onClick={onClose}>
            &times;
          </span>
        </div>

        <div className="space-y-4">
          {/* Add new team member */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Add New Team Member
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, handleAddMember)}
                placeholder="Enter name..."
                className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ref={nameInputRef}
              />
              <button
                onClick={handleAddMember}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>

          {/* Team members list */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Team Members
            </label>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {teamMembers.length > 0 ? (
                teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between bg-gray-50 p-2 rounded-md"
                  >
                    {editingMember && editingMember.id === member.id ? (
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
                          className="px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
                          autoFocus
                        />
                        <button
                          onClick={handleUpdateMember}
                          className="px-3 py-1 bg-green-500 text-white text-sm rounded-md hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingMember(null)}
                          className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          <Avatar name={member.name} size="md" />
                          <span>{member.name}</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingMember(member)}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => onDelete(member.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">No team members yet</div>
              )}
            </div>
          </div>
          
          <div className="pt-4 border-t mt-4">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMembersModal;
