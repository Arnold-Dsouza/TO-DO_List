import React from 'react';
import { formatDate } from '../utils/dateUtils';
import AvatarGroup from './AvatarGroup';
import PriorityTag from './PriorityTag';

const TaskItem = ({
  task,
  draggedTask,
  draggedOverTask,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  toggleTaskCheck,
  openEditModal,
  confirmDeleteTask,
}) => {
  return (
    <li
      key={task.id}
      className={`py-4 px-3 flex justify-between items-center border-b border-gray-100 dark:border-gray-700 ${
        task.checked ? 'bg-gray-50 dark:bg-gray-800/50' : ''
      } ${
        draggedTask && draggedTask.id === task.id
          ? 'opacity-50 cursor-grab'
          : 'cursor-grab hover:bg-gray-50/70 dark:hover:bg-gray-800/50 transition-colors'
      } ${
        draggedOverTask && draggedOverTask.id === task.id
          ? 'border-t-2 border-blue-500'
          : ''
      }`}
      draggable="true"
      onDragStart={() => handleDragStart(task)}
      onDragOver={(e) => handleDragOver(e, task)}
      onDragEnd={handleDragEnd}
    >
      <div className="flex items-center flex-1">
        <input
          type="checkbox"
          checked={task.checked}
          onChange={() => toggleTaskCheck(task.id)}
          className="mr-3 h-5 w-5 text-blue-500 focus:ring-blue-400"
        />
        <div className="flex flex-col space-y-1 flex-1">          <div className="flex items-center gap-2">
            <div className="flex-shrink-0">
              <PriorityTag priority={task.priority} />
            </div>
            <span
              className={`text-gray-800 ${
                task.checked ? 'line-through text-gray-500' : ''
              }`}
            >
              {task.name}
            </span>
            {task.dueDate && (
              <span className="text-xs text-gray-500 ml-2">
                Due: {formatDate(task.dueDate)}
              </span>
            )}
          </div>
          {task.note && (
            <span
              className={`text-xs text-gray-500 ${
                task.checked ? 'line-through' : ''
              }`}
            >
              {task.note}
            </span>
          )}
          {/* Team member avatars */}
          {task.assignedMembers && task.assignedMembers.length > 0 && (
            <div className="mt-1">
              <AvatarGroup members={task.assignedMembers} max={3} />
            </div>
          )}
        </div>      </div>      <div className="flex gap-2 ml-2">        <button
          onClick={() => openEditModal(task)}
          title="Edit"
          className="relative p-2 text-blue-500 hover:text-blue-700 bg-transparent dark:bg-transparent rounded-md transition-all duration-200 transform hover:-translate-y-1.5 hover:shadow-[0_8px_0_0_rgba(59,130,246,0.2)] active:translate-y-0 active:shadow-[0_4px_0_0_rgba(59,130,246,0.2)] before:absolute before:inset-0 before:bg-blue-200/10 dark:before:bg-blue-400/10 before:rounded-md before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200 border-b-4 border-transparent hover:border-blue-200 dark:hover:border-blue-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
        <button
          onClick={() => confirmDeleteTask(task.id)}
          title="Delete"
          className="relative p-2 text-red-500 hover:text-red-700 bg-transparent dark:bg-transparent rounded-md transition-all duration-200 transform hover:-translate-y-1.5 hover:shadow-[0_8px_0_0_rgba(239,68,68,0.2)] active:translate-y-0 active:shadow-[0_4px_0_0_rgba(239,68,68,0.2)] before:absolute before:inset-0 before:bg-red-200/10 dark:before:bg-red-400/10 before:rounded-md before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200 border-b-4 border-transparent hover:border-red-200 dark:hover:border-red-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </li>
  );
};

export default TaskItem;