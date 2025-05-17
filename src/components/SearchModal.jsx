import React, { useState, useEffect, useRef } from 'react';
import { formatDate } from '../utils/dateUtils';
import AvatarGroup from './AvatarGroup';
import PriorityTag from './PriorityTag';
import { useSpring, animated } from '@react-spring/web';

const SearchModal = ({ isOpen, onClose, tasks, toggleTaskCheck }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);

  const modalSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'scale(1)' : 'scale(0.95)',
    config: { tension: 300, friction: 20 }
  });

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
      setSearchTerm('');
      setSearchResults([]);
    }
  }, [isOpen]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === '') {
      setSearchResults([]);
    } else {
      const results = tasks.filter(
        (task) =>
          task.name.toLowerCase().includes(term.toLowerCase()) ||
          (task.note && task.note.toLowerCase().includes(term.toLowerCase()))
      );
      setSearchResults(results);
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
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Search Tasks</h2>
          <button 
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            &times;
          </button>
        </div>

        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              autoFocus
              ref={searchInputRef}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
              🔍
            </span>
          </div>
        </div>

        <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-60 overflow-y-auto">
          {searchResults.length > 0 ? (
            searchResults.map((task) => (
              <li
                key={task.id}
                className="py-3 flex flex-col hover:bg-gray-50 dark:hover:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={task.checked}
                      onChange={() => toggleTaskCheck(task.id)}
                      className="mr-3 h-4 w-4 text-blue-500 focus:ring-blue-400"
                    />
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center gap-2">
                        <PriorityTag priority={task.priority} />
                        <span
                          className={`text-gray-800 dark:text-gray-200 ${
                            task.checked ? 'line-through text-gray-500 dark:text-gray-400' : ''
                          }`}
                        >
                          {task.name}
                        </span>
                      </div>
                      {task.note && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">{task.note}</span>
                      )}
                    </div>
                  </div>
                  {task.dueDate && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Due: {formatDate(task.dueDate)}
                    </span>
                  )}
                </div>
                
                {/* Team member avatars */}
                {task.assignedMembers && task.assignedMembers.length > 0 && (
                  <div className="mt-2 ml-7">
                    <AvatarGroup members={task.assignedMembers} max={3} />
                  </div>
                )}
              </li>
            ))
          ) : searchTerm ? (
            <li className="py-2 text-gray-500 dark:text-gray-400 text-center">
              No matching tasks found
            </li>
          ) : (
            <li className="py-2 text-gray-500 dark:text-gray-400 text-center">
              Type to search tasks
            </li>
          )}
        </ul>
      </animated.div>
    </div>
  );
};

export default SearchModal;