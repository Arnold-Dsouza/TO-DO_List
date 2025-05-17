import React from 'react';
import { useSpring, animated } from '@react-spring/web';

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  taskToDelete,
  deleteAllConfirm,
}) => {
  const modalSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'scale(1)' : 'scale(0.95)',
    config: { tension: 300, friction: 20 }
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <animated.div 
        style={modalSpring}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Confirm</h2>
          <button 
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            &times;
          </button>
        </div>
        <div className="mb-6 text-gray-700 dark:text-gray-300">
          {deleteAllConfirm ? (
            <p>
              Are you sure you want to delete all tasks? This action cannot be
              undone.
            </p>
          ) : taskToDelete ? (
            <p>
              Are you sure you want to delete "{taskToDelete.name}"? This action
              cannot be undone.
            </p>
          ) : null}
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </animated.div>
    </div>
  );
};

export default ConfirmModal;