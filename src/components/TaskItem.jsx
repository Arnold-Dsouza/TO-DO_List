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
    <li      key={task.id}
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
        <div className="flex flex-col space-y-1 flex-1">
          <div className="flex items-center space-x-2">
            <PriorityTag priority={task.priority} />
            <span
              className={`text-gray-800 ${
                task.checked ? 'line-through text-gray-500' : ''
              }`}
            >
              {task.name}
            </span>
            {task.dueDate && (
              <span className="text-xs text-gray-500">
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
        </div>
      </div>
      <div className="flex gap-2 ml-2">
        <button
          onClick={() => openEditModal(task)}
          className="text-blue-500 hover:text-blue-700"
        >
          Edit
        </button>
        <button
          onClick={() => confirmDeleteTask(task.id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;