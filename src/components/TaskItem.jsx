import React from 'react';
import { formatDate } from '../utils/dateUtils';
import AvatarGroup from './AvatarGroup';
import PriorityTag from './PriorityTag';
import AnimatedCheckbox from './AnimatedCheckbox';

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
  return (    <li
      key={task.id}
      className={`py-4 px-4 flex justify-between items-center border-b border-gray-100 dark:border-gray-700 ${
        task.checked ? 'bg-gray-50 dark:bg-gray-800/50' : ''
      } ${
        draggedTask && draggedTask.id === task.id
          ? 'opacity-50 cursor-grab'
          : 'cursor-grab hover:bg-gray-50/70 dark:hover:bg-gray-800/50 transition-colors'
      } ${
        draggedOverTask && draggedOverTask.id === task.id
          ? 'border-t-2 border-blue-500'
          : ''
      } rounded-md my-0.5 hover:shadow-sm transition-all duration-200`}
      draggable="true"
      onDragStart={() => handleDragStart(task)}
      onDragOver={(e) => handleDragOver(e, task)}
      onDragEnd={handleDragEnd}    >      <div className="flex items-center flex-1">
        <AnimatedCheckbox
          checked={task.checked}
          onChange={() => toggleTaskCheck(task.id)}
          className="mr-3"
        />
        <div className="flex flex-col space-y-2 flex-1">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 min-w-[72px]">
              <PriorityTag priority={task.priority} />
            </div>            <span
              className={`text-gray-800 dark:text-gray-200 font-medium text-base tracking-wide flex-grow truncate max-w-[calc(100%-160px)] ${
                task.checked ? 'line-through text-gray-500 dark:text-gray-500' : ''
              } relative group`}
            >
              {task.name}
              <span className="absolute left-0 top-6 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-lg text-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-10 max-w-xs whitespace-normal">
                {task.name}
              </span>
            </span>
            {task.dueDate && (
              <span className="text-xs text-gray-500 ml-auto flex-shrink-0 bg-gray-50 dark:bg-gray-700/30 px-2 py-1 rounded">
                Due: {formatDate(task.dueDate)}
              </span>
            )}
          </div>
          {task.note && (
            <span
              className={`text-xs text-gray-500 pl-[76px] ${
                task.checked ? 'line-through' : ''
              }`}
            >
              {task.note}
            </span>
          )}
          {/* Team member avatars */}
          {task.assignedMembers && task.assignedMembers.length > 0 && (
            <div className="mt-1 pl-[76px]">
              <AvatarGroup members={task.assignedMembers} max={3} />
            </div>
          )}</div>      </div>      <div className="ml-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-all duration-200 transform hover:-translate-y-1 hover:scale-110" 
            viewBox="0 0 20 20" 
            fill="currentColor"
            onClick={() => openEditModal(task)}
            title="Edit"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
      </div>
    </li>
  );
};

export default TaskItem;