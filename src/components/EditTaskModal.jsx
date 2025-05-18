import React, { useEffect, useRef } from 'react';
import TeamMemberSelection from './TeamMemberSelection';
import { useSpring, animated } from '@react-spring/web';

const EditTaskModal = ({
  isOpen,
  onClose,
  editingTask,
  setEditingTask,
  saveEditedTask,
  teamMembers,
  openTeamMembersModal,
  confirmDeleteTask,
}) => {
  const editTaskNameInputRef = useRef(null);

  const modalSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'scale(1)' : 'scale(0.95)',
    config: { tension: 300, friction: 20 }
  });

  useEffect(() => {
    if (isOpen && editTaskNameInputRef.current) {
      editTaskNameInputRef.current.focus();
    }
  }, [isOpen]);

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveEditedTask(false);
    }
  };

  if (!editingTask || !isOpen) return null;

  // Initialize assignedMembers array if it doesn't exist
  if (!editingTask.assignedMembers) {
    editingTask.assignedMembers = [];
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <animated.div 
        style={modalSpring}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Edit Item</h2>
          <button 
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            &times;
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Task name
            </label>
            <input
              type="text"
              value={editingTask.name}
              onChange={(e) =>
                setEditingTask({ ...editingTask, name: e.target.value })
              }
              onKeyDown={handleEditKeyDown}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              ref={editTaskNameInputRef}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Note
            </label>
            <input
              type="text"
              value={editingTask.note || ''}
              onChange={(e) =>
                setEditingTask({ ...editingTask, note: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Priority
              </label>
              <select
                value={editingTask.priority}
                onChange={(e) =>
                  setEditingTask({
                    ...editingTask,
                    priority: parseInt(e.target.value),
                  })
                }
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                <option value={1}>Low</option>
                <option value={2}>Normal</option>
                <option value={3}>Medium</option>
                <option value={4}>High</option>
                <option value={5}>Urgent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Due date
              </label>
              <input
                type="date"
                value={editingTask.dueDate || ''}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, dueDate: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
          {/* Team Member Selection */}
          <TeamMemberSelection
            teamMembers={teamMembers || []}
            selectedMembers={editingTask.assignedMembers || []}
            onChange={(members) =>
              setEditingTask({ ...editingTask, assignedMembers: members })
            }
            onManageMembers={openTeamMembersModal}
          />          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => saveEditedTask(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Save Changes
            </button>
            {editingTask && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (confirmDeleteTask) confirmDeleteTask(editingTask.id);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Delete
              </button>
            )}
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default EditTaskModal;