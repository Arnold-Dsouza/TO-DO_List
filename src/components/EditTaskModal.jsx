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
          />
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
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
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default EditTaskModal;