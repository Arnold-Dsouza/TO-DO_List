import React, { useState, useEffect, useRef } from 'react';
import { formatDate } from '../utils/dateUtils';
import AvatarGroup from './AvatarGroup';
import PriorityTag from './PriorityTag';

const SearchModal = ({ isOpen, onClose, tasks, toggleTaskCheck }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);

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

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Search Tasks</h2>
          <span className="text-2xl cursor-pointer" onClick={onClose}>
            &times;
          </span>
        </div>

        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              autoFocus
              ref={searchInputRef}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
        </div>

        <ul className="divide-y divide-gray-200 max-h-60 overflow-y-auto">          {searchResults.length > 0 ? (
            searchResults.map((task) => (
              <li
                key={task.id}
                className="py-3 flex flex-col hover:bg-gray-50 border-b"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={task.checked}
                      onChange={() => toggleTaskCheck(task.id)}
                      className="mr-3 h-4 w-4 text-blue-500"
                    />
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center gap-2">
                        <PriorityTag priority={task.priority} />
                        <span
                          className={
                            task.checked ? 'line-through text-gray-500' : ''
                          }
                        >
                          {task.name}
                        </span>
                      </div>
                      {task.note && (
                        <span className="text-xs text-gray-500">{task.note}</span>
                      )}
                    </div>
                  </div>
                  {task.dueDate && (
                    <span className="text-xs text-gray-500">
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
            <li className="py-2 text-gray-500 text-center">
              No matching tasks found
            </li>
          ) : (
            <li className="py-2 text-gray-500 text-center">
              Type to search tasks
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SearchModal;