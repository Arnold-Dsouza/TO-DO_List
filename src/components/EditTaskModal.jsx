import React, { useEffect, useRef } from 'react';
import TeamMemberSelection from './TeamMemberSelection';

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

  if (!editingTask) return null;

  // Initialize assignedMembers array if it doesn't exist
  if (!editingTask.assignedMembers) {
    editingTask.assignedMembers = [];
  }

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Edit Item</h2>
          <span className="text-2xl cursor-pointer" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task name
            </label>
            <input
              type="text"
              value={editingTask.name}
              onChange={(e) =>
                setEditingTask({ ...editingTask, name: e.target.value })
              }
              onKeyDown={handleEditKeyDown}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ref={editTaskNameInputRef}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Note
            </label>
            <input
              type="text"
              value={editingTask.note || ''}
              onChange={(e) =>
                setEditingTask({ ...editingTask, note: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={1}>Low</option>
                <option value={2}>Normal</option>
                <option value={3}>Medium</option>
                <option value={4}>High</option>
                <option value={5}>Urgent</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due date
              </label>
              <input
                type="date"
                value={editingTask.dueDate || ''}
                onChange={(e) =>
                  setEditingTask({ ...editingTask, dueDate: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>          {/* Team Member Selection */}
          <TeamMemberSelection
            teamMembers={teamMembers || []}
            selectedMembers={editingTask.assignedMembers || []}
            onChange={(members) =>
              setEditingTask({ ...editingTask, assignedMembers: members })
            }
            onManageMembers={openTeamMembersModal}
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              id="markAsCompleted"
              checked={editingTask.checked}
              onChange={(e) =>
                setEditingTask({ ...editingTask, checked: e.target.checked })
              }
              className="h-4 w-4 text-blue-500 focus:ring-blue-400"
            />
            <label
              htmlFor="markAsCompleted"
              className="ml-2 text-sm text-gray-700"
            >
              Mark as completed
            </label>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => saveEditedTask(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;