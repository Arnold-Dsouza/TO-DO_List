import React, { useEffect, useRef } from 'react';
import { formatDate } from '../utils/dateUtils';
import PriorityTag from './PriorityTag';
import AvatarGroup from './AvatarGroup';
import { useSpring, animated } from '@react-spring/web';

const ManageTaskModal = ({
  isOpen,
  onClose,
  task,
  toggleTaskCheck,
  openEditModal,
  confirmDeleteTask,
  teamMembers,
}) => {
  const modalRef = useRef(null);

  const modalSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'scale(1)' : 'scale(0.95)',
    config: { tension: 300, friction: 20 }
  });

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  // Close on escape key press
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <animated.div 
        ref={modalRef}
        style={modalSpring}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6"
        tabIndex={-1}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Manage Task</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div className="flex items-start space-x-2">
              <div className="flex-shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={task.checked}
                  onChange={() => toggleTaskCheck(task.id)}
                  className="h-5 w-5 text-blue-500 focus:ring-blue-400 rounded"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <PriorityTag priority={task.priority} />
                  <span className={`text-lg font-medium ${task.checked ? 'line-through text-gray-500' : 'text-gray-800 dark:text-white'}`}>
                    {task.name}
                  </span>
                </div>
                
                {task.note && (
                  <div className="mt-2">
                    <div className="text-sm text-gray-600 dark:text-gray-300">Note:</div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {task.note}
                    </p>
                  </div>
                )}

                {task.dueDate && (
                  <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Due: {formatDate(task.dueDate)}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Assigned members section */}
          {task.assignedMembers && task.assignedMembers.length > 0 && (
            <div>
              <h3 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Assigned Team Members:</h3>
              <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                <AvatarGroup members={task.assignedMembers} max={10} />
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button
              onClick={() => {
                onClose();
                openEditModal(task);
              }}
              className="relative px-4 py-2 text-blue-500 hover:text-blue-700 bg-blue-50 dark:bg-blue-900/20 rounded-md transition-all duration-200 border-b-4 border-blue-200 dark:border-blue-800 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Task
            </button>
            <button
              onClick={() => {
                onClose();
                confirmDeleteTask(task.id);
              }}
              className="relative px-4 py-2 text-red-500 hover:text-red-700 bg-red-50 dark:bg-red-900/20 rounded-md transition-all duration-200 border-b-4 border-red-200 dark:border-red-800 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete Task
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => {
                toggleTaskCheck(task.id);
                onClose();  // Close the modal after toggling
              }}
              className={`relative px-4 py-2 ${
                task.checked 
                  ? 'text-green-500 hover:text-green-700 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                  : 'text-gray-500 hover:text-gray-700 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
              } rounded-md transition-all duration-200 border-b-4 flex items-center justify-center`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {task.checked ? "Mark as Incomplete" : "Mark as Complete"}
            </button>
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default ManageTaskModal;
